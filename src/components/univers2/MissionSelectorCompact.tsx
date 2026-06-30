'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface Props {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelectorCompact({ missions, activeMission, selectedMission, onSelect }: Props) {
  return (
    <div className="space-y-1.5">
      {missions.map(mission => {
        const isUnlocked = mission.number <= activeMission
        const isSelected = mission.number === selectedMission
        const isCompleted = mission.number < activeMission

        return (
          <button
            key={mission.number}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelect(mission.number)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all"
            style={{
              background: isSelected ? 'rgba(201,168,76,0.12)' : 'transparent',
              opacity: isUnlocked ? 1 : 0.3,
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono" style={{ color: isSelected ? '#f5c842' : 'rgba(255,255,255,0.4)' }}>
                {String(mission.number).padStart(2, '0')}
              </span>
              <span className="text-sm font-bold" style={{ color: isSelected ? 'white' : 'rgba(255,255,255,0.6)' }}>{mission.title}</span>
            </div>
            {isCompleted && <span className="text-xs" style={{ color: '#86efac' }}>✓</span>}
            {!isUnlocked && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>🔒</span>}
          </button>
        )
      })}
    </div>
  )
}
