// Garde-fous de sortie de l'analyse IA — Mission 2 B3 Marketing Digital, v3 (CLAUDE.md, section 3.5).
// Toute réponse du modèle passe par ces fonctions avant d'être renvoyée au navigateur.
// Une sortie rejetée (null) déclenche UN nouvel essai côté serveur, puis « Analyse en attente ».
// Listes rédigées par Claude Code — À VALIDER PAR STÉPHANIE.

import {
  validerAnalyseEpreuve, validerVerdict, type AnalyseEpreuveIA, type VerdictIA,
} from './schema'

const normaliser = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Vocabulaire proscrit en Marketing Digital (exceptions M2 « négocier » et « prix de vente » autorisées).
const VOCABULAIRE_PROSCRIT = /\b(prospects?|prospection|closing|objections?|argumentaire commercial)\b/

// Pas d'indice sur la suite : un feedback ne doit pas évoquer un événement d'une épreuve future.
// Clé = première épreuve où le thème apparaît (v3 : R1 et R2 à l'épreuve 2, crise à l'épreuve 3,
// ultimatum à l'épreuve 4). Interdit dans le feedback des épreuves précédentes.
const THEMES_FUTURS: { apparition: number; motif: RegExp }[] = [
  { apparition: 2, motif: /\b(reduction|baisse|coupe) (du|de) budget|budget (reduit|revu a la baisse)|60 ?000/ },
  { apparition: 2, motif: /\b(influenceu\w+|createu\w+ de contenu|partenariat)\b/ },
  { apparition: 3, motif: /\b(polemique|bad buzz|copie|plagiat|crise)\b/ },
  { apparition: 4, motif: /\b(ultimatum|lancement avance|changer d'agence)\b/ },
]

// Le CEO réagit, il ne coache pas (fiche v3, contre-exemple) : formules de conseil ou d'annonce
// de la suite refusées. Liste volontairement courte pour limiter les faux positifs.
const COACHING = /\b(epreuve suivante|prochaine epreuve|pour la suite|pensez a|je vous conseille|je vous suggere|vous devriez|il faudrait que vous)\b/

function extraireJSON(brut: string): unknown {
  const debut = brut.indexOf('{')
  const fin = brut.lastIndexOf('}')
  if (debut === -1 || fin <= debut) return null
  try {
    return JSON.parse(brut.slice(debut, fin + 1))
  } catch {
    return null
  }
}

// Une citation longue absente des réponses de l'équipe = formulation rédigée à sa place.
function contientTexteRedige(feedback: string, reponsesEquipe: string): boolean {
  const equipe = normaliser(reponsesEquipe)
  const citations = feedback.match(/«[^»]*»|"[^"]*"|“[^”]*”/g) ?? []
  return citations.some(c => {
    const contenu = normaliser(c.slice(1, -1)).trim()
    return contenu.split(/\s+/).length > 8 && !equipe.includes(contenu)
  })
}

export function validerSortieEpreuve(brut: string, numero: number, reponsesEquipe: string): AnalyseEpreuveIA | null {
  const analyse = validerAnalyseEpreuve(extraireJSON(brut))
  if (!analyse) return null
  const feedback = [analyse.reaction_ceo, analyse.consequence].join(' ')
  const f = normaliser(feedback)
  if (VOCABULAIRE_PROSCRIT.test(f)) return null
  if (COACHING.test(f)) return null
  if (THEMES_FUTURS.some(t => numero < t.apparition && t.motif.test(f))) return null
  if (contientTexteRedige(feedback, reponsesEquipe)) return null
  return analyse
}

export function validerSortieVerdict(brut: string): VerdictIA | null {
  const verdict = validerVerdict(extraireJSON(brut))
  if (!verdict) return null
  const texte = normaliser([verdict.message_final_ceo, verdict.verdict_narratif].join(' '))
  return VOCABULAIRE_PROSCRIT.test(texte) || COACHING.test(texte) ? null : verdict
}
