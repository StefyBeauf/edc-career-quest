'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface Props {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelectorWheel({ missions, activeMission, selectedMission, onSelect }: Props) {
  const current = missions.find(m => m.number === selectedMission)
  const radius = 78
  const center = 90

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: '180px', height: '180px' }}>
        {/* Cercle de fond */}
        <div className="absolute rounded-full" style={{ inset: '12px', border: '1px dashed rgba(201,168,76,0.2)' }} />

        {missions.map((mission, idx) => {
          const angle = (idx / missions.length) * 2 * Math.PI - Math.PI / 2
          const x = center + radius * Math.cos(angle)
          const y = center + radius * Math.sin(angle)
          const isUnlocked = mission.number <= activeMission
          const isSelected = mission.number === selectedMission
          const isCompleted = mission.number < activeMission

          return (
            <button
              key={mission.number}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelect(mission.number)}
              className="absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all"
              style={{
                left: `${x - 18}px`,
                top: `${y - 18}px`,
                background: isSelected ? 'linear-gradient(135deg, #c9a84c, #e8c86a)' : isCompleted ? 'rgba(74,222,128,0.15)' : isUnlocked ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                color: isSelected ? '#1a2744' : isCompleted ? '#86efac' : isUnlocked ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                border: `1.5px solid ${isSelected ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
                boxShadow: isSelected ? '0 0 16px rgba(201,168,76,0.5)' : 'none',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
              }}
            >
              {isCompleted ? '✓' : isUnlocked ? mission.number : '🔒'}
            </button>
          )
        })}

        {/* Centre */}
        <div className="absolute flex items-center justify-center" style={{ left: '60px', top: '60px', width: '60px', height: '60px' }}>
          <span className="text-2xl">🎯</span>
        </div>
      </div>

      {current && (
        <div className="rounded-2xl p-4 w-full text-center" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#f5c842' }}>Mission {current.number}</p>
          <p className="font-bold text-white">{current.title}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{current.description}</p>
        </div>
      )}
    </div>
  )
}
