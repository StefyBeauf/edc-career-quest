import type { Group } from '@/types'
import { getUniverseTheme } from '@/lib/groups'

export default function MissionLocked({ group }: { group: Group }) {
  const theme = getUniverseTheme(group.universe)
  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] p-8 text-center`}>
      <div className="text-5xl mb-4">🗝️</div>
      <h2 className="text-xl font-bold text-white mb-2">Mission non disponible</h2>
      <p className="text-white/60 text-sm max-w-xs">
        Cette mission n&apos;a pas encore été débloquée par votre enseignante.
        Revenez lors de la prochaine séance.
      </p>
      <div className={`mt-6 px-4 py-2 rounded-full text-sm font-medium ${theme.badge}`}>
        Mission {group.active_mission} active
      </div>
    </div>
  )
}
