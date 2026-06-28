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
      <MissionHeader n={1} titre="Définir ses coordonnées" objectif="Identifier ses forces, ses axes de progression et définir son cap professionnel." />
      <Generator label="Nouvelle question Horizon" icon="🎲" type="question_m1" spec={spec} hint="L'IA génère une question de réflexion adaptée à la spécialité." />
    </div>
  )
}

// ── Mission 2 ──────────────────────────────────────────────────────────────
function M2({ spec }: { spec: string }) {
  const [mission, setMission] = useState('')
  const [genMission, setGenMission] = useState(false)

  return (
    <div className="space-y-5">
      <MissionHeader n={2} titre="Garder le contrôle sous pression" objectif="Apprendre à réagir vite sous pression. L'application injecte des alertes toutes les 15-20 minutes." />

      {/* Définir la mission confiée aux équipes */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Mission confiée aux équipes</p>
        <textarea
          value={mission}
          onChange={e => setMission(e.target.value)}
          placeholder="Ex : Préparer une présentation client pour lundi 9h…"
          rows={2}
          className="w-full rounded-xl px-3 py-2 text-sm resize-none outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', caretColor: '#c9a84c' }}
        />
        <div className="flex gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span>⏱ Durée : 90 min</span>
          <span>·</span>
          <span>🔴 Alertes : toutes les 15-20 min</span>
        </div>
      </div>

      <AlertSession
        specialization={spec}
        alertType="alerte_m2"
        sessionMinutes={90}
        startLabel="Démarrer la session de pression"
        startDesc="Les alertes seront injectées automatiquement toutes les 15-20 minutes."
      />
    </div>
  )
}

// ── Mission 3 ──────────────────────────────────────────────────────────────
function M3({ spec }: { spec: string }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={3} titre="Synchroniser l'équipage" objectif="Escape game inter-équipes. Aucune équipe ne possède toutes les informations. Ils doivent communiquer pour réussir." />

      <Generator
        label="Générer une énigme collaborative"
        icon="🎲"
        type="enigme_m3"
        spec={spec}
        hint="L'IA crée une énigme avec 4 paquets d'indices à distribuer aux équipes. Aucune équipe ne peut résoudre seule."
      />
      <Divider />
      <Generator
        label="Canal de communication + contrainte"
        icon="📡"
        type="canal_m3"
        spec={spec}
        hint="L'application impose un canal (WhatsApp, email, porte-parole…) et une règle de communication."
        secondary
      />
    </div>
  )
}

// ── Mission 4 ──────────────────────────────────────────────────────────────
function M4({ spec }: { spec: string }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={4} titre="Émettre un signal clair" objectif="Le Centre de Contrôle reçoit une info critique à transmettre. Chaque destinataire a des attentes différentes." />

      <Generator
        label="Générer une situation de communication"
        icon="🎲"
        type="situation_m4"
        spec={spec}
        hint="L'IA génère : information critique + destinataire + canal imposé + contrainte. 200 situations possibles."
      />
    </div>
  )
}

// ── Mission 5 ──────────────────────────────────────────────────────────────
function M5({ spec }: { spec: string }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={5} titre="Piloter les priorités" objectif="L'application bombarde les équipes de demandes. Toutes semblent importantes. Ils ne peuvent pas tout faire." />

      <Generator
        label="Générer les tâches à prioriser"
        icon="🎲"
        type="taches_m5"
        spec={spec}
        hint="5 tâches simultanées avec niveaux d'urgence, impact, délai et risque. Les équipes doivent arbitrer."
      />
      <Divider />
      <Generator
        label="Injecter une urgence surprise"
        icon="⚠️"
        type="urgence_m5"
        spec={spec}
        hint="Un événement qui change les priorités en cours d'exercice."
        secondary
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
      <MissionHeader n={6} titre="Sauver Horizon" objectif="Mission finale. Les étudiants mobilisent toutes les compétences pour sauver la station Horizon. 90 minutes." />

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
            startDesc="Les alertes de crise sont injectées automatiquement toutes les 15-20 minutes."
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
