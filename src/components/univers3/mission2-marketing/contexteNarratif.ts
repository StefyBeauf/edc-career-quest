import {
  dossierClient, profilsCreateurs, variantesCrise, type ContexteUltimatum, type Rebondissement,
} from '@/lib/content/univers3-marketing-m2'
import type { EtatPartie } from './etatPartie'

// Continuité narrative : ce que les épreuves suivantes reprennent des décisions RÉELLEMENT
// prises par l'équipe (ses réponses saisies). Aucune décision n'est jamais déduite ni inventée.

export const createurTire = (e: EtatPartie) => profilsCreateurs.find(p => p.id === e.variantes.createur)
export const criseTiree = (e: EtatPartie) => variantesCrise.find(v => v.id === e.variantes.crise)

export function decisionPartenariat(e: EtatPartie): ContexteUltimatum['decisionPartenariat'] {
  const d = e.reponses[2]?.createur
  return d === 'accepter' || d === 'refuser' || d === 'negocier' ? d : undefined
}

export function contexteUltimatum(e: EtatPartie): ContexteUltimatum {
  const createur = createurTire(e)
  const crise = criseTiree(e)
  return {
    createur: createur?.nom.replace(/\s*\(.*\)$/, ''),
    decisionPartenariat: decisionPartenariat(e),
    modeleCrise: crise ? dossierClient.collection.find(m => m.id === crise.modeleConcerne)?.nom : undefined,
    marqueCrise: crise?.marqueFictive,
  }
}

/** Texte d'un rebondissement ; R4 dépend de la variante de crise tirée. */
export function texteRebondissement(r: Rebondissement, e: EtatPartie): string {
  return r.id === 'R4' ? criseTiree(e)?.nouvelleInformation ?? '' : r.texte
}
