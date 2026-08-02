'use client'

import { useState } from 'react'
import {
  itemsDiagnostic, niveauxDiagnostic, obstacles, PLAN_30_JOURS_CHAMPS,
} from '@/lib/content/univers2-cours6'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeaderDetective from './shared/ExerciseHeaderDetective'
import DossierPaper from './shared/DossierPaper'

export default function Cours6Strategie30Jours() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Diagnostic de l'enquête
  const [cochés, setCochés] = useState<string[]>([])
  const [diagnosticVisible, setDiagnosticVisible] = useState(false)
  const niveauCourant = [...niveauxDiagnostic].reverse().find(n => cochés.length >= n.seuilMin)!

  function toggleItem(id: string) {
    if (diagnosticVisible) return
    setCochés(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // Exercice 2 — Obstacles et priorités
  const [obstaclesChoisis, setObstaclesChoisis] = useState<string[]>([])
  const [obstaclesValides, setObstaclesValides] = useState(false)

  function toggleObstacle(id: string) {
    if (obstaclesValides) return
    setObstaclesChoisis(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  // Exercice 3 — Plan d'action 30 jours (Mode 2)
  const [reponsesPlan, setReponsesPlan] = useState<Record<string, string>>({})
  const [dossierSoumis, setDossierSoumis] = useState(false)

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(220,201,160,0.05)', border: '1px solid rgba(220,201,160,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a256' }}>
          Cours 6 — Stratégie 30 jours
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Finaliser le rapport d&apos;enquête</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(220,201,160,0.55)' }}>
          Diagnostic, obstacles et plan d&apos;action pour les 30 prochains jours.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Examiner la situation', picto: '🔍' },
          { n: 2, label: 'Identifier les blocages', picto: '🧩' },
          { n: 3, label: "Finaliser le rapport", picto: '🧾' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={1}
            titre="Diagnostic de l'enquête"
            consigne="Cochez les éléments déjà réalisés dans votre recherche de stage."
            mode="feedback"
          />

          <div className="space-y-2">
            {itemsDiagnostic.map(item => {
              const coché = cochés.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  disabled={diagnosticVisible}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                  style={{
                    background: coché ? 'rgba(201,162,86,0.14)' : 'rgba(255,255,255,0.04)',
                    border: coché ? '1.5px solid rgba(201,162,86,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                >
                  {coché ? '☑' : '☐'} {item.label}
                </button>
              )
            })}
          </div>

          {!diagnosticVisible ? (
            <button
              onClick={() => setDiagnosticVisible(true)}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
            >
              Voir mon résultat
            </button>
          ) : (
            <>
              <DossierPaper label="Diagnostic" tampon={niveauCourant.label.toUpperCase()}>
                <p className="text-2xl mb-1">{niveauCourant.emoji}</p>
                <p className="font-black text-lg mb-2">{niveauCourant.label}</p>
                <p className="text-sm leading-relaxed">{cochés.length} élément{cochés.length > 1 ? 's' : ''} sur {itemsDiagnostic.length} déjà en place.</p>
                <p className="text-sm leading-relaxed mt-2"><span className="font-bold">Conseil prioritaire : </span>{niveauCourant.conseil}</p>
              </DossierPaper>
              <button
                onClick={() => setEtape(2)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
              >
                Identifier les blocages — Exercice 2 →
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={2}
            titre="Obstacles et priorités"
            consigne="Sélectionnez vos 2 principaux obstacles pour découvrir les actions correctives."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(220,201,160,0.5)' }}>
            {obstaclesChoisis.length} / 2 obstacle{obstaclesChoisis.length > 1 ? 's' : ''} sélectionné{obstaclesChoisis.length > 1 ? 's' : ''}
          </p>

          <div className="space-y-2">
            {obstacles.map(o => {
              const selected = obstaclesChoisis.includes(o.id)
              return (
                <button
                  key={o.id}
                  onClick={() => toggleObstacle(o.id)}
                  disabled={obstaclesValides || (!selected && obstaclesChoisis.length >= 2)}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                  style={{
                    background: selected ? 'rgba(201,162,86,0.14)' : 'rgba(255,255,255,0.04)',
                    border: selected ? '1.5px solid rgba(201,162,86,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: !selected && obstaclesChoisis.length >= 2 && !obstaclesValides ? 'rgba(220,201,160,0.35)' : 'white',
                  }}
                >
                  {selected ? '☑' : '☐'} {o.label}
                </button>
              )
            })}
          </div>

          {!obstaclesValides ? (
            <button
              onClick={() => setObstaclesValides(true)}
              disabled={obstaclesChoisis.length !== 2}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008', opacity: obstaclesChoisis.length !== 2 ? 0.4 : 1 }}
            >
              Voir les actions correctives
            </button>
          ) : (
            <>
              {obstaclesChoisis.map(id => {
                const o = obstacles.find(x => x.id === id)!
                return (
                  <DossierPaper key={id} label={o.label} tampon={`PRIORITÉ ${o.priorite.toUpperCase()}`}>
                    <p className="text-sm leading-relaxed mb-2">{o.explication}</p>
                    <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#9c3a30' }}>Actions correctives</p>
                    <div className="space-y-1 text-sm">
                      {o.actions.map((a, i) => <p key={i}>▸ {a}</p>)}
                    </div>
                    <p className="text-sm leading-relaxed mt-2 italic">{o.conseil}</p>
                  </DossierPaper>
                )
              })}
              <button
                onClick={() => setEtape(3)}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
                style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
              >
                Finaliser le rapport d&apos;enquête — Exercice 3 →
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Plan d'action 30 jours (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={3}
            titre="Plan d'action 30 jours"
            consigne="Construisez un plan d'action réaliste et engageant sur les 30 prochains jours."
            mode="validation"
          />

          <div className="space-y-3">
            {PLAN_30_JOURS_CHAMPS.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: '#c9a256' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesPlan[champ.cle] ?? ''}
                  onChange={e => setReponsesPlan(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!dossierSoumis ? (
            <button
              onClick={() => setDossierSoumis(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008', boxShadow: '0 8px 32px rgba(201,162,86,0.25)' }}
            >
              📁 Soumettre le dossier
            </button>
          ) : (
            <div className="rounded-2xl p-6 text-center space-y-3" style={{ background: 'rgba(201,162,86,0.08)', border: '1.5px solid rgba(201,162,86,0.4)' }}>
              <p className="text-3xl">🗂️</p>
              <p className="font-black text-white text-lg">Rapport d&apos;enquête refermé.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}>
                Présentez votre plan à l&apos;enquêtrice pour un dernier avis avant de passer à l&apos;action. Vous avez parcouru les 6 cours de l&apos;Expédition Professionnelle — de la boussole au plan des 30 prochains jours, l&apos;enquête est close.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
