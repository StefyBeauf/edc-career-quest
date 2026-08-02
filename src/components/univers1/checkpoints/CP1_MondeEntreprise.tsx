'use client'

import { useState } from 'react'
import { entreprisesQuiz, metiersMystere, entreprisesDestination, MetierMystere } from '@/lib/content/univers1'
import ExerciseStepper from '../shared/ExerciseStepper'

type ReponseQuiz = 'BtoB' | 'BtoC' | 'Les deux' | 'À vérifier'

const QUESTIONS_DESTINATION = [
  'Ce client est-il BtoB, BtoC ou les deux ? Justifiez votre réponse avec un exemple concret.',
  'Quel type de profil commercial cette entreprise recrute-t-elle ? (Junior/senior, terrain/sédentaire…)',
  'Quelles sont les 3 compétences les plus importantes pour un poste commercial dans ce secteur ?',
  'Quelle expérience de votre parcours étudiant pourriez-vous valoriser pour un stage dans cette entreprise ?',
  'Si vous deviez vous présenter en 30 secondes à un recruteur de cette entreprise, quel serait votre argument principal ?',
]

const REP_COLORS: Record<ReponseQuiz, { bg: string; border: string; text: string }> = {
  'BtoB':       { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.45)',  text: '#93c5fd' },
  'BtoC':       { bg: 'rgba(6,182,212,0.12)',   border: 'rgba(6,182,212,0.45)',   text: '#67e8f9' },
  'Les deux':   { bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.45)', text: '#c4b5fd' },
  'À vérifier': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.35)', text: '#fbbf24' },
}

const MODELE_COLORS = {
  'BtoB':     { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#93c5fd' },
  'BtoC':     { bg: 'rgba(6,182,212,0.12)',  border: 'rgba(6,182,212,0.35)',  text: '#67e8f9' },
  'BtoBtoC':  { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#c4b5fd' },
}

export default function CP1_MondeEntreprise() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Quiz BtoB/BtoC
  const [ex1Index, setEx1Index] = useState(0)
  const [ex1Reponse, setEx1Reponse] = useState<ReponseQuiz | null>(null)
  const [ex1Termine, setEx1Termine] = useState(false)

  // Exercice 2 — Métier mystère (tirage aléatoire entre Commercial et Conseiller de vente)
  const [ex2Metier] = useState<MetierMystere>(() =>
    metiersMystere[Math.floor(Math.random() * metiersMystere.length)]
  )
  const [ex2IndicesReveles, setEx2IndicesReveles] = useState(1)
  const [ex2Revele, setEx2Revele] = useState(false)

  // Exercice 3 — Destination entreprise
  const [ex3Entreprise] = useState(() =>
    entreprisesDestination[Math.floor(Math.random() * entreprisesDestination.length)]
  )
  const [ex3Appele, setEx3Appele] = useState(false)

  const entreprise = entreprisesQuiz[ex1Index]

  function choisirReponse(rep: ReponseQuiz) {
    if (ex1Reponse !== null) return
    setEx1Reponse(rep)
  }

  function questionSuivante() {
    if (ex1Index < entreprisesQuiz.length - 1) {
      setEx1Index(i => i + 1)
      setEx1Reponse(null)
    } else {
      setEx1Termine(true)
    }
  }

  return (
    <div className="space-y-5">

      {/* En-tête checkpoint */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 1 — Monde de l&apos;entreprise
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Comprendre le terrain</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          BtoB, BtoC et les métiers commerciaux qui recrutent
        </p>
      </div>

      {/* Navigateur d'étapes */}
      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Quiz BtoB/BtoC', badge: '✅' },
          { n: 2, label: 'Métier mystère', badge: '✅' },
          { n: 3, label: 'Destination', badge: '🛫' },
        ]}
      />

      {/* ═══════════════════════════════════
          EXERCICE 1 — Quiz BtoB / BtoC
      ════════════════════════════════════ */}
      {etape === 1 && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice 1</p>
              <h3 className="text-lg font-black text-white">Quiz BtoB / BtoC</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
                Pour chaque entreprise, discutez en équipage puis choisissez.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.3)', color: '#2ecc71' }}>
              ✅ Correction de bord
            </span>
          </div>

          {!ex1Termine ? (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Progression */}
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    Entreprise {ex1Index + 1} sur {entreprisesQuiz.length}
                  </p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(ex1Index / entreprisesQuiz.length) * 100}%`, background: '#c9a84c' }}
                  />
                </div>
              </div>

              {/* Carte entreprise */}
              <div className="px-5 pb-5">
                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <p className="text-2xl font-black text-white">{entreprise.nom}</p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(201,168,76,0.7)' }}>{entreprise.secteur}</p>
                </div>

                <p className="text-sm font-semibold text-white mb-3">Quel est son modèle commercial ?</p>

                {/* Boutons de réponse */}
                <div className="grid grid-cols-2 gap-2">
                  {(['BtoB', 'BtoC', 'Les deux', 'À vérifier'] as ReponseQuiz[]).map((rep) => {
                    const isCorrect = ex1Reponse !== null && rep === entreprise.reponse
                    const isWrong = ex1Reponse === rep && rep !== entreprise.reponse

                    let bg = 'rgba(255,255,255,0.05)'
                    let border = 'rgba(255,255,255,0.1)'
                    let textColor = 'rgba(245,240,232,0.8)'
                    let prefix = ''

                    if (ex1Reponse !== null) {
                      if (isCorrect) {
                        bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71'; prefix = '✓ '
                      } else if (isWrong) {
                        bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c'; prefix = '✗ '
                      } else {
                        textColor = 'rgba(245,240,232,0.25)'
                      }
                    }

                    return (
                      <button
                        key={rep}
                        onClick={() => choisirReponse(rep)}
                        disabled={ex1Reponse !== null}
                        className="rounded-xl py-3 px-3 text-sm font-bold transition-all text-center"
                        style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}
                      >
                        {prefix}{rep}
                      </button>
                    )
                  })}
                </div>

                {/* Feedback immédiat */}
                {ex1Reponse !== null && (
                  <div className="mt-4 rounded-xl p-4 space-y-3" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <div className="flex items-center gap-2">
                      <span>{ex1Reponse === entreprise.reponse ? '✅' : '❌'}</span>
                      <span className="text-sm font-bold" style={{ color: ex1Reponse === entreprise.reponse ? '#2ecc71' : '#e74c3c' }}>
                        {ex1Reponse === entreprise.reponse
                          ? 'Bonne réponse !'
                          : `La bonne réponse était : ${entreprise.reponse}`}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>
                      {entreprise.explication}
                    </p>
                    <button
                      onClick={questionSuivante}
                      className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider"
                      style={{ background: '#c9a84c', color: '#0f1e3d' }}
                    >
                      {ex1Index < entreprisesQuiz.length - 1 ? 'Entreprise suivante →' : 'Terminer le quiz →'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Écran de fin d'exercice
            <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Quiz terminé</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
                Bien joué ! Vous avez passé en revue les modèles BtoB, BtoC et hybrides avec votre équipage.
              </p>
              <button
                onClick={() => setEtape(2)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}
              >
                Poursuivre le vol →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════
          EXERCICE 2 — Métier mystère
      ════════════════════════════════════ */}
      {etape === 2 && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice 2</p>
              <h3 className="text-lg font-black text-white">Métier mystère</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
                Découvrez les indices un à un et identifiez ce métier.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.3)', color: '#2ecc71' }}>
              ✅ Correction de bord
            </span>
          </div>

          {/* Indices */}
          <div className="space-y-2.5">
            {ex2Metier.indices.map((indice, i) => {
              const visible = i < ex2IndicesReveles
              return (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: visible ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)',
                    border: visible ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    opacity: visible ? 1 : 0.4,
                  }}
                >
                  <div className="px-4 py-3.5 flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{
                        background: visible ? '#c9a84c' : 'rgba(255,255,255,0.07)',
                        color: visible ? '#0f1e3d' : 'rgba(255,255,255,0.25)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      {visible ? (
                        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.85)' }}>
                          &ldquo;{indice}&rdquo;
                        </p>
                      ) : (
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.22)' }}>Indice {i + 1} — non révélé</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          {!ex2Revele && (
            <div>
              {ex2IndicesReveles < ex2Metier.indices.length ? (
                <button
                  onClick={() => setEx2IndicesReveles(n => n + 1)}
                  className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
                >
                  Révéler l&apos;indice {ex2IndicesReveles + 1} →
                </button>
              ) : (
                <button
                  onClick={() => setEx2Revele(true)}
                  className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}
                >
                  Voir la correction →
                </button>
              )}
            </div>
          )}

          {/* Correction complète */}
          {ex2Revele && (
            <div className="space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'rgba(46,204,113,0.07)', border: '1px solid rgba(46,204,113,0.3)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#2ecc71' }}>
                  Le métier mystère était…
                </p>
                <p className="text-2xl font-black text-white mb-1">{ex2Metier.metier}</p>
                <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  Aussi appelé(e) : {ex2Metier.autresAppellations.join(' · ')}
                </p>
              </div>

              <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Missions principales</p>
                  <ul className="space-y-1.5">
                    {ex2Metier.missions.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(245,240,232,0.75)' }}>
                        <span className="flex-shrink-0" style={{ color: '#c9a84c' }}>›</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Compétences valorisées</p>
                  <ul className="space-y-1.5">
                    {ex2Metier.competences.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(245,240,232,0.75)' }}>
                        <span className="flex-shrink-0" style={{ color: '#c9a84c' }}>›</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Ce que votre parcours valorise</p>
                  <ul className="space-y-1.5">
                    {ex2Metier.experiencesEtudiants.map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(245,240,232,0.75)' }}>
                        <span className="flex-shrink-0" style={{ color: '#c9a84c' }}>›</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setEtape(3)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}
              >
                Mission accomplie — Exercice 3 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════
          EXERCICE 3 — Destination entreprise
      ════════════════════════════════════ */}
      {etape === 3 && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice 3</p>
              <h3 className="text-lg font-black text-white">Destination entreprise</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
                Préparez votre analyse, puis appelez la tour de contrôle.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(243,156,18,0.12)', border: '1px solid rgba(243,156,18,0.35)', color: '#f39c12' }}>
              🛫 Tour de contrôle
            </span>
          </div>

          {/* Entreprise assignée */}
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(201,168,76,0.65)' }}>
              Votre entreprise assignée
            </p>
            <p className="text-3xl font-black text-white mb-0.5">{ex3Entreprise.nom}</p>
            <p className="text-sm mb-3" style={{ color: '#c9a84c' }}>{ex3Entreprise.secteur}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.65)' }}>
              {ex3Entreprise.description}
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: MODELE_COLORS[ex3Entreprise.modele].bg,
                border: `1px solid ${MODELE_COLORS[ex3Entreprise.modele].border}`,
                color: MODELE_COLORS[ex3Entreprise.modele].text,
              }}
            >
              {ex3Entreprise.modele}
            </div>
          </div>

          {/* Questions à préparer */}
          <div>
            <p className="text-sm font-bold text-white mb-2.5">Questions à préparer en équipage</p>
            <div className="space-y-2">
              {QUESTIONS_DESTINATION.map((q, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3.5 flex items-start gap-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(201,168,76,0.14)', color: '#c9a84c' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>{q}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton tour de contrôle */}
          {!ex3Appele ? (
            <button
              onClick={() => setEx3Appele(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d', boxShadow: '0 8px 32px rgba(201,168,76,0.25)' }}
            >
              🛫 Appeler la tour de contrôle
            </button>
          ) : (
            <div
              className="rounded-2xl p-5 text-center space-y-2"
              style={{ background: 'rgba(243,156,18,0.08)', border: '1.5px solid rgba(243,156,18,0.4)' }}
            >
              <p className="text-2xl">📡</p>
              <p className="font-black text-white">Tour de contrôle appelée !</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                Votre équipage a préparé sa réponse. Appelez maintenant la tour de contrôle pour valider votre réflexion avec votre intervenante.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
