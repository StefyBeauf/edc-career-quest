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
  return (
    <div className="flex flex-col gap-2">
      {missions.map((mission, idx) => {
        const isUnlocked = mission.number <= activeMission
        const isSelected = mission.number === selectedMission
        const isLocked = !isUnlocked

        return (
          <button
            key={mission.number}
            disabled={isLocked}
            onClick={() => isUnlocked && onSelect(mission.number)}
            className={`w-full text-left rounded-xl border px-4 py-3 transition-all flex items-start gap-3 ${
              isSelected
                ? 'bg-emerald-600/30 border-emerald-400/60 text-white'
                : isLocked
                ? 'bg-white/3 border-white/5 text-white/25 cursor-not-allowed'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-emerald-900/30 hover:text-white hover:border-emerald-700/40'
            }`}
          >
            <span className="text-lg mt-0.5 shrink-0">
              {isLocked ? '🔒' : isSelected ? '🧭' : `${idx + 1}`}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate">{mission.title}</span>
              <span className="text-xs opacity-60 line-clamp-1 mt-0.5">{mission.description}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
