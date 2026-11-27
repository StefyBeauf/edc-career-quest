'use client'

import { CEO, INDICATEURS, textesAnalyse as T } from '@/lib/content/univers3-marketing-m2'
import { MAX_TENTATIVES_ANALYSE, type EtatPartie } from './etatPartie'
import PortraitCeo from './PortraitCeo'
import { STRYDE } from './theme'

// Retour de Stéphanie Vador après une épreuve (fiche v3) : portrait et identité, réaction (2 à 4
// phrases), variations RÉELLEMENT appliquées et conséquence simulée. `informations_manquantes`
// reste dans l'état de partie mais n'est PAS affiché : la liste ressemblerait à un corrigé. Écran de restitution
// uniquement : aucune messagerie ni conversation avec le CEO.
// Mode dégradé : message neutre, aucun score estimé, relance possible.

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

function Identite() {
  return (
    <div className="flex items-center gap-3">
      <PortraitCeo />
      <div>
        <p className="font-black">{CEO.nom}</p>
        <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{CEO.fonction}</p>
      </div>
    </div>
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
        <Identite />
        <p className="text-[15px] font-semibold">{T.enAttente}</p>
        <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.enAttenteDetail}</p>
        <BoutonRelancer {...props} />
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" style={{ background: STRYDE.anthracite, border: '1px solid rgba(255,91,20,0.45)' }} data-testid="m2-analyse">
      <Identite />
      <blockquote className="text-[15px] leading-relaxed font-semibold pl-4" style={{ borderLeft: `3px solid ${STRYDE.orange}` }} data-testid="m2-reaction-ceo">
        « {a.reaction_ceo} »
      </blockquote>
      <div className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.texteSecondaire }}>{T.variations}</p>
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
      </div>
      <div className="text-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>{T.consequence}</p>
        <p data-testid="m2-consequence">{a.consequence}</p>
      </div>
    </div>
  )
}
