'use client'

import { useState } from 'react'
import { directionsBoussole, profilsAventuriers, CAP_CHAMPS, type ProfilAventurier } from '@/lib/content/univers2-cours1'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import CompassDial from './CompassDial'

export default function Cours1Boussole() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Boussole aléatoire
  const [directionActive, setDirectionActive] = useState<typeof directionsBoussole[number] | null>(null)
  const [question, setQuestion] = useState<string | null>(null)
  const [directionsExplorees, setDirectionsExplorees] = useState<string[]>([])

  // Exercice 2 — Carte profil aventurier
  const [profilChoisi, setProfilChoisi] = useState<ProfilAventurier | null>(null)

  // Exercice 3 — Mon cap professionnel
  const [reponsesCap, setReponsesCap] = useState<Record<string, string>>({})
  const [capPresente, setCapPresente] = useState(false)

  function choisirDirection(code: typeof directionsBoussole[number]['code']) {
    const direction = directionsBoussole.find(d => d.code === code)!
    const q = direction.questions[Math.floor(Math.random() * direction.questions.length)]
    setDirectionActive(direction)
    setQuestion(q)
    setDirectionsExplorees(prev => prev.includes(code) ? prev : [...prev, code])
  }

  const toutesDirectionsExplorees = directionsExplorees.length === directionsBoussole.length

  return (
    <div className="space-y-5">
      {/* En-tête cours */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Cours 1 — La boussole professionnelle
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Identité, compétences, motivations, direction</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Une boussole à 4 directions pour amorcer votre réflexion professionnelle.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Boussole aléatoire', picto: '🧭' },
          { n: 2, label: 'Carte profil', picto: '🗺️' },
          { n: 3, label: 'Mon cap', picto: '⛰️' },
        ]}
      />

      {/* ═══ EXERCICE 1 — Boussole aléatoire ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Boussole aléatoire"
            consigne="Cliquez sur une direction, discutez la question tirée en binôme."
            mode="feedback"
          />

          {/* Boussole visuelle à 4 directions */}
          <CompassDial
            directions={directionsBoussole}
            activeCode={directionActive?.code ?? null}
            exploredCodes={directionsExplorees}
            onSelect={choisirDirection}
          />

          {directionActive && question && (
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(201,168,76,0.7)' }}>
                {directionActive.label} — {directionActive.theme}
              </p>
              <p className="text-white text-lg font-semibold leading-relaxed mb-4">{question}</p>

              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>Pistes de réponse</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {directionActive.exemples.map(ex => (
                  <span key={ex} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(245,240,232,0.7)' }}>
                    {ex}
                  </span>
                ))}
              </div>

              <button
                onClick={() => choisirDirection(directionActive.code)}
                className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider"
                style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
              >
                Explorer une autre piste →
              </button>
            </div>
          )}

          {!directionActive && (
            <p className="text-sm text-center py-4" style={{ color: 'rgba(245,240,232,0.4)' }}>
              Choisissez une direction pour tirer votre première question.
            </p>
          )}

          {toutesDirectionsExplorees && (
            <button
              onClick={() => setEtape(2)}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
            >
              Boussole explorée — Exercice 2 →
            </button>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 — Carte profil aventurier ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Carte profil aventurier"
            consigne="À partir de vos réponses, choisissez le profil qui vous ressemble le plus."
            mode="feedback"
          />

          <div className="grid grid-cols-1 gap-2.5">
            {profilsAventuriers.map(p => {
              const selectionne = profilChoisi?.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setProfilChoisi(p)}
                  className="rounded-2xl p-4 text-left transition-all flex items-start gap-3"
                  style={{
                    background: selectionne ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                    border: selectionne ? '1.5px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div>
                    <p className="font-black text-white text-sm">{p.nom}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.5)' }}>{p.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {profilChoisi && (
            <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Forces associées</p>
                <div className="flex flex-wrap gap-1.5">
                  {profilChoisi.forces.map(f => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(90,163,124,0.12)', color: '#5aa37c' }}>{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Environnements possibles</p>
                <div className="flex flex-wrap gap-1.5">
                  {profilChoisi.environnements.map(e => (
                    <span key={e} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(245,240,232,0.7)' }}>{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#c9a84c' }}>Point de vigilance</p>
                <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>{profilChoisi.vigilance}</p>
              </div>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,225,160,0.85)', borderLeft: '2px solid rgba(201,168,76,0.5)', paddingLeft: '12px' }}>
                &ldquo;{profilChoisi.phrase}&rdquo;
              </p>
              <div className="rounded-xl px-4 py-3 text-xs font-semibold text-center" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c' }}>
                Ce profil est une piste de réflexion, pas une étiquette définitive.
              </div>

              <button
                onClick={() => setEtape(3)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04' }}
              >
                Continuer — Exercice 3 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Mon cap professionnel (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Mon cap professionnel"
            consigne="Formulez votre direction en 4 points, seul ou en binôme."
            mode="validation"
          />

          <div className="space-y-3">
            {CAP_CHAMPS.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesCap[champ.cle] ?? ''}
                  onChange={e => setReponsesCap(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!capPresente ? (
            <button
              onClick={() => setCapPresente(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f0a04', boxShadow: '0 8px 32px rgba(201,168,76,0.25)' }}
            >
              🧭 Présenter mon cap à l&apos;intervenante
            </button>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-2xl">⛰️</p>
              <p className="font-black text-white">Votre réflexion est prête.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
                Présentez-la maintenant à l&apos;intervenante pour obtenir un retour, affiner votre analyse et passer à l&apos;étape suivante.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
