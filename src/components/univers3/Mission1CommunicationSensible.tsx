'use client'

import { useState } from 'react'
import {
  situationsCommunication, exemplesFormulationsSensibles,
  type SituationCommunication, type ExempleFormulation,
} from '@/lib/content/univers3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import MissionHeader from './shared/MissionHeader'

const CANAUX = [
  { id: 'email', label: 'Email' },
  { id: 'message', label: 'Message écrit' },
  { id: 'appel', label: 'Appel' },
  { id: 'en personne', label: 'En personne' },
] as const

const VERDICT_LABEL: Record<ExempleFormulation['verdict'], { label: string; couleur: string }> = {
  'trop-familier': { label: 'Trop familier', couleur: '#c0563f' },
  'trop-froid': { label: 'Trop froid', couleur: '#f39c12' },
  'bien-calibre': { label: 'Bien calibré', couleur: '#5aa37c' },
}

export default function Mission1CommunicationSensible({ total }: { total: number }) {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Choisir le bon canal
  const [situation] = useState<SituationCommunication>(
    () => situationsCommunication[Math.floor(Math.random() * situationsCommunication.length)]
  )
  const [canalChoisi, setCanalChoisi] = useState<string | null>(null)

  // Exercice 2 — Repérer les formulations
  const [exempleIndex, setExempleIndex] = useState(0)
  const [reponses, setReponses] = useState<Record<string, ExempleFormulation['verdict']>>({})
  const exempleCourant = exemplesFormulationsSensibles[exempleIndex]
  const reponseCourante = reponses[exempleCourant.id]
  const exercice2Termine = Object.keys(reponses).length === exemplesFormulationsSensibles.length

  // Exercice 3 — Rédiger le message (Mode 2)
  const [message, setMessage] = useState('')
  const [presente, setPresente] = useState(false)

  return (
    <div className="space-y-5">
      <MissionHeader n={1} total={total} titre="Communication professionnelle sensible" objectif="Choisissez le bon canal, repérez les pièges de ton, puis rédigez vous-même un message professionnel sensible." />

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Bon canal', picto: '📡' },
          { n: 2, label: 'Bon ton', picto: '🎯' },
          { n: 3, label: 'Rédiger', picto: '✍️' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader numero={1} titre="Choisir le bon canal" consigne="Lisez la situation tirée au sort et choisissez le canal le plus adapté." mode="feedback" />

          <div className="rounded-2xl p-5 space-y-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>{situation.domaineLabel}</p>
            <p className="text-white text-sm leading-relaxed">{situation.contexte}</p>
            <p className="text-xs" style={{ color: 'rgba(200,220,255,0.5)' }}>Destinataire : {situation.destinataire}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CANAUX.map(c => {
              const isCorrect = canalChoisi !== null && c.id === situation.canalRecommande
              const isWrong = canalChoisi === c.id && c.id !== situation.canalRecommande
              return (
                <button
                  key={c.id}
                  onClick={() => setCanalChoisi(prev => prev ?? c.id)}
                  disabled={canalChoisi !== null}
                  className="rounded-xl py-3 px-2 text-xs font-bold text-center transition-all"
                  style={{
                    background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.05)',
                    border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: canalChoisi && !isCorrect && !isWrong ? 'rgba(255,255,255,0.25)' : 'white',
                  }}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          {canalChoisi && (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-sm font-bold" style={{ color: '#c9a84c' }}>Canal conseillé : {situation.canalRecommande}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>{situation.pourquoiCeCanal}</p>
              <button
                onClick={() => setEtape(2)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider mt-2"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
              >
                Continuer — Exercice 2 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader numero={2} titre="Repérer les pièges de ton" consigne="Classez chaque formulation, puis discutez-en en binôme." mode="feedback" />

          <p className="text-xs" style={{ color: 'rgba(200,220,255,0.4)' }}>
            Formulation {exempleIndex + 1} sur {exemplesFormulationsSensibles.length}
          </p>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm italic leading-relaxed text-white">&ldquo;{exempleCourant.texte}&rdquo;</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {(Object.keys(VERDICT_LABEL) as ExempleFormulation['verdict'][]).map(v => {
              const isCorrect = reponseCourante !== undefined && v === exempleCourant.verdict
              const isWrong = reponseCourante === v && v !== exempleCourant.verdict
              return (
                <button
                  key={v}
                  onClick={() => setReponses(prev => prev[exempleCourant.id] ? prev : { ...prev, [exempleCourant.id]: v })}
                  disabled={reponseCourante !== undefined}
                  className="rounded-xl py-2.5 px-3 text-xs font-bold text-left transition-all"
                  style={{
                    background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.05)',
                    border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: reponseCourante && !isCorrect && !isWrong ? 'rgba(255,255,255,0.25)' : 'white',
                  }}
                >
                  {VERDICT_LABEL[v].label}
                </button>
              )
            })}
          </div>

          {reponseCourante && (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-sm font-bold" style={{ color: VERDICT_LABEL[exempleCourant.verdict].couleur }}>
                Réponse : {VERDICT_LABEL[exempleCourant.verdict].label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>{exempleCourant.feedback}</p>

              {exempleIndex < exemplesFormulationsSensibles.length - 1 ? (
                <button
                  onClick={() => setExempleIndex(i => i + 1)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-2"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
                >
                  Formulation suivante →
                </button>
              ) : (
                <button
                  onClick={() => setEtape(3)}
                  className="w-full py-3 rounded-xl font-black uppercase tracking-wider mt-2"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
                >
                  Continuer — Exercice 3 →
                </button>
              )}
            </div>
          )}
          {!exercice2Termine && !reponseCourante && null}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Mode 2 ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader numero={3} titre="Rédiger le message" consigne="À partir de la situation tirée en exercice 1, rédigez le message vous-même." mode="validation" />

          <div className="rounded-2xl p-4 space-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.6)' }}>{situation.domaineLabel} — {situation.destinataire}</p>
            <p className="text-sm" style={{ color: 'rgba(200,220,255,0.7)' }}>{situation.contexte}</p>
          </div>

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Rédigez ici votre message professionnel sensible…"
            rows={6}
            className="w-full rounded-xl px-4 py-3 text-sm resize-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          />

          {!presente ? (
            <button
              onClick={() => setPresente(true)}
              disabled={message.trim().length === 0}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a', opacity: message.trim().length === 0 ? 0.4 : 1 }}
            >
              ✍️ Présenter mon message à l&apos;intervenante
            </button>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-2xl">📡</p>
              <p className="font-black text-white">Votre message est prêt.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.8)' }}>
                Présentez-le à votre intervenante pour votre notation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
