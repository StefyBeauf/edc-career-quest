'use client'

import { useState } from 'react'
import { STRYDE } from './theme'

// Visuel STRYDE fourni par Stéphanie (/public/univers3/stryde/). Tant que le fichier est absent,
// un emplacement graphique sobre s'affiche à la place : jamais d'image cassée en séance.
export default function VisuelStryde({ src, legende, hauteur = 'h-56' }: { src: string; legende: string; hauteur?: string }) {
  const [absent, setAbsent] = useState(false)

  if (absent) {
    return (
      <div
        role="img"
        aria-label={`Visuel à venir : ${legende}`}
        className={`${hauteur} w-full rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden relative`}
        style={{
          background: `repeating-linear-gradient(135deg, ${STRYDE.anthracite} 0 14px, ${STRYDE.anthraciteClair} 14px 28px)`,
          border: `1px solid ${STRYDE.bordure}`,
        }}
      >
        <span className="text-4xl font-black tracking-[0.3em]" style={{ color: STRYDE.blancCasse }}>STRYDE</span>
        <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: STRYDE.texteSecondaire }}>{legende}</span>
        <span className="absolute bottom-0 left-0 h-1 w-1/3" style={{ background: STRYDE.orange }} aria-hidden="true" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- dimensions inconnues tant que les visuels ne sont pas livrés
    <img
      src={src}
      alt={legende}
      onError={() => setAbsent(true)}
      className={`${hauteur} w-full rounded-2xl object-cover`}
      style={{ border: `1px solid ${STRYDE.bordure}` }}
    />
  )
}
