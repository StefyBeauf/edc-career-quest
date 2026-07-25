'use client'

import { useState, useCallback, useEffect } from 'react'
import { situations, Situation } from '@/lib/content/univers1'
import ExerciseStepper from '../shared/ExerciseStepper'
import ExerciseHeader from '../shared/ExerciseHeader'
import ProductionLivrable from '../shared/ProductionLivrable'
import TourDeControleAppel from '../shared/TourDeControleAppel'

// Situations à forte nuance (contexte, degré de gravité, marge de manœuvre) — réservées à l'exercice 3
const IDS_NUANCEES = [4, 8, 12, 17, 26, 39, 42, 49]
const situationsNuancees = situations.filter(s => IDS_NUANCEES.includes(s.id))

type StepDef = { n: 1 | 2 | 3; label: string; badge: '✅' | '🛫' }
const STEPS: StepDef[] = [
  { n: 1, label: 'Portique 1', badge: '✅' },
  { n: 2, label: 'Portique 2', badge: '✅' },
  { n: 3, label: 'Débriefing', badge: '🛫' },
]

function tirerSituation(exclure: number[]): Situation {
  const dispo = situations.filter(s => !exclure.includes(s.id))
  const pool = dispo.length > 0 ? dispo : situations
  return pool[Math.floor(Math.random() * pool.length)]
}

function PortiqueExercice({
  numero, situation, reponse, onRepondre, onSuivant,
}: {
  numero: 1 | 2
  situation: Situation
  reponse: 'A' | 'B' | 'C' | null
  onRepondre: (opt: 'A' | 'B' | 'C') => void
  onSuivant: () => void
}) {
  const options: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']
  const getOption = (opt: 'A' | 'B' | 'C') => opt === 'A' ? situation.optionA : opt === 'B' ? situation.optionB : situation.optionC
  const getFeedback = (opt: 'A' | 'B' | 'C') => opt === 'A' ? situation.feedbackA : opt === 'B' ? situation.feedbackB : situation.feedbackC

  return (
    <div className="space-y-4">
      <ExerciseHeader
        numero={numero}
        titre={`Portique ${numero}`}
        consigne="Discutez en équipage puis choisissez votre réaction."
        mode="cdb"
      />

      <div className="rounded-2xl overflow-hidden">
        <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(90deg, rgba(239,68,68,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(239,68,68,0.2)' }}>
          <span>⚠️</span>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#fca5a5' }}>Incident en vol</p>
        </div>
        <div className="px-5 py-5" style={{ background: 'linear-gradient(135deg, rgba(26,39,68,0.95), rgba(15,30,61,0.95))', border: '1px solid rgba(239,68,68,0.15)', borderTop: 'none' }}>
          <p className="text-white text-base font-semibold leading-relaxed">{situation.situation}</p>
        </div>
      </div>

      <div className="space-y-2">
        {options.map(opt => {
          let style: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.85)' }
          if (reponse !== null) {
            if (opt === situation.bonneOption) style = { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.4)', color: '#6ee7b7' }
            else if (opt === reponse) style = { background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }
            else style = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(245,240,232,0.3)' }
          }
          return (
            <button key={opt} onClick={() => onRepondre(opt)} disabled={reponse !== null} className="w-full text-left rounded-xl px-5 py-4 transition-all" style={style}>
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c' }}>{opt}</span>
                <span className="text-sm leading-relaxed pt-1">{getOption(opt)}</span>
              </div>
            </button>
          )
        })}
      </div>

      {reponse && (
        <div className="space-y-3">
          <div className="rounded-2xl p-4" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.85)' }}>{getFeedback(reponse)}</p>
          </div>
          <ProductionLivrable>
            La situation tirée, la réaction choisie par votre équipage et le conseil clé retenu.
          </ProductionLivrable>
          <button onClick={onSuivant} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
            Contrôle passé →
          </button>
        </div>
      )}
    </div>
  )
}

export default function CP5_Situations() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  const [situation1, setSituation1] = useState<Situation | null>(null)
  const [reponse1, setReponse1] = useState<'A' | 'B' | 'C' | null>(null)

  const [situation2, setSituation2] = useState<Situation | null>(null)
  const [reponse2, setReponse2] = useState<'A' | 'B' | 'C' | null>(null)

  const [situation3, setSituation3] = useState<Situation | null>(null)

  // Tirages aléatoires effectués côté client uniquement, après montage (évite un écart de rendu serveur/client)
  useEffect(() => {
    setSituation1(tirerSituation([]))
    setSituation3(situationsNuancees[Math.floor(Math.random() * situationsNuancees.length)])
  }, [])
  const [reponseEquipage, setReponseEquipage] = useState('')
  const [appele, setAppele] = useState(false)

  const demarrerSituation2 = useCallback(() => {
    setSituation2(tirerSituation(situation1 ? [situation1.id] : []))
  }, [situation1])

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 5 — Passer les contrôles
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Posture professionnelle</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Contrôle de sûreté — chaque situation est un portique à passer
        </p>
      </div>

      <ExerciseStepper etape={etape} steps={STEPS} />

      {etape === 1 && (
        situation1 ? (
          <PortiqueExercice
            numero={1}
            situation={situation1}
            reponse={reponse1}
            onRepondre={setReponse1}
            onSuivant={() => { demarrerSituation2(); setEtape(2) }}
          />
        ) : (
          <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>Tirage de la situation…</p>
          </div>
        )
      )}

      {etape === 2 && situation2 && (
        <PortiqueExercice
          numero={2}
          situation={situation2}
          reponse={reponse2}
          onRepondre={setReponse2}
          onSuivant={() => setEtape(3)}
        />
      )}

      {etape === 3 && situation3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Débriefing d'équipage"
            consigne="Cette situation n'a pas de bonne réponse unique. Construisez votre position en équipage."
            mode="tdc"
          />

          <div className="rounded-2xl overflow-hidden">
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(90deg, rgba(243,156,18,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(243,156,18,0.25)' }}>
              <span>🧭</span>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f39c12' }}>Situation à nuancer</p>
            </div>
            <div className="px-5 py-5" style={{ background: 'linear-gradient(135deg, rgba(26,39,68,0.95), rgba(15,30,61,0.95))', border: '1px solid rgba(243,156,18,0.15)', borderTop: 'none' }}>
              <p className="text-white text-base font-semibold leading-relaxed">{situation3.situation}</p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Réponse argumentée de l&apos;équipage</p>
            <textarea value={reponseEquipage} onChange={e => setReponseEquipage(e.target.value)} rows={4} placeholder="Que décidez-vous de faire, et pourquoi ?"
              className="w-full rounded-lg p-2.5 text-sm bg-transparent resize-none outline-none" style={{ color: 'rgba(245,240,232,0.85)', border: '1px solid rgba(201,168,76,0.2)' }} />
          </div>

          <ProductionLivrable>
            La situation choisie et la réaction argumentée de votre équipage, rédigée ci-dessus.
          </ProductionLivrable>

          <TourDeControleAppel
            appele={appele}
            onAppeler={() => setAppele(true)}
            texteAttente="Votre équipage a construit sa position. L'intervenante va apporter la nuance de contexte que l'application ne peut pas objectiver."
          />
        </div>
      )}
    </div>
  )
}
