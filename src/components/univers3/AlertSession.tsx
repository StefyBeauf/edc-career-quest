'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Alert {
  id: string
  content: string
  at: string
}

interface Props {
  specialization: string
  alertType: string
  sessionMinutes: number
  startLabel: string
  startDesc: string
  children?: React.ReactNode // contenu affiché quand la session tourne (scénario M6)
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function AlertSession({ specialization, alertType, sessionMinutes, startLabel, startDesc, children }: Props) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [flash, setFlash] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const elapsedRef = useRef(0)

  // Compteur de secondes
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      elapsedRef.current += 1
      setElapsed(v => v + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  const generateAlert = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: alertType, specialization }),
      })
      const data = await res.json() as { content?: string }
      if (data.content) {
        const newAlert: Alert = {
          id: `${Date.now()}`,
          content: data.content,
          at: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        }
        // 50% remplace la dernière, 50% s'ajoute
        setAlerts(prev => Math.random() < 0.5 && prev.length > 0
          ? [...prev.slice(0, -1), newAlert]
          : [...prev, newAlert])
        setFlash(true)
        setTimeout(() => setFlash(false), 4000)
      }
    } finally {
      setLoading(false)
    }
  }, [alertType, specialization])

  // Auto-inject toutes les 15-20 min (aléatoire)
  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const delay = (15 + Math.random() * 5) * 60 * 1000
    timerRef.current = setTimeout(async () => {
      await generateAlert()
      scheduleNext()
    }, delay)
  }, [generateAlert])

  const start = () => {
    setRunning(true)
    setElapsed(0)
    elapsedRef.current = 0
    setAlerts([])
    scheduleNext()
  }

  const stop = () => {
    setRunning(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const totalSec = sessionMinutes * 60
  const progress = Math.min((elapsed / totalSec) * 100, 100)

  // ── Avant démarrage ──────────────────────────────────────────────────────
  if (!running) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl p-5 text-center space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="text-4xl">🚀</div>
          <div>
            <p className="font-black text-white text-lg uppercase tracking-wide">{startLabel}</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{startDesc}</p>
          </div>
          <div className="text-xs px-3 py-2 rounded-lg inline-block" style={{ background: 'rgba(201,168,76,0.08)', color: 'rgba(201,168,76,0.7)', border: '1px solid rgba(201,168,76,0.15)' }}>
            Durée : {sessionMinutes} minutes · Alertes toutes les 15-20 min
          </div>
          <button
            onClick={start}
            className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
            style={{ background: '#c9a84c', color: '#050a1a', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}
          >
            Démarrer la session
          </button>
        </div>
      </div>
    )
  }

  // ── Session en cours ─────────────────────────────────────────────────────
  return (
    <div className="space-y-4">

      {/* HUD session */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${flash ? 'rgba(239,68,68,0.6)' : 'rgba(201,168,76,0.2)'}`, transition: 'border-color 0.3s' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4ade80' }}>Session active</span>
          </div>
          <span className="font-black text-white" style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{formatTime(elapsed)}</span>
        </div>
        {/* Barre de progression */}
        <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #c9a84c, #f5c842)' }} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{alerts.length} alerte{alerts.length > 1 ? 's' : ''} injectée{alerts.length > 1 ? 's' : ''}</span>
          <button onClick={stop} className="text-xs font-bold px-3 py-1 rounded-lg" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
            Terminer
          </button>
        </div>
      </div>

      {/* Flash alerte */}
      {flash && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-2 animate-pulse" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)' }}>
          <span className="text-red-400 font-black text-sm">🔴 ALERTE INJECTÉE</span>
        </div>
      )}

      {/* Contenu optionnel (scénario M6) */}
      {children}

      {/* Bouton alerte manuelle */}
      <button
        onClick={generateAlert}
        disabled={loading}
        className="w-full py-3.5 rounded-2xl font-black uppercase tracking-wide text-sm flex items-center justify-center gap-2"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.4)', color: loading ? 'rgba(248,113,113,0.4)' : '#f87171' }}
      >
        <span>{loading ? '⏳' : '⚠️'}</span>
        <span>{loading ? 'Génération…' : 'Injecter une alerte maintenant'}</span>
      </button>

      {/* Feed des alertes */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.5)' }}>Alertes injectées</p>
          {[...alerts].reverse().map((a) => (
            <div key={a.id} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-xs mb-2 font-bold" style={{ color: 'rgba(248,113,113,0.6)', fontFamily: 'monospace' }}>{a.at}</p>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,240,200,0.88)' }}>{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
