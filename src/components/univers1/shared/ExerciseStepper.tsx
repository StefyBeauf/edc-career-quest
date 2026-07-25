'use client'

interface StepDef {
  n: 1 | 2 | 3
  label: string
  badge: '✅' | '🛫'
}

export default function ExerciseStepper({ etape, steps }: { etape: 1 | 2 | 3; steps: StepDef[] }) {
  // Progression du parcours de vol : 0% au départ, 50% entre ex.1 et ex.2, 100% à l'exercice final
  const pourcentage = ((etape - 1) / (steps.length - 1)) * 100

  return (
    <div className="space-y-2.5">
      {/* Piste de progression façon parcours de vol */}
      <div className="relative px-1">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pourcentage}%`, background: 'linear-gradient(90deg, #c9a84c, #e8d080)' }}
          />
        </div>
        <div
          className="absolute -top-2.5 transition-all duration-700"
          style={{ left: `calc(${pourcentage}% - 10px)` }}
        >
          <span className="text-base" style={{ filter: 'drop-shadow(0 0 4px rgba(232,201,106,0.6))' }}>✈️</span>
        </div>
      </div>

      <div className="flex gap-2">
        {steps.map((s) => {
          const isActif = etape === s.n
          const isFait = etape > s.n
          return (
            <div key={s.n} className="flex-1 rounded-xl p-3 text-center" style={{
              background: isActif ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
              border: isActif ? '1.5px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.07)',
            }}>
              <p className="text-base">{isFait ? '✓' : s.badge}</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: isActif ? '#c9a84c' : isFait ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.3)' }}>
                Ex. {s.n}
              </p>
              <p className="text-xs mt-0.5" style={{ color: isActif ? 'rgba(245,240,232,0.65)' : 'rgba(255,255,255,0.2)' }}>
                {s.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
