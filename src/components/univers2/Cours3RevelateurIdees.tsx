'use client'

import { useState } from 'react'
import type { Track } from '@/types'
import {
  categoriesPost, ideesPost, ANGLE_CHAMPS,
  type CategoriePost, type VerdictPost,
} from '@/lib/content/univers2-cours3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'

const VERDICTS: { code: VerdictPost; emoji: string; label: string }[] = [
  { code: 'interessant', emoji: '🟢', label: 'Intéressant' },
  { code: 'a-preciser', emoji: '🟠', label: 'À préciser' },
  { code: 'trop-banal', emoji: '🔴', label: 'Trop banal' },
]

interface Cours3Props {
  track: Track
}

export default function Cours3RevelateurIdees({ track }: Cours3Props) {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Révélateur d'idées LinkedIn
  const [categorieChoisie, setCategorieChoisie] = useState<CategoriePost | null>(null)
  const [ideeGardee, setIdeeGardee] = useState<string | null>(null)

  function choisirCategorie(cat: CategoriePost) {
    setCategorieChoisie(cat)
    setIdeeGardee(null)
  }

  // Exercice 2 — Post intéressant ou trop banal ?
  const [postIndex, setPostIndex] = useState(0)
  const [verdicts, setVerdicts] = useState<Record<string, VerdictPost>>({})
  const postCourant = ideesPost[postIndex]
  const verdictCourant = verdicts[postCourant.id]

  function juger(v: VerdictPost) {
    if (verdictCourant) return
    setVerdicts(prev => ({ ...prev, [postCourant.id]: v }))
  }

  // Exercice 3 — Mon angle de post (Mode 2)
  const [reponsesAngle, setReponsesAngle] = useState<Record<string, string>>({})
  const [anglePresente, setAnglePresente] = useState(false)

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Cours 3 — Révélateur d&apos;idées LinkedIn
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Trouver un angle, pas un texte tout fait</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          L&apos;application vous aide à trouver un sujet — jamais à rédiger le post à votre place.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: "Révélateur d'idées", picto: '🔦' },
          { n: 2, label: 'Intéressant ou banal ?', picto: '🗺️' },
          { n: 3, label: 'Mon angle', picto: '📓' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Révélateur d'idées LinkedIn"
            consigne="Choisissez une catégorie, puis une question qui vous parle."
            mode="feedback"
          />

          <div className="grid grid-cols-2 gap-2">
            {categoriesPost.map(cat => {
              const active = categorieChoisie?.id === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => choisirCategorie(cat)}
                  className="rounded-xl p-3 text-left transition-all flex items-center gap-2"
                  style={{
                    background: active ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.04)',
                    border: active ? '1.5px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-lg">{cat.icone}</span>
                  <span className="text-xs font-bold text-white">{cat.label}</span>
                </button>
              )
            })}
          </div>

          {categorieChoisie && !ideeGardee && (
            <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>
                {categorieChoisie.icone} {categorieChoisie.label} — pistes de réflexion
              </p>
              <div className="space-y-2">
                {categorieChoisie.declencheurs.map(d => (
                  <button
                    key={d}
                    onClick={() => setIdeeGardee(d)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.85)' }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCategorieChoisie(categoriesPost[(categoriesPost.indexOf(categorieChoisie) + 1) % categoriesPost.length])}
                className="w-full py-2 rounded-xl font-bold text-xs uppercase tracking-wider"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.5)' }}
              >
                Changer de piste →
              </button>
            </div>
          )}

          {ideeGardee && (
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(201,168,76,0.7)' }}>Idée gardée</p>
              <p className="text-white text-base font-semibold leading-relaxed mb-4">{ideeGardee}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.7)' }}>
                Bonne piste. Cette idée peut fonctionner si tu la relies à une expérience concrète, un apprentissage personnel et une ouverture professionnelle.
              </p>
              <button
                onClick={() => setEtape(2)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
              >
                Passer à l&apos;angle du post — Exercice 2 →
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
            titre="Post intéressant ou trop banal ?"
            consigne="Classez chaque idée de post, puis échangez-en en petit groupe."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Idée {postIndex + 1} sur {ideesPost.length}
          </p>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white text-base font-semibold leading-relaxed">&ldquo;{postCourant.texte}&rdquo;</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {VERDICTS.map(v => {
              const isCorrect = verdictCourant !== undefined && v.code === postCourant.verdict
              const isWrong = verdictCourant === v.code && v.code !== postCourant.verdict
              return (
                <button
                  key={v.code}
                  onClick={() => juger(v.code)}
                  disabled={verdictCourant !== undefined}
                  className="rounded-xl py-3 px-2 text-xs font-bold text-center transition-all"
                  style={{
                    background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.05)',
                    border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: verdictCourant && !isCorrect && !isWrong ? 'rgba(245,240,232,0.25)' : 'white',
                  }}
                >
                  {v.emoji} {v.label}
                </button>
              )
            })}
          </div>

          {verdictCourant && (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{postCourant.explication}</p>

              {postIndex < ideesPost.length - 1 ? (
                <button
                  onClick={() => setPostIndex(i => i + 1)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-1"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
                >
                  Idée suivante →
                </button>
              ) : (
                <button
                  onClick={() => setEtape(3)}
                  className="w-full py-3 rounded-xl font-black uppercase tracking-wider mt-1"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
                >
                  Poser mon idée dans le carnet — Exercice 3 →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Mon angle de post (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Mon angle de post"
            consigne="Structurez votre angle en 5 points, avant toute rédaction."
            mode="validation"
          />

          <div className="space-y-3">
            {ANGLE_CHAMPS.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesAngle[champ.cle] ?? ''}
                  onChange={e => setReponsesAngle(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!anglePresente ? (
            <button
              onClick={() => setAnglePresente(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04', boxShadow: '0 8px 32px rgba(201,168,76,0.25)' }}
            >
              📓 Présenter mon angle à l&apos;intervenante
            </button>
          ) : track === 'bachelor2' ? (
            <div className="rounded-2xl p-6 text-center space-y-3" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-3xl">🏕️</p>
              <p className="font-black text-white text-lg">Carnet de route refermé.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                Présentez votre angle à l&apos;intervenante pour un dernier retour avant rédaction. Vous avez parcouru les 3 cours de l&apos;Expédition Professionnelle — cette étape de votre parcours s&apos;achève ici.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-2xl">📓</p>
              <p className="font-black text-white">Votre réflexion est prête.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                Présentez-la maintenant à l&apos;intervenante pour obtenir un retour, affiner votre analyse et passer à l&apos;étape suivante — le semestre 2 vous fera entrer dans l&apos;univers détective.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
