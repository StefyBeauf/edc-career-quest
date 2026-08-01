'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ModeBadge from '../shared/ModeBadge'
import { cartesPGE1A, type ThemePGE1A, type CarteThemePGE1A } from '@/lib/content/pge1a'

const themeStyle: Record<ThemePGE1A, { label: string; hex: string }> = {
  experiences: { label: 'Expériences', hex: '#c9a84c' },
  formations: { label: 'Formations', hex: '#60a5fa' },
  disponibilite: { label: 'Disponibilité', hex: '#fbbf24' },
  personnalite: { label: 'Personnalité', hex: '#34d399' },
  langues: { label: 'Langues', hex: '#f472b6' },
  informatique: { label: 'Informatique', hex: '#a78bfa' },
}

const TOUS_THEMES: ThemePGE1A[] = ['experiences', 'formations', 'disponibilite', 'personnalite', 'langues', 'informatique']

// ─── Roue canvas — 6 secteurs, un par thème ───
function Roue({ onResultat }: { onResultat: (theme: ThemePGE1A, carte: CarteThemePGE1A) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tourne, setTourne] = useState(false)
  const [angle, setAngle] = useState(0)
  const animRef = useRef<number | null>(null)
  const secteurs = TOUS_THEMES.length
  const angleParSecteur = (2 * Math.PI) / secteurs
  const secteurColors = TOUS_THEMES.map(t => themeStyle[t].hex)

  const drawWheel = useCallback((currentAngle: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = cx - 6

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(cx, cy, r + 4, 0, 2 * Math.PI)
    ctx.fillStyle = '#0f1e3d'
    ctx.fill()
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

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + angleParSecteur / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#0f1e3d'
      ctx.font = 'bold 10px system-ui'
      ctx.fillText(themeStyle[TOUS_THEMES[i]].label, r - 10, 4)
      ctx.restore()
    }

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
    ctx.fillStyle = '#0f1e3d'
    ctx.font = 'bold 14px system-ui'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', cx, cy)
  }, [secteurs, angleParSecteur, secteurColors])

  useEffect(() => { drawWheel(angle) }, [angle, drawWheel])
  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current) }, [])

  function lancer() {
    if (tourne) return
    setTourne(true)

    const theme = TOUS_THEMES[Math.floor(Math.random() * TOUS_THEMES.length)]
    const pool = cartesPGE1A[theme]
    const carte = pool[Math.floor(Math.random() * pool.length)]

    const tours = 4 + Math.random() * 3
    const finalAngle = angle + tours * 2 * Math.PI
    const duration = 2200
    const start = performance.now()
    const startAngle = angle

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startAngle + (finalAngle - startAngle) * eased
      setAngle(current)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setAngle(finalAngle % (2 * Math.PI))
        setTourne(false)
        onResultat(theme, carte)
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute top-1/2 -right-3 z-10" style={{ transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '20px solid #e8c96a', filter: 'drop-shadow(0 0 6px rgba(232,201,106,0.5))' }} />
        <canvas ref={canvasRef} width={260} height={260} className="rounded-full" style={{ display: 'block', boxShadow: '0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.4)' }} />
      </div>
      <button onClick={lancer} disabled={tourne} className="px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
        style={{ backgroundColor: tourne ? 'rgba(201,168,76,0.3)' : '#c9a84c', color: tourne ? 'rgba(245,240,232,0.5)' : '#0f1e3d', cursor: tourne ? 'wait' : 'pointer' }}>
        {tourne ? 'La roue tourne…' : 'Faire tourner la roue'}
      </button>
    </div>
  )
}

function QuestionCard({ theme, carte }: { theme: ThemePGE1A; carte: CarteThemePGE1A }) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="px-5 py-4" style={{ backgroundColor: '#080f20', borderBottom: `2px solid ${themeStyle[theme].hex}` }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: themeStyle[theme].hex }}>{themeStyle[theme].label}</p>
        <p className="text-base font-bold mt-1" style={{ color: '#f5f0e8' }}>{carte.question}</p>
      </div>
    </div>
  )
}

function ConseilPanel({ carte }: { carte: CarteThemePGE1A }) {
  return (
    <div className="rounded-2xl overflow-hidden divide-y" style={{ backgroundColor: 'rgba(15,30,61,0.95)', border: '1px solid rgba(255,255,255,0.08)', '--tw-divide-color': 'rgba(255,255,255,0.05)' } as React.CSSProperties}>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>✈ Conseil de réponse</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.conseilReponse}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#fca5a5' }}>✗ À éviter</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.aEviter}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6ee7b7' }}>✓ Bonne amorce</p>
        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.bonneAmorce}</p>
      </div>
    </div>
  )
}

export default function CP3_RoueEntretiens() {
  const [tirages, setTirages] = useState<{ theme: ThemePGE1A; carte: CarteThemePGE1A }[]>([])
  const [reponseTentative, setReponseTentative] = useState('')
  const [reponseRevelee, setReponseRevelee] = useState(false)

  const dernierTirage = tirages[tirages.length - 1] ?? null

  function nouveauTirage(theme: ThemePGE1A, carte: CarteThemePGE1A) {
    setTirages(prev => [...prev, { theme, carte }])
    setReponseTentative('')
    setReponseRevelee(false)
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 3 — Décollage
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Entretien de stage</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Préparez votre recherche de stage de fin de PGE1
        </p>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">Roue de l&apos;entretien</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
            Faites tourner la roue avec votre binôme, proposez votre réponse, puis découvrez le conseil.
          </p>
        </div>
        <ModeBadge mode="cdb" />
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Roue onResultat={nouveauTirage} />
      </div>

      {dernierTirage && (
        <div className="space-y-4">
          <QuestionCard theme={dernierTirage.theme} carte={dernierTirage.carte} />

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Votre réponse (à l&apos;oral, résumée ici)</p>
            <textarea
              value={reponseTentative}
              onChange={e => setReponseTentative(e.target.value)}
              disabled={reponseRevelee}
              rows={3}
              placeholder="Un membre du binôme répond à voix haute, l'autre résume ici avant de voir le conseil…"
              className="w-full rounded-lg p-2.5 text-sm bg-transparent resize-none outline-none disabled:opacity-60"
              style={{ color: 'rgba(245,240,232,0.85)', border: '1px solid rgba(201,168,76,0.2)' }}
            />
          </div>

          {!reponseRevelee ? (
            <button onClick={() => setReponseRevelee(true)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
              Voir le conseil de réponse →
            </button>
          ) : (
            <ConseilPanel carte={dernierTirage.carte} />
          )}
        </div>
      )}
    </div>
  )
}
