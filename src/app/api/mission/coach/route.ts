import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {
  mission1SignatureDigitale as M, compterMots, scoresQuizDigital,
  type ActionCoach, type ProfilDigitalId,
} from '@/lib/content/univers3'
import { PROMPT_SYSTEME_COACH, CONSIGNES_COACH } from './prompt'
import { validerSortie } from './garde-fous'

// Route dédiée au coach IA de la Mission 1 B3 Marketing Digital (CLAUDE.md, section 3.5).
// - Appel côté serveur uniquement : la clé ANTHROPIC_API_KEY n'est jamais envoyée au navigateur.
// - Confidentialité : aucun texte étudiant n'est journalisé ni écrit en base. Ne pas ajouter
//   de console.log du corps de la requête ou de la réponse dans ce fichier.
// - Toute erreur renvoie { repli: true } : le navigateur affiche alors le feedback heuristique.

export const maxDuration = 15

const MODELE = 'claude-haiku-4-5'
const DELAI_IA_MS = 7000 // le navigateur abandonne à 8 s
const MAX_TOKENS_SORTIE = 220

// Tailles d'entrée bornées (maîtrise des coûts et protection contre les abus).
const MAX_CARACTERES_FORMULATION = 400
const MAX_CARACTERES_PITCH = 1500

const ACTIONS: ActionCoach[] = ['profil', 'formulation', 'pitch-tester', 'pitch-clair', 'pitch-metier', 'pitch-reduire']

const repli = (status: number) => NextResponse.json({ repli: true }, { status })

// ─── Validation de l'entrée ────────────────────────────────────────────────
// Renvoie le message utilisateur à envoyer au modèle, ou null si la requête est hors format.
function construireMessage(corps: Record<string, unknown>): { action: ActionCoach; contenu: string; nbMots: number; texte: string } | null {
  const action = corps.action as ActionCoach
  if (!ACTIONS.includes(action)) return null

  if (action === 'profil') {
    const reponses = corps.reponses
    const profilId = corps.profilId as ProfilDigitalId
    if (!M.profils.some(p => p.id === profilId)) return null
    if (!Array.isArray(reponses) || reponses.length !== M.questions.length) return null
    if (!reponses.every(r => Number.isInteger(r) && r >= 0 && r < 4)) return null
    // Le serveur reconstruit les textes à partir des index : aucun texte libre n'est accepté ici.
    const choix = M.questions.map((q, i) => `- ${q.question} → ${q.reponses[reponses[i] as number].texte}`).join('\n')
    const scores = scoresQuizDigital(reponses as number[])
    const detail = M.profils.map(p => `${p.nom} : ${scores[p.id]}`).join(' ; ')
    const nom = M.profils.find(p => p.id === profilId)!.nom
    return { action, contenu: `${CONSIGNES_COACH.profil}\n\nProfil dominant : ${nom}\nScores : ${detail}\nRéponses au quiz :\n${choix}`, nbMots: 0, texte: '' }
  }

  if (action === 'formulation') {
    const texte = typeof corps.texte === 'string' ? corps.texte.trim() : ''
    const index = corps.phraseIndex
    if (!texte || texte.length > MAX_CARACTERES_FORMULATION) return null
    if (!Number.isInteger(index) || (index as number) < 0 || (index as number) >= M.phrasesVagues.length) return null
    const phrase = M.phrasesVagues[index as number].texte
    return {
      action,
      contenu: `${CONSIGNES_COACH.formulation}\n\nPhrase vague de départ : « ${phrase} »\nAmorce : « ${M.formulationAmorce} »\n<texte_etudiant>\n${texte}\n</texte_etudiant>`,
      nbMots: compterMots(texte),
      texte,
    }
  }

  const pitch = typeof corps.pitch === 'string' ? corps.pitch.trim() : ''
  if (!pitch || pitch.length > MAX_CARACTERES_PITCH) return null
  const nbMots = compterMots(pitch)
  return { action, contenu: `${CONSIGNES_COACH[action]}\n\nNombre de mots : ${nbMots}\n<texte_etudiant>\n${pitch}\n</texte_etudiant>`, nbMots, texte: pitch }
}

export async function POST(req: Request) {
  let corps: Record<string, unknown>
  try {
    corps = await req.json() as Record<string, unknown>
  } catch {
    return repli(400)
  }
  if (!corps || typeof corps !== 'object') return repli(400)

  const demande = construireMessage(corps)
  if (!demande) return repli(400)

  try {
    const client = new Anthropic()
    const message = await client.messages.create(
      {
        model: MODELE,
        max_tokens: MAX_TOKENS_SORTIE,
        system: PROMPT_SYSTEME_COACH,
        messages: [{ role: 'user', content: demande.contenu }],
      },
      { timeout: DELAI_IA_MS, maxRetries: 0 },
    )
    if (message.stop_reason !== 'end_turn') return repli(502)
    const texte = message.content.map(b => (b.type === 'text' ? b.text : '')).join('')
    const reponse = validerSortie(demande.action, texte, demande.nbMots, demande.texte)
    return reponse ? NextResponse.json(reponse) : repli(422)
  } catch {
    // Erreur réseau, délai dépassé, clé absente… : le navigateur bascule sur les heuristiques.
    return repli(502)
  }
}
