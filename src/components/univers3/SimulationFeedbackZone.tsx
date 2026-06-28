'use client'

import { useState } from 'react'
import type { AIFeedback } from '@/types'

interface Props {
  simulationId: string
  deliverables: string[]
}

const feedbackCards = [
  {
    key: 'pointFort' as keyof AIFeedback,
    label: 'POINT FORT',
    icon: '✓',
    bg: 'rgba(10, 60, 30, 0.35)',
    border: 'rgba(22, 163, 74, 0.4)',
    color: '#4ade80',
    delay: 0,
  },
  {
    key: 'axeAmelioration' as keyof AIFeedback,
    label: 'AXE D\'AMÉLIORATION',
    icon: '◆',
    bg: 'rgba(80, 50, 5, 0.35)',
    border: 'rgba(201, 168, 76, 0.4)',
    color: '#c9a84c',
    delay: 200,
  },
  {
    key: 'questionReflexion' as keyof AIFeedback,
    label: 'QUESTION DE RÉFLEXION',
    icon: '?',
    bg: 'rgba(10, 30, 80, 0.35)',
    border: 'rgba(37, 99, 235, 0.4)',
    color: '#60a5fa',
    delay: 400,
  },
  {
    key: 'vigilanceProfessionnelle' as keyof AIFeedback,
    label: 'VIGILANCE',
    icon: '!',
    bg: 'rgba(80, 10, 10, 0.35)',
    border: 'rgba(220, 38, 38, 0.4)',
    color: '#f87171',
    delay: 600,
  },
]

export default function SimulationFeedbackZone({ simulationId, deliverables }: Props) {
  const [selectedDeliverable, setSelectedDeliverable] = useState(deliverables[0] ?? '')
  const [studentResponse, setStudentResponse] = useState('')
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visibleCards, setVisibleCards] = useState(0)

  async function handleFeedback() {
    if (!studentResponse.trim() || !selectedDeliverable) return
    setLoading(true)
    setError(null)
    setFeedback(null)
    setVisibleCards(0)

    const res = await fetch('/api/simulation/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        simulationId,
        studentResponse,
        deliverable: selectedDeliverable,
      }),
    })

    if (!res.ok) {
      setError('Transmission échouée. Réessayez.')
      setLoading(false)
      return
    }

    const data = await res.json() as AIFeedback
    setFeedback(data)
    setLoading(false)

    // Animation séquentielle des cartes
    for (let i = 1; i <= feedbackCards.length; i++) {
      await new Promise(r => setTimeout(r, 250))
      setVisibleCards(i)
    }
  }

  return (
    <div className="space-y-4">
      {/* Zone de saisie style rapport de mission */}
      <div
        className="rounded-sm p-5 space-y-4"
        style={{
          background: 'rgba(5, 10, 26, 0.92)',
          border: '1px solid rgba(100, 160, 255, 0.35)',
          boxShadow: '0 0 30px rgba(100, 160, 255, 0.08)',
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#c9a84c', boxShadow: '0 0 8px #c9a84c', animationDuration: '2s' }}
          />
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: '#c9a84c', fontFamily: 'monospace' }}
          >
            RAPPORT À TRANSMETTRE AU QG
          </span>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />

        {/* Sélecteur de livrable */}
        <div>
          <label
            className="text-xs uppercase tracking-widest block mb-2"
            style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
          >
            LIVRABLE CONCERNÉ
          </label>
          <select
            value={selectedDeliverable}
            onChange={e => setSelectedDeliverable(e.target.value)}
            className="w-full px-4 py-3 text-sm focus:outline-none"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.3)',
              color: '#e8f0ff',
              fontFamily: 'monospace',
              borderRadius: '2px',
              appearance: 'none',
            }}
          >
            {deliverables.map((d, i) => (
              <option key={i} value={d} style={{ background: '#0a1628' }}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Zone de texte */}
        <div>
          <label
            className="text-xs uppercase tracking-widest block mb-2"
            style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
          >
            VOTRE ANALYSE / PRODUCTION
          </label>
          <textarea
            value={studentResponse}
            onChange={e => setStudentResponse(e.target.value)}
            placeholder="Tapez votre analyse, vos notes ou le contenu de votre livrable..."
            rows={6}
            className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
            style={{
              background: 'rgba(5, 10, 26, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.25)',
              color: '#e8f0ff',
              fontFamily: 'monospace',
              borderRadius: '2px',
              caretColor: '#c9a84c',
            }}
          />
        </div>

        {/* Bouton TRANSMETTRE */}
        <button
          onClick={handleFeedback}
          disabled={loading || !studentResponse.trim()}
          className="w-full font-black uppercase tracking-widest py-4 px-6 transition-all duration-200 active:scale-95 disabled:opacity-40"
          style={{
            background: loading
              ? 'rgba(201, 168, 76, 0.2)'
              : 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(232,160,32,0.25) 100%)',
            border: '1px solid rgba(201, 168, 76, 0.6)',
            color: '#c9a84c',
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.2em',
            borderRadius: '2px',
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse">◎</span> ANALYSE EN COURS...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              ↑ TRANSMETTRE AU QG
            </span>
          )}
        </button>

        {error && (
          <p
            className="text-sm text-center"
            style={{ color: '#f87171', fontFamily: 'monospace' }}
          >
            ERREUR : {error}
          </p>
        )}
      </div>

      {/* Feedback — débrief d'équipe */}
      {feedback && (
        <div className="space-y-3">
          <div
            className="text-xs uppercase tracking-widest px-1"
            style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
          >
            DÉBRIEF QG — ANALYSE REÇUE
          </div>

          {feedbackCards.map((card, i) => (
            <div
              key={card.key}
              className="rounded-sm p-4"
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                opacity: i < visibleCards ? 1 : 0,
                transform: i < visibleCards ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 flex items-center justify-center text-xs font-black rounded-sm"
                  style={{
                    background: `${card.border}`,
                    color: '#fff',
                    fontFamily: 'monospace',
                  }}
                >
                  {card.icon}
                </span>
                <p
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: card.color, fontFamily: 'monospace' }}
                >
                  {card.label}
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(232, 240, 255, 0.85)' }}>
                {feedback[card.key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
