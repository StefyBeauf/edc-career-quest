'use client'

import { useState, useCallback } from 'react'
import type { Group } from '@/types'
import AlertSession from './AlertSession'

interface Props { group: Group; missionNumber: number }

// ── Générateur simple (bouton + résultat) ──────────────────────────────────
function Generator({ label, icon, type, spec, hint, secondary }: {
  label: string; icon: string; type: string; spec: string; hint?: string; secondary?: boolean
}) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = useCallback(async () => {
    setLoading(true); setText('')
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, specialization: spec }),
      })
      const data = await res.json() as { content?: string }
      setText(data.content ?? '')
    } finally { setLoading(false) }
  }, [type, spec])

  return (
    <div className="space-y-3">
      <button
        onClick={generate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm transition-all active:scale-[0.98]"
        style={{
          background: secondary ? 'rgba(255,255,255,0.04)' : 'rgba(201,168,76,0.15)',
          border: `1.5px solid ${secondary ? 'rgba(255,255,255,0.12)' : 'rgba(201,168,76,0.45)'}`,
          color: loading ? 'rgba(201,168,76,0.4)' : secondary ? 'rgba(255,255,255,0.6)' : '#f5c842',
        }}
      >
        <span className="text-xl">{loading ? '⏳' : icon}</span>
        <span>{loading ? 'Génération…' : label}</span>
      </button>
      {hint && !text && !loading && (
        <p className="text-xs px-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{hint}</p>
      )}
      {text && (
        <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.18)', color: 'rgba(255,240,200,0.9)',
        }}>{text}</div>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />
}

function MissionHeader({ n, titre, objectif }: { n: number; titre: string; objectif: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)' }}>
      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'monospace' }}>
        Mission {n} / 6
      </p>
      <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">{titre}</h2>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{objectif}</p>
    </div>
  )
}

// ── Mission 1 ──────────────────────────────────────────────────────────────
function M1({ spec }: { spec: string }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={1} titre="Définir ses coordonnées" objectif="Identifiez vos forces, vos axes de progression et définissez votre cap professionnel. Préparez-vous à argumenter vos choix." />
      <Generator label="Nouvelle question Horizon" icon="🎲" type="question_m1" spec={spec} hint="L'IA génère une question de réflexion adaptée à la spécialité." />
    </div>
  )
}

// ── Mission 2 ──────────────────────────────────────────────────────────────
function M2({ spec }: { spec: string }) {
  const [briefing, setBriefing] = useState('')
  const [loadingBriefing, setLoadingBriefing] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  const generateBriefing = async () => {
    setLoadingBriefing(true); setBriefing('')
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'briefing_m2', specialization: spec }),
      })
      const data = await res.json() as { content?: string }
      setBriefing(data.content ?? '')
    } finally { setLoadingBriefing(false) }
  }

  return (
    <div className="space-y-5">
      <MissionHeader n={2} titre="Garder le contrôle sous pression" objectif="Vous allez recevoir une mission professionnelle. Lisez-la attentivement, répartissez les rôles dans votre équipe et mobilisez-vous pour y répondre." />

      {/* Étape 1 — générer le briefing immersif */}
      {!sessionReady && (
        <>
          <button
            onClick={generateBriefing}
            disabled={loadingBriefing}
            className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: loadingBriefing ? 'rgba(201,168,76,0.4)' : '#f5c842' }}
          >
            <span className="text-xl">{loadingBriefing ? '⏳' : '🎲'}</span>
            <span>{loadingBriefing ? 'Génération du briefing…' : 'Générer une mission immersive'}</span>
          </button>

          {briefing && (
            <>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
                <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>Briefing à afficher aux équipes</span>
                </div>
                <div className="p-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.9)' }}>{briefing}</div>
              </div>
              <button
                onClick={() => setSessionReady(true)}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                style={{ background: '#c9a84c', color: '#050a1a', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}
              >
                ▶ Lancer la session
              </button>
            </>
          )}
        </>
      )}

      {/* Étape 2 — session avec alertes surprise */}
      {sessionReady && (
        <>
          {briefing && (
            <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', color: 'rgba(255,240,200,0.7)' }}>
              {briefing}
            </div>
          )}
          <AlertSession
            specialization={spec}
            alertType="alerte_m2"
            sessionMinutes={90}
            startLabel="Session active"
            startDesc="Session en cours. Gérez la mission et adaptez-vous aux événements."
          />
        </>
      )}
    </div>
  )
}

// ── Mission 3 ──────────────────────────────────────────────────────────────
function M3({ spec }: { spec: string }) {
  const [teams, setTeams] = useState(4)
  const [enigme, setEnigme] = useState('')
  const [loadingEnigme, setLoadingEnigme] = useState(false)

  const generateEnigme = async () => {
    setLoadingEnigme(true); setEnigme('')
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enigme_m3', specialization: spec, teams }),
      })
      const data = await res.json() as { content?: string }
      setEnigme(data.content ?? '')
    } finally { setLoadingEnigme(false) }
  }

  return (
    <div className="space-y-5">
      <MissionHeader n={3} titre="Synchroniser l'équipage" objectif="Chaque équipe reçoit des fragments d'une même histoire. Votre mission : communiquer avec les autres équipes et reconstituer l'ensemble avant les autres." />

      {/* Nombre d'équipes */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Nombre d'équipes dans la salle</p>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => setTeams(n)}
              className="flex-1 py-2 rounded-xl font-black text-sm"
              style={{
                background: teams === n ? '#c9a84c' : 'rgba(255,255,255,0.06)',
                color: teams === n ? '#050a1a' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${teams === n ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
              }}
            >{n}</button>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Les fragments seront distribués aléatoirement entre les {teams} équipes.</p>
      </div>

      <button
        onClick={generateEnigme}
        disabled={loadingEnigme}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: loadingEnigme ? 'rgba(201,168,76,0.4)' : '#f5c842' }}
      >
        <span className="text-xl">{loadingEnigme ? '⏳' : '🎲'}</span>
        <span>{loadingEnigme ? 'Distribution en cours…' : `Distribuer l'histoire (${teams} équipes)`}</span>
      </button>

      {enigme && (
        <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.18)', color: 'rgba(255,240,200,0.9)' }}>
          {enigme}
        </div>
      )}

      <Divider />
      <Generator
        label="Canal de communication + contrainte"
        icon="📡"
        type="canal_m3"
        spec={spec}
        hint="L'application impose un canal et une règle de communication entre les équipes."
        secondary
      />
    </div>
  )
}

// ── Mission 4 ──────────────────────────────────────────────────────────────
function M4({ spec }: { spec: string }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={4} titre="Émettre un signal clair" objectif="Analysez la situation proposée. Vous ne rédigez pas de réponse — vous réfléchissez, argumentez et défendez votre analyse face au groupe." />

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(201,168,76,0.7)' }}>
        💡 L'application génère une situation et des questions de réflexion. Les étudiants analysent, débattent — ils ne rédigent pas de réponse.
      </div>

      <Generator
        label="Générer une situation de réflexion"
        icon="🎲"
        type="situation_m4"
        spec={spec}
        hint="Situation critique + destinataire + canal + 4 questions pour faire réfléchir les étudiants."
      />
    </div>
  )
}

// ── Mission 5 ──────────────────────────────────────────────────────────────
function M5({ spec }: { spec: string }) {
  const [duration, setDuration] = useState<60 | 90>(90)

  return (
    <div className="space-y-5">
      <MissionHeader n={5} titre="Piloter les priorités" objectif="Vous recevez 6 demandes simultanées. Priorisez-les, justifiez vos choix et soyez prêts à réajuster votre plan face aux imprévus." />

      {/* Durée */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Durée de la session</p>
        <div className="flex gap-3">
          {([60, 90] as const).map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className="flex-1 py-3 rounded-xl font-black text-sm"
              style={{
                background: duration === d ? '#c9a84c' : 'rgba(255,255,255,0.06)',
                color: duration === d ? '#050a1a' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${duration === d ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
              }}
            >{d} minutes</button>
          ))}
        </div>
      </div>

      <Generator
        label="Générer le portefeuille de tâches"
        icon="🎲"
        type="taches_m5"
        spec={spec}
        hint="6 tâches Bac+3 avec urgence, impact stratégique, délai et risque. Les équipes doivent prioriser et justifier."
      />
      <Divider />
      <AlertSession
        specialization={spec}
        alertType="urgence_m5"
        sessionMinutes={duration}
        startLabel={`Session ${duration} minutes`}
        startDesc={`Session en cours. Gérez votre portefeuille de tâches et adaptez-vous à ce qui survient.`}
      />
    </div>
  )
}

// ── Mission 6 ──────────────────────────────────────────────────────────────
function M6({ spec }: { spec: string }) {
  const [scenario, setScenario] = useState('')
  const [loadingScenario, setLoadingScenario] = useState(false)
  const [sessionStarted, setSessionStarted] = useState(false)

  const generateScenario = async () => {
    setLoadingScenario(true); setScenario('')
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'scenario_m6', specialization: spec }),
      })
      const data = await res.json() as { content?: string }
      setScenario(data.content ?? '')
    } finally { setLoadingScenario(false) }
  }

  return (
    <div className="space-y-5">
      <MissionHeader n={6} titre="Sauver Horizon" objectif="Mission finale. Mobilisez toutes vos compétences pour sauver la station Horizon. 90 minutes. Tout ce que vous avez appris compte." />

      {/* Étape 1 — générer le scénario */}
      {!sessionStarted && (
        <>
          <button
            onClick={generateScenario}
            disabled={loadingScenario}
            className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: loadingScenario ? 'rgba(201,168,76,0.4)' : '#f5c842' }}
          >
            <span className="text-xl">{loadingScenario ? '⏳' : '🚀'}</span>
            <span>{loadingScenario ? 'Génération du scénario…' : 'Générer le scénario de crise'}</span>
          </button>

          {scenario && (
            <>
              <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(255,240,200,0.9)' }}>
                {scenario}
              </div>
              <button
                onClick={() => setSessionStarted(true)}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                style={{ background: '#c9a84c', color: '#050a1a', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}
              >
                ▶ Lancer la session de 90 minutes
              </button>
            </>
          )}
        </>
      )}

      {/* Étape 2 — session avec alertes auto */}
      {sessionStarted && (
        <>
          {scenario && (
            <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', color: 'rgba(255,240,200,0.7)' }}>
              {scenario}
            </div>
          )}
          <AlertSession
            specialization={spec}
            alertType="alerte_m6"
            sessionMinutes={90}
            startLabel="Session Horizon"
            startDesc="Session en cours. Gérez la crise et prenez vos décisions en équipe."
          />
          <Divider />
          <Generator
            label="Questions de débrief"
            icon="💬"
            type="debrief_m6"
            spec={spec}
            hint="5 questions pédagogiques pour le retour en groupe après la simulation."
            secondary
          />
        </>
      )}
    </div>
  )
}

// ── Labels spécialités ─────────────────────────────────────────────────────
const SPEC_LABELS: Record<string, string> = {
  marketing: 'Marketing Digital',
  negociation: 'Négociation',
  finance: 'Finance',
}

// ── Shell principal ────────────────────────────────────────────────────────
export default function HorizonShell({ group, missionNumber }: Props) {
  const spec = group.specialization ?? 'marketing'

  return (
    <div className="px-4 pb-16 pt-2 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#f5c842', border: '1px solid rgba(201,168,76,0.25)', fontFamily: 'monospace' }}>
          ◈ {SPEC_LABELS[spec] ?? spec}
        </span>
      </div>

      {missionNumber === 1 && <M1 spec={spec} />}
      {missionNumber === 2 && <M2 spec={spec} />}
      {missionNumber === 3 && <M3 spec={spec} />}
      {missionNumber === 4 && <M4 spec={spec} />}
      {missionNumber === 5 && <M5 spec={spec} />}
      {missionNumber === 6 && <M6 spec={spec} />}
    </div>
  )
}
