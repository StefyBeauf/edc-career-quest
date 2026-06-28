'use client'

import { useState, useCallback } from 'react'
import type { CardType, Track } from '@/types'
import { getCardsByMissionAndType } from '@/lib/content/univers2'
import type { Univers2Card } from '@/lib/content/univers2'
import CardDisplay from './CardDisplay'

const CARD_TYPES: {
  type: CardType
  icon: string
  label: string
  sublabel: string
  activeStyle: { background: string; border: string; color: string }
  inactiveStyle: { background: string; border: string; color: string }
}[] = [
  {
    type: 'conseil',
    icon: '🧳',
    label: 'Équipement',
    sublabel: 'Outils & méthodes',
    activeStyle: {
      background: 'rgba(201,168,76,0.2)',
      border: 'rgba(201,168,76,0.6)',
      color: '#e8c86a',
    },
    inactiveStyle: {
      background: 'rgba(201,168,76,0.05)',
      border: 'rgba(201,168,76,0.2)',
      color: 'rgba(201,168,76,0.5)',
    },
  },
  {
    type: 'réflexion',
    icon: '🔭',
    label: 'Observation',
    sublabel: 'Prise de recul',
    activeStyle: {
      background: 'rgba(26,74,58,0.5)',
      border: 'rgba(80,200,160,0.5)',
      color: '#7dd8b8',
    },
    inactiveStyle: {
      background: 'rgba(26,74,58,0.15)',
      border: 'rgba(26,74,58,0.4)',
      color: 'rgba(80,200,160,0.4)',
    },
  },
  {
    type: 'défi',
    icon: '⚡',
    label: 'Mission',
    sublabel: 'Passage à l\'action',
    activeStyle: {
      background: 'rgba(180,40,40,0.3)',
      border: 'rgba(220,80,80,0.5)',
      color: '#f08080',
    },
    inactiveStyle: {
      background: 'rgba(180,40,40,0.06)',
      border: 'rgba(180,40,40,0.2)',
      color: 'rgba(220,80,80,0.4)',
    },
  },
  {
    type: 'inspiration',
    icon: '🌌',
    label: 'Découverte',
    sublabel: 'Vision & sens',
    activeStyle: {
      background: 'rgba(80,40,120,0.4)',
      border: 'rgba(160,100,220,0.5)',
      color: '#c0a0f0',
    },
    inactiveStyle: {
      background: 'rgba(80,40,120,0.08)',
      border: 'rgba(80,40,120,0.25)',
      color: 'rgba(160,100,220,0.4)',
    },
  },
]

interface CardDeckProps {
  missionNumber: number
  track: Track
}

export default function CardDeck({ missionNumber }: CardDeckProps) {
  const [activeType, setActiveType] = useState<CardType>('conseil')
  const [seenIds, setSeenIds] = useState<Record<CardType, Set<string>>>({
    conseil: new Set(),
    réflexion: new Set(),
    défi: new Set(),
    inspiration: new Set(),
  })
  const [currentCard, setCurrentCard] = useState<Univers2Card | null>(null)
  const [cardKey, setCardKey] = useState(0)
  const [seenCounts, setSeenCounts] = useState<Record<CardType, number>>({
    conseil: 0,
    réflexion: 0,
    défi: 0,
    inspiration: 0,
  })

  const drawCard = useCallback((type: CardType, currentSeen: Set<string>) => {
    const allCards = getCardsByMissionAndType(missionNumber, type)
    if (allCards.length === 0) return

    let available = allCards.filter(c => !currentSeen.has(c.id))
    if (available.length === 0) {
      const reset = new Set<string>()
      available = allCards
      setSeenIds(prev => ({ ...prev, [type]: reset }))
    }

    const picked = available[Math.floor(Math.random() * available.length)]

    setSeenIds(prev => {
      const updated = new Set(prev[type])
      updated.add(picked.id)
      return { ...prev, [type]: updated }
    })
    setSeenCounts(prev => ({ ...prev, [type]: prev[type] + 1 }))
    setCurrentCard(picked)
    setCardKey(k => k + 1)
  }, [missionNumber])

  const handleTypeChange = (type: CardType) => {
    setActiveType(type)
    setCurrentCard(null)
    drawCard(type, seenIds[type])
  }

  const handleAnotherCard = () => {
    drawCard(activeType, seenIds[activeType])
  }

  const activeConfig = CARD_TYPES.find(t => t.type === activeType)!

  // Si aucune carte affichée : montrer le choix de catégorie
  if (!currentCard) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-center mb-2">
          <p className="text-sm font-bold" style={{ color: '#e8d4a0' }}>Quelle carte souhaitez-vous explorer ?</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(232,212,160,0.5)' }}>Choisissez une catégorie</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CARD_TYPES.map(({ type, icon, label, sublabel, activeStyle }) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className="flex flex-col items-center gap-2 px-3 py-5 rounded-2xl text-center transition-all active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${activeStyle.border}`,
                boxShadow: `0 4px 20px ${activeStyle.border}22`,
              }}
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="text-sm font-black uppercase tracking-wide" style={{ color: activeStyle.color }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Catégories — petites en haut quand une carte est affichée */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CARD_TYPES.map(({ type, icon, label, activeStyle, inactiveStyle }) => {
          const isActive = activeType === type
          const s = isActive ? activeStyle : inactiveStyle
          return (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all flex-shrink-0"
              style={{ background: s.background, border: `1px solid ${s.border}`, color: s.color }}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {seenCounts[type] > 0 && <span className="opacity-60">·{seenCounts[type]}</span>}
            </button>
          )
        })}
      </div>

      {/* Carte affichée */}
      <div key={cardKey}>
        <CardDisplay card={currentCard} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleAnotherCard}
          className="flex-1 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c' }}
        >
          Autre carte →
        </button>
        <button
          onClick={() => { setCurrentCard(null); setActiveType('conseil') }}
          className="py-3.5 px-4 rounded-xl font-bold text-sm transition-all active:scale-95"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
        >
          Changer
        </button>
      </div>
    </div>
  )
}
