import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {
  alertesUltimatum, dossierClient as D, epreuves, profilsCreateurs, variantesCrise, MAX_CANAUX,
  DECISIONS_PARTENARIAT, type ContexteUltimatum,
} from '@/lib/content/univers3-marketing-m2'
import { PROMPT_SYSTEME_ANALYSE, PROMPT_SYSTEME_BILAN } from './prompt'
import { validerSortieBilan, validerSortieEpreuve } from './garde-fous'
import { INDICATEURS_IDS, MAX_POINT, MAX_RESUME } from './schema'

// Route d'analyse IA de la Mission 2 B3 Marketing Digital (CLAUDE.md, section 3.5).
// - SANS ÉTAT : elle reçoit le contexte, renvoie l'analyse, ne conserve rien. L'idempotence
//   (une seule attribution de points par épreuve) est garantie par le navigateur (état de partie).
// - Appel côté serveur uniquement : la clé ANTHROPIC_API_KEY n'est jamais envoyée au navigateur.
// - Confidentialité : aucun texte d'équipe n'est journalisé ni écrit en base. Ne pas ajouter de
//   console.log du corps de la requête ou de la réponse dans ce fichier.
// - Le contexte (dossier client, situation, variante) est reconstruit ICI à partir des contenus :
//   le navigateur n'envoie que des identifiants et les réponses de l'équipe, bornées en longueur.
// - Mode dégradé : toute erreur renvoie { statut: 'en-attente' }. Le navigateur conserve les
//   réponses, affiche « Analyse en attente » (jamais de score estimé) et la partie continue.

export const maxDuration = 20

const MODELE = 'claude-haiku-4-5' // tout autre modèle : validation de Stéphanie (coût)
const DELAI_TOTAL_MS = 15_000 // repère CLAUDE.md ; le navigateur abandonne à 17 s
const DELAI_PREMIER_ESSAI_MS = 10_000
const MAX_TOKENS: Record<'epreuve' | 'bilan', number> = { epreuve: 700, bilan: 800 }
const TAILLE_MAX_CORPS = 20_000 // caractères

// Limite d'appels par adresse IP (au mieux : mémoire propre à chaque instance serveur).
// Une classe partage souvent la même adresse IP : 10 équipes × 7 appels + relances ≈ 100.
const FENETRE_MS = 10 * 60_000
const MAX_APPELS_FENETRE = 150
const appelsParIp = new Map<string, number[]>()

function autoriserAppel(ip: string): boolean {
  const t = Date.now()
  const recents = (appelsParIp.get(ip) ?? []).filter(x => t - x < FENETRE_MS)
  if (recents.length >= MAX_APPELS_FENETRE) { appelsParIp.set(ip, recents); return false }
  recents.push(t)
  appelsParIp.set(ip, recents)
  if (appelsParIp.size > 5000) appelsParIp.clear() // garde-fou mémoire
  return true
}

const enAttente = (status: number) => NextResponse.json({ statut: 'en-attente' }, { status })

const texteBorne = (v: unknown, max: number): string | null => {
  if (v === undefined || v === null || v === '') return ''
  return typeof v === 'string' && v.length <= max ? v.trim() : null
}

// ─── Contexte commun ────────────────────────────────────────────────────────
function dossierCondense(): string {
  return [
    'Brief : ' + Object.entries(D.brief).map(([k, v]) => `${k} : ${v}`).join(' ; '),
    'Collection : ' + D.collection.map(m => `${m.nom} (${m.description.join(' ')})`).join(' ; '),
    'Valeurs : ' + D.valeurs.map(v => `${v.nom} : ${v.description}`).join(' ; '),
    'Ressources : ' + D.ressources.join(' '),
    'Distribution : ' + D.distribution.join(' '),
    'Fabrication : ' + D.fabrication.join(' '),
    'Engagements environnementaux : ' + D.engagementsEnvironnementaux.join(' '),
    'Attentes du client : ' + D.attentesClient.join(' '),
    'Conception : ' + D.conception.join(' '),
  ].join('\n')
}

// ─── Analyse d'une épreuve ──────────────────────────────────────────────────
function construireAnalyse(c: Record<string, unknown>): { contenu: string; numero: number; reponsesEquipe: string } | null {
  const numero = c.numero
  if (!Number.isInteger(numero) || (numero as number) < 1 || (numero as number) > 6) return null
  const n = numero as number
  const ep = epreuves[n - 1]

  // Réponses : uniquement les champs connus, longueur bornée par le contenu de l'épreuve.
  const brutes = c.reponses
  if (!brutes || typeof brutes !== 'object') return null
  const lignes: string[] = []
  let texteEquipe = ''
  for (const champ of ep.champs) {
    const max = champ.type === 'canaux' ? (champ.maxCaracteres + 1) * MAX_CANAUX : champ.maxCaracteres
    let v = texteBorne((brutes as Record<string, unknown>)[champ.id], max)
    if (v === null) return null
    if (champ.type === 'canaux') v = v.split('\n').map(x => x.trim()).filter(Boolean).slice(0, MAX_CANAUX).join(', ')
    if (champ.type === 'decision') {
      if (v && !DECISIONS_PARTENARIAT.some(d => d.id === v)) return null
      v = DECISIONS_PARTENARIAT.find(d => d.id === v)?.label ?? ''
    }
    lignes.push(`- ${champ.label} : ${v || '(vide)'}`)
    texteEquipe += ` ${v}`
  }

  // Résumés des décisions précédentes (produits par les analyses antérieures, bornés).
  const resumes = (c.resumesPrecedents ?? {}) as Record<string, unknown>
  if (typeof resumes !== 'object') return null
  const precedentes: string[] = []
  for (let i = 1; i < n; i++) {
    const r = texteBorne(resumes[String(i)], MAX_RESUME + 20)
    if (r === null) return null
    precedentes.push(`- Épreuve ${i} (${epreuves[i - 1].titre}) : ${r || '(analyse en attente : décision non résumée)'}`)
  }

  // Variante tirée et éléments de continuité (identifiants et valeurs bornées uniquement).
  const variantes = (c.variantes ?? {}) as Record<string, unknown>
  const ctx = (c.contexte ?? {}) as Record<string, unknown>
  const decision = typeof ctx.decisionPartenariat === 'string' && ['accepter', 'refuser', 'negocier'].includes(ctx.decisionPartenariat)
    ? ctx.decisionPartenariat as ContexteUltimatum['decisionPartenariat'] : undefined
  const createur = profilsCreateurs.find(p => p.id === variantes.createur)
  const crise = variantesCrise.find(v => v.id === variantes.crise)
  let variante = '(aucune)'
  if (n === 4) {
    if (!createur) return null
    variante = `Créateur proposé : ${createur.nom}. Univers : ${createur.univers} Réseaux : ${createur.reseaux}. Audience : ${createur.audience} Publications : ${createur.publications.join(' ')} Collaborations : ${createur.collaborations} Tarif : ${createur.tarif} Réputation : ${createur.reputation} Signaux d'alerte : ${createur.signauxAlerte.join(' ')}`
  }
  if (n === 5) {
    if (!crise) return null
    const modele = D.collection.find(m => m.id === crise.modeleConcerne)!.nom
    variante = [
      `Publication virale de ${crise.publication.auteur} (${crise.publication.vues}) : « ${crise.publication.texte} »`,
      `Modèle mis en cause : ${modele}, comparé à ${crise.marqueFictive} ${crise.modeleFictif} (marque fictive).`,
      `Commentaires : ${crise.commentaires.map(x => `${x.auteur} : ${x.texte}`).join(' / ')}`,
      `Éléments transmis par STRYDE : ${crise.origineDesign.join(' ')}`,
      `Repères pour l'évaluation (non montrés à l'équipe). Faits établis : ${crise.faitsEtablis.join(' ')} Points à vérifier : ${crise.aVerifier.join(' ')}`,
      decision === 'accepter' && createur
        ? `L'équipe a accepté le partenariat avec ${createur.nom} à l'épreuve 4 ; sa réaction publique : ${createur.reactionCrise.auteur} ${createur.reactionCrise.texte}`
        : 'Aucun partenariat accepté à l\'épreuve 4.',
    ].join('\n')
  }
  if (n === 6) {
    const concept = texteBorne(ctx.concept, 400)
    const canaux = Array.isArray(ctx.canaux) ? ctx.canaux.filter((x): x is string => typeof x === 'string' && x.length <= 60).slice(0, MAX_CANAUX) : []
    if (concept === null) return null
    const contexte: ContexteUltimatum = {
      createur: createur?.nom.replace(/\s*\(.*\)$/, ''),
      decisionPartenariat: decision,
      modeleCrise: crise ? D.collection.find(m => m.id === crise.modeleConcerne)?.nom : undefined,
      marqueCrise: crise?.marqueFictive,
      concept: concept || undefined,
      canaux,
    }
    variante = [
      `Alerte client : ${alertesUltimatum.client.texte(contexte)}`,
      `Alerte équipe : ${alertesUltimatum.equipe.texte(contexte)}`,
      `Alerte planning : ${alertesUltimatum.planning.texte(contexte)}`,
    ].join('\n')
  }

  const contenu = [
    `<dossier_client>\n${dossierCondense()}\n</dossier_client>`,
    `<epreuve>\nÉpreuve ${n} / 6 : ${ep.titre}\nSituation : ${ep.situation}\nTravail demandé : ${ep.travailDemande.join(' ')}\n</epreuve>`,
    `<variante>\n${variante}\n</variante>`,
    `<decisions_precedentes>\n${precedentes.join('\n') || '(première épreuve)'}\n</decisions_precedentes>`,
    `<reponses_equipe>\n${lignes.join('\n')}\n</reponses_equipe>`,
    `Analyse les réponses de l'équipe pour l'épreuve ${n} et réponds uniquement par l'objet JSON demandé.`,
  ].join('\n\n')
  return { contenu, numero: n, reponsesEquipe: texteEquipe }
}

// ─── Bilan final ────────────────────────────────────────────────────────────
function construireBilan(c: Record<string, unknown>): string | null {
  const liste = c.epreuves
  const scores = c.scores as Record<string, unknown> | undefined
  if (!Array.isArray(liste) || liste.length !== 6 || !scores || typeof scores !== 'object') return null
  const lignes: string[] = []
  for (let i = 0; i < 6; i++) {
    const e = liste[i] as Record<string, unknown>
    if (!e || typeof e !== 'object') return null
    const resume = texteBorne(e.resume, MAX_RESUME + 20)
    const fort = texteBorne(e.point_fort, MAX_POINT + 20)
    const vigilance = texteBorne(e.point_vigilance, MAX_POINT + 20)
    if (resume === null || fort === null || vigilance === null) return null
    lignes.push(resume
      ? `- Épreuve ${i + 1} (${epreuves[i].titre}) : ${resume} | Point fort relevé : ${fort} | Point de vigilance relevé : ${vigilance}`
      : `- Épreuve ${i + 1} (${epreuves[i].titre}) : analyse en attente.`)
  }
  const s: string[] = []
  for (const id of INDICATEURS_IDS) {
    const v = scores[id]
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 25) return null
    s.push(`${id} : ${v}/25`)
  }
  return [
    `<decisions>\n${lignes.join('\n')}\n</decisions>`,
    `<indicateurs_finaux>\n${s.join(' ; ')}\n</indicateurs_finaux>`,
    'Rédige le bilan final de l\'agence et réponds uniquement par l\'objet JSON demandé.',
  ].join('\n\n')
}

// ─── Appel au modèle (1 essai + 1 nouvel essai si la sortie est invalide) ───────
async function appelerModele(systeme: string, contenu: string, maxTokens: number, timeout: number): Promise<string | null> {
  const client = new Anthropic()
  const message = await client.messages.create(
    {
      model: MODELE,
      max_tokens: maxTokens,
      system: systeme,
      // Préremplissage « { » : le modèle commence directement l'objet JSON.
      messages: [{ role: 'user', content: contenu }, { role: 'assistant', content: '{' }],
    },
    { timeout, maxRetries: 0 },
  )
  if (message.stop_reason !== 'end_turn') return null
  return '{' + message.content.map(b => (b.type === 'text' ? b.text : '')).join('')
}

export async function POST(req: Request) {
  const debut = Date.now()
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'local'
  if (!autoriserAppel(ip)) return enAttente(429)

  let corps: Record<string, unknown>
  try {
    const brut = await req.text()
    if (brut.length > TAILLE_MAX_CORPS) return enAttente(413)
    corps = JSON.parse(brut) as Record<string, unknown>
  } catch {
    return enAttente(400)
  }
  if (!corps || typeof corps !== 'object') return enAttente(400)

  const type = corps.type === 'bilan' ? 'bilan' : corps.type === 'epreuve' ? 'epreuve' : null
  if (!type) return enAttente(400)

  const demande = type === 'epreuve' ? construireAnalyse(corps) : null
  const contenuBilan = type === 'bilan' ? construireBilan(corps) : null
  if (type === 'epreuve' && !demande) return enAttente(400)
  if (type === 'bilan' && !contenuBilan) return enAttente(400)

  const systeme = type === 'epreuve' ? PROMPT_SYSTEME_ANALYSE : PROMPT_SYSTEME_BILAN
  const contenu = type === 'epreuve' ? demande!.contenu : contenuBilan!
  const valider = (brut: string) => (type === 'epreuve'
    ? validerSortieEpreuve(brut, demande!.numero, demande!.reponsesEquipe)
    : validerSortieBilan(brut))

  for (let essai = 0; essai < 2; essai++) {
    const restant = DELAI_TOTAL_MS - (Date.now() - debut)
    // Nouvel essai seulement s'il reste assez de temps (sinon : « en attente », relance plus tard).
    if (essai === 1 && restant < 4_000) break
    try {
      const brut = await appelerModele(systeme, contenu, MAX_TOKENS[type], Math.min(essai === 0 ? DELAI_PREMIER_ESSAI_MS : restant - 500, restant - 500))
      const resultat = brut ? valider(brut) : null
      if (resultat) return NextResponse.json(type === 'epreuve' ? { statut: 'ok', analyse: resultat } : { statut: 'ok', bilan: resultat })
    } catch {
      // Erreur réseau, délai dépassé, clé absente… : un seul nouvel essai si le temps le permet.
    }
  }
  return enAttente(502)
}
