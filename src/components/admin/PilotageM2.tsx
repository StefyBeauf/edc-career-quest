'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Pilotage en séance de la Mission 2 B3 Marketing Digital « Marketing Under Pressure ».
// Affiché sur la page d'un groupe Marketing Digital dont la mission active est la M2.
// Chaque action s'applique à toutes les équipes du groupe d'un coup (option A validée).

interface Props {
  slug: string
  phase2Ouverte: boolean
  minutesBonus: number
  /** false tant que la migration 004 n'a pas été exécutée dans Supabase. */
  disponible: boolean
}

export default function PilotageM2({ slug, phase2Ouverte, minutesBonus, disponible }: Props) {
  const router = useRouter()
  const [phase2, setPhase2] = useState(phase2Ouverte)
  const [bonus, setBonus] = useState(minutesBonus)
  const [chargement, setChargement] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function agir(action: string, extra: Record<string, unknown> = {}) {
    setChargement(action)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/groups/${slug}/m2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra }),
      })
      const data = await res.json() as { success?: boolean; phase2Ouverte?: boolean; minutesBonus?: number; error?: string }
      if (!data.success) { setMessage(data.error ?? 'Erreur'); return }
      setPhase2(data.phase2Ouverte === true)
      setBonus(data.minutesBonus ?? 0)
      setMessage(action === 'fermer-mission'
        ? 'Mission fermée : les parties des équipes seront effacées à leur prochain chargement.'
        : 'C’est fait. Les écrans des équipes se mettent à jour en moins de 20 secondes.')
      router.refresh()
    } catch {
      setMessage('Erreur réseau. Veuillez réessayer.')
    } finally {
      setChargement(null)
    }
  }

  const occupe = chargement !== null || !disponible

  return (
    <div className="bg-gray-900 border border-orange-900/60 rounded-xl p-6 space-y-5">
      <div>
        <h2 className="font-semibold text-sm uppercase tracking-wider text-orange-400">Pilotage M2 · Marketing Under Pressure</h2>
        <p className="text-xs text-gray-500 mt-1">S’applique à toutes les équipes du groupe.</p>
      </div>

      {!disponible && (
        <p className="text-xs rounded-lg bg-red-950 border border-red-800 text-red-300 p-3">
          Pilotage indisponible : la migration Supabase 004 n’a pas encore été exécutée.
        </p>
      )}

      <div className="space-y-2">
        <p className="text-xs text-gray-500">Phase 2 (épreuves 4 à 6)</p>
        <p className="text-sm text-white">
          Statut : <span className={phase2 ? 'text-green-400 font-semibold' : 'text-gray-300 font-semibold'}>{phase2 ? 'ouverte' : 'verrouillée'}</span>
        </p>
        {!phase2 ? (
          <button
            onClick={() => agir('ouvrir-phase2')}
            disabled={occupe}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
          >
            {chargement === 'ouvrir-phase2' ? '...' : 'Ouvrir la phase 2'}
          </button>
        ) : (
          <button
            onClick={() => agir('refermer-phase2')}
            disabled={occupe}
            className="w-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 text-xs font-medium rounded-lg py-2 transition-colors"
          >
            {chargement === 'refermer-phase2' ? '...' : 'Refermer la phase 2 (équipes encore en pause uniquement)'}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500">Ajouter du temps à l’épreuve en cours</p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 5].map(m => (
            <button
              key={m}
              onClick={() => agir('ajouter-temps', { minutes: m })}
              disabled={occupe}
              className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
            >
              {chargement === 'ajouter-temps' ? '...' : `+${m} min`}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">Total ajouté depuis le début : <span className="text-white font-semibold">{bonus} min</span></p>
      </div>

      <div className="space-y-2 pt-3 border-t border-gray-800">
        <p className="text-xs text-gray-500">Fin de séance</p>
        <button
          onClick={() => {
            if (window.confirm('Fermer la mission ? Les parties de toutes les équipes de ce groupe seront effacées de leurs navigateurs. Cette action est irréversible.')) {
              void agir('fermer-mission')
            }
          }}
          disabled={occupe}
          className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
        >
          {chargement === 'fermer-mission' ? '...' : 'Fermer la mission et effacer les parties'}
        </button>
      </div>

      {message && <p role="status" className="text-xs text-gray-300">{message}</p>}
    </div>
  )
}
