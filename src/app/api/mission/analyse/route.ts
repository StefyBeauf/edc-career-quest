import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {
  alertesUltimatum, dossierClient as D, epreuves, NB_EPREUVES, profilsCreateurs, REBONDISSEMENTS, statutContrat, tonCeo,
  variantesCrise, DECISIONS_PARTENARIAT, type ContexteUltimatum,
} from '@/lib/content/univers3-marketing-m2'
import { PROMPT_SYSTEME_ANALYSE, PROMPT_SYSTEME_VERDICT } from './prompt'
import { validerSortieEpreuve, validerSortieVerdict } from './garde-fous'
import { INDICATEURS_IDS, MAX_REACTION, MAX_RESUME, type IndicateurIdIA } from './schema'

// Route d'analyse IA de la Mission 2 B3 Marketing Digital, v3 (CLAUDE.md, section 3.5).
// Deux types d'appel : « epreuve » (1 par validation : variations, réaction d'Alex Morgan,
// conséquence, résumé) et « verdict » (1 en fin de partie : dernier message du CEO).
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
const MAX_TOKENS: Record<'epreuve' | 'verdict', number> = { epreuve: 700, verdict: 700 }
const TAILLE_MAX_CORPS = 20_000 // caractères

// Limite d'appels par adresse IP (au mieux : mémoire propre à chaque instance serveur).
// Une classe partage souvent la même adresse IP : 10 équipes × 5 appels + relances ≈ 80.
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

// ─── Éléments transmis par le navigateur (identifiants et textes bornés uniquement) ─────
function lireScores(v: unknown): Record<IndicateurIdIA, number> | null {
  if (!v || typeof v !== 'object') return null
  const scores = {} as Record<IndicateurIdIA, number>
  for (const id of INDICATEURS_IDS) {
    const n = (v as Record<string, unknown>)[id]
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0 || n > 25) return null
    scores[id] = n
  }
  return scores
}

/** Mémoire du client : résumés des décisions et réactions précédentes (produits par l'IA, bornés). */
function lireMemoire(v: unknown, jusqua: number): string[] | null {
  const h = (v ?? {}) as Record<string, unknown>
  if (typeof h !== 'object') return null
  const lignes: string[] = []
  for (let i = 1; i < jusqua; i++) {
    const e = (h[String(i)] ?? {}) as Record<string, unknown>
    if (typeof e !== 'object') return null
    const resume = texteBorne(e.resume, MAX_RESUME + 20)
    const reaction = texteBorne(e.reaction, MAX_REACTION + 20)
    if (resume === null || reaction === null) return null
    lignes.push(resume
      ? `- Épreuve ${i} (${epreuves[i - 1].titre}) : décision : ${resume}${reaction ? ` | Votre réaction d'alors : ${reaction}` : ''}`
      : `- Épreuve ${i} (${epreuves[i - 1].titre}) : analyse en attente, décision non résumée.`)
  }
  return lignes
}

const nomCreateur = (nom: string) => nom.replace(/\s*\(.*\)$/, '')

// ─── Analyse d'une épreuve ──────────────────────────────────────────────────
function construireAnalyse(c: Record<string, unknown>): { contenu: string; numero: number; reponsesEquipe: string } | null {
  const numero = c.numero
  if (!Number.isInteger(numero) || (numero as number) < 1 || (numero as number) > NB_EPREUVES) return null
  const n = numero as number
  const ep = epreuves[n - 1]

  // Rebondissements réellement reçus par l'équipe pendant l'épreuve (identifiants connus seulement).
  const recus = Array.isArray(c.rebondissements)
    ? REBONDISSEMENTS.filter(r => r.epreuve === n && (c.rebondissements as unknown[]).includes(r.id)).map(r => r.id)
    : []

  // Réponses : uniquement les champs connus (et visibles), longueur bornée par le contenu de l'épreuve.
  const brutes = c.reponses
  if (!brutes || typeof brutes !== 'object') return null
  const lignes: string[] = []
  let texteEquipe = ''
  for (const champ of ep.champs) {
    if (champ.visibleApres && !recus.includes(champ.visibleApres)) continue
    let v = texteBorne((brutes as Record<string, unknown>)[champ.id], champ.maxCaracteres)
    if (v === null) return null
    if (champ.type === 'decision') {
      if (v && !DECISIONS_PARTENARIAT.some(d => d.id === v)) return null
      v = DECISIONS_PARTENARIAT.find(d => d.id === v)?.label ?? ''
    }
    lignes.push(`- ${champ.label} ${v || '(vide)'}`)
    texteEquipe += ` ${v}`
  }

  const scores = lireScores(c.scores)
  const memoire = lireMemoire(c.historique, n)
  if (!scores || !memoire) return null

  // Variantes tirées et alertes de l'épreuve (reconstruites ICI à partir des contenus).
  const variantes = (c.variantes ?? {}) as Record<string, unknown>
  const ctx = (c.contexte ?? {}) as Record<string, unknown>
  const decision = typeof ctx.decisionPartenariat === 'string' && ['accepter', 'refuser', 'negocier'].includes(ctx.decisionPartenariat)
    ? ctx.decisionPartenariat as ContexteUltimatum['decisionPartenariat'] : undefined
  const createur = profilsCreateurs.find(p => p.id === variantes.createur)
  const crise = variantesCrise.find(v => v.id === variantes.crise)
  const alertes: string[] = []
  const texteR = (id: string) => REBONDISSEMENTS.find(r => r.id === id)!
  for (const id of recus) {
    const r = texteR(id)
    if (id === 'R4') {
      if (!crise) return null
      alertes.push(`${r.categorie} (à +${r.minute} min) : ${crise.nouvelleInformation}`)
    } else {
      alertes.push(`${r.categorie} (à +${r.minute} min), message du client : « ${r.texte} »`)
    }
    if (id === 'R2') {
      if (!createur) return null
      alertes.push(`Créateur proposé : ${createur.nom}. Univers : ${createur.univers} Réseaux : ${createur.reseaux}. Audience : ${createur.audience} Publications : ${createur.publications.join(' ')} Collaborations : ${createur.collaborations} Tarif : ${createur.tarif} Réputation : ${createur.reputation} Signaux d'alerte repérés : ${createur.signauxAlerte.join(' ')}`)
    }
  }
  let variante = '(aucune)'
  if (n === 3) {
    if (!crise) return null
    const modele = D.collection.find(m => m.id === crise.modeleConcerne)!.nom
    variante = [
      `Publication virale de ${crise.publication.auteur} (${crise.publication.vues}) : « ${crise.publication.texte} »`,
      `Modèle mis en cause : ${modele}, comparé à ${crise.marqueFictive} ${crise.modeleFictif} (marque fictive).`,
      `Commentaires : ${crise.commentaires.map(x => `${x.auteur} : ${x.texte}`).join(' / ')}`,
      `Éléments transmis par STRYDE dès le début : ${crise.origineDesign.join(' ')}`,
      `Repères pour l'évaluation (non montrés à l'équipe). Faits établis : ${crise.faitsEtablis.join(' ')} Points à vérifier : ${crise.aVerifier.join(' ')}`,
      decision === 'accepter' && createur
        ? `L'équipe a accepté le partenariat avec ${createur.nom} à l'épreuve 2 ; sa réaction publique : ${createur.reactionCrise.auteur} ${createur.reactionCrise.texte}`
        : 'Aucun partenariat accepté à l\'épreuve 2.',
    ].join('\n')
  }
  if (n === 4) {
    const contexte: ContexteUltimatum = {
      createur: createur ? nomCreateur(createur.nom) : undefined,
      decisionPartenariat: decision,
      modeleCrise: crise ? D.collection.find(m => m.id === crise.modeleConcerne)?.nom : undefined,
      marqueCrise: crise?.marqueFictive,
    }
    alertes.push(
      `Alerte 1 (dès l'ouverture) : ${alertesUltimatum.client.texte(contexte)}`,
      `Alerte 2 (dès l'ouverture) : ${alertesUltimatum.equipe.texte()}`,
      `Alerte 3 (dès l'ouverture) : ${alertesUltimatum.planning.texte()}`,
    )
  }

  const contenu = [
    `<dossier_client>\n${dossierCondense()}\n</dossier_client>`,
    `<epreuve>\nÉpreuve ${n} / ${NB_EPREUVES} : ${ep.titre}\nSituation : ${ep.situation}\nTravail demandé : ${ep.travailDemande.join(' ')}${n === NB_EPREUVES ? '\nÉvalue aussi la cohérence de cette décision finale avec l\'ensemble des décisions prises depuis le début.' : ''}\n</epreuve>`,
    `<variante>\n${variante}\n</variante>`,
    `<alertes_recues>\n${alertes.join('\n') || '(aucune alerte pendant cette épreuve)'}\n</alertes_recues>`,
    `<memoire_client>\n${memoire.join('\n') || '(premier échange avec l\'agence)'}\n</memoire_client>`,
    `<indicateurs_avant_epreuve>\n${INDICATEURS_IDS.map(id => `${id} : ${scores[id]}/25`).join(' ; ')}\nConfiance du client avant l'épreuve : ${scores.confiance}/25, palier « ${tonCeo(scores.confiance)} ».\n</indicateurs_avant_epreuve>`,
    `<reponse_equipe>\n${lignes.join('\n')}\n</reponse_equipe>`,
    `Analyse la décision de l'agence pour l'épreuve ${n} et réponds uniquement par l'objet JSON demandé.`,
  ].join('\n\n')
  return { contenu, numero: n, reponsesEquipe: texteEquipe }
}

// ─── Verdict final ──────────────────────────────────────────────────────────
// Le statut du contrat est calculé ICI par le code (barème de la fiche), jamais par l'IA.
function construireVerdict(c: Record<string, unknown>): string | null {
  const scores = lireScores(c.scores)
  const memoire = lireMemoire(c.historique, NB_EPREUVES + 1)
  if (!scores || !memoire) return null
  const total = INDICATEURS_IDS.reduce((s, id) => s + scores[id], 0)
  return [
    `<decisions>\n${memoire.join('\n')}\n</decisions>`,
    `<indicateurs_finaux>\n${INDICATEURS_IDS.map(id => `${id} : ${scores[id]}/25`).join(' ; ')}\nScore total : ${total}/100. Confiance du client finale : ${scores.confiance}/25, palier « ${tonCeo(scores.confiance)} ».\n</indicateurs_finaux>`,
    `<statut_contrat>\n${statutContrat(total)}\n</statut_contrat>`,
    'Rédige le dernier message d\'Alex Morgan et le verdict narratif, et réponds uniquement par l\'objet JSON demandé.',
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

  const type = corps.type === 'verdict' ? 'verdict' : corps.type === 'epreuve' ? 'epreuve' : null
  if (!type) return enAttente(400)

  const demande = type === 'epreuve' ? construireAnalyse(corps) : null
  const contenuVerdict = type === 'verdict' ? construireVerdict(corps) : null
  if (type === 'epreuve' && !demande) return enAttente(400)
  if (type === 'verdict' && !contenuVerdict) return enAttente(400)

  const systeme = type === 'epreuve' ? PROMPT_SYSTEME_ANALYSE : PROMPT_SYSTEME_VERDICT
  const contenu = type === 'epreuve' ? demande!.contenu : contenuVerdict!
  const valider = (brut: string) => (type === 'epreuve'
    ? validerSortieEpreuve(brut, demande!.numero, demande!.reponsesEquipe)
    : validerSortieVerdict(brut))

  for (let essai = 0; essai < 2; essai++) {
    const restant = DELAI_TOTAL_MS - (Date.now() - debut)
    // Nouvel essai seulement s'il reste assez de temps (sinon : « en attente », relance plus tard).
    if (essai === 1 && restant < 4_000) break
    try {
      const brut = await appelerModele(systeme, contenu, MAX_TOKENS[type], Math.min(essai === 0 ? DELAI_PREMIER_ESSAI_MS : restant - 500, restant - 500))
      const resultat = brut ? valider(brut) : null
      if (resultat) return NextResponse.json(type === 'epreuve' ? { statut: 'ok', analyse: resultat } : { statut: 'ok', verdict: resultat })
    } catch {
      // Erreur réseau, délai dépassé, clé absente… : un seul nouvel essai si le temps le permet.
    }
  }
  return enAttente(502)
}
