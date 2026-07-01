'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface MissionSelectorProps {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelector({
  missions,
  activeMission,
  selectedMission,
  onSelect,
}: MissionSelectorProps) {
  const selected = missions.find(m => m.number === selectedMission)

  return (
    <div className="space-y-4">
      {/* Grille de numéros de mission */}
      <div className="grid grid-cols-3 gap-2">
        {missions.map(mission => {
          const isUnlocked = mission.number <= activeMission
          const isSelected = mission.number === selectedMission
          const isCompleted = mission.number < activeMission

          return (
            <button
              key={mission.number}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelect(mission.number)}
              className="relative flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all"
              style={{
                background: isSelected
                  ? 'rgba(201,168,76,0.18)'
                  : isUnlocked
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? '1.5px solid rgba(201,168,76,0.55)'
                  : isCompleted
                  ? '1px solid rgba(201,168,76,0.25)'
                  : isUnlocked
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(255,255,255,0.04)',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                opacity: isUnlocked ? 1 : 0.35,
              }}
            >
              {/* Icône état */}
              <span className="text-base mb-1">
                {isSelected ? '★' : isCompleted ? '✓' : !isUnlocked ? '🔒' : String(mission.number)}
              </span>
              {/* Étiquette courte */}
              <span
                className="text-center leading-tight"
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: isSelected
                    ? '#f5c842'
                    : isCompleted
                    ? 'rgba(201,168,76,0.65)'
                    : isUnlocked
                    ? 'rgba(255,255,255,0.45)'
                    : 'rgba(255,255,255,0.2)',
                  wordBreak: 'break-word',
                }}
              >
                {mission.shortLabel ?? `Étape ${mission.number}`}
              </span>
            </button>
          )
        })}
      </div>

      {/* Détail de la mission sélectionnée */}
      {selected && (
        <div
          className="rounded-xl p-4 space-y-1"
          style={{
            background: 'rgba(201,168,76,0.07)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderLeft: '3px solid rgba(201,168,76,0.6)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              Étape {selected.number}
              {selected.number < activeMission && (
                <span
                  className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(26,74,58,0.6)', color: 'rgba(201,168,76,0.8)' }}
                >
                  Complétée
                </span>
              )}
            </span>
          </div>
          <p className="font-black text-white text-sm">{selected.title}</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {selected.description}
          </p>
        </div>
      )}
    </div>
  )
}
