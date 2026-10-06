'use client'

import type { ReactNode } from 'react'
import type { Group } from '@/types'
import { specialisationB3, type SpecialisationB3Id } from '@/lib/content/univers3'
import Mission1SeVendre from './Mission1SeVendre'
import Mission1SignatureDigitale from './Mission1SignatureDigitale'
import Mission2ReunionEfficace from './Mission2ReunionEfficace'
import Mission3ImmersionControle from './Mission3ImmersionControle'
import MissionAVenir from './shared/MissionAVenir'

// Routeur de l'Univers 3 : un parcours par spécialisation B3.
// Le nombre de missions, leurs titres et leur statut viennent de la configuration unique
// B3_SPECIALISATIONS (src/lib/content/univers3.ts). Ce fichier relie seulement chaque
// mission « disponible » à son composant. Une mission sans composant affiche MissionAVenir.
type RenduMission = (p: { total: number; slug: string }) => ReactNode

const COMPOSANTS: Record<SpecialisationB3Id, Record<number, RenduMission>> = {
  negociation: {
    1: p => <Mission1SeVendre total={p.total} slug={p.slug} />,
    2: p => <Mission2ReunionEfficace total={p.total} />,
    3: p => <Mission3ImmersionControle total={p.total} />,
  },
  'marketing-digital': {
    1: p => <Mission1SignatureDigitale total={p.total} slug={p.slug} />,
  },
  finance: {}, // prévue au T2
}

// Classes écrites en toutes lettres : Tailwind ne détecte pas les classes construites dynamiquement.
const COLONNES: Record<number, string> = { 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6' }

export default function MissionShell({ group, missionNumber }: { group: Group; missionNumber: number }) {
  const parcours = specialisationB3(group.specialization)
  const total = parcours.missions.length
  const mission = parcours.missions.find(m => m.numero === missionNumber)
  const rendu = mission?.statut === 'disponible' ? COMPOSANTS[parcours.id][missionNumber] : undefined

  return (
    <div className="px-4 pb-16 pt-2 max-w-xl mx-auto space-y-6">
      <div className={`grid grid-cols-3 ${COLONNES[total] ?? 'sm:grid-cols-6'} gap-2`} aria-label="Parcours B3">
        {parcours.missions.map(m => {
          const active = m.numero === missionNumber
          const ouverte = m.statut === 'disponible'
          return (
            <div
              key={m.numero}
              aria-disabled={!ouverte}
              className="rounded-xl px-2 py-2 text-center select-none"
              style={{
                background: active ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.03)',
                border: active ? '1.5px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.08)',
                opacity: ouverte ? 1 : 0.4,
                cursor: 'default',
              }}
            >
              <p className="text-xs font-black" style={{ color: active ? '#c9a84c' : 'rgba(200,220,255,0.5)', fontFamily: 'monospace' }}>
                {ouverte ? `M${m.numero}` : `🔒 M${m.numero}`}
              </p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{m.titre}</p>
            </div>
          )
        })}
      </div>

      {rendu
        ? rendu({ total, slug: group.slug })
        // Le numéro affiché ne dépasse jamais le nombre de missions du parcours.
        : <MissionAVenir n={Math.min(Math.max(missionNumber, 1), total)} total={total} />}
    </div>
  )
}
