'use client'

import { useState, useCallback } from 'react'
import { situationsUrgence, thematiquesPostLinkedIn, type SituationUrgence, type ThematiquePost } from '@/lib/content/univers2-b2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function Mission3LongueVue() {
  const [vus, setVus] = useState<number[]>([])
  const [situation, setSituation] = useState<SituationUrgence | null>(null)
  const [thematique, setThematique] = useState<ThematiquePost | null>(null)
  const [thematiquesVues, setThematiquesVues] = useState<number[]>([])

  const tirer = useCallback(() => {
    const restants = situationsUrgence.filter(s => !vus.includes(s.id))
    const pool = restants.length > 0 ? restants : situationsUrgence
    const s = pool[Math.floor(Math.random() * pool.length)]
    setSituation(s)
    setVus(prev => restants.length > 0 ? [...prev, s.id] : [s.id])
  }, [vus])

  const tirerThematique = useCallback(() => {
    const restants = thematiquesPostLinkedIn.filter(t => !thematiquesVues.includes(t.id))
    const pool = restants.length > 0 ? restants : thematiquesPostLinkedIn
    const t = pool[Math.floor(Math.random() * pool.length)]
    setThematique(t)
    setThematiquesVues(prev => restants.length > 0 ? [...prev, t.id] : [t.id])
  }, [thematiquesVues])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Mission 3 — Régler sa longue-vue</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">La Salle des urgences LinkedIn</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Optimiser son profil LinkedIn et sa prise de parole professionnelle.</p>
      </div>

      {/* Section 1 — Situations d'urgence */}
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

      {/* Séparateur */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.12)' }} />
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.4)' }}>Aller plus loin</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.12)' }} />
      </div>

      {/* Section 2 — Thématiques de post LinkedIn */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.6)' }}>Rédiger son post LinkedIn</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Tirez une thématique réflexive et rédigez un post qui vous ressemble.</p>
        </div>

        <button
          onClick={tirerThematique}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-black uppercase tracking-wide text-xs"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#f5c842' }}
        >
          <span>✏️</span><span>Nouvelle thématique</span>
        </button>

        {thematique && (
          <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{thematique.icone}</span>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.8)' }}>{thematique.angle}</span>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">{thematique.invite}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        Notez vos résultats de votre côté — vous en débattrez avec votre intervenant en fin de séance.
      </div>
    </div>
  )
}
