'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { demanderVerdict } from './analyseClient'
import {
  appliquerVerdict, compterTentativeVerdict, epreuvesAnalysees, marquerVerdictEnAttente, MAX_TENTATIVES_VERDICT, type EtatPartie,
} from './etatPartie'

// Dernier message de Stéphanie Vador (1 appel par équipe, relances limitées).
// Lancé automatiquement à l'arrivée sur l'écran de verdict, une fois qu'aucune analyse d'épreuve
// n'est plus en cours. Les épreuves en attente sont signalées à l'IA, qui n'en tire rien.
// Le statut du contrat ne dépend pas de cet appel : il est calculé par le code.
export function useVerdict(
  etat: EtatPartie,
  mettreAJour: (f: (e: EtatPartie) => EtatPartie) => void,
  analysesEnCours: number[],
) {
  const dernierEtat = useRef(etat)
  const verrou = useRef(false)
  const resultatRecu = useRef(false)
  const [enCours, setEnCours] = useState(false)

  useEffect(() => { dernierEtat.current = etat }, [etat])

  const lancer = useCallback(async (manuel: boolean) => {
    const e = dernierEtat.current
    if (verrou.current || (!manuel && resultatRecu.current) || (e.tentativesVerdict ?? 0) >= MAX_TENTATIVES_VERDICT) return
    verrou.current = true
    setEnCours(true)
    mettreAJour(compterTentativeVerdict)
    const base = epreuvesAnalysees(e)
    const verdict = await demanderVerdict(e)
    resultatRecu.current = true
    mettreAJour(x => (verdict ? appliquerVerdict(x, verdict, base) : marquerVerdictEnAttente(x)))
    verrou.current = false
    setEnCours(false)
  }, [mettreAJour])

  // Toutes les analyses d'épreuves ont reçu un résultat (appliqué ou « en attente »).
  const analysesTerminees = analysesEnCours.length === 0
    && Object.keys(etat.soumisLe).every(k => etat.analyses[Number(k)] !== undefined)

  useEffect(() => {
    if (etat.etape === 'verdict' && etat.verdict === undefined && analysesTerminees) void lancer(false)
  }, [etat.etape, etat.verdict, analysesTerminees, lancer])

  const relancer = useCallback(() => lancer(true), [lancer])
  return { enCours, relancer }
}
