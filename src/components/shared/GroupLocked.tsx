'use client'
import type { Group } from '@/types'
import { getUniverseTheme, getUniverseLabel } from '@/lib/groups'

export default function GroupLocked({ group }: { group: Group }) {
  const theme = getUniverseTheme(group.universe)
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center p-6`}>
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-3">Parcours verrouillé</h1>
        <p className="text-white/70 mb-2">{group.name}</p>
        <p className="text-white/50 text-sm">
          Votre enseignante n&apos;a pas encore déverrouillé ce parcours.
          Merci de patienter.
        </p>
        <div className={`mt-6 px-4 py-2 rounded-full text-sm font-medium ${theme.badge} inline-block`}>
          {getUniverseLabel(group.universe)}
        </div>
      </div>
    </div>
  )
}
