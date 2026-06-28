'use client'

import { useState } from 'react'
import type { SimulationScenario } from '@/types'

interface Props {
  scenario: SimulationScenario
}

function Accordion({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-violet-700/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-violet-950/40 hover:bg-violet-900/40 transition-colors"
      >
        <span className="flex items-center gap-2 text-white font-medium text-sm">
          <span>{icon}</span>
          {title}
        </span>
        <span className="text-violet-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-violet-950/20 text-white/80 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ScenarioDisplay({ scenario }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-violet-950/60 border border-fuchsia-700/40 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Dossier confidentiel</span>
          <div className="flex-1 h-px bg-fuchsia-700/30" />
          <span className="text-xs text-fuchsia-400">classé secret</span>
        </div>

        <h2 className="text-xl font-black text-white mb-1">{scenario.title}</h2>
        <p className="text-violet-200 text-sm mb-4">{scenario.context}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-violet-900/40 rounded-xl p-3">
            <p className="text-violet-400 text-xs uppercase tracking-wider mb-1">Entreprise</p>
            <p className="text-white font-semibold text-sm">{scenario.company}</p>
          </div>
          <div className="bg-violet-900/40 rounded-xl p-3">
            <p className="text-violet-400 text-xs uppercase tracking-wider mb-1">Votre rôle</p>
            <p className="text-white font-semibold text-sm">{scenario.role}</p>
          </div>
        </div>

        <div className="bg-violet-900/30 border border-violet-600/30 rounded-xl p-4 mb-4">
          <p className="text-violet-300 text-xs uppercase tracking-wider mb-1">Objectif</p>
          <p className="text-white text-sm">{scenario.objective}</p>
        </div>

        <div className="mb-4">
          <p className="text-violet-300 text-xs uppercase tracking-wider mb-2">Livrables attendus</p>
          <ul className="space-y-1">
            {scenario.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-fuchsia-400 mt-0.5">→</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-violet-300 text-xs uppercase tracking-wider mb-2">Contraintes</p>
          <ul className="space-y-1">
            {scenario.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-200/80">
                <span className="text-amber-400 mt-0.5">⚠</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-violet-300 text-xs uppercase tracking-wider">Personnages clés</p>
        {scenario.characters.map((char, i) => (
          <Accordion key={i} title={`${char.name} — ${char.role}`} icon="👤">
            <p><span className="text-violet-300">Trait principal : </span>{char.personality}</p>
          </Accordion>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-violet-300 text-xs uppercase tracking-wider">Documents disponibles</p>
        {scenario.documents.map((doc, i) => (
          <Accordion key={i} title={doc.name} icon="📄">
            <p className="text-violet-300 mb-2 text-xs">{doc.description}</p>
            <pre className="whitespace-pre-wrap font-sans text-white/70 text-xs">{doc.content}</pre>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
