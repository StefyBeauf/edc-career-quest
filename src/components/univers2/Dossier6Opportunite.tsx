'use client'

import { useState } from 'react'
import { situationsImprevus, dossiersConfidentiels } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function Dossier6Opportunite() {
  const [situation, setSituation] = useState<string | null>(null)
  const [confidentiel, setConfidentiel] = useState<typeof dossiersConfidentiels[number] | null>(null)
  const [ouvert, setOuvert] = useState(false)

  const tournerRoue = () => setSituation(pick(situationsImprevus))
  const ouvrirDossier = () => { setConfidentiel(pick(dossiersConfidentiels)); setOuvert(true) }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 6 — L&apos;Opportunité</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">La Roue des imprévus</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Les étudiants tournent la roue et découvrent leur situation. Quelle décision prenez-vous ?</p>
      </div>

      <button
        onClick={tournerRoue}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🎯</span><span>Tourner la roue</span>
      </button>

      {situation && (
        <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>⚠️ Nouvelle situation</p>
          <p className="text-white text-base font-semibold leading-relaxed">{situation}</p>
          <p className="text-sm pt-2" style={{ color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(201,168,76,0.12)' }}>Quelle décision prenez-vous ?</p>
        </div>
      )}

      {!ouvert ? (
        <button
          onClick={ouvrirDossier}
          className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
          style={{ background: 'rgba(120,80,200,0.12)', border: '1.5px solid rgba(150,110,220,0.4)', color: '#c4a8f0' }}
        >
          <span className="text-xl">📂</span><span>Ouvrir le dossier confidentiel</span>
        </button>
      ) : confidentiel && (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(150,110,220,0.35)' }}>
          <div className="px-4 py-2.5" style={{ background: 'rgba(120,80,200,0.15)' }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#c4a8f0' }}>📂 Dossier confidentiel</span>
          </div>
          <div className="p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{confidentiel.contexte}</p>
            <p className="font-bold text-white pt-2" style={{ borderTop: '1px solid rgba(150,110,220,0.15)' }}>{confidentiel.question}</p>
          </div>
        </div>
      )}
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>Le dossier confidentiel ne s&apos;ouvre qu&apos;une fois par séance.</p>
    </div>
  )
}
