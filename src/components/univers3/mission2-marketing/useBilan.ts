'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { demanderBilan } from './analyseClient'
import {
  appliquerBilan, compterTentativeBilan, epreuvesAnalysees, marquerBilanEnAttente, MAX_TENTATIVES_BILAN, type EtatPartie,
} from './etatPartie'

// Bilan final rédigé par l'IA (1 appel par équipe, relances limitées).
// Lancé automatiquement à l'arrivée sur l'écran de bilan, une fois qu'aucune analyse d'épreuve
// n'est plus en cours. Les épreuves en attente sont signalées à l'IA, qui n'en tire rien.
export function useBilan(
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
    if (verrou.current || (!manuel && resultatRecu.current) || (e.tentativesBilan ?? 0) >= MAX_TENTATIVES_BILAN) return
    verrou.current = true
    setEnCours(true)
    mettreAJour(compterTentativeBilan)
    const base = epreuvesAnalysees(e)
    const bilan = await demanderBilan(e)
    resultatRecu.current = true
    mettreAJour(x => (bilan ? appliquerBilan(x, bilan, base) : marquerBilanEnAttente(x)))
    verrou.current = false
    setEnCours(false)
  }, [mettreAJour])

  // Toutes les analyses d'épreuves ont reçu un résultat (appliqué ou « en attente »).
  const analysesTerminees = analysesEnCours.length === 0
    && Object.keys(etat.soumisLe).every(k => etat.analyses[Number(k)] !== undefined)

  useEffect(() => {
    if (etat.etape === 'bilan' && etat.bilan === undefined && analysesTerminees) void lancer(false)
  }, [etat.etape, etat.bilan, analysesTerminees, lancer])

  const relancer = useCallback(() => lancer(true), [lancer])
  return { enCours, relancer }
}
