'use client'

import { useEffect, useState } from 'react'
import { activationM2 as A, retourM2 as R } from '@/lib/content/univers3-marketing-m2'
import { HORIZON } from './theme'

// Écrans du centre de contrôle Mission Horizon qui encadrent le simulateur STRYDE (fiche v3).
// Textes mot pour mot. Identité U3 existante (navy / or, vocabulaire « centre de contrôle »),
// sans iconographie spatiale ajoutée tant que Stéphanie ne l'a pas validée (question ouverte 9).

const DELAI_ACTIVATION_MS = 900

export function EcranActivation({ onActiver, misAJour }: { onActiver: () => void; misAJour: boolean }) {
  const [activation, setActivation] = useState(false)

  useEffect(() => {
    if (!activation) return
    const t = setTimeout(onActiver, DELAI_ACTIVATION_MS)
    return () => clearTimeout(t)
  }, [activation, onActiver])

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700" data-testid="m2-activation">
      {misAJour && (
        <p role="status" className="rounded-xl px-4 py-3 text-sm" style={{ background: HORIZON.panneau, border: `1px solid ${HORIZON.bordure}` }} data-testid="m2-mise-a-jour">
          {A.miseAJour}
        </p>
      )}
      <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: HORIZON.or }}>{A.surtitre}</p>
      <h1 className="text-3xl sm:text-4xl font-black leading-tight">{A.titre}</h1>
      <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: HORIZON.texteSecondaire }}>
        {A.paragraphes.map(p => <p key={p}>{p}</p>)}
      </div>
      <div className="rounded-2xl px-5 py-4 space-y-1" style={{ background: HORIZON.panneau, border: `1px solid ${HORIZON.bordure}` }}>
        <p className="text-lg font-black tracking-[0.2em]" style={{ color: HORIZON.or }}>{A.simulation}</p>
        <p className="text-sm font-bold">{A.format}</p>
      </div>
      <button
        type="button"
        onClick={() => setActivation(true)}
        disabled={activation}
        className="rounded-xl px-8 py-4 font-black uppercase tracking-[0.15em] disabled:opacity-70"
        style={{ background: HORIZON.or, color: HORIZON.fond }}
        data-testid="m2-activer"
      >
        {activation ? A.activation : A.bouton}
      </button>
    </div>
  )
}

export function EcranRetour({ onRevoirVerdict }: { onRevoirVerdict: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-6" data-testid="m2-retour">
      <p className="text-[11px] font-bold uppercase tracking-[0.35em] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700" style={{ color: HORIZON.or }}>{R.surtitre}</p>
      <h2 className="text-3xl sm:text-4xl font-black leading-tight motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:delay-300 motion-safe:fill-mode-both">{R.titre}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:delay-700 motion-safe:fill-mode-both" style={{ color: HORIZON.texteSecondaire }}>
        {R.paragraphes.map(p => <p key={p}>{p}</p>)}
      </div>
      <p className="text-lg font-black uppercase tracking-[0.25em] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:delay-1000 motion-safe:fill-mode-both" style={{ color: HORIZON.or }}>{R.fin}</p>
      <button type="button" onClick={onRevoirVerdict} className="text-sm font-bold underline underline-offset-4" style={{ color: HORIZON.texteSecondaire }}>
        {R.revoirVerdict}
      </button>
    </div>
  )
}
