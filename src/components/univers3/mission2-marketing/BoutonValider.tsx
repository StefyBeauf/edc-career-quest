'use client'

import { useState } from 'react'
import { textesChrono as T } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Validation anticipée d'une épreuve, avec confirmation : une décision validée est définitive.
export default function BoutonValider({ onValider, avertissement }: { onValider: () => void; avertissement?: string }) {
  const [confirmer, setConfirmer] = useState(false)

  if (!confirmer) {
    return (
      <button
        type="button"
        onClick={() => setConfirmer(true)}
        className="w-full sm:w-auto rounded-xl px-6 py-3.5 font-black uppercase tracking-[0.12em]"
        style={{ background: STRYDE.orange, color: STRYDE.noir }}
      >
        {T.boutonValider}
      </button>
    )
  }

  return (
    <div role="alertdialog" aria-label={T.confirmerValider} className="rounded-xl p-4 space-y-3" style={{ background: STRYDE.anthracite, border: '1px solid rgba(255,91,20,0.5)' }}>
      <p className="text-sm font-semibold">{T.confirmerValider}</p>
      {avertissement && <p className="text-sm" style={{ color: STRYDE.orange }}>{avertissement}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onValider} className="rounded-lg px-4 py-2.5 font-black uppercase tracking-wider text-sm" style={{ background: STRYDE.orange, color: STRYDE.noir }}>
          {T.confirmerOui}
        </button>
        <button type="button" autoFocus onClick={() => setConfirmer(false)} className="rounded-lg px-4 py-2.5 font-bold text-sm" style={{ border: `1px solid ${STRYDE.bordure}`, color: STRYDE.blancCasse }}>
          {T.confirmerNon}
        </button>
      </div>
    </div>
  )
}
