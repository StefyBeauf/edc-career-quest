'use client'

import type { Univers2Card } from '@/lib/content/univers2'
import type { CardType } from '@/types'

interface CardConfig {
  icon: string
  label: string
  background: string
  border: string
  accentColor: string
  tagBg: string
  filigrane: string
}

const TYPE_CONFIG: Record<CardType, CardConfig> = {
  conseil: {
    icon: '🧳',
    label: 'Carte Équipement',
    background: 'linear-gradient(145deg, #2a1f08 0%, #1a1408 60%, #0e0c04 100%)',
    border: 'rgba(201,168,76,0.5)',
    accentColor: '#e8c86a',
    tagBg: 'rgba(201,168,76,0.12)',
    filigrane: '🧳',
  },
  réflexion: {
    icon: '🔭',
    label: 'Carte Observation',
    background: 'linear-gradient(145deg, #0a1f18 0%, #071510 60%, #040e0a 100%)',
    border: 'rgba(80,200,160,0.4)',
    accentColor: '#7dd8b8',
    tagBg: 'rgba(26,74,58,0.4)',
    filigrane: '🔭',
  },
  défi: {
    icon: '⚡',
    label: 'Carte Mission',
    background: 'linear-gradient(145deg, #1f0808 0%, #150505 60%, #0e0404 100%)',
    border: 'rgba(220,80,80,0.4)',
    accentColor: '#f08080',
    tagBg: 'rgba(180,40,40,0.2)',
    filigrane: '⚡',
  },
  inspiration: {
    icon: '🌌',
    label: 'Carte Découverte',
    background: 'linear-gradient(145deg, #130a1f 0%, #0d0615 60%, #08040e 100%)',
    border: 'rgba(160,100,220,0.4)',
    accentColor: '#c0a0f0',
    tagBg: 'rgba(80,40,120,0.3)',
    filigrane: '🌌',
  },
}

interface CardDisplayProps {
  card: Univers2Card
}

export default function CardDisplay({ card }: CardDisplayProps) {
  const config = TYPE_CONFIG[card.type]

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden animate-card-slide"
      style={{
        background: config.background,
        border: `1px solid ${config.border}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
        minHeight: '240px',
      }}
    >
      {/* Coin plié en haut à droite */}
      <div
        className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, rgba(255,255,255,0.08) 50%, transparent 50%)`,
          borderBottomLeftRadius: '8px',
        }}
      />
      <div
        className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, ${config.border} 48%, transparent 50%)`,
          opacity: 0.4,
          borderBottomLeftRadius: '8px',
        }}
      />

      {/* Numéro en filigrane */}
      <div
        className="absolute bottom-3 right-5 text-6xl font-black pointer-events-none select-none leading-none"
        style={{ color: 'rgba(255,255,255,0.04)', userSelect: 'none' }}
        aria-hidden="true"
      >
        {card.id.split('-').pop()}
      </div>

      {/* Filigrane icône */}
      <div
        className="absolute top-1/2 right-6 -translate-y-1/2 text-7xl pointer-events-none select-none"
        style={{ opacity: 0.04 }}
        aria-hidden="true"
      >
        {config.filigrane}
      </div>

      {/* Contenu */}
      <div className="relative z-10 p-6">
        {/* En-tête */}
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-xl">{config.icon}</span>
          <div>
            <p
              className="text-xs font-black uppercase tracking-[0.2em] leading-none"
              style={{ color: config.accentColor }}
            >
              {config.label}
            </p>
          </div>
        </div>

        {/* Ligne décorative */}
        <div
          className="h-px w-12 mb-5 rounded-full"
          style={{ background: `linear-gradient(to right, ${config.accentColor}, transparent)` }}
        />

        {/* Texte principal */}
        <p
          className="text-base leading-relaxed font-medium"
          style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1rem', lineHeight: '1.65' }}
        >
          {card.content}
        </p>

        {/* Tags */}
        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {card.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{
                  background: config.tagBg,
                  color: config.accentColor,
                  border: `1px solid ${config.border}`,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
