'use client'

import { useState, useCallback } from 'react'
import type { CardType, Track } from '@/types'
import { getCardsByMissionAndType } from '@/lib/content/univers2'
import type { Univers2Card } from '@/lib/content/univers2'
import CardDisplay from './CardDisplay'

const CARD_TYPES: { type: CardType; icon: string; label: string }[] = [
  { type: 'conseil', icon: '💡', label: 'Conseil' },
  { type: 'réflexion', icon: '🤔', label: 'Réflexion' },
  { type: 'défi', icon: '🎯', label: 'Défi' },
  { type: 'inspiration', icon: '✨', label: 'Inspiration' },
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        {CARD_TYPES.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeType === type
                ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-200'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
            {seenCounts[type] > 0 && (
              <span className="ml-1 text-xs opacity-60">({seenCounts[type]})</span>
            )}
          </button>
        ))}
      </div>

      <div key={cardKey} className="w-full">
        {currentCard ? (
          <CardDisplay card={currentCard} />
        ) : (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-700/30 bg-emerald-950/30 text-white/40 cursor-pointer hover:bg-emerald-950/50 transition-all"
            style={{ minHeight: '220px' }}
            onClick={() => drawCard(activeType, seenIds[activeType])}
          >
            <span className="text-4xl mb-3">🃏</span>
            <span className="text-sm">Tirer une carte</span>
          </div>
        )}
      </div>

      {currentCard && (
        <button
          onClick={handleAnotherCard}
          className="w-full py-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-emerald-200 text-sm font-medium transition-all"
        >
          Autre carte →
        </button>
      )}
    </div>
  )
}
