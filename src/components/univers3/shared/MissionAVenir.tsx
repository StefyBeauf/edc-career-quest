'use client'

import MissionHeader from './MissionHeader'

// Missions 4 à 6 : contenus à créer. Aucun bouton d'action, aucun contenu IA.
export default function MissionAVenir({ n, total }: { n: number; total: number }) {
  return (
    <div className="space-y-5">
      <MissionHeader n={n} total={total} titre="Mission à venir" objectif="Cette mission n'est pas encore ouverte." />
      <div className="rounded-2xl p-8 text-center space-y-3" style={{ background: 'rgba(201,168,76,0.06)', border: '1.5px dashed rgba(201,168,76,0.35)' }}>
        <p className="text-3xl" aria-hidden="true">🔒</p>
        <p className="font-black text-white">Mission à venir — ton intervenante t&apos;en dira plus bientôt.</p>
      </div>
    </div>
  )
}
