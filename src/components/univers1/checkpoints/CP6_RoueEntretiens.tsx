'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { questionsEntretien, QuestionEntretien } from '@/lib/content/univers1'
import ExerciseStepper from '../shared/ExerciseStepper'
import ExerciseHeader from '../shared/ExerciseHeader'
import ProductionLivrable from '../shared/ProductionLivrable'
import TourDeControleAppel from '../shared/TourDeControleAppel'

const categorieStyle: Record<QuestionEntretien['categorie'], { label: string; hex: string }> = {
  motivations: { label: 'Motivations', hex: '#c9a84c' },
  parcours: { label: 'Parcours', hex: '#60a5fa' },
  competences: { label: 'Compétences', hex: '#a78bfa' },
  comportementales: { label: 'Comportementales', hex: '#34d399' },
  salaire: { label: 'Salaire & négo', hex: '#fbbf24' },
}

const CATS_EX1: QuestionEntretien['categorie'][] = ['motivations', 'parcours']
const CATS_EX2: QuestionEntretien['categorie'][] = ['competences', 'comportementales', 'salaire']
const CATS_EX3: QuestionEntretien['categorie'][] = ['comportementales', 'salaire']

function melanger<T>(arr: T[]): T[] {
  const copie = [...arr]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}

// ─── Roue canvas générique, filtrée par catégories ───
function Roue({
  categories, exclure, onResultat,
}: {
  categories: QuestionEntretien['categorie'][]
  exclure: number[]
  onResultat: (q: QuestionEntretien) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tourne, setTourne] = useState(false)
  const [angle, setAngle] = useState(0)
  const animRef = useRef<number | null>(null)
  const secteurs = categories.length
  const angleParSecteur = (2 * Math.PI) / secteurs
  const secteurColors = categories.map(c => categorieStyle[c].hex)

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
      ctx.font = 'bold 11px system-ui'
      ctx.fillText(categorieStyle[categories[i]].label, r - 10, 4)
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI)
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22)
    centerGrad.addColorStop(0, '#e8c96a')
    centerGrad.addColorStop(1, '#c9a84c')
    ctx.fillStyle = centerGrad
    ctx.fill()
    ctx.strokeStyle = '#0f1e3d'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#0f1e3d'
    ctx.font = 'bold 13px system-ui'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', cx, cy)
  }, [secteurs, angleParSecteur, categories, secteurColors])

  useEffect(() => { drawWheel(angle) }, [angle, drawWheel])
  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current) }, [])

  function lancer() {
    if (tourne) return
    setTourne(true)

    const pool = questionsEntretien.filter(q => categories.includes(q.categorie))
    const dispo = pool.filter(q => !exclure.includes(q.id))
    const tirage = (dispo.length > 0 ? dispo : pool)[Math.floor(Math.random() * (dispo.length > 0 ? dispo.length : pool.length))]

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
        onResultat(tirage)
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute top-1/2 -right-3 z-10" style={{ transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '20px solid #e8c96a', filter: 'drop-shadow(0 0 6px rgba(232,201,106,0.5))' }} />
        <canvas ref={canvasRef} width={220} height={220} className="rounded-full" style={{ display: 'block', boxShadow: '0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.4)' }} />
      </div>
      <button onClick={lancer} disabled={tourne} className="px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
        style={{ backgroundColor: tourne ? 'rgba(201,168,76,0.3)' : '#c9a84c', color: tourne ? 'rgba(245,240,232,0.5)' : '#0f1e3d', cursor: tourne ? 'wait' : 'pointer' }}>
        {tourne ? 'La roue tourne…' : 'Faire tourner la roue'}
      </button>
    </div>
  )
}

type StepDef = { n: 1 | 2 | 3; label: string; badge: '✅' | '🛫' }
const STEPS: StepDef[] = [
  { n: 1, label: 'Bonne amorce', badge: '✅' },
  { n: 2, label: 'Repère le piège', badge: '✅' },
  { n: 3, label: 'Entretien à blanc', badge: '🛫' },
]

export default function CP6_RoueEntretiens() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1
  const [q1, setQ1] = useState<QuestionEntretien | null>(null)
  const [opts1, setOpts1] = useState<string[]>([])
  const [choix1, setChoix1] = useState<string | null>(null)

  // Exercice 2
  const [q2, setQ2] = useState<QuestionEntretien | null>(null)
  const [opts2, setOpts2] = useState<string[]>([])
  const [choix2, setChoix2] = useState<string | null>(null)

  // Exercice 3
  const [q3, setQ3] = useState<QuestionEntretien | null>(null)
  const [reponsePreparee, setReponsePreparee] = useState('')
  const [appele, setAppele] = useState(false)

  function tirerOptions1(question: QuestionEntretien) {
    const autres = questionsEntretien.filter(q => CATS_EX1.includes(q.categorie) && q.id !== question.id)
    const distracteurs = melanger(autres).slice(0, 2).map(q => q.bonneAmorce)
    setOpts1(melanger([question.bonneAmorce, ...distracteurs]))
    setQ1(question)
    setChoix1(null)
  }

  function tirerOptions2(question: QuestionEntretien) {
    const autres = questionsEntretien.filter(q => CATS_EX2.includes(q.categorie) && q.id !== question.id)
    const distracteurs = melanger(autres).slice(0, 2).map(q => q.bonneAmorce)
    setOpts2(melanger([question.aEviter, ...distracteurs]))
    setQ2(question)
    setChoix2(null)
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 6 — Décollage
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Entretien de stage</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Tour de contrôle — dernière vérification avant décollage
        </p>
      </div>

      <ExerciseStepper etape={etape} steps={STEPS} />

      {/* ═══ EXERCICE 1 — Roue express : la bonne amorce ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Roue express — la bonne amorce"
            consigne="La roue tourne… quelle question tombera ? Choisissez la meilleure façon d'y répondre."
            mode="cdb"
          />

          {!q1 ? (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Roue categories={CATS_EX1} exclure={[]} onResultat={tirerOptions1} />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden">
              <div className="px-5 py-4" style={{ backgroundColor: '#080f20', borderBottom: `2px solid ${categorieStyle[q1.categorie].hex}` }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: categorieStyle[q1.categorie].hex }}>{categorieStyle[q1.categorie].label}</p>
                <p className="text-base font-bold mt-1" style={{ color: '#f5f0e8' }}>{q1.question}</p>
              </div>
              <div className="p-5 space-y-2" style={{ backgroundColor: 'rgba(13,26,51,0.6)' }}>
                {opts1.map((opt, i) => {
                  const isCorrect = choix1 !== null && opt === q1.bonneAmorce
                  const isWrong = choix1 === opt && opt !== q1.bonneAmorce
                  let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)'
                  if (choix1 !== null) {
                    if (isCorrect) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71' }
                    else if (isWrong) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c' }
                    else textColor = 'rgba(245,240,232,0.25)'
                  }
                  return (
                    <button key={i} onClick={() => setChoix1(opt)} disabled={choix1 !== null} className="w-full text-left rounded-xl px-4 py-3 text-sm italic transition-all" style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                      &ldquo;{opt}&rdquo;
                    </button>
                  )
                })}
                {choix1 !== null && (
                  <div className="space-y-3 pt-2">
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{q1.conseilReponse}</p>
                    <ProductionLivrable>
                      La meilleure amorce retenue, à personnaliser et répéter avant l&apos;entretien réel.
                    </ProductionLivrable>
                    <button onClick={() => setEtape(2)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                      Amorce validée — Exercice 2 →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 — Roue express : repère le piège ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Roue express — repère le piège"
            consigne="Une des 3 réponses est un piège classique en entretien. Sauras-tu la repérer ?"
            mode="cdb"
          />

          {!q2 ? (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Roue categories={CATS_EX2} exclure={q1 ? [q1.id] : []} onResultat={tirerOptions2} />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden">
              <div className="px-5 py-4" style={{ backgroundColor: '#080f20', borderBottom: `2px solid ${categorieStyle[q2.categorie].hex}` }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: categorieStyle[q2.categorie].hex }}>{categorieStyle[q2.categorie].label}</p>
                <p className="text-base font-bold mt-1" style={{ color: '#f5f0e8' }}>{q2.question}</p>
              </div>
              <div className="p-5 space-y-2" style={{ backgroundColor: 'rgba(13,26,51,0.6)' }}>
                {opts2.map((opt, i) => {
                  const isCorrect = choix2 !== null && opt === q2.aEviter
                  const isWrong = choix2 === opt && opt !== q2.aEviter
                  let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)'
                  if (choix2 !== null) {
                    if (isCorrect) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71' }
                    else if (isWrong) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c' }
                    else textColor = 'rgba(245,240,232,0.25)'
                  }
                  return (
                    <button key={i} onClick={() => setChoix2(opt)} disabled={choix2 !== null} className="w-full text-left rounded-xl px-4 py-3 text-sm italic transition-all" style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                      &ldquo;{opt}&rdquo;
                    </button>
                  )
                })}
                {choix2 !== null && (
                  <div className="space-y-3 pt-2">
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>Le piège à éviter était bien : &ldquo;{q2.aEviter}&rdquo;. Préférez plutôt : &ldquo;{q2.bonneAmorce}&rdquo;</p>
                    <ProductionLivrable>
                      Les pièges repérés, à ne surtout pas reproduire en entretien réel.
                    </ProductionLivrable>
                    <button onClick={() => setEtape(3)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                      Piège désamorcé — Exercice 3 →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Entretien à blanc ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Entretien à blanc"
            consigne="Dernier point de contrôle avant le décollage : l'entretien à blanc devant votre équipage."
            mode="tdc"
          />

          {!q3 ? (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Roue categories={CATS_EX3} exclure={q2 ? [q2.id] : []} onResultat={setQ3} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden">
                <div className="px-5 py-4" style={{ backgroundColor: '#080f20', borderBottom: `2px solid ${categorieStyle[q3.categorie].hex}` }}>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: categorieStyle[q3.categorie].hex }}>{categorieStyle[q3.categorie].label}</p>
                  <p className="text-base font-bold mt-1" style={{ color: '#f5f0e8' }}>{q3.question}</p>
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Résumé de la réponse préparée par l&apos;étudiant(e)</p>
                <textarea value={reponsePreparee} onChange={e => setReponsePreparee(e.target.value)} rows={4} placeholder="Un membre de l'équipage répond à voix haute, le reste du groupe résume ici…"
                  className="w-full rounded-lg p-2.5 text-sm bg-transparent resize-none outline-none" style={{ color: 'rgba(245,240,232,0.85)', border: '1px solid rgba(201,168,76,0.2)' }} />
              </div>

              <ProductionLivrable>
                La question choisie et le résumé écrit de la réponse préparée ci-dessus.
              </ProductionLivrable>

              <TourDeControleAppel
                appele={appele}
                onAppeler={() => setAppele(true)}
                texteAttente="Votre équipage a préparé sa réponse. L'intervenante va donner un retour sur la posture, le ton et la crédibilité — le décollage final vous attend."
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
