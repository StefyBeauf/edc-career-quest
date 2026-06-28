'use client'

import { useState } from 'react'
import type { AIFeedback } from '@/types'

interface Props {
  simulationId: string
  deliverables: string[]
}

export default function SimulationFeedbackZone({ simulationId, deliverables }: Props) {
  const [selectedDeliverable, setSelectedDeliverable] = useState(deliverables[0] ?? '')
  const [studentResponse, setStudentResponse] = useState('')
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFeedback() {
    if (!studentResponse.trim() || !selectedDeliverable) return
    setLoading(true)
    setError(null)
    setFeedback(null)

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
      setError('Impossible d\'obtenir le feedback. Réessaie.')
      setLoading(false)
      return
    }

    const data = await res.json() as AIFeedback
    setFeedback(data)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-violet-950/60 border border-violet-700/40 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4">Feedback IA sur votre livrable</h3>

        <div className="mb-4">
          <label className="text-violet-300 text-xs uppercase tracking-wider block mb-2">
            Livrable concerné
          </label>
          <select
            value={selectedDeliverable}
            onChange={e => setSelectedDeliverable(e.target.value)}
            className="w-full bg-violet-900/60 border border-violet-600/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          >
            {deliverables.map((d, i) => (
              <option key={i} value={d} className="bg-violet-900">
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-violet-300 text-xs uppercase tracking-wider block mb-2">
            Votre réponse / production
          </label>
          <textarea
            value={studentResponse}
            onChange={e => setStudentResponse(e.target.value)}
            placeholder="Collez ici votre réponse, vos notes, ou le contenu de votre livrable…"
            rows={6}
            className="w-full bg-violet-900/60 border border-violet-600/40 rounded-xl px-4 py-3 text-white text-sm placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
          />
        </div>

        <button
          onClick={handleFeedback}
          disabled={loading || !studentResponse.trim()}
          className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95"
        >
          {loading ? 'Analyse en cours…' : 'Obtenir le feedback IA ✨'}
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
        )}
      </div>

      {feedback && (
        <div className="bg-gradient-to-br from-violet-950 to-purple-950 border border-fuchsia-700/40 rounded-2xl p-5 space-y-4 shadow-xl shadow-violet-900/40">
          <h4 className="text-fuchsia-300 font-bold uppercase tracking-widest text-xs mb-2">
            Retour de votre formateur IA
          </h4>

          <div className="bg-emerald-950/40 border border-emerald-700/30 rounded-xl p-4">
            <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">Point fort</p>
            <p className="text-white/85 text-sm leading-relaxed">{feedback.pointFort}</p>
          </div>

          <div className="bg-amber-950/40 border border-amber-700/30 rounded-xl p-4">
            <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">Axe d'amélioration</p>
            <p className="text-white/85 text-sm leading-relaxed">{feedback.axeAmelioration}</p>
          </div>

          <div className="bg-blue-950/40 border border-blue-700/30 rounded-xl p-4">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">Question de réflexion</p>
            <p className="text-white/85 text-sm leading-relaxed">{feedback.questionReflexion}</p>
          </div>

          <div className="bg-red-950/40 border border-red-700/30 rounded-xl p-4">
            <p className="text-red-300 text-xs font-bold uppercase tracking-wider mb-1">Vigilance professionnelle</p>
            <p className="text-white/85 text-sm leading-relaxed">{feedback.vigilanceProfessionnelle}</p>
          </div>
        </div>
      )}
    </div>
  )
}
