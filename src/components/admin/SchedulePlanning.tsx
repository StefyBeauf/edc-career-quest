'use client'

import { useState, useEffect } from 'react'

interface ScheduleEntry {
  mission_number: number
  scheduled_date: string
}

interface Props {
  slug: string
  totalMissions: number
  activeMission: number
}

function missionLabel(n: number, total: number): string {
  if (n === 1) return `Session 1 — Ouverture`
  if (n === total) return `Session ${n} — Finale`
  return `Session ${n}`
}

export default function SchedulePlanning({ slug, totalMissions, activeMission }: Props) {
  const [dates, setDates] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/groups/${slug}/schedule`)
      .then(r => r.json())
      .then((data: { schedule?: ScheduleEntry[] }) => {
        const map: Record<number, string> = {}
        for (const e of data.schedule ?? []) {
          map[e.mission_number] = e.scheduled_date
        }
        setDates(map)
      })
      .finally(() => setLoading(false))
  }, [slug])

  const setDate = (mission: number, value: string) => {
    setDates(prev => ({ ...prev, [mission]: value }))
    setSaved(false)
  }

  const save = async () => {
    setSaving(true)
    const entries = Array.from({ length: totalMissions }, (_, i) => ({
      mission_number: i + 1,
      scheduled_date: dates[i + 1] ?? null,
    }))
    await fetch(`/api/admin/groups/${slug}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries }),
    })
    setSaving(false)
    setSaved(true)
  }

  const today = new Date().toISOString().split('T')[0]

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <p className="text-sm text-gray-500">Chargement du planning…</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <div>
        <h2 className="font-semibold text-white text-sm uppercase tracking-wider text-gray-400">
          Planning automatique
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          La session s&apos;active automatiquement à 6h le matin de la date choisie.
        </p>
      </div>

      <div className="space-y-2">
        {Array.from({ length: totalMissions }, (_, i) => {
          const n = i + 1
          const date = dates[n] ?? ''
          const isPast = date && date < today
          const isToday = date === today
          const isActive = n === activeMission
          const isDone = n < activeMission

          return (
            <div key={n} className="flex items-center gap-3">
              {/* Indicateur état */}
              <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isDone
                  ? 'bg-green-900 text-green-400'
                  : isActive
                  ? 'bg-indigo-700 text-white'
                  : 'bg-gray-800 text-gray-500'
              }`}>
                {isDone ? '✓' : n}
              </div>

              {/* Label */}
              <span className={`text-sm flex-1 ${isDone ? 'text-gray-500' : isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                {missionLabel(n, totalMissions)}
                {isActive && <span className="ml-2 text-xs text-indigo-400">● active</span>}
              </span>

              {/* Date picker */}
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(n, e.target.value)}
                  className={`text-xs rounded-lg px-3 py-1.5 border outline-none transition-colors ${
                    isToday
                      ? 'bg-indigo-950 border-indigo-700 text-indigo-300'
                      : isPast
                      ? 'bg-gray-800 border-gray-700 text-gray-400'
                      : date
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-500'
                  }`}
                  style={{ colorScheme: 'dark' }}
                />
                {isToday && (
                  <span className="absolute -top-2 right-1 text-xs text-indigo-400 font-bold">aujourd&apos;hui</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={save}
        disabled={saving}
        className={`w-full text-sm font-medium rounded-lg py-2.5 transition-colors ${
          saved
            ? 'bg-green-800 text-green-300'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40'
        }`}
      >
        {saving ? 'Sauvegarde…' : saved ? '✓ Planning sauvegardé' : 'Sauvegarder le planning'}
      </button>
    </div>
  )
}
