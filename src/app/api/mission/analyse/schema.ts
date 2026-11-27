// Schéma de la réponse de l'analyse IA — Mission 2 B3 Marketing Digital, v3 (CLAUDE.md, section 3.5).
// Zod n'est pas installé dans le projet (aucune dépendance ajoutée) : validation manuelle.
// Partagé entre la route serveur et le navigateur (types uniquement côté navigateur).
// Noms de champs : ceux du code v2 (CLAUDE.md fait foi sur la fiche v3, section 3.6).

export const INDICATEURS_IDS = ['pertinence', 'confiance', 'adaptation', 'credibilite'] as const
export type IndicateurIdIA = (typeof INDICATEURS_IDS)[number]

// Grille commune : variation entière de -5 à +3 par indicateur et par épreuve.
export const VARIATION_MIN = -5
export const VARIATION_MAX = 3

// Longueurs maximales des textes renvoyés (au-delà : tronqués proprement).
export const MAX_REACTION = 420
export const MAX_PHRASES_REACTION = 4
export const MAX_CONSEQUENCE = 240
export const MAX_RESUME = 300
export const MAX_MANQUANT = 80
export const MAX_MANQUANTS = 4
export const MAX_VERDICT = 600
export const MAX_PHRASES_VERDICT = 5

export interface AnalyseEpreuveIA {
  variations: Record<IndicateurIdIA, number>
  reaction_ceo: string
  consequence: string
  resume_decision: string
  informations_manquantes: string[]
}

export interface VerdictIA {
  message_final_ceo: string
  verdict_narratif: string
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

/** Nombre de phrases (fin par . ! ? ou …). */
export function compterPhrases(texte: string): number {
  return texte.trim().split(/(?<=[.!?…])\s+/).filter(p => p.trim().length > 0).length
}

const estTexte = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

/** Valide l'objet JSON d'une analyse d'épreuve. Variations hors plage ou non entières, réaction trop longue : rejet. */
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
  if (!estTexte(x.reaction_ceo) || !estTexte(x.consequence) || !estTexte(x.resume_decision)) return null
  // Réaction du CEO : 4 phrases au maximum (repère 420 caractères). Au-delà : rejet, donc nouvel essai.
  if (compterPhrases(x.reaction_ceo) > MAX_PHRASES_REACTION) return null
  if (!Array.isArray(x.informations_manquantes)) return null
  const manquantes = x.informations_manquantes.filter(estTexte).map(m => tronquer(m, MAX_MANQUANT)).slice(0, MAX_MANQUANTS)
  return {
    variations,
    reaction_ceo: tronquer(x.reaction_ceo, MAX_REACTION),
    consequence: tronquer(x.consequence, MAX_CONSEQUENCE),
    resume_decision: tronquer(x.resume_decision, MAX_RESUME),
    informations_manquantes: manquantes,
  }
}

/** Valide l'objet JSON du verdict final (dernier message du CEO + verdict narratif). */
export function validerVerdict(o: unknown): VerdictIA | null {
  if (!o || typeof o !== 'object') return null
  const x = o as Record<string, unknown>
  if (!estTexte(x.message_final_ceo) || !estTexte(x.verdict_narratif)) return null
  if (compterPhrases(x.message_final_ceo) > MAX_PHRASES_VERDICT || compterPhrases(x.verdict_narratif) > MAX_PHRASES_VERDICT) return null
  return {
    message_final_ceo: tronquer(x.message_final_ceo, MAX_VERDICT),
    verdict_narratif: tronquer(x.verdict_narratif, MAX_VERDICT),
  }
}
