'use client'

import type { Univers2Card } from '@/lib/content/univers2'
import type { CardType } from '@/types'

const TYPE_CONFIG: Record<CardType, { icon: string; border: string; bg: string; label: string }> = {
  conseil: {
    icon: '💡',
    border: 'border-yellow-400/60',
    bg: 'from-yellow-950/40 to-amber-950/20',
    label: 'Conseil',
  },
  réflexion: {
    icon: '🤔',
    border: 'border-violet-400/60',
    bg: 'from-violet-950/40 to-purple-950/20',
    label: 'Réflexion',
  },
  défi: {
    icon: '🎯',
    border: 'border-orange-400/60',
    bg: 'from-orange-950/40 to-red-950/20',
    label: 'Défi',
  },
  inspiration: {
    icon: '✨',
    border: 'border-cyan-400/60',
    bg: 'from-cyan-950/40 to-teal-950/20',
    label: 'Inspiration',
  },
}

interface CardDisplayProps {
  card: Univers2Card
}

export default function CardDisplay({ card }: CardDisplayProps) {
  const config = TYPE_CONFIG[card.type]

  return (
    <div
      className={`relative w-full rounded-2xl border ${config.border} bg-gradient-to-br ${config.bg} p-6 shadow-xl animate-fade-slide`}
      style={{ minHeight: '220px' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{config.icon}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
          {config.label}
        </span>
      </div>

      <p className="text-white text-base leading-relaxed font-medium">
        {card.content}
      </p>

      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {card.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
