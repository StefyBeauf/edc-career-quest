'use client'

import { useState } from 'react'
import {
  contextesReunion, exemplesOrdresDuJour, CHAMPS_ORDRE_DU_JOUR,
  type ContexteReunion, type ExempleOrdreDuJour,
} from '@/lib/content/univers3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import MissionHeader from './shared/MissionHeader'

const VERDICT_LABEL: Record<ExempleOrdreDuJour['verdict'], { label: string; couleur: string }> = {
  'incomplet': { label: 'Incomplet', couleur: '#c0563f' },
  'trop-charge': { label: 'Trop chargé', couleur: '#f39c12' },
  'bien-construit': { label: 'Bien construit', couleur: '#5aa37c' },
}

export default function Mission2ReunionEfficace({ total }: { total: number }) {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Recadrer une réunion floue
  const [contexte] = useState<ContexteReunion>(
    () => contextesReunion[Math.floor(Math.random() * contextesReunion.length)]
  )
  const [participantsEcartes, setParticipantsEcartes] = useState<string[]>([])
  const [valide1, setValide1] = useState(false)

  function toggleParticipant(p: string) {
    setParticipantsEcartes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  // Exercice 2 — Repérer un bon ordre du jour
  const [exempleIndex, setExempleIndex] = useState(0)
  const [reponses, setReponses] = useState<Record<string, ExempleOrdreDuJour['verdict']>>({})
  const exempleCourant = exemplesOrdresDuJour[exempleIndex]
  const reponseCourante = reponses[exempleCourant.id]

  // Exercice 3 — Rédiger l'ordre du jour (Mode 2)
  const [reponsesChamps, setReponsesChamps] = useState<Record<string, string>>({})
  const [presente, setPresente] = useState(false)

  return (
    <div className="space-y-5">
      <MissionHeader n={2} total={total} titre="Conduite de réunion efficace" objectif="Identifiez ce qui rend une réunion utile, puis rédigez vous-même un ordre du jour et un plan de réunion." />

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Recadrer', picto: '🧭' },
          { n: 2, label: 'Bon ODJ', picto: '📋' },
          { n: 3, label: 'Rédiger', picto: '✍️' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader numero={1} titre="Recadrer une réunion floue" consigne="Cette réunion a été convoquée avec un intitulé vague. Écartez les participants qui n'ont rien à y faire." mode="feedback" />

          <div className="rounded-2xl p-5 space-y-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>Convocation reçue</p>
            <p className="text-white text-sm font-semibold">&ldquo;{contexte.intituleFlou}&rdquo; — {contexte.dureeProposee} min</p>
            <p className="text-xs" style={{ color: 'rgba(200,220,255,0.5)' }}>{contexte.enjeu}</p>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(200,220,255,0.4)' }}>Participants proposés — décochez ceux qui ne sont pas utiles</p>
          <div className="space-y-2">
            {contexte.participantsProposes.map(p => {
              const ecarte = participantsEcartes.includes(p)
              return (
                <button
                  key={p}
                  onClick={() => toggleParticipant(p)}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all"
                  style={{
                    background: ecarte ? 'rgba(192,86,63,0.1)' : 'rgba(255,255,255,0.05)',
                    border: ecarte ? '1px solid rgba(192,86,63,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    color: ecarte ? 'rgba(255,180,160,0.7)' : 'white',
                    textDecoration: ecarte ? 'line-through' : 'none',
                  }}
                >
                  {ecarte ? '✗' : '✓'} {p}
                </button>
              )
            })}
          </div>

          {!valide1 ? (
            <button
              onClick={() => setValide1(true)}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
            >
              Valider ma sélection
            </button>
          ) : (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>
                Une réunion efficace ne convoque que les personnes utiles à sa décision. Discutez en binôme : votre sélection était-elle la même ?
              </p>
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
          <ExerciseHeader numero={2} titre="Repérer un bon ordre du jour" consigne="Classez chaque exemple, puis discutez-en en binôme." mode="feedback" />

          <p className="text-xs" style={{ color: 'rgba(200,220,255,0.4)' }}>
            Exemple {exempleIndex + 1} sur {exemplesOrdresDuJour.length}
          </p>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm leading-relaxed text-white">{exempleCourant.contenu}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {(Object.keys(VERDICT_LABEL) as ExempleOrdreDuJour['verdict'][]).map(v => {
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

              {exempleIndex < exemplesOrdresDuJour.length - 1 ? (
                <button
                  onClick={() => setExempleIndex(i => i + 1)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-2"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
                >
                  Exemple suivant →
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
        </div>
      )}

      {/* ═══ EXERCICE 3 — Mode 2 ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader numero={3} titre="Rédiger l'ordre du jour" consigne="À partir du contexte tiré en exercice 1, construisez votre ordre du jour et votre plan de réunion." mode="validation" />

          <div className="space-y-3">
            {CHAMPS_ORDRE_DU_JOUR.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesChamps[champ.cle] ?? ''}
                  onChange={e => setReponsesChamps(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!presente ? (
            <button
              onClick={() => setPresente(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
            >
              📋 Présenter mon ordre du jour à l&apos;intervenante
            </button>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-2xl">📋</p>
              <p className="font-black text-white">Votre plan de réunion est prêt.</p>
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
