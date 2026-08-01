'use client'

import { useState } from 'react'
import ExerciseStepper from '../shared/ExerciseStepper'
import ExerciseHeader from '../shared/ExerciseHeader'
import TourDeControleAppel from '../shared/TourDeControleAppel'
import { diagnosticEnvoiPGE1A, formulesMailPGE1A, criteresCoherencePGE1A } from '@/lib/content/pge1a'

type StepDef = { n: 1 | 2 | 3; label: string; badge: '✅' | '🛫' }
const STEPS: StepDef[] = [
  { n: 1, label: 'Diagnostic envoi', badge: '✅' },
  { n: 2, label: 'Bonne formule', badge: '✅' },
  { n: 3, label: 'Ma candidature', badge: '🛫' },
]

export default function CP2_RedigerEnvoyer() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1
  const [ex1Index, setEx1Index] = useState(0)
  const [ex1Reponse, setEx1Reponse] = useState<boolean | null>(null)
  const [ex1Termine, setEx1Termine] = useState(false)

  // Exercice 2
  const [ex2Index, setEx2Index] = useState(0)
  const [ex2Choix, setEx2Choix] = useState<string | null>(null)
  const [ex2Termine, setEx2Termine] = useState(false)
  const [ex2Ordre] = useState(() =>
    formulesMailPGE1A.map(r => {
      const options = [
        { texte: r.bon, correct: true },
        { texte: r.faible, correct: false },
        { texte: r.moyen, correct: false },
      ]
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[options[i], options[j]] = [options[j], options[i]]
      }
      return options
    })
  )

  // Exercice 3
  const [criteres, setCriteres] = useState<boolean[]>(Array(criteresCoherencePGE1A.length).fill(false))
  const [appele, setAppele] = useState(false)

  const affirmation = diagnosticEnvoiPGE1A[ex1Index]
  const item = formulesMailPGE1A[ex2Index]
  const optionsEx2 = ex2Ordre[ex2Index]

  function repondreEx1(rep: boolean) {
    if (ex1Reponse !== null) return
    setEx1Reponse(rep)
  }

  function suivantEx1() {
    if (ex1Index < diagnosticEnvoiPGE1A.length - 1) {
      setEx1Index(i => i + 1)
      setEx1Reponse(null)
    } else {
      setEx1Termine(true)
    }
  }

  function choisirEx2(texte: string) {
    if (ex2Choix !== null) return
    setEx2Choix(texte)
  }

  function suivantEx2() {
    if (ex2Index < formulesMailPGE1A.length - 1) {
      setEx2Index(i => i + 1)
      setEx2Choix(null)
    } else {
      setEx2Termine(true)
    }
  }

  function toggleCritere(i: number) {
    setCriteres(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 2 — Finaliser sa candidature
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Rédiger et envoyer</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Votre candidature avant envoi — cabinet, grand groupe ou PME
        </p>
      </div>

      <ExerciseStepper etape={etape} steps={STEPS} />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Diagnostic envoi"
            consigne="Votre candidature doit être irréprochable avant l'envoi. Vrai ou Faux ?"
            mode="cdb"
          />

          {!ex1Termine ? (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>Affirmation {ex1Index + 1} sur {diagnosticEnvoiPGE1A.length}</p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(ex1Index / diagnosticEnvoiPGE1A.length) * 100}%`, background: '#c9a84c' }} />
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <p className="text-base font-semibold text-white leading-relaxed">{affirmation.texte}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: 'Vrai', val: true }, { label: 'Faux', val: false }].map(({ label, val }) => {
                    const isCorrect = ex1Reponse !== null && val === affirmation.reponse
                    const isWrong = ex1Reponse === val && val !== affirmation.reponse
                    let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)', prefix = ''
                    if (ex1Reponse !== null) {
                      if (isCorrect) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71'; prefix = '✓ ' }
                      else if (isWrong) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c'; prefix = '✗ ' }
                      else textColor = 'rgba(245,240,232,0.25)'
                    }
                    return (
                      <button key={label} onClick={() => repondreEx1(val)} disabled={ex1Reponse !== null}
                        className="rounded-xl py-3 px-3 text-sm font-bold transition-all text-center"
                        style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                        {prefix}{label}
                      </button>
                    )
                  })}
                </div>
                {ex1Reponse !== null && (
                  <div className="mt-4 rounded-xl p-4 space-y-3" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <div className="flex items-center gap-2">
                      <span>{ex1Reponse === affirmation.reponse ? '✅' : '❌'}</span>
                      <span className="text-sm font-bold" style={{ color: ex1Reponse === affirmation.reponse ? '#2ecc71' : '#e74c3c' }}>
                        {ex1Reponse === affirmation.reponse ? 'Bonne réponse !' : `La bonne réponse était : ${affirmation.reponse ? 'Vrai' : 'Faux'}`}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>{affirmation.explication}</p>
                    <button onClick={suivantEx1} className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider" style={{ background: '#c9a84c', color: '#0f1e3d' }}>
                      {ex1Index < diagnosticEnvoiPGE1A.length - 1 ? 'Affirmation suivante →' : 'Terminer le diagnostic →'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Diagnostic terminé</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
                Échangez avec votre binôme sur la règle d&apos;envoi la plus utile à retenir.
              </p>
              <button onClick={() => setEtape(2)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                Diagnostic fait — Exercice 2 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Bonne formule, mauvaise formule"
            consigne="Le recruteur ouvre des dizaines de mails par jour. Laquelle de ces formules donnera envie d'ouvrir le vôtre ?"
            mode="cdb"
          />

          {!ex2Termine ? (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>Mail {ex2Index + 1} sur {formulesMailPGE1A.length}</p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(ex2Index / formulesMailPGE1A.length) * 100}%`, background: '#c9a84c' }} />
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.65)' }}>{item.contexte}</p>
                </div>

                <div className="space-y-2">
                  {optionsEx2.map((opt, i) => {
                    const isCorrect = ex2Choix !== null && opt.correct
                    const isWrong = ex2Choix === opt.texte && !opt.correct
                    let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)'
                    if (ex2Choix !== null) {
                      if (isCorrect) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71' }
                      else if (isWrong) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c' }
                      else textColor = 'rgba(245,240,232,0.25)'
                    }
                    return (
                      <button key={i} onClick={() => choisirEx2(opt.texte)} disabled={ex2Choix !== null}
                        className="w-full text-left rounded-xl py-3 px-4 text-sm transition-all"
                        style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                        {opt.texte}
                      </button>
                    )
                  })}
                </div>

                {ex2Choix !== null && (
                  <div className="mt-4 rounded-xl p-4 space-y-3" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>{item.explication}</p>
                    <button onClick={suivantEx2} className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider" style={{ background: '#c9a84c', color: '#0f1e3d' }}>
                      {ex2Index < formulesMailPGE1A.length - 1 ? 'Mail suivant →' : 'Terminer l\'exercice →'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice terminé</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
                Retenez les meilleures formules, réutilisables dans votre propre mail de candidature.
              </p>
              <button onClick={() => setEtape(3)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                Formules prêtes — Exercice 3 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Ma candidature réelle"
            consigne="Votre candidature est-elle prête à être envoyée ? Vérifiez-la avec votre binôme, puis demandez la validation de l'intervenante."
            mode="tdc"
          />

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="px-5 py-3" style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>À vérifier avant l&apos;appel</p>
            </div>
            <div className="p-5 space-y-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              {criteresCoherencePGE1A.map((label, i) => (
                <button key={i} onClick={() => toggleCritere(i)} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                  style={{ background: criteres[i] ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${criteres[i] ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: criteres[i] ? '#c9a84c' : 'transparent', border: `2px solid ${criteres[i] ? '#c9a84c' : 'rgba(255,255,255,0.2)'}` }}>
                    {criteres[i] && <span className="text-xs font-black" style={{ color: '#0f1e3d' }}>✓</span>}
                  </span>
                  <span className="text-sm" style={{ color: criteres[i] ? '#e8c96a' : 'rgba(245,240,232,0.6)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <TourDeControleAppel
            appele={appele}
            onAppeler={() => setAppele(true)}
            texteAttente="Votre binôme a préparé sa candidature. Votre intervenante va valider sa cohérence globale et sa personnalisation pour l'offre visée."
          />
        </div>
      )}
    </div>
  )
}
