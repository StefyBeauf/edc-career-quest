'use client'

import { useState, useCallback } from 'react'
import { questionsBoussole } from '@/lib/content/univers2-b2'

export default function Mission1Boussole() {
  const [vues, setVues] = useState<number[]>([])
  const [question, setQuestion] = useState<string | null>(null)

  const tirer = useCallback(() => {
    const restantes = questionsBoussole.filter((_, i) => !vues.includes(i))
    const pool = restantes.length > 0 ? restantes : questionsBoussole
    const indexPool = Math.floor(Math.random() * pool.length)
    const q = pool[indexPool]
    const indexGlobal = questionsBoussole.indexOf(q)
    setQuestion(q)
    setVues(prev => restantes.length > 0 ? [...prev, indexGlobal] : [indexGlobal])
  }, [vues])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Mission 1 — Régler sa boussole</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Compétences, qualités, motivations</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Réfléchissez à vos compétences, vos qualités, vos motivations et votre projet.</p>
      </div>

      <button
        onClick={tirer}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🎲</span>
        <span>Nouvelle question</span>
      </button>

      {question && (
        <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
          <p className="text-2xl mb-3">🧭</p>
          <p className="text-white text-lg font-semibold leading-relaxed">{question}</p>
        </div>
      )}

      {vues.length >= questionsBoussole.length && (
        <p className="text-xs text-center" style={{ color: 'rgba(201,168,76,0.4)' }}>Toutes les questions ont été tirées — le cycle recommence.</p>
      )}
    </div>
  )
}
