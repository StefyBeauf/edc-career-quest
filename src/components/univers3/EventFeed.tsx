'use client'

import type { SimulationEvent, EventType } from '@/types'

interface Props {
  events: SimulationEvent[]
}

const eventConfig: Record<EventType, { icon: string; label: string; color: string; bg: string }> = {
  incident: { icon: '⚡', label: 'Incident', color: 'text-orange-300', bg: 'bg-orange-950/60 border-orange-700/40' },
  urgence: { icon: '🚨', label: 'Urgence', color: 'text-red-300', bg: 'bg-red-950/60 border-red-700/40' },
  opportunité: { icon: '✨', label: 'Opportunité', color: 'text-emerald-300', bg: 'bg-emerald-950/60 border-emerald-700/40' },
  info: { icon: 'ℹ️', label: 'Information', color: 'text-blue-300', bg: 'bg-blue-950/60 border-blue-700/40' },
}

function formatTime(isoString: string) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function EventFeed({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-violet-500 text-sm">
        Aucun événement injecté pour le moment…
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {[...events].reverse().map((event, index) => {
        const config = eventConfig[event.type]
        const isNew = index === 0
        return (
          <div
            key={event.id}
            className={`border rounded-xl p-4 transition-all duration-500 ${config.bg} ${isNew ? 'ring-1 ring-fuchsia-500/50' : ''}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>{config.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                  {config.label}
                </span>
                {isNew && (
                  <span className="text-xs bg-fuchsia-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                    Nouveau
                  </span>
                )}
              </div>
              <span className="text-white/40 text-xs">{formatTime(event.injected_at)}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{event.content}</p>
          </div>
        )
      })}
    </div>
  )
}
