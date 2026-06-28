'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { questionsEntretien, QuestionEntretien } from '@/lib/content/univers1'

const categorieStyle: Record<QuestionEntretien['categorie'], { label: string; color: string; hex: string }> = {
  motivations: { label: 'Motivations', color: 'rgba(201,168,76,0.9)', hex: '#c9a84c' },
  parcours: { label: 'Parcours', color: 'rgba(96,165,250,0.9)', hex: '#60a5fa' },
  competences: { label: 'Compétences', color: 'rgba(167,139,250,0.9)', hex: '#a78bfa' },
  comportementales: { label: 'Comportementales', color: 'rgba(52,211,153,0.9)', hex: '#34d399' },
  salaire: { label: 'Salaire & négo', color: 'rgba(251,191,36,0.9)', hex: '#fbbf24' },
}

const secteurColors = ['#c9a84c', '#60a5fa', '#a78bfa', '#34d399', '#fbbf24']

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
    const r = cx - 6

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Cercle de fond navy
    ctx.beginPath()
    ctx.arc(cx, cy, r + 4, 0, 2 * Math.PI)
    ctx.fillStyle = '#0f1e3d'
    ctx.fill()

    // Anneau extérieur doré
    ctx.beginPath()
    ctx.arc(cx, cy, r + 4, 0, 2 * Math.PI)
    ctx.strokeStyle = 'rgba(201,168,76,0.4)'
    ctx.lineWidth = 2
    ctx.stroke()

    for (let i = 0; i < secteurs; i++) {
      const start = currentAngle + i * angleParSecteur
      const end = start + angleParSecteur

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()

      // Gradient radial par secteur
      const midAngle = start + angleParSecteur / 2
      const gx = cx + Math.cos(midAngle) * r * 0.5
      const gy = cy + Math.sin(midAngle) * r * 0.5
      const grad = ctx.createRadialGradient(gx, gy, 0, cx, cy, r)
      grad.addColorStop(0, secteurColors[i] + 'cc')
      grad.addColorStop(1, secteurColors[i] + '44')
      ctx.fillStyle = grad
      ctx.fill()

      ctx.strokeStyle = 'rgba(15,30,61,0.8)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Texte
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + angleParSecteur / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#0f1e3d'
      ctx.font = 'bold 10px system-ui'
      ctx.fillText(categorieStyle[categories[i]].label, r - 10, 4)
      ctx.restore()
    }

    // Centre boussole doré
    ctx.beginPath()
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI)
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24)
    centerGrad.addColorStop(0, '#e8c96a')
    centerGrad.addColorStop(1, '#c9a84c')
    ctx.fillStyle = centerGrad
    ctx.fill()
    ctx.strokeStyle = '#0f1e3d'
    ctx.lineWidth = 2
    ctx.stroke()

    // Symbole boussole
    ctx.fillStyle = '#0f1e3d'
    ctx.font = 'bold 14px system-ui'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', cx, cy)
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
    <div className="space-y-6">

      {/* Header */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 6 — Roue des entretiens
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">
          Contrôle de sécurité
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          100+ questions d&apos;entretien — tourne la boussole et prépare ta réponse
        </p>
      </div>

      {/* Filtres catégories */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setFiltre('toutes'); setDeja([]); setQuestion(null) }}
          className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          style={{
            backgroundColor: filtre === 'toutes' ? '#c9a84c' : 'rgba(255,255,255,0.05)',
            color: filtre === 'toutes' ? '#0f1e3d' : 'rgba(201,168,76,0.6)',
            border: `1px solid ${filtre === 'toutes' ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
          }}
        >
          Toutes
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setFiltre(cat); setDeja([]); setQuestion(null) }}
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            style={{
              backgroundColor: filtre === cat ? categorieStyle[cat].hex + '22' : 'rgba(255,255,255,0.04)',
              color: filtre === cat ? categorieStyle[cat].hex : 'rgba(245,240,232,0.4)',
              border: `1px solid ${filtre === cat ? categorieStyle[cat].hex + '66' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {categorieStyle[cat].label}
          </button>
        ))}
      </div>

      {/* Progression */}
      <div className="flex items-center gap-4">
        <span className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Questions vues : <span className="font-black" style={{ color: '#e8c96a' }}>{progression}</span>
          <span style={{ color: 'rgba(232,201,106,0.4)' }}>/{total}</span>
        </span>
        <div className="flex-1 rounded-full h-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${total > 0 ? (progression / total) * 100 : 0}%`,
              background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
            }}
          />
        </div>
      </div>

      {/* Roue boussole + bouton */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Flèche indicatrice */}
          <div
            className="absolute top-1/2 -right-3 z-10"
            style={{
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '20px solid #e8c96a',
              filter: 'drop-shadow(0 0 6px rgba(232,201,106,0.5))',
            }}
          />
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="rounded-full"
            style={{
              display: 'block',
              boxShadow: '0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          />
        </div>

        <button
          onClick={lancer}
          disabled={tourne}
          className="px-10 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
          style={{
            backgroundColor: tourne ? 'rgba(201,168,76,0.3)' : '#c9a84c',
            color: tourne ? 'rgba(245,240,232,0.5)' : '#0f1e3d',
            cursor: tourne ? 'wait' : 'pointer',
            boxShadow: tourne ? 'none' : '0 4px 20px rgba(201,168,76,0.3)',
          }}
        >
          {tourne ? 'La boussole tourne…' : 'Lancer la boussole'}
        </button>
      </div>

      {/* Question — panneau d'affichage aéroport */}
      {question && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          {/* En-tête panneau — fond sombre texte lumineux */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              backgroundColor: '#080f20',
              borderBottom: `2px solid ${categorieStyle[question.categorie].hex}`,
            }}
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: categorieStyle[question.categorie].hex }}
              >
                {categorieStyle[question.categorie].label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.3)' }}>
                Question #{question.id}
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base"
              style={{ backgroundColor: categorieStyle[question.categorie].hex + '22' }}
            >
              💬
            </div>
          </div>

          {/* Corps panneau — question lumineuse */}
          <div
            className="px-6 py-6"
            style={{ backgroundColor: '#0d1a33' }}
          >
            <p
              className="text-lg font-bold leading-relaxed"
              style={{
                color: '#f5f0e8',
                textShadow: '0 0 20px rgba(245,240,232,0.1)',
              }}
            >
              {question.question}
            </p>
          </div>

          {/* Sections conseil — style briefing pilote */}
          <div
            className="divide-y"
            style={{
              backgroundColor: 'rgba(15,30,61,0.95)',
              borderTop: '1px solid rgba(201,168,76,0.1)',
              '--tw-divide-color': 'rgba(255,255,255,0.05)',
            } as React.CSSProperties}
          >
            <div className="px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>
                ✈ Briefing pilote — Conseil de réponse
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                {question.conseilReponse}
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#fca5a5' }}>
                ✗ Zone interdite — À éviter
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                {question.aEviter}
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6ee7b7' }}>
                ✓ Bonne amorce
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.75)' }}>
                {question.bonneAmorce}
              </p>
            </div>
            <div className="px-6 py-4">
              <button
                onClick={lancer}
                disabled={tourne}
                className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'rgba(201,168,76,0.8)',
                }}
              >
                Nouvelle question →
              </button>
            </div>
          </div>
        </div>
      )}

      {!question && !tourne && (
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Lance la boussole pour tirer une question d&apos;entretien aléatoire.
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(245,240,232,0.2)' }}>
            Les questions ne se répètent pas tant que tu n&apos;as pas tout vu.
          </p>
        </div>
      )}

    </div>
  )
}
