'use client'

import { useEffect, useState } from 'react'
import { DUREES_EPREUVES_MIN } from '@/lib/content/univers3-marketing-m2'
import type { EtatPartie } from './etatPartie'
import { maintenant } from './usePilotage'

// ─── Chronomètre de la M2 (CLAUDE.md, section 3.2) ──────────────────────────
// Le temps restant n'est JAMAIS décompté : il est recalculé à chaque affichage à partir
//   début de l'épreuve (horodatage mémorisé) + durée + minutes ajoutées − heure corrigée.
// Le setInterval ci-dessous sert seulement à rafraîchir l'affichage. Un onglet en arrière-plan
// (navigateur qui ralentit les minuteries), un rechargement ou une mise en veille ne faussent
// donc rien : au retour, le calcul repart des horodatages.

/** Minutes ajoutées par l'intervenante PENDANT l'épreuve n (celles d'avant son début ne comptent pas). */
export function minutesAjoutees(e: EtatPartie, n: number, bonusCourant: number): number {
  return Math.max(0, bonusCourant - (e.bonusAuDebut[n] ?? bonusCourant))
}

export function tempsRestantMs(e: EtatPartie, n: number, bonusCourant: number, t: number): number {
  const duree = DUREES_EPREUVES_MIN[n] ?? 0
  const debut = e.debutsEpreuves[n]
  if (debut === undefined) return duree * 60_000
  return debut + (duree + minutesAjoutees(e, n, bonusCourant)) * 60_000 - t
}

export function formaterTemps(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** Heure corrigée, rafraîchie chaque seconde tant que `actif`, et immédiatement au retour sur l'onglet. */
export function useMaintenant(actif: boolean): number {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (!actif) return
    const maj = () => setT(maintenant())
    maj()
    const intervalle = setInterval(maj, 1000)
    const surVisibilite = () => { if (document.visibilityState === 'visible') maj() }
    document.addEventListener('visibilitychange', surVisibilite)
    window.addEventListener('focus', maj)
    return () => {
      clearInterval(intervalle)
      document.removeEventListener('visibilitychange', surVisibilite)
      window.removeEventListener('focus', maj)
    }
  }, [actif])
  return t
}
