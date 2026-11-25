// Schéma de la réponse de l'analyse IA — Mission 2 B3 Marketing Digital (CLAUDE.md, section 3.5).
// Zod n'est pas installé dans le projet (aucune dépendance ajoutée) : validation manuelle.
// Partagé entre la route serveur et le navigateur (types uniquement côté navigateur).

export const INDICATEURS_IDS = ['pertinence', 'confiance', 'cohesion', 'credibilite'] as const
export type IndicateurIdIA = (typeof INDICATEURS_IDS)[number]

// Grille commune : variation entière de -5 à +3 par indicateur et par épreuve.
export const VARIATION_MIN = -5
export const VARIATION_MAX = 3

// Longueurs maximales des textes renvoyés (au-delà : tronqués proprement).
export const MAX_CONSEQUENCE = 240
export const MAX_POINT = 160
export const MAX_RESUME = 300
export const MAX_COMPETENCE = 60
export const MAX_COMPETENCES = 5
export const MAX_RECOMMANDATION = 240

export interface AnalyseEpreuveIA {
  variations: Record<IndicateurIdIA, number>
  consequence: string
  point_fort: string
  point_vigilance: string
  resume_decision: string
  competences_mobilisees: string[]
}

export interface BilanIA {
  points_forts: string[]
  points_vigilance: string[]
  competences_mobilisees: string[]
  recommandation: string
}

/** Nettoie un texte et le coupe à `max` caractères sur une fin de mot, avec « … ». */
export function tronquer(texte: string, max: number): string {
  // Retire la mise en forme Markdown éventuelle (astérisques, soulignés doubles, dièses de titre).
  const t = texte.replace(/\*+|__|^#+\s*/gm, '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const coupe = t.slice(0, max - 1)
  const espace = coupe.lastIndexOf(' ')
  return `${(espace > max * 0.6 ? coupe.slice(0, espace) : coupe).trimEnd()}…`
}

const estTexte = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

function listeTextes(v: unknown, min: number, max: number, longueur: number): string[] | null {
  if (!Array.isArray(v)) return null
  const l = v.filter(estTexte).map(x => tronquer(x, longueur))
  if (l.length < min) return null
  return l.slice(0, max)
}

/** Valide l'objet JSON d'une analyse d'épreuve. Variations hors plage ou non entières : rejet. */
export function validerAnalyseEpreuve(o: unknown): AnalyseEpreuveIA | null {
  if (!o || typeof o !== 'object') return null
  const x = o as Record<string, unknown>
  const v = x.variations as Record<string, unknown> | undefined
  if (!v || typeof v !== 'object') return null
  const variations = {} as Record<IndicateurIdIA, number>
  for (const id of INDICATEURS_IDS) {
    const n = v[id]
    if (typeof n !== 'number' || !Number.isInteger(n) || n < VARIATION_MIN || n > VARIATION_MAX) return null
    variations[id] = n
  }
  if (!estTexte(x.consequence) || !estTexte(x.point_fort) || !estTexte(x.point_vigilance) || !estTexte(x.resume_decision)) return null
  const competences = listeTextes(x.competences_mobilisees, 0, MAX_COMPETENCES, MAX_COMPETENCE)
  if (!competences) return null
  return {
    variations,
    consequence: tronquer(x.consequence, MAX_CONSEQUENCE),
    point_fort: tronquer(x.point_fort, MAX_POINT),
    point_vigilance: tronquer(x.point_vigilance, MAX_POINT),
    resume_decision: tronquer(x.resume_decision, MAX_RESUME),
    competences_mobilisees: competences,
  }
}

/** Valide l'objet JSON du bilan final : exactement 3 points forts et 2 points de vigilance. */
export function validerBilan(o: unknown): BilanIA | null {
  if (!o || typeof o !== 'object') return null
  const x = o as Record<string, unknown>
  const forts = listeTextes(x.points_forts, 3, 3, MAX_POINT)
  const vigilance = listeTextes(x.points_vigilance, 2, 2, MAX_POINT)
  const competences = listeTextes(x.competences_mobilisees, 1, MAX_COMPETENCES, MAX_COMPETENCE)
  if (!forts || !vigilance || !competences || !estTexte(x.recommandation)) return null
  return {
    points_forts: forts,
    points_vigilance: vigilance,
    competences_mobilisees: competences,
    recommandation: tronquer(x.recommandation, MAX_RECOMMANDATION),
  }
}
