'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface Props {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelectorGrid({ missions, activeMission, selectedMission, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {missions.map(mission => {
        const isUnlocked = mission.number <= activeMission
        const isSelected = mission.number === selectedMission
        const isCompleted = mission.number < activeMission

        return (
          <button
            key={mission.number}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelect(mission.number)}
            className="rounded-2xl p-4 text-left transition-all aspect-square flex flex-col justify-between"
            style={{
              background: isSelected ? 'rgba(201,168,76,0.14)' : isUnlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
              border: `1px solid ${isSelected ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)'}`,
              opacity: isUnlocked ? 1 : 0.35,
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg" style={{ color: isSelected ? '#f5c842' : 'rgba(255,255,255,0.5)' }}>0{mission.number}</span>
              {isCompleted && <span style={{ color: '#86efac' }}>✓</span>}
              {!isUnlocked && <span style={{ color: 'rgba(255,255,255,0.25)' }}>🔒</span>}
            </div>
            <div>
              <p className="text-sm font-bold leading-tight" style={{ color: isUnlocked ? 'white' : 'rgba(255,255,255,0.3)' }}>{mission.title}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
