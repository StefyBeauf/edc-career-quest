// Garde-fous de sortie de l'analyse IA — Mission 2 B3 Marketing Digital (CLAUDE.md, section 3.5).
// Toute réponse du modèle passe par ces fonctions avant d'être renvoyée au navigateur.
// Une sortie rejetée (null) déclenche UN nouvel essai côté serveur, puis « Analyse en attente ».
// Listes rédigées par Claude Code — À VALIDER PAR STÉPHANIE.

import {
  validerAnalyseEpreuve, validerBilan, type AnalyseEpreuveIA, type BilanIA,
} from './schema'

const normaliser = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Vocabulaire proscrit en Marketing Digital (exceptions M2 « négocier » et « prix de vente » autorisées).
const VOCABULAIRE_PROSCRIT = /\b(prospects?|prospection|closing|objections?|argumentaire commercial)\b/

// Pas d'indice sur la suite : un feedback ne doit pas évoquer un événement d'une épreuve future.
// Clé = première épreuve où le thème apparaît. Interdit dans le feedback des épreuves précédentes.
const THEMES_FUTURS: { apparition: number; motif: RegExp }[] = [
  { apparition: 3, motif: /\b(reduction|baisse|coupe) (du|de) budget|budget (reduit|revu a la baisse)|60 ?000/ },
  { apparition: 4, motif: /\b(influenceu\w+|createu\w+ de contenu|partenariat)\b/ },
  { apparition: 5, motif: /\b(polemique|bad buzz|copie|plagiat|crise)\b/ },
  { apparition: 6, motif: /\b(ultimatum|lancement avance|changer d'agence)\b/ },
]

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
  const feedback = [analyse.consequence, analyse.point_fort, analyse.point_vigilance].join(' ')
  const f = normaliser(feedback)
  if (VOCABULAIRE_PROSCRIT.test(f)) return null
  if (THEMES_FUTURS.some(t => numero < t.apparition && t.motif.test(f))) return null
  if (contientTexteRedige(feedback, reponsesEquipe)) return null
  return analyse
}

export function validerSortieBilan(brut: string): BilanIA | null {
  const bilan = validerBilan(extraireJSON(brut))
  if (!bilan) return null
  const texte = normaliser([...bilan.points_forts, ...bilan.points_vigilance, bilan.recommandation].join(' '))
  return VOCABULAIRE_PROSCRIT.test(texte) ? null : bilan
}
