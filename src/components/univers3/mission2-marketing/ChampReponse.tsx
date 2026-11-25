'use client'

import {
  DECISIONS_PARTENARIAT, MAX_CANAUX, textesEpreuve as T, type ChampEpreuve,
} from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Un champ de réponse d'épreuve. Jamais prérempli : la valeur vient uniquement de la saisie
// de l'équipe, conservée dans l'état de partie (sauvegarde différée + à la perte de focus).

interface Props {
  idBase: string
  champ: ChampEpreuve
  valeur: string
  onChange: (v: string) => void
  onBlur: () => void
}

const styleSaisie = {
  background: STRYDE.noir,
  color: STRYDE.blancCasse,
  border: `1px solid ${STRYDE.bordure}`,
  ['--tw-ring-color' as string]: STRYDE.orange,
}

export const lignesCanaux = (v: string) => v.split('\n').map(l => l.trim()).filter(Boolean)

function Canaux({ idBase, champ, valeur, onChange, onBlur }: Props) {
  // Au moins une ligne affichée ; jamais plus de MAX_CANAUX (contrôle de l'interface).
  const lignes = valeur === '' ? [''] : valeur.split('\n').slice(0, MAX_CANAUX)
  const maj = (l: string[]) => onChange(l.join('\n'))
  const plein = lignes.length >= MAX_CANAUX
  return (
    <div className="space-y-2">
      {lignes.map((l, i) => (
        <div key={i} className="flex gap-2">
          <input
            id={i === 0 ? idBase : `${idBase}-${i}`}
            type="text"
            value={l}
            maxLength={champ.maxCaracteres}
            onChange={e => maj(lignes.map((x, j) => (j === i ? e.target.value.replace(/\n/g, ' ') : x)))}
            onBlur={onBlur}
            aria-label={`Canal ${i + 1}`}
            className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none focus-visible:ring-2"
            style={styleSaisie}
          />
          {lignes.length > 1 && (
            <button type="button" onClick={() => maj(lignes.filter((_, j) => j !== i))} className="rounded-lg px-3 text-xs font-bold" style={{ border: `1px solid ${STRYDE.bordure}`, color: STRYDE.texteSecondaire }}>
              {T.retirerCanal}
            </button>
          )}
        </div>
      ))}
      {plein ? (
        <p className="text-xs" style={{ color: STRYDE.texteSecondaire }} data-testid="m2-canaux-max">{T.maxCanauxAtteint}</p>
      ) : (
        <button
          type="button"
          disabled={lignes[lignes.length - 1].trim() === ''}
          onClick={() => maj([...lignes, ''])}
          className="text-xs font-bold disabled:opacity-40"
          style={{ color: STRYDE.orange }}
        >
          {T.ajouterCanal}
        </button>
      )}
    </div>
  )
}

function Decision({ idBase, valeur, onChange }: Props) {
  return (
    <div role="radiogroup" aria-labelledby={`${idBase}-label`} className="flex flex-wrap gap-2">
      {DECISIONS_PARTENARIAT.map(d => {
        const choisi = valeur === d.id
        return (
          <button
            key={d.id}
            type="button"
            role="radio"
            aria-checked={choisi}
            onClick={() => onChange(d.id)}
            className="rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider"
            style={choisi ? { background: STRYDE.orange, color: STRYDE.noir } : { border: `1px solid ${STRYDE.bordure}`, color: STRYDE.blancCasse }}
          >
            {d.label}
          </button>
        )
      })}
    </div>
  )
}

export default function ChampReponse(props: Props) {
  const { idBase, champ, valeur, onChange, onBlur } = props
  const type = champ.type ?? 'texte'
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label id={`${idBase}-label`} htmlFor={type === 'decision' ? undefined : idBase} className="text-sm font-bold">
          {champ.label}
        </label>
        {type === 'texte' && (
          <span className="text-[11px] tabular-nums" style={{ color: valeur.length >= champ.maxCaracteres ? STRYDE.orange : STRYDE.texteSecondaire }} aria-hidden="true">
            {valeur.length} / {champ.maxCaracteres}
          </span>
        )}
      </div>
      <p id={`${idBase}-aide`} className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{champ.aide}</p>
      {type === 'canaux' ? <Canaux {...props} />
        : type === 'decision' ? <Decision {...props} />
          : (
            <textarea
              id={idBase}
              value={valeur}
              maxLength={champ.maxCaracteres}
              rows={champ.maxCaracteres > 450 ? 4 : 3}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              aria-describedby={`${idBase}-aide`}
              className="w-full rounded-xl px-3 py-2.5 text-sm leading-relaxed outline-none focus-visible:ring-2 resize-y"
              style={styleSaisie}
            />
          )}
    </div>
  )
}
