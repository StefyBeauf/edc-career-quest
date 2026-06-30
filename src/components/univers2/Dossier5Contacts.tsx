'use client'

import { useState } from 'react'
import { interlocuteursPitch, contextesPitch, dureesPitch, dossiersConfidentielsPitch } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

interface Scenario { interlocuteur: string; contexte: string; duree: number }

export default function Dossier5Contacts() {
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [pitch, setPitch] = useState('')
  const [analyse, setAnalyse] = useState('')
  const [loading, setLoading] = useState(false)
  const [confidentiel, setConfidentiel] = useState<string | null>(null)

  const nouveauScenario = () => {
    setScenario({ interlocuteur: pick(interlocuteursPitch), contexte: pick(contextesPitch), duree: pick(dureesPitch) })
    setPitch('')
    setAnalyse('')
    setConfidentiel(null)
  }

  const analyser = async () => {
    if (!scenario || !pitch.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/expedition/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pitch', ...scenario, pitch }),
      })
      const data = await res.json() as { content?: string }
      setAnalyse(data.content ?? '')
    } finally { setLoading(false) }
  }

  const modeExpert = () => setConfidentiel(pick(dossiersConfidentielsPitch))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 5 — Les Contacts</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Le Laboratoire de Pitch</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Adaptez votre pitch selon l&apos;interlocuteur. L&apos;IA analyse structure, adaptation, clarté et impact.</p>
      </div>

      <button
        onClick={nouveauScenario}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🎭</span><span>Nouveau scénario</span>
      </button>

      {scenario && (
        <>
          <div className="rounded-2xl p-4 grid grid-cols-3 gap-2 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Interlocuteur</p>
              <p className="font-bold text-white text-sm mt-1">{scenario.interlocuteur}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Contexte</p>
              <p className="font-bold text-white text-sm mt-1">{scenario.contexte}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Durée</p>
              <p className="font-bold text-white text-sm mt-1">{scenario.duree}s</p>
            </div>
          </div>

          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Votre pitch</p>
            <textarea
              value={pitch}
              onChange={e => setPitch(e.target.value)}
              placeholder="Rédigez votre pitch ici…"
              rows={5}
              className="w-full rounded-xl px-3 py-2 text-sm resize-y outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', caretColor: '#c9a84c' }}
            />
            <button
              onClick={analyser}
              disabled={loading || !pitch.trim()}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wide text-sm disabled:opacity-40"
              style={{ background: '#c9a84c', color: '#050a1a' }}
            >
              {loading ? 'Analyse en cours…' : '🤖 Analyser mon pitch'}
            </button>
          </div>
        </>
      )}

      {analyse && (
        <>
          <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(255,240,200,0.9)' }}>
            {analyse}
          </div>

          {!confidentiel ? (
            <button
              onClick={modeExpert}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
              style={{ background: 'rgba(120,80,200,0.12)', border: '1px solid rgba(150,110,220,0.4)', color: '#c4a8f0' }}
            >
              <span>🕵️</span><span>Mode Expert — Dossier confidentiel</span>
            </button>
          ) : (
            <div className="rounded-2xl p-4" style={{ background: 'rgba(120,80,200,0.1)', border: '1px solid rgba(150,110,220,0.3)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#c4a8f0' }}>🕵️ Dossier confidentiel</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{confidentiel}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
