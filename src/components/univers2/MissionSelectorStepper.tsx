'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface Props {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelectorStepper({ missions, activeMission, selectedMission, onSelect }: Props) {
  const current = missions.find(m => m.number === selectedMission)

  return (
    <div className="space-y-4">
      {/* Rangée de pastilles horizontales */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {missions.map((mission, idx) => {
          const isUnlocked = mission.number <= activeMission
          const isSelected = mission.number === selectedMission
          const isCompleted = mission.number < activeMission

          return (
            <div key={mission.number} className="flex items-center flex-shrink-0">
              <button
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelect(mission.number)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all"
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #c9a84c, #e8c86a)' : isCompleted ? 'rgba(74,222,128,0.15)' : isUnlocked ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                  color: isSelected ? '#1a2744' : isCompleted ? '#86efac' : isUnlocked ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                  border: `1.5px solid ${isSelected ? 'transparent' : isUnlocked ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                }}
              >
                {isCompleted ? '✓' : isUnlocked ? mission.number : '🔒'}
              </button>
              {idx < missions.length - 1 && (
                <div className="w-5 h-px mx-0.5" style={{ background: mission.number < activeMission ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Carte de la mission sélectionnée */}
      {current && (
        <div className="rounded-2xl p-4" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#f5c842' }}>Mission {current.number}</p>
          <p className="font-bold text-white">{current.title}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{current.description}</p>
        </div>
      )}
    </div>
  )
}
