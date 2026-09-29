'use client'

import type { Group } from '@/types'
import Mission1SeVendre from './Mission1SeVendre'
import Mission2ReunionEfficace from './Mission2ReunionEfficace'
import Mission3ImmersionControle from './Mission3ImmersionControle'
import MissionAVenir from './shared/MissionAVenir'

// Routeur local de la refonte V3.3 (sans IA). Remplace HorizonShell.tsx, qui reste
// en place pour la production tant que B3 n'est pas déployé.
const TOTAL_MISSIONS = 6

const MISSIONS: { n: number; titre: string; ouverte: boolean }[] = [
  { n: 1, titre: 'Se vendre sans se survendre', ouverte: true },
  { n: 2, titre: 'Conduite de réunion efficace', ouverte: true },
  { n: 3, titre: '48h pour reprendre le contrôle', ouverte: true },
  { n: 4, titre: 'Mission à venir', ouverte: false },
  { n: 5, titre: 'Mission à venir', ouverte: false },
  { n: 6, titre: 'Mission à venir', ouverte: false },
]

export default function MissionShell({ group, missionNumber }: { group: Group; missionNumber: number }) {
  return (
    <div className="px-4 pb-16 pt-2 max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" aria-label="Parcours B3">
        {MISSIONS.map(m => {
          const active = m.n === missionNumber
          return (
            <div
              key={m.n}
              aria-disabled={!m.ouverte}
              className="rounded-xl px-2 py-2 text-center select-none"
              style={{
                background: active ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.03)',
                border: active ? '1.5px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.08)',
                opacity: m.ouverte ? 1 : 0.4,
                cursor: 'default',
              }}
            >
              <p className="text-xs font-black" style={{ color: active ? '#c9a84c' : 'rgba(200,220,255,0.5)', fontFamily: 'monospace' }}>
                {m.ouverte ? `M${m.n}` : `🔒 M${m.n}`}
              </p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{m.titre}</p>
            </div>
          )
        })}
      </div>

      {missionNumber === 1 && <Mission1SeVendre total={TOTAL_MISSIONS} slug={group.slug} />}
      {missionNumber === 2 && <Mission2ReunionEfficace total={TOTAL_MISSIONS} />}
      {missionNumber === 3 && <Mission3ImmersionControle total={TOTAL_MISSIONS} />}
      {(missionNumber < 1 || missionNumber > 3) && <MissionAVenir n={missionNumber} total={TOTAL_MISSIONS} />}
    </div>
  )
}
