'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface Props {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelectorTabs({ missions, activeMission, selectedMission, onSelect }: Props) {
  return (
    <div className="flex flex-col" style={{ gap: '-1px' }}>
      {missions.map(mission => {
        const isUnlocked = mission.number <= activeMission
        const isSelected = mission.number === selectedMission
        const isCompleted = mission.number < activeMission

        return (
          <button
            key={mission.number}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelect(mission.number)}
            className="flex items-center gap-3 px-4 py-3 text-left transition-all"
            style={{
              background: isSelected ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.02)',
              borderLeft: `3px solid ${isSelected ? '#c9a84c' : isCompleted ? 'rgba(74,222,128,0.4)' : 'transparent'}`,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              opacity: isUnlocked ? 1 : 0.35,
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
            }}
          >
            <span className="text-base">{isCompleted ? '📁' : isSelected ? '📂' : isUnlocked ? '📄' : '🔒'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: isSelected ? '#f5c842' : 'rgba(255,255,255,0.4)' }}>
                Dossier {mission.number}
              </p>
              <p className="text-sm font-bold truncate" style={{ color: isUnlocked ? 'white' : 'rgba(255,255,255,0.3)' }}>{mission.title}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
