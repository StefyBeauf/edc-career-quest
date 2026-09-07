'use client'

import { useState } from 'react'
import {
  questionsQuiz,
  resultatsQuiz,
  QUIZ_INTRO,
  QUIZ_PRECAUTION,
  type LettreProfil,
} from '@/lib/content/univers2-quiz'

function calculerProfilDominant(reponses: LettreProfil[]): LettreProfil {
  const scores: Record<LettreProfil, number> = { A: 0, B: 0, C: 0, D: 0 }
  reponses.forEach(lettre => { scores[lettre]++ })
  return (['A', 'B', 'C', 'D'] as LettreProfil[]).reduce((dominant, lettre) =>
    scores[lettre] > scores[dominant] ? lettre : dominant
  )
}

export default function Cours1Quiz({ onTermine }: { onTermine: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'resultat'>('intro')
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [reponses, setReponses] = useState<LettreProfil[]>([])

  const question = questionsQuiz[indexQuestion]
  const progression = ((indexQuestion) / questionsQuiz.length) * 100

  function repondre(lettre: LettreProfil) {
    const nouvellesReponses = [...reponses, lettre]
    setReponses(nouvellesReponses)
    if (indexQuestion + 1 < questionsQuiz.length) {
      setIndexQuestion(indexQuestion + 1)
    } else {
      setPhase('resultat')
    }
  }

  const profilDominant = phase === 'resultat' ? resultatsQuiz[calculerProfilDominant(reponses)] : null

  return (
    <div className="space-y-4">
      {/* ═══ INTRO ═══ */}
      {phase === 'intro' && (
        <div className="rounded-2xl p-6 space-y-4 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p className="text-3xl">🎯</p>
          <h3 className="text-lg font-black text-white uppercase tracking-wide">Mini quiz de personnalité professionnelle</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>{QUIZ_INTRO}</p>
          <button
            onClick={() => setPhase('questions')}
            className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
          >
            Commencer le quiz →
          </button>
        </div>
      )}

      {/* ═══ QUESTIONS ═══ */}
      {phase === 'questions' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progression}%`, background: 'linear-gradient(90deg, #c9a84c, #e8d080)' }}
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(201,168,76,0.7)' }}>
              Question {indexQuestion + 1} / {questionsQuiz.length}
            </p>
          </div>

          <div className="rounded-2xl p-6 space-y-4" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
            <p className="text-white text-lg font-semibold leading-relaxed">{question.texte}</p>
            <div className="space-y-2">
              {question.reponses.map(r => (
                <button
                  key={r.lettre}
                  onClick={() => repondre(r.lettre)}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.85)' }}
                >
                  {r.texte}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ RÉSULTAT ═══ */}
      {phase === 'resultat' && profilDominant && (
        <div className="rounded-2xl p-6 space-y-5" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="text-center space-y-1">
            <p className="text-4xl">{profilDominant.emoji}</p>
            <h3 className="text-xl font-black text-white uppercase tracking-wide">{profilDominant.nom}</h3>
            <p className="text-sm" style={{ color: '#c9a84c' }}>{profilDominant.traduction}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>Ce que tu apportes dans un groupe</p>
            <ul className="space-y-1.5">
              {profilDominant.apports.map(item => (
                <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'rgba(245,240,232,0.75)' }}>
                  <span style={{ color: '#c9a84c' }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>À valoriser professionnellement</p>
            <div className="flex flex-wrap gap-1.5">
              {profilDominant.valorisation.map(skill => (
                <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(90,163,124,0.12)', color: '#5aa37c' }}>{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(245,240,232,0.4)' }}>Point de vigilance</p>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>{profilDominant.vigilance}</p>
          </div>

          <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,225,160,0.85)', borderLeft: '2px solid rgba(201,168,76,0.5)', paddingLeft: '12px' }}>
            &ldquo;{profilDominant.phrase}&rdquo;
          </p>

          <div className="rounded-xl px-4 py-3 text-xs font-semibold text-center" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c' }}>
            {QUIZ_PRECAUTION}
          </div>

          <button
            onClick={onTermine}
            className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
          >
            Continuer →
          </button>
        </div>
      )}
    </div>
  )
}
