'use client'

import { useState, useCallback } from 'react'
import { situations, Situation } from '@/lib/content/univers1'

export default function CP5_Situations() {
  const [vues, setVues] = useState<number[]>([])
  const [situationActuelle, setSituationActuelle] = useState<Situation | null>(null)
  const [reponseChoisie, setReponseChoisie] = useState<'A' | 'B' | 'C' | null>(null)
  const [demarree, setDemarree] = useState(false)

  const piocherSituation = useCallback(() => {
    const nonVues = situations.filter(s => !vues.includes(s.id))
    if (nonVues.length === 0) {
      setVues([])
      const tirage = situations[Math.floor(Math.random() * situations.length)]
      setSituationActuelle(tirage)
      setVues([tirage.id])
    } else {
      const tirage = nonVues[Math.floor(Math.random() * nonVues.length)]
      setSituationActuelle(tirage)
      setVues(prev => [...prev, tirage.id])
    }
    setReponseChoisie(null)
    setDemarree(true)
  }, [vues])

  function choisirReponse(option: 'A' | 'B' | 'C') {
    if (reponseChoisie !== null) return
    setReponseChoisie(option)
  }

  const getFeedback = (option: 'A' | 'B' | 'C') => {
    if (!situationActuelle) return ''
    if (option === 'A') return situationActuelle.feedbackA
    if (option === 'B') return situationActuelle.feedbackB
    return situationActuelle.feedbackC
  }

  const getOption = (option: 'A' | 'B' | 'C') => {
    if (!situationActuelle) return ''
    if (option === 'A') return situationActuelle.optionA
    if (option === 'B') return situationActuelle.optionB
    return situationActuelle.optionC
  }

  const options: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']

  function getOptionStyle(option: 'A' | 'B' | 'C'): React.CSSProperties {
    if (reponseChoisie === null) {
      return {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'rgba(245,240,232,0.85)',
      }
    }
    if (option === situationActuelle?.bonneOption) {
      return {
        background: 'rgba(52,211,153,0.12)',
        border: '1px solid rgba(52,211,153,0.4)',
        color: '#6ee7b7',
      }
    }
    if (option === reponseChoisie && option !== situationActuelle?.bonneOption) {
      return {
        background: 'rgba(248,113,113,0.12)',
        border: '1px solid rgba(248,113,113,0.4)',
        color: '#fca5a5',
      }
    }
    return {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      color: 'rgba(245,240,232,0.3)',
    }
  }

  const progression = Math.min(vues.length, situations.length)

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
          Checkpoint 5 — Situations pro
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">
          Passer les contrôles
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Comment réagirais-tu dans ces situations de stage ?
        </p>
      </div>

      {/* Progression */}
      <div
        className="rounded-xl px-4 py-3 flex items-center gap-4"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        <span className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>Situations vues</span>
        <span className="font-black" style={{ color: '#e8c96a' }}>
          {progression}
          <span style={{ color: 'rgba(232,201,106,0.4)' }}>/{situations.length}</span>
        </span>
        <div className="flex-1 rounded-full h-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${(progression / situations.length) * 100}%`,
              background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
            }}
          />
        </div>
      </div>

      {!demarree ? (
        /* Écran de démarrage */
        <div
          className="rounded-2xl p-8 text-center space-y-5"
          style={{
            background: 'linear-gradient(135deg, rgba(15,30,61,0.8) 0%, rgba(26,39,68,0.8) 100%)',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            ✈️
          </div>
          <div>
            <p className="text-white font-black text-lg uppercase tracking-wide">
              50 situations professionnelles
            </p>
            <p className="text-sm mt-2" style={{ color: 'rgba(245,240,232,0.5)' }}>
              À chaque tirage, une situation inédite du monde du stage. Choisis ta réponse et découvre ce qu&apos;un professionnel ferait.
            </p>
          </div>
          <button
            onClick={piocherSituation}
            className="px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
            style={{ backgroundColor: '#c9a84c', color: '#0f1e3d' }}
          >
            Tirer une situation
          </button>
        </div>
      ) : situationActuelle && (
        <div className="space-y-4">
          {/* Situation — style incident en vol */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 4px 24px rgba(239,68,68,0.08)',
            }}
          >
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                background: 'linear-gradient(90deg, rgba(239,68,68,0.15), rgba(201,168,76,0.1))',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <span>⚠️</span>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#fca5a5' }}>
                Incident en vol — Situation #{progression}
              </p>
            </div>
            <div
              className="px-5 py-5"
              style={{
                background: 'linear-gradient(135deg, rgba(26,39,68,0.95), rgba(15,30,61,0.95))',
                border: '1px solid rgba(239,68,68,0.15)',
                borderTop: 'none',
              }}
            >
              <p className="text-white text-base font-semibold leading-relaxed">
                {situationActuelle.situation}
              </p>
            </div>
          </div>

          {/* Options — style protocoles de sécurité */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: 'rgba(201,168,76,0.6)' }}>
              Protocoles disponibles
            </p>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => choisirReponse(opt)}
                className="w-full text-left rounded-xl px-5 py-4 transition-all"
                style={getOptionStyle(opt)}
              >
                <div className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      backgroundColor: 'rgba(201,168,76,0.12)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: '#c9a84c',
                    }}
                  >
                    {opt}
                  </span>
                  <span className="text-sm leading-relaxed pt-1">{getOption(opt)}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback — style rapport de l'équipage */}
          {reponseChoisie && (
            <div className="space-y-3">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <span style={{ color: '#c9a84c' }}>📋</span>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
                    Rapport de l&apos;équipage
                  </p>
                </div>
                <div className="p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {options.map(opt => (
                    <div
                      key={opt}
                      className="rounded-xl p-4"
                      style={{
                        background: opt === situationActuelle.bonneOption
                          ? 'rgba(52,211,153,0.08)'
                          : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${opt === situationActuelle.bonneOption ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                          style={{
                            backgroundColor: opt === situationActuelle.bonneOption ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                            color: opt === situationActuelle.bonneOption ? '#6ee7b7' : 'rgba(245,240,232,0.3)',
                          }}
                        >
                          {opt}
                        </span>
                        {opt === situationActuelle.bonneOption && (
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6ee7b7' }}>
                            Meilleure réponse
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: opt === situationActuelle.bonneOption ? 'rgba(245,240,232,0.9)' : 'rgba(245,240,232,0.4)' }}
                      >
                        {getFeedback(opt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={piocherSituation}
                className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
                style={{ backgroundColor: '#c9a84c', color: '#0f1e3d' }}
              >
                Situation suivante →
              </button>
            </div>
          )}
        </div>
      )}

      {vues.length >= situations.length && (
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: 'rgba(52,211,153,0.06)',
            border: '1px solid rgba(52,211,153,0.25)',
          }}
        >
          <p className="font-black uppercase tracking-wider" style={{ color: '#6ee7b7' }}>
            ✓ Toutes les situations ont été vues !
          </p>
          <p className="text-sm mt-2" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Le cycle recommence avec de nouveaux tirages.
          </p>
        </div>
      )}
    </div>
  )
}
