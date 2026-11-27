'use client'

import { useState } from 'react'
import { accueilM2 as A, VISUELS_STRYDE } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'
import VisuelStryde from './VisuelStryde'

// Écran d'accueil de la M2. Seule saisie de toute la mission : le nom de l'agence.
export default function Accueil({ onEntrer, desactive }: { onEntrer: (agence: string) => void; desactive: boolean }) {
  const [agence, setAgence] = useState('')
  const nom = agence.trim().replace(/\s+/g, ' ')
  const valide = nom.length >= A.champAgence.min && nom.length <= A.champAgence.max

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>
            Simulation 02 · Brief confidentiel
          </p>
          <h1 className="font-black uppercase leading-[0.9] tracking-tight text-5xl sm:text-6xl" style={{ color: STRYDE.blancCasse }}>
            {A.titre}
          </h1>
          <p className="text-lg font-semibold uppercase tracking-wide" style={{ color: STRYDE.orange }}>{A.sousTitre}</p>
          <p className="text-xl font-bold" style={{ color: STRYDE.blancCasse }}>{A.accroche}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Format de la mission">
          {A.mentions.map(m => (
            <li
              key={m}
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ background: STRYDE.orangeDoux, color: STRYDE.blancCasse, border: `1px solid rgba(255,91,20,0.4)` }}
            >
              {m}
            </li>
          ))}
        </ul>

        <p className="text-[15px] leading-relaxed" style={{ color: STRYDE.texteSecondaire }}>{A.introduction}</p>
      </div>

      <div className="space-y-5">
        <VisuelStryde src={VISUELS_STRYDE.collection} legende="Collection STRYDE" hauteur="h-56 lg:h-72" />

        <form
          className="rounded-2xl p-5 space-y-3"
          style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}
          onSubmit={e => {
            e.preventDefault()
            if (valide && !desactive) onEntrer(nom)
          }}
        >
          <label htmlFor="m2-agence" className="block text-sm font-bold uppercase tracking-wider" style={{ color: STRYDE.blancCasse }}>
            {A.champAgence.label}
          </label>
          <input
            id="m2-agence"
            type="text"
            value={agence}
            onChange={e => setAgence(e.target.value)}
            maxLength={A.champAgence.max}
            placeholder={A.champAgence.placeholder}
            autoComplete="off"
            aria-describedby="m2-agence-aide"
            className="w-full rounded-xl px-4 py-3 text-base outline-none focus-visible:ring-2"
            style={{ background: STRYDE.noir, color: STRYDE.blancCasse, border: `1px solid ${STRYDE.bordure}`, ['--tw-ring-color' as string]: STRYDE.orange }}
          />
          <p id="m2-agence-aide" className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{A.champAgence.aide}</p>
          <button
            type="submit"
            disabled={!valide || desactive}
            className="w-full rounded-xl py-3.5 font-black uppercase tracking-[0.15em] motion-safe:transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: STRYDE.orange, color: STRYDE.noir }}
          >
            {A.bouton} →
          </button>
        </form>
      </div>
    </div>
  )
}
