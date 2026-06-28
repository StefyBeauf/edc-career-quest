'use client'

import { useState } from 'react'
import type { SimulationScenario } from '@/types'

interface Props {
  scenario: SimulationScenario
}

function ClassifiedPanel({
  title,
  icon,
  children,
  accentColor = 'rgba(100, 160, 255, 0.4)',
}: {
  title: string
  icon: string
  children: React.ReactNode
  accentColor?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{
        background: 'rgba(5, 10, 26, 0.85)',
        border: `1px solid ${accentColor}`,
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200"
        style={{
          background: open ? 'rgba(13, 31, 60, 0.9)' : 'rgba(10, 22, 40, 0.6)',
        }}
      >
        <span
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          style={{ color: '#e8f0ff', fontFamily: 'monospace' }}
        >
          <span>{icon}</span>
          {title}
        </span>
        <span
          className="text-xs font-black"
          style={{ color: accentColor, fontFamily: 'monospace' }}
        >
          {open ? '[ — ]' : '[ + ]'}
        </span>
      </button>
      {open && (
        <div
          className="px-4 py-4 text-sm leading-relaxed"
          style={{
            color: 'rgba(232, 240, 255, 0.8)',
            background: 'rgba(5, 10, 26, 0.6)',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default function ScenarioDisplay({ scenario }: Props) {
  return (
    <div className="space-y-4">
      {/* Dossier principal — style CONFIDENTIEL */}
      <div
        className="rounded-sm p-5 space-y-4"
        style={{
          background: 'rgba(5, 10, 26, 0.92)',
          border: '1px solid rgba(100, 160, 255, 0.4)',
          boxShadow: '0 0 40px rgba(100, 160, 255, 0.1)',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
        }}
      >
        {/* Tampon CONFIDENTIEL */}
        <div className="flex items-center justify-between">
          <div
            className="px-3 py-1 text-xs font-black uppercase tracking-widest border rotate-[-2deg]"
            style={{
              borderColor: '#dc2626',
              color: '#dc2626',
              background: 'rgba(220, 38, 38, 0.08)',
              fontFamily: 'monospace',
              letterSpacing: '0.3em',
            }}
          >
            CONFIDENTIEL
          </div>
          <div
            className="text-xs"
            style={{ color: 'rgba(232, 240, 255, 0.3)', fontFamily: 'monospace' }}
          >
            DOSSIER #{String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}
          </div>
        </div>

        {/* Ligne lumineuse */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(100,160,255,0.5), transparent)' }} />

        <h2
          className="text-xl font-black uppercase"
          style={{ color: '#e8f0ff', fontFamily: 'monospace', textShadow: '0 0 15px rgba(200,220,255,0.3)' }}
        >
          {scenario.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(232, 240, 255, 0.7)' }}>
          {scenario.context}
        </p>

        {/* Modules entreprise / rôle */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-sm p-3"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.2)',
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
            >
              ENTREPRISE
            </p>
            <p className="font-bold text-sm" style={{ color: '#e8f0ff' }}>{scenario.company}</p>
          </div>
          <div
            className="rounded-sm p-3"
            style={{
              background: 'rgba(13, 31, 60, 0.8)',
              border: '1px solid rgba(100, 160, 255, 0.2)',
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
            >
              VOTRE RÔLE
            </p>
            <p className="font-bold text-sm" style={{ color: '#e8f0ff' }}>{scenario.role}</p>
          </div>
        </div>

        {/* Objectif */}
        <div
          className="rounded-sm p-4"
          style={{
            background: 'rgba(13, 31, 60, 0.6)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: '#c9a84c', fontFamily: 'monospace' }}
          >
            OBJECTIF DE MISSION
          </p>
          <p className="text-sm" style={{ color: 'rgba(232, 240, 255, 0.85)' }}>{scenario.objective}</p>
        </div>

        {/* Livrables */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
          >
            LIVRABLES ATTENDUS
          </p>
          <ul className="space-y-2">
            {scenario.deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm"
                style={{ color: 'rgba(232, 240, 255, 0.8)' }}
              >
                <span
                  style={{
                    color: '#c9a84c',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    marginTop: '3px',
                    minWidth: '20px',
                  }}
                >
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Contraintes */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
          >
            CONTRAINTES OPÉRATIONNELLES
          </p>
          <ul className="space-y-2">
            {scenario.constraints.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm"
                style={{ color: 'rgba(232, 200, 130, 0.85)' }}
              >
                <span style={{ color: '#e8a020', marginTop: '2px' }}>!</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personnages — fiches d'identité */}
      <div className="space-y-2">
        <p
          className="text-xs uppercase tracking-widest px-1"
          style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
        >
          PERSONNEL IMPLIQUÉ
        </p>
        {scenario.characters.map((char, i) => (
          <ClassifiedPanel
            key={i}
            title={`${char.name} — ${char.role}`}
            icon="[ID]"
            accentColor="rgba(100, 160, 255, 0.35)"
          >
            <div className="flex gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center text-lg"
                style={{
                  background: 'rgba(13, 31, 60, 0.8)',
                  border: '1px solid rgba(100, 160, 255, 0.3)',
                }}
              >
                {char.name?.[0] ?? '?'}
              </div>
              <div className="flex-1">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
                >
                  PROFIL COMPORTEMENTAL
                </p>
                <p>{char.personality}</p>
              </div>
            </div>
          </ClassifiedPanel>
        ))}
      </div>

      {/* Documents classifiés */}
      <div className="space-y-2">
        <p
          className="text-xs uppercase tracking-widest px-1"
          style={{ color: 'rgba(232, 240, 255, 0.4)', fontFamily: 'monospace' }}
        >
          DOCUMENTS CLASSIFIÉS
        </p>
        {scenario.documents.map((doc, i) => (
          <ClassifiedPanel
            key={i}
            title={doc.name}
            icon="[DOC]"
            accentColor="rgba(201, 168, 76, 0.3)"
          >
            <p
              className="mb-3 text-xs uppercase tracking-wider"
              style={{ color: 'rgba(201, 168, 76, 0.7)', fontFamily: 'monospace' }}
            >
              {doc.description}
            </p>
            <pre
              className="whitespace-pre-wrap text-xs leading-relaxed"
              style={{ color: 'rgba(232, 240, 255, 0.7)', fontFamily: 'monospace' }}
            >
              {doc.content}
            </pre>
          </ClassifiedPanel>
        ))}
      </div>
    </div>
  )
}
