'use client'

import type { SimulationEvent, EventType } from '@/types'

interface Props {
  events: SimulationEvent[]
}

const eventConfig: Record<EventType, {
  icon: string
  label: string
  color: string
  bg: string
  border: string
  glow: string
  pulse: boolean
}> = {
  urgence: {
    icon: '⚠',
    label: 'URGENCE',
    color: '#ff6b6b',
    bg: 'rgba(180, 20, 20, 0.25)',
    border: 'rgba(220, 38, 38, 0.6)',
    glow: 'rgba(220, 38, 38, 0.3)',
    pulse: true,
  },
  incident: {
    icon: '◉',
    label: 'INCIDENT',
    color: '#fb923c',
    bg: 'rgba(120, 50, 10, 0.25)',
    border: 'rgba(234, 88, 12, 0.5)',
    glow: 'rgba(234, 88, 12, 0.2)',
    pulse: false,
  },
  opportunité: {
    icon: '◈',
    label: 'OPPORTUNITÉ',
    color: '#4ade80',
    bg: 'rgba(10, 60, 30, 0.25)',
    border: 'rgba(22, 163, 74, 0.5)',
    glow: 'rgba(22, 163, 74, 0.2)',
    pulse: false,
  },
  info: {
    icon: '◆',
    label: 'INFORMATION',
    color: '#60a5fa',
    bg: 'rgba(10, 30, 80, 0.25)',
    border: 'rgba(37, 99, 235, 0.5)',
    glow: 'rgba(37, 99, 235, 0.15)',
    pulse: false,
  },
}

function formatTime(isoString: string) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function EventFeed({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center space-y-3">
        <div
          className="text-2xl animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          ◎
        </div>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'rgba(232, 240, 255, 0.3)', fontFamily: 'monospace' }}
        >
          AUCUNE ALERTE ACTIVE
        </p>
        <p
          className="text-xs"
          style={{ color: 'rgba(232, 240, 255, 0.2)', fontFamily: 'monospace' }}
        >
          Le radar surveille...
        </p>
      </div>
    )
  }

  const reversed = [...events].reverse()

  return (
    <div className="space-y-3">
      {/* Indicateur radar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-sm"
        style={{
          background: 'rgba(5, 10, 26, 0.8)',
          border: '1px solid rgba(100, 160, 255, 0.2)',
        }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animationDuration: '1.5s' }}
        />
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'rgba(232, 240, 255, 0.5)', fontFamily: 'monospace' }}
        >
          FIL D'ALERTES MISSION — {events.length} événement{events.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Timeline verticale */}
      <div className="relative">
        {/* Ligne de progression */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, rgba(100,160,255,0.6) 0%, rgba(100,160,255,0.1) 100%)' }}
        />

        <div className="space-y-3 pl-10">
          {reversed.map((event, index) => {
            const config = eventConfig[event.type]
            const isNew = index === 0

            return (
              <div key={event.id} className="relative">
                {/* Point sur la timeline */}
                <div
                  className={`absolute -left-10 top-4 w-3 h-3 rounded-full ${isNew && config.pulse ? 'animate-ping' : ''}`}
                  style={{
                    background: config.color,
                    boxShadow: `0 0 8px ${config.glow}`,
                    marginLeft: '-5px',
                  }}
                />
                {isNew && config.pulse && (
                  <div
                    className="absolute -left-10 top-4 w-3 h-3 rounded-full"
                    style={{
                      background: config.color,
                      boxShadow: `0 0 8px ${config.glow}`,
                      marginLeft: '-5px',
                    }}
                  />
                )}

                <div
                  className="rounded-sm p-4 transition-all duration-500"
                  style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    boxShadow: isNew ? `0 0 20px ${config.glow}` : 'none',
                    animation: isNew ? 'slideInAlert 0.4s ease-out' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={isNew && config.pulse ? 'animate-pulse' : ''}
                        style={{
                          color: config.color,
                          fontFamily: 'monospace',
                          fontSize: '16px',
                          animationDuration: '0.8s',
                        }}
                      >
                        {config.icon}
                      </span>
                      <span
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: config.color, fontFamily: 'monospace' }}
                      >
                        {config.label}
                      </span>
                      {isNew && (
                        <span
                          className="text-xs font-bold uppercase px-2 py-0.5 animate-pulse"
                          style={{
                            background: config.border,
                            color: '#fff',
                            fontFamily: 'monospace',
                            borderRadius: '2px',
                            animationDuration: '1s',
                          }}
                        >
                          NOUVEAU
                        </span>
                      )}
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: 'rgba(232, 240, 255, 0.3)', fontFamily: 'monospace' }}
                    >
                      {formatTime(event.injected_at)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(232, 240, 255, 0.85)' }}>
                    {event.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideInAlert {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
