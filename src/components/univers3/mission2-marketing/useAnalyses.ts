'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { demanderAnalyse } from './analyseClient'
import {
  appliquerAnalyse, compterTentative, marquerAnalyseEnAttente, MAX_TENTATIVES_ANALYSE, peutLancerAnalyse, type EtatPartie,
} from './etatPartie'

// Pilote les analyses IA de la partie.
// - Lancement automatique dès qu'une épreuve est soumise (une seule fois).
// - Un appel par épreuve à la fois (verrou en mémoire) : un double clic ne lance rien de plus.
// - Chaque lancement est compté dans l'état de partie AVANT l'appel : un rechargement pendant
//   l'analyse relance une fois, dans la limite de MAX_TENTATIVES_ANALYSE.
// - Le résultat passe par appliquerAnalyse(), qui ignore toute épreuve déjà scorée.
export function useAnalyses(etat: EtatPartie, mettreAJour: (f: (e: EtatPartie) => EtatPartie) => void) {
  const dernierEtat = useRef(etat)
  const verrou = useRef(new Set<number>())
  // Épreuves dont un résultat (succès ou échec) est déjà arrivé : le lancement AUTOMATIQUE ne les
  // reprend pas, même si l'écran n'a pas encore enregistré ce résultat (échec très rapide).
  const resultatRecu = useRef(new Set<number>())
  const [enCours, setEnCours] = useState<number[]>([])

  useEffect(() => { dernierEtat.current = etat }, [etat])

  const lancer = useCallback(async (n: number, manuel: boolean) => {
    const e = dernierEtat.current
    if (verrou.current.has(n) || (!manuel && resultatRecu.current.has(n)) || !peutLancerAnalyse(e, n)) return
    verrou.current.add(n)
    setEnCours([...verrou.current])
    mettreAJour(x => compterTentative(x, n))
    const resultat = await demanderAnalyse(e, n)
    resultatRecu.current.add(n)
    mettreAJour(x => (resultat ? appliquerAnalyse(x, n, resultat) : marquerAnalyseEnAttente(x, n)))
    verrou.current.delete(n)
    setEnCours([...verrou.current])
  }, [mettreAJour])

  // Lancement automatique des épreuves soumises sans analyse (première fois, ou analyse
  // interrompue par un rechargement). Une épreuve marquée « en attente » attend une relance manuelle.
  useEffect(() => {
    for (const cle of Object.keys(etat.soumisLe)) {
      const n = Number(cle)
      if (etat.analyses[n] !== undefined || verrou.current.has(n) || resultatRecu.current.has(n)) continue
      if ((etat.tentativesAnalyse?.[n] ?? 0) >= MAX_TENTATIVES_ANALYSE) mettreAJour(x => marquerAnalyseEnAttente(x, n))
      else void lancer(n, false)
    }
  }, [etat.soumisLe, etat.analyses, etat.tentativesAnalyse, lancer, mettreAJour])

  const relancer = useCallback((n: number) => lancer(n, true), [lancer])

  return { enCours, relancer }
}
