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

  function getOptionStyle(option: 'A' | 'B' | 'C') {
    if (reponseChoisie === null) return 'bg-white/5 border-white/10 text-sky-100 hover:bg-white/10'
    if (option === situationActuelle?.bonneOption) return 'bg-green-500/20 border-green-400/40 text-green-200'
    if (option === reponseChoisie && option !== situationActuelle?.bonneOption) return 'bg-red-500/20 border-red-400/40 text-red-200'
    return 'bg-white/5 border-white/10 text-sky-300 opacity-60'
  }

  const progression = Math.min(vues.length, situations.length)

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Situations professionnelles</h2>
        <p className="text-sky-200 text-sm">Comment réagirais-tu dans ces situations de stage ?</p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3">
          <span className="text-sky-400 text-sm">Situations vues</span>
          <span className="text-white font-bold">{progression} / {situations.length}</span>
        </div>
        <div className="flex-1 min-w-32">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-400 to-indigo-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progression / situations.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!demarree ? (
        <div className="rounded-2xl bg-gradient-to-br from-sky-900/50 to-indigo-900/50 border border-sky-400/20 p-8 text-center space-y-4">
          <p className="text-4xl">✈️</p>
          <p className="text-white font-semibold text-lg">50 situations professionnelles t&apos;attendent</p>
          <p className="text-sky-200 text-sm max-w-md mx-auto">
            À chaque tirage, une situation inédite du monde du stage. Choisis ta réponse et découvre ce qu&apos;un professionnel ferait.
          </p>
          <button
            onClick={piocherSituation}
            className="mt-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
          >
            Tirer une situation
          </button>
        </div>
      ) : situationActuelle && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-sky-900/40 to-indigo-900/40 border border-sky-400/20 p-6">
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">Situation #{progression}</p>
            <p className="text-white text-lg font-medium leading-relaxed">{situationActuelle.situation}</p>
          </div>

          <div className="space-y-3">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => choisirReponse(opt)}
                className={`w-full text-left rounded-xl border px-5 py-4 transition-all ${getOptionStyle(opt)}`}
              >
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    {opt}
                  </span>
                  <span className="text-sm leading-relaxed">{getOption(opt)}</span>
                </div>
              </button>
            ))}
          </div>

          {reponseChoisie && (
            <div className="space-y-3">
              {options.map(opt => (
                <div
                  key={opt}
                  className={`rounded-xl border p-4 ${
                    opt === situationActuelle.bonneOption
                      ? 'bg-green-900/20 border-green-400/30'
                      : 'bg-white/3 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${opt === situationActuelle.bonneOption ? 'text-green-300' : 'text-sky-400'}`}>
                      Option {opt} {opt === situationActuelle.bonneOption ? '— Meilleure réponse' : ''}
                    </span>
                  </div>
                  <p className="text-sky-100 text-sm leading-relaxed">{getFeedback(opt)}</p>
                </div>
              ))}

              <button
                onClick={piocherSituation}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
              >
                Situation suivante
              </button>
            </div>
          )}
        </div>
      )}

      {vues.length >= situations.length && (
        <div className="rounded-2xl bg-green-900/20 border border-green-400/30 p-6 text-center">
          <p className="text-green-300 font-semibold text-lg">Toutes les situations ont été vues !</p>
          <p className="text-sky-200 text-sm mt-2">Le cycle recommence avec de nouveaux tirages.</p>
        </div>
      )}
    </div>
  )
}
