'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  clePartie, ecrirePartie, lirePartieCourante, nouvellePartie, purgerParties, relirePartie, type EtatPartie,
} from './etatPartie'

/**
 * État de partie de la M2, persisté dans localStorage (voir etatPartie.ts).
 * @param pret     vrai une fois le pilotage lu (ou déclaré injoignable) : la purge peut alors s'appliquer.
 * @param session  repère de session du groupe ; `undefined` si le pilotage est injoignable.
 */
export function usePartie(slug: string, pret: boolean, session: string | null | undefined) {
  const [etat, setEtat] = useState<EtatPartie | null>(null)
  const [charge, setCharge] = useState(false)
  const [reprise, setReprise] = useState(false)
  // Vrai si une partie de l'ancienne version (6 épreuves) a été effacée au chargement.
  const [misAJour, setMisAJour] = useState(false)
  const dernierEtat = useRef<EtatPartie | null>(null)

  /* eslint-disable react-hooks/set-state-in-effect -- lecture unique de localStorage au montage, nécessaire pour éviter un écart de rendu serveur/client */
  useEffect(() => {
    if (!pret || charge) return
    setMisAJour(purgerParties(slug, session))
    const e = lirePartieCourante(slug)
    setEtat(e)
    setReprise(e !== null)
    setCharge(true)
  }, [pret, charge, slug, session])

  // Partie créée pendant une panne du pilotage : on adopte le repère dès qu'il est connu.
  useEffect(() => {
    if (etat?.sessionInconnue && session !== undefined) {
      setEtat({ ...etat, session, sessionInconnue: false })
    }
  }, [etat, session])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Écriture différée (~300 ms) à chaque changement.
  useEffect(() => {
    dernierEtat.current = etat
    if (!etat) return
    const t = setTimeout(() => ecrirePartie(slug, etat), 300)
    return () => clearTimeout(t)
  }, [etat, slug])

  // Même partie ouverte dans deux onglets du même navigateur : chaque onglet adopte l'état
  // enregistré par l'autre (l'événement « storage » ne se déclenche que si la valeur a changé,
  // donc pas de va-et-vient). appliquerAnalyse() reste idempotente : jamais de double comptage.
  const partieId = etat?.partieId
  useEffect(() => {
    if (!partieId) return
    const cle = clePartie(slug, partieId)
    const surStockage = (ev: StorageEvent) => {
      if (ev.key !== cle || !ev.newValue) return
      const e = relirePartie(slug, partieId)
      if (e) setEtat(e)
    }
    window.addEventListener('storage', surStockage)
    return () => window.removeEventListener('storage', surStockage)
  }, [slug, partieId])

  // Écriture immédiate si l'onglet est masqué ou fermé (le délai de 300 ms n'aurait pas expiré).
  useEffect(() => {
    const sauver = () => { if (dernierEtat.current) ecrirePartie(slug, dernierEtat.current) }
    const surVisibilite = () => { if (document.visibilityState === 'hidden') sauver() }
    window.addEventListener('pagehide', sauver)
    document.addEventListener('visibilitychange', surVisibilite)
    return () => {
      window.removeEventListener('pagehide', sauver)
      document.removeEventListener('visibilitychange', surVisibilite)
    }
  }, [slug])

  const demarrer = useCallback((agence: string, minutesBonus: number) => {
    const e = nouvellePartie(agence, session, minutesBonus)
    ecrirePartie(slug, e)
    setEtat(e)
    setReprise(false)
  }, [slug, session])

  const mettreAJour = useCallback((f: (e: EtatPartie) => EtatPartie) => {
    setEtat(e => (e ? f(e) : e))
  }, [])

  // Sauvegarde immédiate (perte de focus d'un champ, avant un appel réseau…).
  const sauverMaintenant = useCallback(() => {
    if (dernierEtat.current) ecrirePartie(slug, dernierEtat.current)
  }, [slug])

  return { etat, charge, reprise, misAJour, demarrer, mettreAJour, sauverMaintenant }
}
