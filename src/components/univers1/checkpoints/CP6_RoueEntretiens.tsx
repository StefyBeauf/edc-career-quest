'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { questionsEntretien, QuestionEntretien } from '@/lib/content/univers1'

const categorieStyle: Record<QuestionEntretien['categorie'], { label: string; color: string; bg: string }> = {
  motivations: { label: 'Motivations', color: 'text-sky-300', bg: 'bg-sky-500/20 border-sky-400/30' },
  parcours: { label: 'Parcours', color: 'text-blue-300', bg: 'bg-blue-500/20 border-blue-400/30' },
  competences: { label: 'Compétences', color: 'text-indigo-300', bg: 'bg-indigo-500/20 border-indigo-400/30' },
  comportementales: { label: 'Comportementales', color: 'text-violet-300', bg: 'bg-violet-500/20 border-violet-400/30' },
  salaire: { label: 'Salaire & négo', color: 'text-amber-300', bg: 'bg-amber-500/20 border-amber-400/30' },
}

const secteurColors = ['#0ea5e9', '#6366f1', '#3b82f6', '#8b5cf6', '#f59e0b']

export default function CP6_RoueEntretiens() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [question, setQuestion] = useState<QuestionEntretien | null>(null)
  const [deja, setDeja] = useState<number[]>([])
  const [tourne, setTourne] = useState(false)
  const [angle, setAngle] = useState(0)
  const [filtre, setFiltre] = useState<QuestionEntretien['categorie'] | 'toutes'>('toutes')
  const animRef = useRef<number | null>(null)

  const categories: (QuestionEntretien['categorie'])[] = ['motivations', 'parcours', 'competences', 'comportementales', 'salaire']
  const secteurs = categories.length
  const angleParSecteur = (2 * Math.PI) / secteurs

  const drawWheel = useCallback((currentAngle: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = cx - 8

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < secteurs; i++) {
      const start = currentAngle + i * angleParSecteur
      const end = start + angleParSecteur

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      ctx.fillStyle = secteurColors[i]
      ctx.globalAlpha = 0.85
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + angleParSecteur / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'white'
      ctx.font = 'bold 11px system-ui'
      ctx.fillText(categorieStyle[categories[i]].label, r - 12, 4)
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI)
    ctx.fillStyle = '#0f172a'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [secteurs, angleParSecteur, categories])

  useEffect(() => {
    drawWheel(angle)
  }, [angle, drawWheel])

  function lancer() {
    if (tourne) return
    setTourne(true)
    setQuestion(null)

    const disponibles = filtre === 'toutes'
      ? questionsEntretien.filter(q => !deja.includes(q.id))
      : questionsEntretien.filter(q => q.categorie === filtre && !deja.includes(q.id))

    const pool = disponibles.length > 0 ? disponibles : (
      filtre === 'toutes' ? questionsEntretien : questionsEntretien.filter(q => q.categorie === filtre)
    )
    if (disponibles.length === 0) setDeja([])

    const tiree = pool[Math.floor(Math.random() * pool.length)]
    const tours = 4 + Math.random() * 3
    const finalAngle = angle + tours * 2 * Math.PI
    const duration = 3000
    const start = performance.now()
    const startAngle = angle

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startAngle + (finalAngle - startAngle) * eased
      setAngle(current)
      drawWheel(current)

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setAngle(finalAngle % (2 * Math.PI))
        setQuestion(tiree)
        setDeja(prev => [...prev.filter(id => id !== tiree.id), tiree.id])
        setTourne(false)
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const progression = deja.length
  const total = filtre === 'toutes' ? questionsEntretien.length : questionsEntretien.filter(q => q.categorie === filtre).length

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Roue des entretiens</h2>
        <p className="text-sky-200 text-sm">100+ questions d&apos;entretien — tourne la roue et prépare ta réponse</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setFiltre('toutes'); setDeja([]); setQuestion(null) }}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filtre === 'toutes' ? 'bg-white/20 text-white' : 'bg-white/5 text-sky-300 hover:bg-white/10'}`}
        >
          Toutes
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setFiltre(cat); setDeja([]); setQuestion(null) }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filtre === cat
                ? `${categorieStyle[cat].bg} ${categorieStyle[cat].color} border-current`
                : 'bg-white/5 border-white/10 text-sky-300 hover:bg-white/10'
            }`}
          >
            {categorieStyle[cat].label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sky-400 text-sm">Questions vues : <span className="text-white font-bold">{progression} / {total}</span></span>
        <div className="flex-1 min-w-32">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-sky-400 to-indigo-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${total > 0 ? (progression / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="rounded-full"
            style={{ display: 'block' }}
          />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '20px solid white',
            }}
          />
        </div>

        <button
          onClick={lancer}
          disabled={tourne}
          className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
            tourne
              ? 'bg-sky-700 cursor-wait opacity-70'
              : 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20'
          }`}
        >
          {tourne ? 'La roue tourne…' : 'Lancer la roue'}
        </button>
      </div>

      {question && (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className={`px-6 py-4 border-b border-white/10 flex items-center gap-3`}>
            <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${categorieStyle[question.categorie].bg} ${categorieStyle[question.categorie].color}`}>
              {categorieStyle[question.categorie].label}
            </span>
            <span className="text-sky-400 text-xs">Question #{question.id}</span>
          </div>
          <div className="px-6 py-5 space-y-5">
            <p className="text-white text-lg font-semibold leading-relaxed">{question.question}</p>

            <div className="rounded-xl bg-sky-900/30 border border-sky-400/20 p-4">
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">Conseil de réponse</p>
              <p className="text-sky-100 text-sm leading-relaxed">{question.conseilReponse}</p>
            </div>

            <div className="rounded-xl bg-red-900/20 border border-red-400/20 p-4">
              <p className="text-xs font-bold text-red-300 uppercase tracking-wider mb-2">À éviter</p>
              <p className="text-sky-100 text-sm leading-relaxed">{question.aEviter}</p>
            </div>

            <div className="rounded-xl bg-green-900/20 border border-green-400/20 p-4">
              <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Bonne amorce</p>
              <p className="text-sky-100 text-sm leading-relaxed italic">{question.bonneAmorce}</p>
            </div>

            <button
              onClick={lancer}
              disabled={tourne}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sky-200 text-sm font-medium transition-all"
            >
              Nouvelle question
            </button>
          </div>
        </div>
      )}

      {!question && !tourne && (
        <div className="rounded-2xl bg-gradient-to-br from-sky-900/30 to-indigo-900/30 border border-sky-400/20 p-6 text-center">
          <p className="text-sky-200 text-sm">Lance la roue pour tirer une question d&apos;entretien aléatoire.</p>
          <p className="text-sky-400 text-xs mt-1">Les questions ne se répètent pas tant que tu n&apos;as pas tout vu.</p>
        </div>
      )}
    </div>
  )
}
