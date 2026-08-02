'use client'

import { useState } from 'react'
import {
  scenesInterlocuteur, elementsPitch, STRUCTURE_RECOMMANDEE, contextesPitchOral, PITCH_CHAMPS,
  type SceneInterlocuteur, type CategoriePitch,
} from '@/lib/content/univers2-cours5'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeaderDetective from './shared/ExerciseHeaderDetective'
import DossierPaper from './shared/DossierPaper'

const CATEGORIES: { code: CategoriePitch; emoji: string; label: string }[] = [
  { code: 'indispensable', emoji: '🟢', label: 'Indispensable' },
  { code: 'utile', emoji: '🟠', label: 'Utile' },
  { code: 'a-eviter', emoji: '🔴', label: 'À éviter' },
]

export default function Cours5PitchProfessionnel() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Qui est en face de moi ?
  const [sceneIndex, setSceneIndex] = useState(0)
  const [strategieChoisie, setStrategieChoisie] = useState<string | null>(null)
  const sceneCourante: SceneInterlocuteur = scenesInterlocuteur[sceneIndex]

  function choisirStrategie(id: string) {
    if (strategieChoisie) return
    setStrategieChoisie(id)
  }

  function sceneSuivante() {
    if (sceneIndex < scenesInterlocuteur.length - 1) {
      setSceneIndex(i => i + 1)
      setStrategieChoisie(null)
    } else {
      setEtape(2)
    }
  }

  // Exercice 2 — Les pièces du pitch
  const [classement, setClassement] = useState<Record<string, CategoriePitch>>({})
  const [structureVisible, setStructureVisible] = useState(false)
  const tousClasses = elementsPitch.every(el => classement[el.id])

  function classer(elementId: string, categorie: CategoriePitch) {
    setClassement(prev => ({ ...prev, [elementId]: categorie }))
  }

  // Exercice 3 — Pitch sous surveillance (Mode 2)
  const [contexteIndex] = useState(() => Math.floor(Math.random() * contextesPitchOral.length))
  const contexteCourant = contextesPitchOral[contexteIndex]
  const [reponsesPitch, setReponsesPitch] = useState<Record<string, string>>({})
  const [pitchPret, setPitchPret] = useState(false)

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(220,201,160,0.05)', border: '1px solid rgba(220,201,160,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a256' }}>
          Cours 5 — Pitch professionnel
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Adapter sa présentation</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(220,201,160,0.55)' }}>
          Construire un pitch clair, adapté à l&apos;interlocuteur et à la situation.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Observer / Comprendre', picto: '🔍' },
          { n: 2, label: 'Adapter son pitch', picto: '🗣️' },
          { n: 3, label: 'Présenter le dossier', picto: '🧾' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={1}
            titre="Qui est en face de moi ?"
            consigne="Identifiez les attentes de votre interlocuteur pour adapter votre discours."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(220,201,160,0.5)' }}>
            Scène {sceneIndex + 1} sur {scenesInterlocuteur.length}
          </p>

          <DossierPaper label={sceneCourante.titre} tampon="SCÈNE">
            <p className="text-sm leading-relaxed mb-2">{sceneCourante.description}</p>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9c3a30' }}>Interlocuteur</p>
            <p className="text-xs leading-relaxed">{sceneCourante.interlocuteur}</p>
          </DossierPaper>

          <div className="rounded-xl p-4 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(220,201,160,0.6)' }}>
              À discuter en groupe
            </p>
            {sceneCourante.questions.map((q, i) => (
              <p key={i} className="text-sm" style={{ color: 'rgba(220,201,160,0.8)' }}>▸ {q}</p>
            ))}
          </div>

          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(220,201,160,0.6)' }}>
            Choisissez une stratégie
          </p>
          <div className="space-y-2">
            {sceneCourante.strategies.map(s => {
              const isCorrect = strategieChoisie !== null && s.id === sceneCourante.bonneStrategieId
              const isWrong = strategieChoisie === s.id && s.id !== sceneCourante.bonneStrategieId
              return (
                <button
                  key={s.id}
                  onClick={() => choisirStrategie(s.id)}
                  disabled={strategieChoisie !== null}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm leading-relaxed transition-all"
                  style={{
                    background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.04)',
                    border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: strategieChoisie && !isCorrect && !isWrong ? 'rgba(220,201,160,0.35)' : 'white',
                  }}
                >
                  {s.label}
                </button>
              )
            })}
          </div>

          {strategieChoisie && (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,86,0.25)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}><span className="font-bold">À privilégier : </span>{sceneCourante.informationsAPrivilegier}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}><span className="font-bold">À éviter : </span>{sceneCourante.erreursAEviter}</p>
              <p className="text-sm leading-relaxed italic" style={{ color: '#c9a256' }}>« {sceneCourante.exemplePhrase} »</p>

              <button
                onClick={sceneSuivante}
                className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-2"
                style={{ background: 'rgba(201,162,86,0.12)', border: '1.5px solid rgba(201,162,86,0.4)', color: '#c9a256' }}
              >
                {sceneIndex < scenesInterlocuteur.length - 1 ? 'Scène suivante →' : 'Adapter son pitch — Exercice 2 →'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={2}
            titre="Les pièces du pitch"
            consigne="Classez chaque élément, en groupe, avant de découvrir la structure recommandée."
            mode="feedback"
          />

          <div className="space-y-2">
            {elementsPitch.map(el => (
              <div key={el.id} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm font-semibold text-white mb-2">{el.label}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORIES.map(cat => {
                    const selection = classement[el.id]
                    const isCorrect = selection !== undefined && cat.code === el.categorie
                    const isWrong = selection === cat.code && cat.code !== el.categorie
                    return (
                      <button
                        key={cat.code}
                        onClick={() => classer(el.id, cat.code)}
                        disabled={selection !== undefined}
                        className="rounded-lg py-2 px-1 text-[11px] font-bold text-center transition-all"
                        style={{
                          background: isCorrect ? 'rgba(90,163,124,0.14)' : isWrong ? 'rgba(192,86,63,0.14)' : 'rgba(255,255,255,0.05)',
                          border: isCorrect ? '1.5px solid rgba(90,163,124,0.5)' : isWrong ? '1.5px solid rgba(192,86,63,0.5)' : '1px solid rgba(255,255,255,0.1)',
                          color: selection && !isCorrect && !isWrong ? 'rgba(220,201,160,0.3)' : 'white',
                        }}
                      >
                        {cat.emoji} {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {tousClasses && !structureVisible && (
            <button
              onClick={() => setStructureVisible(true)}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
            >
              Voir la structure recommandée
            </button>
          )}

          {structureVisible && (
            <>
              <DossierPaper label="Structure du pitch" tampon="RECOMMANDÉ">
                <div className="space-y-1.5 text-sm">
                  {STRUCTURE_RECOMMANDEE.map((s, i) => (
                    <p key={s}>{i + 1}. {s}</p>
                  ))}
                </div>
              </DossierPaper>
              <button
                onClick={() => setEtape(3)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
              >
                Présenter le dossier — Exercice 3 →
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Pitch sous surveillance (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={3}
            titre="Pitch sous surveillance"
            consigne="Préparez puis dites à voix haute un pitch de 45 secondes à 1 minute."
            mode="validation"
          />

          <DossierPaper label="Contexte assigné" tampon="DOSSIER À TRAITER">
            <p className="font-black text-base mb-1">{contexteCourant.label}</p>
            <p className="text-xs leading-relaxed">{contexteCourant.description}</p>
          </DossierPaper>

          <div className="space-y-3">
            {PITCH_CHAMPS.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: '#c9a256' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesPitch[champ.cle] ?? ''}
                  onChange={e => setReponsesPitch(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!pitchPret ? (
            <button
              onClick={() => setPitchPret(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008', boxShadow: '0 8px 32px rgba(201,162,86,0.25)' }}
            >
              🗣️ Tester à l&apos;oral
            </button>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,162,86,0.08)', border: '1.5px solid rgba(201,162,86,0.4)' }}>
              <p className="text-2xl">🧾</p>
              <p className="font-black text-white">Pitch prêt à être testé.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}>
                Dites-le à voix haute devant votre binôme ou votre groupe (45 secondes à 1 minute), puis demandez l&apos;avis de l&apos;enquêtrice avant de passer au Cours 6.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
