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

function useElapsedMinutes(startedAt: string) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = new Date(startedAt).getTime()
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 60000))
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [startedAt])
  return elapsed
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h${m.toString().padStart(2, '0')}`
  return `${m} min`
}

type Tab = 'scenario' | 'events' | 'feedback'

export default function SimulationRunner({ simulation, scenario }: Props) {
  const router = useRouter()
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [tab, setTab] = useState<Tab>('scenario')
  const [ending, setEnding] = useState(false)
  const [newEventAlert, setNewEventAlert] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const elapsed = useElapsedMinutes(simulation.started_at)

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
            elapsedMinutes: Math.floor((Date.now() - new Date(simulation.started_at).getTime()) / 60000),
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
  }, [simulation.id, simulation.started_at])

  async function handleEnd() {
    setEnding(true)
    await fetch('/api/simulation/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ simulationId: simulation.id }),
    })
    router.refresh()
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'scenario', label: 'Briefing', icon: '📋' },
    { key: 'events', label: `Événements${events.length > 0 ? ` (${events.length})` : ''}`, icon: '⚡' },
    { key: 'feedback', label: 'Feedback IA', icon: '✨' },
  ]

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="bg-violet-950/70 border border-violet-700/40 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-violet-400 text-xs uppercase tracking-wider">Temps écoulé</p>
          <p className="text-white font-mono font-bold text-xl">{formatDuration(elapsed)}</p>
        </div>
        <div className="text-right">
          <p className="text-violet-400 text-xs uppercase tracking-wider">Durée prévue</p>
          <p className="text-white/60 text-sm font-mono">90–120 min</p>
        </div>
      </div>

      {newEventAlert && (
        <div className="bg-fuchsia-900/80 border border-fuchsia-500/60 rounded-xl px-4 py-3 text-fuchsia-100 text-sm font-medium animate-pulse flex items-center gap-2">
          <span>🚨</span>
          Nouvel événement injecté dans la simulation !
        </div>
      )}

      <div className="flex gap-1 bg-violet-950/50 border border-violet-700/30 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key
                ? 'bg-violet-600 text-white shadow'
                : 'text-violet-300 hover:text-white'
            }`}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

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

      <div className="pt-2 pb-8">
        <button
          onClick={handleEnd}
          disabled={ending}
          className="w-full bg-red-900/60 hover:bg-red-800/60 border border-red-700/40 disabled:opacity-40 text-red-200 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm active:scale-95"
        >
          {ending ? 'Fermeture de la mission…' : 'Terminer la mission'}
        </button>
      </div>
    </div>
  )
}
