'use client'

import { useState, useCallback } from 'react'
import { situationsUrgence, type SituationUrgence } from '@/lib/content/univers2-b2'

export default function Mission3LongueVue() {
  const [vus, setVus] = useState<number[]>([])
  const [situation, setSituation] = useState<SituationUrgence | null>(null)

  const tirer = useCallback(() => {
    const restants = situationsUrgence.filter(s => !vus.includes(s.id))
    const pool = restants.length > 0 ? restants : situationsUrgence
    const s = pool[Math.floor(Math.random() * pool.length)]
    setSituation(s)
    setVus(prev => restants.length > 0 ? [...prev, s.id] : [s.id])
  }, [vus])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Mission 3 — Régler sa longue-vue</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">La Salle des urgences LinkedIn</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Optimiser son profil LinkedIn et sa prise de parole professionnelle.</p>
      </div>

      <button
        onClick={tirer}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.35)', color: '#f87171' }}
      >
        <span className="text-xl">🚨</span>
        <span>Nouvelle situation d&apos;urgence</span>
      </button>

      {situation && (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.25)' }}>
          <div className="px-4 py-2.5" style={{ background: 'rgba(239,68,68,0.1)' }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#fca5a5' }}>Situation #{situation.id} — {situation.titre}</span>
          </div>
          <div className="p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{situation.contexte}</p>

            {situation.choix && (
              <div className="flex flex-wrap gap-2">
                {situation.choix.map(c => (
                  <span key={c} className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>{c}</span>
                ))}
              </div>
            )}

            <div className="pt-3" style={{ borderTop: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="font-bold text-white">{situation.question}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
