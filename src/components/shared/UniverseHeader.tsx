import type { Group } from '@/types'
import { getUniverseLabel, getUniverseTheme } from '@/lib/groups'

interface Props {
  group: Group
  missionTitle?: string
  missionNumber?: number
}

export default function UniverseHeader({ group, missionTitle, missionNumber }: Props) {
  const theme = getUniverseTheme(group.universe)
  return (
    <header className="px-4 pt-safe-top pb-4">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-semibold uppercase tracking-widest ${theme.accent}`}>
          {getUniverseLabel(group.universe)}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${theme.badge}`}>
          {group.name}
        </span>
      </div>
      {missionTitle && (
        <div>
          <p className="text-white/50 text-xs mb-0.5">
            {missionNumber ? `Mission ${missionNumber}` : 'Mission active'}
          </p>
          <h1 className="text-xl font-bold text-white leading-tight">{missionTitle}</h1>
        </div>
      )}
    </header>
  )
}
