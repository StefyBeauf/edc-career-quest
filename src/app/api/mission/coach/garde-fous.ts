// Garde-fous de sortie du coach IA (CLAUDE.md, section 3.5).
// Toute réponse du modèle passe par validerSortie() avant d'être envoyée au navigateur.
// Une réponse rejetée (null) déclenche le repli heuristique côté client.
// Seuils et listes rédigés par Claude Code — À VALIDER PAR STÉPHANIE.

import {
  mission1SignatureDigitale as M, compterMots, normaliserTexte,
  MOTS_MAX_FORMULATION_DIGITAL, MOTS_MAX_PITCH_DIGITAL,
  type ActionCoach, type ReponseCoach, type VerdictDigital,
} from '@/lib/content/univers3'

const VERDICTS: VerdictDigital[] = ['vague', 'pretentieux', 'long', 'clair']
const ACTIONS_AVEC_VERDICT: ActionCoach[] = ['formulation', 'pitch-tester']

// Vocabulaire proscrit dans le parcours Marketing Digital (limites de mots : « survendre » reste autorisé).
const VOCABULAIRE_PROSCRIT = /\b(prospects?|prospection|prospecter|closing|objections?|ventes?|vendre|vendeu\w*|argumentaire|negoci\w*|commercia\w*)\b/

// Débuts des 5 amorces du pitch : en retrouver dans la réponse signale un pitch rédigé.
const AMORCES_PITCH = ['je suis etudiant', 'mon profil est', 'je peux apporter', 'je souhaite progresser', 'je recherche une experience']

function deuxPhrasesMax(texte: string): string {
  return texte.trim().split(/(?<=[.!?…])\s+/).filter(Boolean).slice(0, 2).join(' ')
}

// Renvoie true si le texte ressemble à un travail rédigé à la place de l'étudiant.
function ressembleAUnTexteRedige(texte: string): boolean {
  const t = normaliserTexte(texte)
  if (compterMots(texte) > 50) return true
  if (AMORCES_PITCH.some(a => t.includes(a))) return true
  // Parler à la première personne, c'est écrire à la place de l'étudiant.
  if ((t.match(/\bj(e\b|')/g) ?? []).length >= 2) return true
  // Une citation de plus de 8 mots est une formulation prête à recopier.
  const citations = texte.match(/«[^»]*»|"[^"]*"|“[^”]*”/g) ?? []
  return citations.some(c => compterMots(c) > 8)
}

export function validerSortie(action: ActionCoach, brut: string, nbMots: number): ReponseCoach | null {
  const debut = brut.indexOf('{')
  const fin = brut.lastIndexOf('}')
  if (debut === -1 || fin <= debut) return null
  let donnees: Record<string, unknown>
  try {
    donnees = JSON.parse(brut.slice(debut, fin + 1)) as Record<string, unknown>
  } catch {
    return null
  }

  if (typeof donnees.message !== 'string' || !donnees.message.trim()) return null
  const message = deuxPhrasesMax(donnees.message)
  let question = typeof donnees.question === 'string' ? deuxPhrasesMax(donnees.question).split(/(?<=\?)\s+/)[0] : undefined
  if (question && (!question.endsWith('?') || compterMots(question) > 30)) question = undefined

  const ensemble = `${message} ${question ?? ''}`
  if (VOCABULAIRE_PROSCRIT.test(normaliserTexte(ensemble))) return null
  if (ressembleAUnTexteRedige(message)) return null

  const reponse: ReponseCoach = { message, ...(question ? { question } : {}) }
  if (ACTIONS_AVEC_VERDICT.includes(action)) {
    if (!VERDICTS.includes(donnees.verdict as VerdictDigital)) return null
    reponse.verdict = donnees.verdict as VerdictDigital
    // La longueur se mesure, elle ne s'estime pas : un texte trop long ne peut pas être « clair ».
    const motsMax = action === 'formulation' ? MOTS_MAX_FORMULATION_DIGITAL : MOTS_MAX_PITCH_DIGITAL
    if (reponse.verdict === 'clair' && nbMots > motsMax) {
      return { verdict: 'long', message: M.feedbacksVerdict.long.message }
    }
  }
  return reponse
}
