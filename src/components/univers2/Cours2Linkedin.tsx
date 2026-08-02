'use client'

import { useState } from 'react'
import {
  profilsClassement, CATEGORIES_LABELS, ATELIER_CHAMPS, evaluerFormulation,
  type ProfilClassement, type CategorieProfil, type FeedbackFormulation,
} from '@/lib/content/univers2-cours2'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'

const VERDICT_COLOR: Record<FeedbackFormulation['verdict'], string> = {
  'a-preciser': '#f39c12',
  'trop-generique': '#c0563f',
  'clair': '#5aa37c',
}

export default function Cours2Linkedin() {
  const [etape, setEtape] = useState<1 | 2>(1)

  // Exercice 1 — Profil LinkedIn réaliste ou trop parfait ?
  const [profilIndex, setProfilIndex] = useState(0)
  const [classements, setClassements] = useState<Record<string, CategorieProfil>>({})
  const profilCourant: ProfilClassement = profilsClassement[profilIndex]
  const classementCourant = classements[profilCourant.id]

  function classer(categorie: CategorieProfil) {
    if (classementCourant) return
    setClassements(prev => ({ ...prev, [profilCourant.id]: categorie }))
  }

  function profilSuivant() {
    if (profilIndex < profilsClassement.length - 1) setProfilIndex(i => i + 1)
  }

  const exercice1Termine = Object.keys(classements).length === profilsClassement.length

  // Exercice 2 — Atelier profil LinkedIn guidé
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [testeChamps, setTesteChamps] = useState<Record<string, boolean>>({})

  function testerChamp(cle: string) {
    setTesteChamps(prev => ({ ...prev, [cle]: true }))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Cours 2 — Profil LinkedIn réaliste
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Un profil crédible, pas trop parfait</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Comprendre ce qui rend un profil LinkedIn étudiant crédible pour une recherche de stage.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Crédible ou trop parfait ?', picto: '🔦' },
          { n: 2, label: 'Atelier guidé', picto: '🗺️' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Profil LinkedIn réaliste ou trop parfait ?"
            consigne="Classez chaque profil, puis discutez-en en binôme."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Profil {profilIndex + 1} sur {profilsClassement.length}
          </p>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(201,168,76,0.7)' }}>{profilCourant.nom}</p>
            <p className="font-bold text-white text-sm leading-snug mb-2">{profilCourant.titre}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>{profilCourant.resume}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(CATEGORIES_LABELS) as CategorieProfil[]).map(cat => {
              const { emoji, label } = CATEGORIES_LABELS[cat]
              const isCorrect = classementCourant !== undefined && cat === profilCourant.categorie
              const isWrong = classementCourant === cat && cat !== profilCourant.categorie
              return (
                <button
                  key={cat}
                  onClick={() => classer(cat)}
                  disabled={classementCourant !== undefined}
                  className="rounded-xl py-3 px-2 text-xs font-bold text-center transition-all"
                  style={{
                    background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.05)',
                    border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: classementCourant && !isCorrect && !isWrong ? 'rgba(245,240,232,0.25)' : 'white',
                  }}
                >
                  {emoji} {label}
                </button>
              )
            })}
          </div>

          {classementCourant && (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-sm font-bold" style={{ color: '#c9a84c' }}>
                {CATEGORIES_LABELS[profilCourant.categorie].emoji} Réponse : {CATEGORIES_LABELS[profilCourant.categorie].label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{profilCourant.explication}</p>

              {profilIndex < profilsClassement.length - 1 ? (
                <button
                  onClick={profilSuivant}
                  className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-2"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
                >
                  Profil suivant →
                </button>
              ) : (
                <button
                  onClick={() => setEtape(2)}
                  className="w-full py-3 rounded-xl font-black uppercase tracking-wider mt-2"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
                >
                  Continuer — Exercice 2 →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 — Atelier profil LinkedIn guidé ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Atelier profil LinkedIn guidé"
            consigne="Rédigez vous-même votre profil, bloc par bloc — l'appli vous dit si c'est clair, pas ce qu'il faut écrire."
            mode="feedback"
          />

          <div className="space-y-4">
            {ATELIER_CHAMPS.map(champ => {
              const valeur = reponses[champ.cle] ?? ''
              const teste = testeChamps[champ.cle]
              const feedback = teste ? evaluerFormulation(champ.cle, valeur, champ.min) : null
              return (
                <div key={champ.cle} className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest block" style={{ color: 'rgba(201,168,76,0.7)' }}>
                    {champ.label}
                  </label>
                  <textarea
                    value={valeur}
                    onChange={e => {
                      setReponses(prev => ({ ...prev, [champ.cle]: e.target.value }))
                      setTesteChamps(prev => ({ ...prev, [champ.cle]: false }))
                    }}
                    placeholder={champ.placeholder}
                    rows={2}
                    className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                  <button
                    onClick={() => testerChamp(champ.cle)}
                    disabled={valeur.trim().length === 0}
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', opacity: valeur.trim().length === 0 ? 0.4 : 1 }}
                  >
                    Tester ma formulation
                  </button>
                  {feedback && (
                    <p className="text-xs leading-relaxed px-1" style={{ color: VERDICT_COLOR[feedback.verdict] }}>
                      {feedback.message}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.5)' }}>
            L&apos;application ne rédige pas votre profil à votre place : elle vous aide à repérer ce qui manque de précision.
          </div>
        </div>
      )}
    </div>
  )
}
