'use client'

import { INDICATEURS, textesAnalyse as T } from '@/lib/content/univers3-marketing-m2'
import { MAX_TENTATIVES_ANALYSE, type EtatPartie } from './etatPartie'
import { STRYDE } from './theme'

// Étape « Conséquences » d'une épreuve : variations RÉELLEMENT appliquées (ou « Analyse en
// attente »), conséquence simulée, point fort, point de vigilance. Jamais de score estimé.

interface Props {
  etat: EtatPartie
  n: number
  enCours: boolean
  onRelancer: () => void
}

export function BoutonRelancer({ etat, n, enCours, onRelancer }: Props) {
  const epuise = (etat.tentativesAnalyse?.[n] ?? 0) >= MAX_TENTATIVES_ANALYSE
  if (epuise) return <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.relancesEpuisees}</p>
  return (
    <button
      type="button"
      onClick={onRelancer}
      disabled={enCours}
      className="rounded-lg px-4 py-2 text-sm font-black uppercase tracking-wider disabled:opacity-40"
      style={{ border: `1px solid ${STRYDE.orange}`, color: STRYDE.orange }}
    >
      {T.relancer}
    </button>
  )
}

export default function Consequences(props: Props) {
  const { etat, n, enCours } = props
  const a = etat.analyses[n]

  if (enCours || a === undefined) {
    return (
      <div role="status" aria-live="polite" className="rounded-xl p-5 flex items-center gap-3" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} data-testid="m2-analyse-chargement">
        <span className="h-3 w-3 rounded-full motion-safe:animate-ping" style={{ background: STRYDE.orange }} aria-hidden="true" />
        <p className="text-sm font-semibold">{T.chargement}</p>
      </div>
    )
  }

  if (a === 'en-attente') {
    return (
      <div role="status" className="rounded-xl p-4 space-y-3" style={{ background: STRYDE.anthracite, border: `1px dashed ${STRYDE.bordure}` }} data-testid="m2-analyse-attente">
        <p className="text-sm">{T.enAttente}</p>
        <BoutonRelancer {...props} />
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" style={{ background: STRYDE.anthracite, border: '1px solid rgba(255,91,20,0.45)' }} data-testid="m2-analyse">
      <ul className="flex flex-wrap gap-2" aria-label="Variations des indicateurs">
        {INDICATEURS.map(i => {
          const v = a.variations[i.id]
          return (
            <li
              key={i.id}
              className="rounded-full px-3 py-1 text-xs font-bold tabular-nums"
              style={v > 0
                ? { background: STRYDE.orange, color: STRYDE.noir }
                : v < 0
                  ? { background: STRYDE.blancCasse, color: STRYDE.noir }
                  : { border: `1px solid ${STRYDE.bordure}`, color: STRYDE.texteSecondaire }}
            >
              {i.label} {v > 0 ? `+${v}` : v}
            </li>
          )
        })}
      </ul>
      <p className="text-[15px] font-semibold">{a.consequence}</p>
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <div><dt className="text-xs font-black uppercase tracking-wider" style={{ color: STRYDE.orange }}>{T.pointFort}</dt><dd>{a.point_fort}</dd></div>
        <div><dt className="text-xs font-black uppercase tracking-wider" style={{ color: STRYDE.texteSecondaire }}>{T.pointVigilance}</dt><dd>{a.point_vigilance}</dd></div>
      </dl>
    </div>
  )
}
