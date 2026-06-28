'use client'

import { useState, useCallback } from 'react'
import type { Group } from '@/types'

interface Props {
  group: Group
  missionNumber: number
}

type GeneratedContent = { text: string; loading: boolean; error?: boolean }

function useGenerator(type: string, specialization: string) {
  const [state, setState] = useState<GeneratedContent>({ text: '', loading: false })

  const generate = useCallback(async () => {
    setState({ text: '', loading: true })
    try {
      const res = await fetch('/api/horizon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, specialization }),
      })
      const data = await res.json() as { content?: string; error?: string }
      setState({ text: data.content ?? '', loading: false })
    } catch {
      setState({ text: '', loading: false, error: true })
    }
  }, [type, specialization])

  return { ...state, generate }
}

// ─── Composant bouton + résultat ─────────────────────────────────────────────
function Generator({ label, icon, type, specialization, hint }: {
  label: string; icon: string; type: string; specialization: string; hint?: string
}) {
  const { text, loading, error, generate } = useGenerator(type, specialization)

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={generate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm transition-all active:scale-[0.98]"
        style={{
          background: loading ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.15)',
          border: '1.5px solid rgba(201,168,76,0.5)',
          color: loading ? 'rgba(201,168,76,0.5)' : '#f5c842',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.1)',
        }}
      >
        <span className="text-xl">{loading ? '⏳' : icon}</span>
        <span>{loading ? 'Génération en cours…' : label}</span>
      </button>

      {hint && !text && !loading && (
        <p className="text-xs px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{hint}</p>
      )}

      {error && (
        <p className="text-xs text-center" style={{ color: '#f87171' }}>Erreur de connexion — réessayez</p>
      )}

      {text && (
        <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: 'rgba(255,240,200,0.9)',
        }}>
          {text}
        </div>
      )}
    </div>
  )
}

// ─── Missions ─────────────────────────────────────────────────────────────────
function Mission1({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={1}
        titre="Définir ses coordonnées"
        objectif="Aider l'étudiant à identifier ses compétences et sa direction professionnelle."
      />
      <Generator
        label="Nouvelle question Horizon"
        icon="🎲"
        type="question_competences"
        specialization={spec}
        hint="L'IA génère une question de réflexion adaptée à la spécialité."
      />
    </div>
  )
}

function Mission2({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={2}
        titre="Garder le contrôle sous pression"
        objectif="Apprendre à gérer les imprévus et réagir vite."
      />
      <Generator
        label="Générer un incident"
        icon="⚠️"
        type="incident"
        specialization={spec}
        hint="Perte d'information, changement de priorité, délai réduit, absence d'un collaborateur…"
      />
    </div>
  )
}

function Mission3({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={3}
        titre="Synchroniser l'équipage"
        objectif="Collaborer efficacement avec des contraintes de communication."
      />
      <Generator
        label="Nouvelle contrainte de communication"
        icon="🎲"
        type="contrainte_communication"
        specialization={spec}
        hint="Communication écrite seulement, un seul porte-parole, 10 mots max…"
      />
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />
      <Generator
        label="Générer une perturbation d'information"
        icon="🔀"
        type="perturbation"
        specialization={spec}
        hint="Une info est fausse, un indice est incomplet, deux sources se contredisent…"
      />
    </div>
  )
}

function Mission4({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={4}
        titre="Émettre un signal clair"
        objectif="Adapter sa communication selon le destinataire et l'objectif."
      />
      <Generator
        label="Générer un scénario de communication"
        icon="🎲"
        type="scenario_communication"
        specialization={spec}
        hint="L'IA choisit un destinataire, un objectif et une contrainte de format."
      />
    </div>
  )
}

function Mission5({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={5}
        titre="Piloter les priorités"
        objectif="Arbitrer entre plusieurs demandes simultanées."
      />
      <Generator
        label="Générer des tâches à prioriser"
        icon="🎲"
        type="taches"
        specialization={spec}
        hint="4 tâches avec niveaux d'urgence et d'impact différents."
      />
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />
      <Generator
        label="Nouvelle urgence"
        icon="⚠️"
        type="urgence"
        specialization={spec}
        hint="Un événement qui change les priorités en cours d'exercice."
      />
    </div>
  )
}

function Mission6({ spec }: { spec: string }) {
  return (
    <div className="space-y-6">
      <MissionHeader
        numero={6}
        titre="Sauver Horizon"
        objectif="Mobiliser l'ensemble des compétences du parcours."
      />
      <Generator
        label="Lancer la mission"
        icon="🚀"
        type="scenario_final"
        specialization={spec}
        hint="L'IA génère un scénario complet : contexte, problème, personnages, contraintes, livrable."
      />
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />
      <Generator
        label="Nouvel événement"
        icon="⚠️"
        type="evenement_final"
        specialization={spec}
        hint="Un incident ou une opportunité qui survient pendant la simulation."
      />
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />
      <Generator
        label="Questions de débrief"
        icon="💬"
        type="debrief"
        specialization={spec}
        hint="4 questions pédagogiques pour le retour en groupe après l'exercice."
      />
    </div>
  )
}

// ─── En-tête de mission ───────────────────────────────────────────────────────
function MissionHeader({ numero, titre, objectif }: { numero: number; titre: string; objectif: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'monospace' }}>
        Mission {numero} / 6
      </p>
      <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">{titre}</h2>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{objectif}</p>
    </div>
  )
}

// ─── Shell principal ──────────────────────────────────────────────────────────
const SPEC_LABELS: Record<string, string> = {
  marketing: 'Marketing Digital',
  negociation: 'Négociation',
  finance: 'Finance',
}

export default function HorizonShell({ group, missionNumber }: Props) {
  const spec = group.specialization ?? 'marketing'
  const specLabel = SPEC_LABELS[spec] ?? spec

  return (
    <div className="px-4 pb-16 pt-2 max-w-xl mx-auto">

      {/* Badge spécialité */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: '#f5c842', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'monospace' }}>
          ◈ {specLabel}
        </span>
      </div>

      {/* Contenu de la mission active */}
      {missionNumber === 1 && <Mission1 spec={spec} />}
      {missionNumber === 2 && <Mission2 spec={spec} />}
      {missionNumber === 3 && <Mission3 spec={spec} />}
      {missionNumber === 4 && <Mission4 spec={spec} />}
      {missionNumber === 5 && <Mission5 spec={spec} />}
      {missionNumber === 6 && <Mission6 spec={spec} />}

    </div>
  )
}
