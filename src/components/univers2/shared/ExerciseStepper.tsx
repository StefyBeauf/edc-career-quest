'use client'

interface StepDef {
  n: 1 | 2 | 3
  label: string
  picto: string
}

export default function ExerciseStepper({ etape, steps }: { etape: 1 | 2 | 3; steps: StepDef[] }) {
  const pourcentage = ((etape - 1) / (steps.length - 1)) * 100

  return (
    <div className="space-y-3">
      {/* Piste de progression */}
      <div className="relative px-1">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pourcentage}%`, background: 'linear-gradient(90deg, #c9a84c, #e8d080)' }}
          />
        </div>
      </div>

      {/* Étapes numérotées : à venir → en cours (doré) → terminé (vert) */}
      <div className="flex items-start gap-2">
        {steps.map((s) => {
          const isActif = etape === s.n
          const isFait = etape > s.n
          return (
            <div key={s.n} className="flex-1 flex flex-col items-center text-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all"
                style={{
                  background: isFait ? '#5aa37c' : isActif ? 'linear-gradient(135deg, #c9a84c, #e8d080)' : 'transparent',
                  border: isFait ? 'none' : isActif ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                  color: isFait ? '#0f0a04' : isActif ? '#0f0a04' : 'rgba(255,255,255,0.35)',
                  boxShadow: isActif ? '0 0 0 3px rgba(201,168,76,0.18)' : 'none',
                }}
              >
                {isFait ? '✓' : s.picto}
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: isActif ? '#c9a84c' : isFait ? 'rgba(90,163,124,0.85)' : 'rgba(255,255,255,0.3)' }}>
                  {isFait ? 'Terminé' : isActif ? 'En cours' : 'À venir'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: isActif ? 'rgba(245,240,232,0.65)' : 'rgba(255,255,255,0.2)' }}>
                  {s.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
