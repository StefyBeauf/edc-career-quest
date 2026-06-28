'use client'

import type { Univers2Mission } from '@/lib/content/univers2'

interface MissionSelectorProps {
  missions: Univers2Mission[]
  activeMission: number
  selectedMission: number
  onSelect: (n: number) => void
}

export default function MissionSelector({
  missions,
  activeMission,
  selectedMission,
  onSelect,
}: MissionSelectorProps) {
  return (
    <div className="relative flex flex-col gap-0">
      {/* Ligne verticale du sentier */}
      <div
        className="absolute left-6 top-7 bottom-7 w-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), rgba(26,74,58,0.3))' }}
      />

      {missions.map((mission, idx) => {
        const isUnlocked = mission.number <= activeMission
        const isSelected = mission.number === selectedMission
        const isLocked = !isUnlocked
        const isCompleted = mission.number < activeMission

        return (
          <button
            key={mission.number}
            disabled={isLocked}
            onClick={() => isUnlocked && onSelect(mission.number)}
            className="relative flex items-start gap-4 py-3 text-left w-full transition-all"
            style={{ paddingLeft: '0', cursor: isLocked ? 'not-allowed' : 'pointer' }}
          >
            {/* Cercle jalon */}
            <div className="relative z-10 shrink-0 mt-0.5" style={{ width: '48px', display: 'flex', justifyContent: 'center' }}>
              {isSelected ? (
                /* Jalon actif : cercle doré pulsant */
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ background: '#c9a84c', width: '28px', height: '28px' }}
                  />
                  <div
                    className="relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c, #e8c86a)',
                      color: '#1a2744',
                      boxShadow: '0 0 16px rgba(201,168,76,0.6)',
                    }}
                  >
                    ★
                  </div>
                </div>
              ) : isCompleted ? (
                /* Jalon complété : drapeau vert */
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(26,74,58,0.8)',
                    border: '2px solid rgba(201,168,76,0.6)',
                    color: '#c9a84c',
                  }}
                >
                  ✓
                </div>
              ) : isLocked ? (
                /* Jalon verrouillé : cadenas dans le brouillard */
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '2px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.25)',
                  }}
                >
                  🔒
                </div>
              ) : (
                /* Jalon disponible non sélectionné */
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(26,74,58,0.4)',
                    border: '2px solid rgba(201,168,76,0.3)',
                    color: 'rgba(201,168,76,0.7)',
                  }}
                >
                  {idx + 1}
                </div>
              )}
            </div>

            {/* Contenu de la mission */}
            <div
              className="flex-1 rounded-xl px-4 py-3 transition-all"
              style={{
                background: isSelected
                  ? 'rgba(201,168,76,0.1)'
                  : isLocked
                  ? 'rgba(255,255,255,0.02)'
                  : 'rgba(26,74,58,0.25)',
                border: isSelected
                  ? '1px solid rgba(201,168,76,0.4)'
                  : isLocked
                  ? '1px solid rgba(255,255,255,0.05)'
                  : '1px solid rgba(26,74,58,0.5)',
                opacity: isLocked ? 0.4 : 1,
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: isSelected ? '#c9a84c' : 'rgba(201,168,76,0.5)' }}
                >
                  Étape {mission.number}
                </span>
                {isCompleted && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(26,74,58,0.6)', color: 'rgba(201,168,76,0.8)' }}
                  >
                    Complétée
                  </span>
                )}
              </div>
              <p
                className="text-sm font-bold leading-tight"
                style={{ color: isLocked ? 'rgba(255,255,255,0.3)' : 'white' }}
              >
                {mission.title}
              </p>
              <p
                className="text-xs leading-relaxed mt-1 line-clamp-2"
                style={{ color: isLocked ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)' }}
              >
                {mission.description}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
