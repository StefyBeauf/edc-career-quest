'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface GroupControlsProps {
  slug: string
  locked: boolean
  activeMission: number
}

export default function GroupControls({ slug, locked, activeMission }: GroupControlsProps) {
  const router = useRouter()
  const [isLocked, setIsLocked] = useState(locked)
  const [currentMission, setCurrentMission] = useState(activeMission)
  const [loading, setLoading] = useState<string | null>(null)

  async function callApi(endpoint: string, label: string) {
    setLoading(label)
    try {
      const res = await fetch(`/api/admin/groups/${slug}/${endpoint}`, { method: 'POST' })
      const data = await res.json() as { success?: boolean; locked?: boolean; active_mission?: number; error?: string }

      if (!data.success) {
        alert(data.error ?? 'Erreur')
        return
      }

      if (data.locked !== undefined) setIsLocked(data.locked)
      if (data.active_mission !== undefined) setCurrentMission(data.active_mission)

      router.refresh()
    } catch {
      alert('Erreur réseau. Veuillez réessayer.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <h2 className="font-semibold text-white text-sm uppercase tracking-wider text-gray-400">
        Contrôles
      </h2>

      <div className="space-y-2">
        <p className="text-xs text-gray-500">Navigation des missions</p>
        <div className="flex gap-2">
          <button
            onClick={() => callApi('prev-mission', 'prev')}
            disabled={loading !== null || currentMission <= 1}
            className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
          >
            {loading === 'prev' ? '...' : 'Mission précédente'}
          </button>
          <button
            onClick={() => callApi('next-mission', 'next')}
            disabled={loading !== null}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
          >
            {loading === 'next' ? '...' : 'Mission suivante'}
          </button>
        </div>
        <p className="text-center text-xs text-gray-500">
          Mission active : <span className="text-indigo-400 font-semibold">#{currentMission}</span>
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500">Accès du groupe</p>
        <button
          onClick={() => callApi('toggle-lock', 'lock')}
          disabled={loading !== null}
          className={`w-full text-sm font-medium rounded-lg py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isLocked
              ? 'bg-green-700 hover:bg-green-600 text-white'
              : 'bg-red-800 hover:bg-red-700 text-white'
          }`}
        >
          {loading === 'lock' ? '...' : isLocked ? 'Déverrouiller le groupe' : 'Verrouiller le groupe'}
        </button>
      </div>

      <div className="pt-2 border-t border-gray-800">
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-sm text-indigo-400 hover:text-indigo-300 py-2 transition-colors"
        >
          Voir la vue étudiant &rarr;
        </a>
      </div>
    </div>
  )
}
