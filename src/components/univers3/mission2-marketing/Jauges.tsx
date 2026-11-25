'use client'

import { INDICATEURS, MAX_INDICATEUR, texteAnalyseEnAttente } from '@/lib/content/univers3-marketing-m2'
import type { EtatPartie } from './etatPartie'
import { STRYDE } from './theme'

// Les 4 jauges de l'agence (25 points chacune, total sur 100). Simulation de conséquences,
// pas une note. Les épreuves soumises sans analyse appliquée sont signalées « en attente » :
// aucun score n'est jamais estimé à leur place.

/** Épreuves soumises dont l'analyse n'a pas (encore) été appliquée. */
export function epreuvesEnAttente(e: EtatPartie): number[] {
  return Object.keys(e.soumisLe)
    .map(Number)
    .filter(n => { const a = e.analyses[n]; return a === undefined || a === 'en-attente' })
    .sort((a, b) => a - b)
}

export default function Jauges({ etat, compact = false }: { etat: EtatPartie; compact?: boolean }) {
  const total = INDICATEURS.reduce((s, i) => s + etat.scores[i.id], 0)
  const attente = epreuvesEnAttente(etat)
  return (
    <div className="space-y-4" data-testid="m2-jauges">
      <div className={`grid gap-3 ${compact ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
        {INDICATEURS.map(i => {
          const v = etat.scores[i.id]
          return (
            <div key={i.id} className="rounded-xl p-3 space-y-2" style={{ background: STRYDE.noir, border: `1px solid ${STRYDE.bordure}` }}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-bold" id={`m2-jauge-${i.id}`}>{i.label}</p>
                <p className="text-sm font-black tabular-nums">{v}<span style={{ color: STRYDE.texteSecondaire }}>/{MAX_INDICATEUR}</span></p>
              </div>
              <div
                role="meter"
                aria-labelledby={`m2-jauge-${i.id}`}
                aria-valuemin={0}
                aria-valuemax={MAX_INDICATEUR}
                aria-valuenow={v}
                className="h-2 rounded-full overflow-hidden"
                style={{ background: STRYDE.anthraciteClair }}
              >
                <div
                  className="h-full rounded-full motion-safe:transition-[width] motion-safe:duration-700"
                  style={{ width: `${(v / MAX_INDICATEUR) * 100}%`, background: v <= 12 ? STRYDE.blancCasse : STRYDE.orange }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-bold">Total de l’agence{attente.length > 0 && <span className="font-normal" style={{ color: STRYDE.texteSecondaire }}> (provisoire)</span>}</p>
        <p className="text-2xl font-black tabular-nums" data-testid="m2-total">{total}<span className="text-sm" style={{ color: STRYDE.texteSecondaire }}> / 100</span></p>
      </div>
      {attente.length > 0 && (
        <p className="text-xs rounded-lg px-3 py-2" style={{ background: STRYDE.anthraciteClair, color: STRYDE.blancCasse }} data-testid="m2-attente">
          {texteAnalyseEnAttente(attente)}
        </p>
      )}
    </div>
  )
}
