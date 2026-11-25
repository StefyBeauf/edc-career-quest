'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Pilotage de la M2 par l'intervenante (phase 2, minutes ajoutées, repère de session)
// + correction de l'horloge locale à partir de l'heure serveur.
// La route /api/mission/pilotage est en lecture seule : aucun contenu d'équipe n'est envoyé.

export interface PilotageM2 {
  missionActive: number
  phase2Ouverte: boolean
  minutesBonus: number
  session: string | null
  heureServeur: number
}

export type StatutPilotage = 'chargement' | 'ok' | 'indisponible'

// Écart (ms) entre l'heure serveur et l'horloge de l'appareil, partagé par tous les composants.
// Tant que le serveur n'a pas répondu, on se fie à l'horloge locale (écart 0).
let ecartHorlogeMs = 0

/** Heure « corrigée » : horloge locale + écart mesuré avec le serveur. À utiliser partout dans la M2. */
export function maintenant(): number {
  return Date.now() + ecartHorlogeMs
}

export function usePilotage(slug: string, intervalleMs?: number) {
  const [pilotage, setPilotage] = useState<PilotageM2 | null>(null)
  const [statut, setStatut] = useState<StatutPilotage>('chargement')
  const enCours = useRef(false)

  const rafraichir = useCallback(async () => {
    if (enCours.current) return
    enCours.current = true
    try {
      const t0 = Date.now()
      const res = await fetch(`/api/mission/pilotage?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
      const t1 = Date.now()
      if (!res.ok) throw new Error(String(res.status))
      const p = await res.json() as PilotageM2
      // L'heure serveur correspond environ au milieu de l'aller-retour réseau.
      ecartHorlogeMs = p.heureServeur - Math.round((t0 + t1) / 2)
      setPilotage(p)
      setStatut('ok')
    } catch {
      // Réseau coupé ou serveur indisponible : la partie continue avec l'horloge locale.
      setStatut(s => (s === 'ok' ? 'ok' : 'indisponible'))
    } finally {
      enCours.current = false
    }
  }, [slug])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture réseau au montage
    void rafraichir()
    if (!intervalleMs) return
    const t = setInterval(() => void rafraichir(), intervalleMs)
    return () => clearInterval(t)
  }, [rafraichir, intervalleMs])

  return { pilotage, statut, rafraichir }
}
