'use client'

import { useState } from 'react'
import {
  contextesImmersifs, tirerAlertesAleatoires, CHAMPS_NOTE_SYNTHESE,
  type ContexteImmersif, type AlerteImmersive,
} from '@/lib/content/univers3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import MissionHeader from './shared/MissionHeader'

export default function Mission3ImmersionControle({ total }: { total: number }) {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  const [contexte] = useState<ContexteImmersif>(
    () => contextesImmersifs[Math.floor(Math.random() * contextesImmersifs.length)]
  )
  const [alertes] = useState<AlerteImmersive[]>(() => tirerAlertesAleatoires(3))

  // Exercice 2 — Réagir aux alertes
  const [alerteIndex, setAlerteIndex] = useState(0)
  const [reactions, setReactions] = useState<Record<string, string>>({})
  const alerteCourante = alertes[alerteIndex]

  // Exercice 3 — Note de synthèse (Mode 2)
  const [reponsesSynthese, setReponsesSynthese] = useState<Record<string, string>>({})
  const [remise, setRemise] = useState(false)

  return (
    <div className="space-y-5">
      <MissionHeader n={3} total={total} titre='Mission immersive — "48h pour reprendre le contrôle"' objectif="Vivez 48h de mission sous forme d'alertes imprévues, prenez vos décisions en équipe, puis remettez une note de synthèse collective." />

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Contexte', picto: '📁' },
          { n: 2, label: 'Alertes', picto: '🚨' },
          { n: 3, label: 'Synthèse', picto: '📝' },
        ]}
      />

      {/* ═══ ÉTAPE 1 — Contexte initial ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader numero={1} titre="Contexte de mission" consigne="Lisez le contexte avec votre équipe avant de démarrer les 48h." mode="feedback" />

          <div className="rounded-2xl p-6 space-y-3" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.25)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'monospace' }}>Dossier confidentiel</p>
            <p className="text-white text-sm leading-relaxed">
              Vous êtes en mission pour {contexte.client}. Vous dirigez {contexte.equipe}.
            </p>
            <p className="text-white text-sm leading-relaxed font-semibold">
              Objectif : {contexte.objectif}.
            </p>
            <p className="text-xs" style={{ color: 'rgba(200,220,255,0.5)' }}>
              Durée de la mission : 48h. {alertes.length} alertes vont survenir pendant la mission — chaque équipe vit une situation différente.
            </p>
          </div>

          <button
            onClick={() => setEtape(2)}
            className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
          >
            ▶ Démarrer les 48h →
          </button>
        </div>
      )}

      {/* ═══ ÉTAPE 2 — Alertes aléatoires ═══ */}
      {etape === 2 && alerteCourante && (
        <div className="space-y-4">
          <ExerciseHeader numero={2} titre="Alerte en cours" consigne="Une situation imprévue survient. Décidez en équipe, puis notez votre décision." mode="feedback" />

          <p className="text-xs" style={{ color: 'rgba(200,220,255,0.4)' }}>
            Alerte {alerteIndex + 1} sur {alertes.length}
          </p>

          <div className="rounded-2xl p-5 space-y-2" style={{ background: 'rgba(192,86,63,0.08)', border: '1px solid rgba(192,86,63,0.35)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#e0806a' }}>🚨 {alerteCourante.label}</p>
            <p className="text-white text-sm leading-relaxed">{alerteCourante.description}</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'rgba(201,168,76,0.7)' }}>
              {alerteCourante.decisionAttendue}
            </label>
            <textarea
              value={reactions[alerteCourante.id] ?? ''}
              onChange={e => setReactions(prev => ({ ...prev, [alerteCourante.id]: e.target.value }))}
              placeholder="Notez la décision prise par votre équipe…"
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          {alerteIndex < alertes.length - 1 ? (
            <button
              onClick={() => setAlerteIndex(i => i + 1)}
              disabled={(reactions[alerteCourante.id] ?? '').trim().length === 0}
              className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c', opacity: (reactions[alerteCourante.id] ?? '').trim().length === 0 ? 0.4 : 1 }}
            >
              Alerte suivante →
            </button>
          ) : (
            <button
              onClick={() => setEtape(3)}
              disabled={(reactions[alerteCourante.id] ?? '').trim().length === 0}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a', opacity: (reactions[alerteCourante.id] ?? '').trim().length === 0 ? 0.4 : 1 }}
            >
              Continuer — Note de synthèse →
            </button>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 3 — Note de synthèse (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader numero={3} titre="Note de synthèse — Mission 48h" consigne="Rédigez collectivement votre note de synthèse (1 à 2 pages maximum)." mode="validation" />

          <div className="space-y-3">
            {CHAMPS_NOTE_SYNTHESE.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesSynthese[champ.cle] ?? ''}
                  onChange={e => setReponsesSynthese(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!remise ? (
            <button
              onClick={() => setRemise(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }}
            >
              📝 Remettre la synthèse à l&apos;intervenante
            </button>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
                <p className="text-2xl">🏁</p>
                <p className="font-black text-white">Mission accomplie.</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.8)' }}>
                  Présentez-la à votre intervenante pour votre notation.
                </p>
              </div>
              <div className="rounded-2xl p-4 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>Modalités d&apos;évaluation</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,220,255,0.6)' }}>
                  50% note orale individuelle — prise de parole durant la mission immersive et/ou présentation personnelle<br />
                  50% note groupe écrite — note de synthèse &quot;48h pour reprendre le contrôle&quot;
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
