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
  const [complication, setComplication] = useState<string | null>(null)

  const nouveauContact = () => {
    setScenario({ interlocuteur: pick(interlocuteursPitch), contexte: pick(contextesPitch), duree: pick(dureesPitch) })
    setPitch('')
    setAnalyse('')
    setComplication(null)
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

  const declencherComplication = () => setComplication(pick(dossiersConfidentielsPitch))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 5 — Les Contacts</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Rencontre avec une source</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Chaque contact est une opportunité. L&apos;IA analyse comment vous adaptez votre accroche à votre interlocuteur — structure, ton, clarté, impact.
        </p>
      </div>

      <button
        onClick={nouveauContact}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🤝</span><span>Nouveau contact</span>
      </button>

      {scenario && (
        <>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
            <div className="px-4 py-2.5" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>⬛ Fiche de contact</span>
            </div>
            <div className="grid grid-cols-3 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Interlocuteur</p>
                <p className="font-black text-white text-sm">{scenario.interlocuteur}</p>
              </div>
              <div className="p-4" style={{ borderLeft: '1px solid rgba(201,168,76,0.12)', borderRight: '1px solid rgba(201,168,76,0.12)' }}>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Lieu</p>
                <p className="font-black text-white text-sm">{scenario.contexte}</p>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Durée</p>
                <p className="font-black text-white text-sm">{scenario.duree}s</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Votre accroche</p>
            <textarea
              value={pitch}
              onChange={e => setPitch(e.target.value)}
              placeholder="Rédigez votre accroche pour ce contact précis…"
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
              {loading ? 'Analyse en cours…' : '🤖 Analyser mon accroche'}
            </button>
          </div>
        </>
      )}

      {analyse && (
        <>
          <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(255,240,200,0.9)' }}>
            {analyse}
          </div>

          {!complication ? (
            <button
              onClick={declencherComplication}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              <span>⚡</span><span>Complication de dernière minute</span>
            </button>
          ) : (
            <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#fca5a5' }}>⚡ Complication</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{complication}</p>
            </div>
          )}
        </>
      )}

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        Notez vos résultats de votre côté — vous en débattrez avec votre intervenant en fin de séance.
      </div>
    </div>
  )
}
