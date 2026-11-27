'use client'

import { useEffect, useState } from 'react'
import { DUREES_EPREUVES_MIN, rebondissementsEpreuve } from '@/lib/content/univers3-marketing-m2'
import { alertesRecues, type EtatPartie } from './etatPartie'
import { maintenant } from './usePilotage'

// ─── Chronomètre de la M2 (CLAUDE.md, section 3.2) ──────────────────────────
// Le temps restant n'est JAMAIS décompté : il est recalculé à chaque affichage à partir
//   début de l'épreuve (horodatage mémorisé) + durée + minutes ajoutées − heure corrigée.
// Le setInterval ci-dessous sert seulement à rafraîchir l'affichage. Un onglet en arrière-plan
// (navigateur qui ralentit les minuteries), un rechargement ou une mise en veille ne faussent
// donc rien : au retour, le calcul repart des horodatages.

// ─── Mode accéléré : TESTS LOCAUX UNIQUEMENT ─────────────────────────────────
// En développement (`npm run dev`), ajouter ?acceleration=20 à l'URL divise toutes les durées
// par 20 (épreuves, rebondissements, alertes). Dans le build de production, NODE_ENV vaut
// 'production' : Next.js remplace la condition par `false`, la lecture de l'URL disparaît du code
// livré et le facteur vaut toujours 1.
export function facteurTemps(): number {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return 1
  const f = Number(new URLSearchParams(window.location.search).get('acceleration'))
  return Number.isFinite(f) && f >= 1 && f <= 120 ? f : 1
}

/** Durée réelle (ms) d'un nombre de minutes de jeu (tient compte du mode accéléré en développement). */
export const minutesMs = (min: number) => (min * 60_000) / facteurTemps()

/** Minutes ajoutées par l'intervenante PENDANT l'épreuve n (celles d'avant son début ne comptent pas). */
export function minutesAjoutees(e: EtatPartie, n: number, bonusCourant: number): number {
  return Math.max(0, bonusCourant - (e.bonusAuDebut[n] ?? bonusCourant))
}

export function tempsRestantMs(e: EtatPartie, n: number, bonusCourant: number, t: number): number {
  const duree = DUREES_EPREUVES_MIN[n] ?? 0
  const debut = e.debutsEpreuves[n]
  if (debut === undefined) return minutesMs(duree)
  return debut + minutesMs(duree + minutesAjoutees(e, n, bonusCourant)) - t
}

// ─── Rebondissements ─────────────────────────────────────────────────────────
// Leur heure est calculée depuis le DÉBUT de l'épreuve (même horodatage que le chronomètre) :
// une prolongation accordée par l'intervenante décale la fin de l'épreuve, pas les rebondissements.
// Une équipe qui revient après l'heure d'un rebondissement le reçoit immédiatement.

/** Rebondissements de l'épreuve n dont l'heure est passée à l'instant t. */
export function rebondissementsDus(e: EtatPartie, n: number, t: number): string[] {
  const debut = e.debutsEpreuves[n]
  if (debut === undefined || t <= 0) return []
  return rebondissementsEpreuve(n).filter(r => t >= debut + minutesMs(r.minute)).map(r => r.id)
}

/** Validation possible seulement quand tous les rebondissements de l'épreuve ont été reçus. */
export function tousRebondissementsRecus(e: EtatPartie, n: number): boolean {
  const recus = alertesRecues(e, n)
  return rebondissementsEpreuve(n).every(r => recus.includes(r.id))
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
