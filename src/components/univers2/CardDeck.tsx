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

  return (
    <div className="flex flex-col gap-5">
      {/* Label section */}
      <p
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: 'rgba(201,168,76,0.6)' }}
      >
        Catégories d&apos;équipement
      </p>

      {/* Onglets catégories */}
      <div className="grid grid-cols-2 gap-2">
        {CARD_TYPES.map(({ type, icon, label, sublabel, activeStyle, inactiveStyle }) => {
          const isActive = activeType === type
          const style = isActive ? activeStyle : inactiveStyle
          return (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className="flex flex-col items-start gap-0.5 px-3 py-3 rounded-xl text-left transition-all"
              style={{
                background: style.background,
                border: `1px solid ${style.border}`,
              }}
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{icon}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wide flex-1"
                  style={{ color: style.color }}
                >
                  {label}
                </span>
                {seenCounts[type] > 0 && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  >
                    {seenCounts[type]}
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', paddingLeft: '2px' }}>
                {sublabel}
              </span>
            </button>
          )
        })}
      </div>

      {/* Zone de carte */}
      <div key={cardKey} className="w-full">
        {currentCard ? (
          <CardDisplay card={currentCard} />
        ) : (
          <button
            className="flex flex-col items-center justify-center w-full rounded-2xl transition-all"
            style={{
              minHeight: '200px',
              background: 'rgba(255,255,255,0.03)',
              border: `2px dashed ${activeConfig.activeStyle.border}`,
            }}
            onClick={() => drawCard(activeType, seenIds[activeType])}
          >
            <span className="text-4xl mb-3">🎒</span>
            <span className="text-sm font-semibold" style={{ color: activeConfig.activeStyle.color }}>
              Piocher dans le sac à dos
            </span>
            <span className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Carte {activeConfig.label}
            </span>
          </button>
        )}
      </div>

      {/* Bouton autre carte */}
      {currentCard && (
        <button
          onClick={handleAnotherCard}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          style={{
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.35)',
            color: '#c9a84c',
          }}
        >
          <span>🎒</span>
          <span>Piocher une autre carte</span>
          <span style={{ opacity: 0.5 }}>→</span>
        </button>
      )}
    </div>
  )
}
