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

const specializationCodes: Record<string, string> = {
  marketing: 'MKT',
  negociation: 'NEG',
  finance: 'FIN',
}

export default function SimulationLauncher({ group, mission }: Props) {
  const router = useRouter()
  const [launching, setLaunching] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const specialization = group.specialization ?? 'marketing'
  const label = specializationLabels[specialization]
  const code = specializationCodes[specialization]

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
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center"
        style={{ background: 'transparent' }}
      >
        <div
          className="text-xs uppercase tracking-widest mb-4 animate-pulse"
          style={{ color: '#c9a84c', fontFamily: 'monospace', animationDuration: '0.8s' }}
        >
          INITIALISATION EN COURS
        </div>
        <div
          className="font-black"
          style={{
            fontSize: '120px',
            lineHeight: 1,
            color: '#e8f0ff',
            fontFamily: 'monospace',
            textShadow: '0 0 40px rgba(200, 220, 255, 0.8), 0 0 80px rgba(100, 160, 255, 0.5)',
            animation: 'countdownPulse 1s ease-in-out',
          }}
        >
          {countdown}
        </div>
        <p
          className="uppercase tracking-widest text-sm"
          style={{ color: '#c9a84c', fontFamily: 'monospace' }}
        >
          DÉCOLLAGE IMMINENT
        </p>
        <div className="flex gap-2 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: '#e8a020',
                animationDelay: `${i * 150}ms`,
                boxShadow: '0 0 8px #e8a020',
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes countdownPulse {
            0% { transform: scale(1.4); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto pt-4 space-y-4">

      {/* Bandeau CONFIDENTIEL */}
      <div
        className="text-center py-2 text-xs font-black uppercase tracking-widest border"
        style={{
          background: 'rgba(201, 168, 76, 0.1)',
          borderColor: '#c9a84c',
          color: '#c9a84c',
          fontFamily: 'monospace',
          letterSpacing: '0.4em',
        }}
      >
        DOSSIER CONFIDENTIEL — ACCÈS RESTREINT
      </div>

      {/* Carte de mission principale */}
      <div
        className="rounded-sm p-5 space-y-4"
        style={{
          background: 'rgba(10, 22, 40, 0.9)',
          border: '1px solid rgba(100, 160, 255, 0.4)',
          boxShadow: '0 0 30px rgba(100, 160, 255, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* En-tête mission */}
        <div className="flex items-start justify-between">
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.5)', fontFamily: 'monospace' }}
            >
              NUMÉRO DE MISSION
            </div>
            <div
              className="text-2xl font-black"
              style={{ color: '#e8f0ff', fontFamily: 'monospace' }}
            >
              {String(group.active_mission).padStart(3, '0')}
            </div>
          </div>
          <div
            className="text-right px-3 py-2 rounded-sm"
            style={{
              background: 'rgba(201, 168, 76, 0.12)',
              border: '1px solid rgba(201, 168, 76, 0.4)',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{ color: 'rgba(232, 240, 255, 0.5)', fontFamily: 'monospace' }}
            >
              SECTEUR
            </div>
            <div
              className="text-lg font-black"
              style={{ color: '#c9a84c', fontFamily: 'monospace' }}
            >
              {code}
            </div>
          </div>
        </div>

        {/* Ligne séparatrice lumineuse */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(100,160,255,0.5), transparent)' }} />

        {/* Modules HUD */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-sm p-3"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.2)',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
            >
              SPÉCIALITÉ
            </div>
            <div
              className="text-sm font-bold"
              style={{ color: '#e8f0ff' }}
            >
              {label}
            </div>
          </div>
          <div
            className="rounded-sm p-3"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.2)',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
            >
              DURÉE
            </div>
            <div
              className="text-sm font-bold"
              style={{ color: '#e8f0ff', fontFamily: 'monospace' }}
            >
              90–120 min
            </div>
          </div>
          <div
            className="col-span-2 rounded-sm p-3"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.2)',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
            >
              PROTOCOLE
            </div>
            <div className="text-sm" style={{ color: 'rgba(232, 240, 255, 0.75)' }}>
              Simulation professionnelle immersive · Incidents en temps réel · Feedback IA personnalisé
            </div>
          </div>
        </div>

        {/* Titre et description de la mission */}
        {mission && (
          <div
            className="rounded-sm p-4"
            style={{
              background: 'rgba(5, 10, 26, 0.7)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: '#c9a84c', fontFamily: 'monospace' }}
            >
              OBJECTIF DE MISSION
            </div>
            <p
              className="font-bold text-base mb-1"
              style={{ color: '#e8f0ff' }}
            >
              {mission.title}
            </p>
            {mission.description && (
              <p className="text-sm" style={{ color: 'rgba(232, 240, 255, 0.6)' }}>
                {mission.description}
              </p>
            )}
          </div>
        )}

        {/* Avertissement */}
        <div
          className="rounded-sm p-3 text-xs"
          style={{
            background: 'rgba(232, 160, 32, 0.08)',
            border: '1px solid rgba(232, 160, 32, 0.3)',
            color: 'rgba(232, 200, 130, 0.85)',
            fontFamily: 'monospace',
          }}
        >
          ATTENTION : Assurez-vous d'avoir <strong style={{ color: '#e8a020' }}>90 à 120 minutes disponibles</strong> avant d'initialiser. Une fois lancée, la mission génère des alertes automatiques qui testent votre réactivité.
        </div>
      </div>

      {/* Bouton INITIALISER */}
      <button
        onClick={handleLaunch}
        disabled={launching}
        className="w-full font-black uppercase tracking-widest py-5 px-6 transition-all duration-200 active:scale-95 disabled:opacity-40"
        style={{
          background: launching
            ? 'rgba(180, 20, 20, 0.5)'
            : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)',
          border: '2px solid rgba(255, 80, 80, 0.6)',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '16px',
          letterSpacing: '0.2em',
          borderRadius: '2px',
          boxShadow: launching ? 'none' : '0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.2)',
          animation: launching ? 'none' : 'buttonPulse 2s ease-in-out infinite',
        }}
      >
        {launching ? 'INITIALISATION...' : 'INITIALISER LA MISSION'}
      </button>

      <style>{`
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.15); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.7), 0 0 80px rgba(220, 38, 38, 0.3); }
        }
      `}</style>
    </div>
  )
}
