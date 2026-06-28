'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Group, Mission } from '@/types'

interface Props {
  group: Group
  mission: Mission | null
}

const specializationLabels: Record<string, string> = {
  marketing: 'Marketing Digital',
  negociation: 'Négociation Commerciale',
  finance: 'Finance d\'Entreprise',
}

const specializationIcons: Record<string, string> = {
  marketing: '📣',
  negociation: '🤝',
  finance: '💹',
}

export default function SimulationLauncher({ group, mission }: Props) {
  const router = useRouter()
  const [launching, setLaunching] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const specialization = group.specialization ?? 'marketing'
  const label = specializationLabels[specialization]
  const icon = specializationIcons[specialization]

  async function handleLaunch() {
    setLaunching(true)

    let count = 3
    setCountdown(count)
    await new Promise<void>(resolve => {
      const interval = setInterval(() => {
        count -= 1
        if (count <= 0) {
          clearInterval(interval)
          setCountdown(null)
          resolve()
        } else {
          setCountdown(count)
        }
      }, 1000)
    })

    const res = await fetch('/api/simulation/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupId: group.id,
        missionId: mission?.id ?? '',
        specialization,
        missionNumber: group.active_mission,
      }),
    })

    if (!res.ok) {
      setLaunching(false)
      return
    }

    router.refresh()
  }

  if (countdown !== null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
        <div className="text-8xl font-black text-white animate-pulse">
          {countdown}
        </div>
        <p className="text-violet-200 text-lg tracking-widest uppercase">Décollage imminent…</p>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto pt-6 space-y-6">
      <div className="bg-violet-950/60 border border-violet-700/40 rounded-2xl p-6 shadow-xl shadow-violet-900/40">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <p className="text-violet-300 text-xs uppercase tracking-widest">Spécialité</p>
            <p className="text-white font-bold text-lg">{label}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-fuchsia-400 text-sm">🚀</span>
            <span className="text-white/80 text-sm">
              Mission <strong className="text-white">{group.active_mission}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-fuchsia-400 text-sm">⏱</span>
            <span className="text-white/80 text-sm">Durée estimée : <strong className="text-white">90–120 minutes</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-fuchsia-400 text-sm">🎯</span>
            <span className="text-white/80 text-sm">Simulation professionnelle immersive avec incidents en temps réel</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-fuchsia-400 text-sm">🤖</span>
            <span className="text-white/80 text-sm">Feedback IA personnalisé sur vos livrables</span>
          </div>
        </div>

        {mission && (
          <div className="bg-violet-900/40 border border-violet-600/30 rounded-xl p-4 mb-6">
            <p className="text-violet-200 text-xs uppercase tracking-wider mb-1">Mission</p>
            <p className="text-white font-semibold">{mission.title}</p>
            {mission.description && (
              <p className="text-white/60 text-sm mt-1">{mission.description}</p>
            )}
          </div>
        )}

        <div className="bg-fuchsia-900/30 border border-fuchsia-700/30 rounded-xl p-4 mb-6 text-sm text-fuchsia-100">
          Avant de lancer, assurez-vous d'avoir <strong>90 à 120 minutes disponibles</strong>. Une fois la mission démarrée, des incidents surgiront automatiquement pour tester votre réactivité.
        </div>

        <button
          onClick={handleLaunch}
          disabled={launching}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-violet-900/50 active:scale-95"
        >
          {launching ? 'Préparation…' : 'Lancer la mission 🚀'}
        </button>
      </div>
    </div>
  )
}
