'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Simulation, SimulationScenario, SimulationEvent, EventType } from '@/types'
import ScenarioDisplay from './ScenarioDisplay'
import EventFeed from './EventFeed'
import SimulationFeedbackZone from './SimulationFeedbackZone'

interface Props {
  simulation: Simulation
  scenario: SimulationScenario
}

const EVENT_TYPES: EventType[] = ['incident', 'urgence', 'opportunité', 'info']
const MISSION_DURATION_MINUTES = 120

function useElapsedSeconds(startedAt: string) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = new Date(startedAt).getTime()
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startedAt])
  return elapsed
}

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

type Tab = 'scenario' | 'events' | 'feedback'

const tabConfig: { key: Tab; label: string; code: string }[] = [
  { key: 'scenario', label: 'BRIEFING', code: 'CH-01' },
  { key: 'events', label: 'ALERTES', code: 'CH-02' },
  { key: 'feedback', label: 'DÉBRIEF', code: 'CH-03' },
]

export default function SimulationRunner({ simulation, scenario }: Props) {
  const router = useRouter()
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [tab, setTab] = useState<Tab>('scenario')
  const [ending, setEnding] = useState(false)
  const [newEventAlert, setNewEventAlert] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const elapsedSeconds = useElapsedSeconds(simulation.started_at)

  const totalMissionSeconds = MISSION_DURATION_MINUTES * 60
  const progressPercent = Math.min((elapsedSeconds / totalMissionSeconds) * 100, 100)
  const remainingSeconds = Math.max(totalMissionSeconds - elapsedSeconds, 0)

  useEffect(() => {
    function scheduleNext() {
      const delay = 600000 + Math.random() * 300000
      intervalRef.current = setTimeout(async () => {
        const eventType = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
        const res = await fetch('/api/simulation/event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            simulationId: simulation.id,
            eventType,
            elapsedMinutes: Math.floor(elapsedSeconds / 60),
          }),
        })
        if (res.ok) {
          const data = await res.json() as { event_id: string; content: string; type: EventType }
          const newEvent: SimulationEvent = {
            id: data.event_id,
            simulation_id: simulation.id,
            type: data.type,
            content: data.content,
            injected_at: new Date().toISOString(),
          }
          setEvents(prev => [...prev, newEvent])
          setNewEventAlert(true)
          setTimeout(() => setNewEventAlert(false), 5000)
        }
        scheduleNext()
      }, delay)
    }

    scheduleNext()
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [simulation.id, simulation.started_at, elapsedSeconds])

  async function handleEnd() {
    setEnding(true)
    await fetch('/api/simulation/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ simulationId: simulation.id }),
    })
    router.refresh()
  }

  return (
    <div
      className="max-w-lg mx-auto space-y-4"
      style={{ position: 'relative' }}
    >
      {/* Étoiles en mouvement très lent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
        {[
          { top: '10%', left: '5%', duration: '30s', delay: '0s' },
          { top: '20%', left: '90%', duration: '45s', delay: '5s' },
          { top: '50%', left: '2%', duration: '60s', delay: '10s' },
          { top: '70%', left: '95%', duration: '40s', delay: '3s' },
          { top: '85%', left: '40%', duration: '55s', delay: '8s' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              opacity: 0.4,
              animation: `starDrift ${star.duration} linear infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Barre de progression de mission */}
        <div
          className="rounded-sm overflow-hidden p-4 space-y-3"
          style={{
            background: 'rgba(5, 10, 26, 0.9)',
            border: '1px solid rgba(100, 160, 255, 0.3)',
            boxShadow: '0 0 20px rgba(100, 160, 255, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
              >
                TEMPS ÉCOULÉ
              </p>
              <p
                className="font-black text-3xl"
                style={{
                  color: '#e8f0ff',
                  fontFamily: 'monospace',
                  textShadow: '0 0 15px rgba(200, 220, 255, 0.4)',
                }}
              >
                {formatCountdown(elapsedSeconds)}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
              >
                RESTANT
              </p>
              <p
                className="font-bold text-lg"
                style={{
                  color: remainingSeconds < 1800 ? '#f87171' : '#c9a84c',
                  fontFamily: 'monospace',
                }}
              >
                {formatCountdown(remainingSeconds)}
              </p>
            </div>
          </div>

          {/* Barre de progression */}
          <div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: '4px', background: 'rgba(100, 160, 255, 0.1)' }}
            >
              <div
                className="h-full transition-all duration-1000"
                style={{
                  width: `${progressPercent}%`,
                  background: progressPercent > 80
                    ? 'linear-gradient(90deg, #c9a84c, #f87171)'
                    : 'linear-gradient(90deg, #1d4ed8, #60a5fa)',
                  boxShadow: '0 0 8px rgba(100, 160, 255, 0.6)',
                }}
              />
            </div>
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: 'rgba(232, 240, 255, 0.25)', fontFamily: 'monospace' }}
            >
              <span>DÉPART</span>
              <span>{Math.round(progressPercent)}%</span>
              <span>120 MIN</span>
            </div>
          </div>
        </div>

        {/* Alerte nouvel événement */}
        {newEventAlert && (
          <div
            className="rounded-sm px-4 py-3 text-sm font-bold flex items-center gap-3 animate-pulse"
            style={{
              background: 'rgba(180, 20, 20, 0.3)',
              border: '1px solid rgba(220, 38, 38, 0.6)',
              color: '#fca5a5',
              fontFamily: 'monospace',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
              animationDuration: '0.8s',
            }}
          >
            <span>⚠</span>
            <span className="uppercase tracking-widest text-xs">ALERTE — Nouvel événement injecté dans la simulation</span>
          </div>
        )}

        {/* Onglets — canaux de communication */}
        <div
          className="flex gap-1 rounded-sm p-1"
          style={{
            background: 'rgba(5, 10, 26, 0.9)',
            border: '1px solid rgba(100, 160, 255, 0.2)',
          }}
        >
          {tabConfig.map(t => {
            const isActive = tab === t.key
            const hasCount = t.key === 'events' && events.length > 0
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex-1 py-2.5 px-2 transition-all duration-200 text-xs font-black uppercase tracking-wider"
                style={{
                  background: isActive ? 'rgba(100, 160, 255, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(100, 160, 255, 0.4)' : '1px solid transparent',
                  color: isActive ? '#e8f0ff' : 'rgba(232, 240, 255, 0.35)',
                  fontFamily: 'monospace',
                  borderRadius: '2px',
                }}
              >
                <span
                  className="block text-xs mb-0.5"
                  style={{
                    color: isActive ? '#c9a84c' : 'rgba(201, 168, 76, 0.3)',
                    fontSize: '9px',
                    fontFamily: 'monospace',
                  }}
                >
                  {t.code}
                </span>
                {t.label}
                {hasCount && (
                  <span
                    className="ml-1 px-1.5 py-0.5 rounded-sm text-xs"
                    style={{
                      background: 'rgba(220, 38, 38, 0.7)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '9px',
                    }}
                  >
                    {events.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Contenu de l'onglet actif */}
        <div>
          {tab === 'scenario' && <ScenarioDisplay scenario={scenario} />}
          {tab === 'events' && <EventFeed events={events} />}
          {tab === 'feedback' && (
            <SimulationFeedbackZone
              simulationId={simulation.id}
              deliverables={scenario.deliverables}
            />
          )}
        </div>

        {/* Bouton terminer la mission */}
        <div className="pt-2 pb-8">
          <button
            onClick={handleEnd}
            disabled={ending}
            className="w-full font-bold uppercase tracking-widest py-3 px-6 transition-all duration-200 text-sm active:scale-95 disabled:opacity-40"
            style={{
              background: 'rgba(5, 10, 26, 0.8)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: 'rgba(248, 113, 113, 0.7)',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
          >
            {ending ? 'FERMETURE DE LA MISSION...' : 'TERMINER LA MISSION'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes starDrift {
          0% { transform: translateY(0px); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-20px); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
