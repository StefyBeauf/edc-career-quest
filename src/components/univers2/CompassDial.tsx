'use client'

import type { DirectionBoussole } from '@/lib/content/univers2-cours1'

const ANGLE: Record<DirectionBoussole['code'], number> = {
  nord: 0,
  est: 90,
  sud: 180,
  ouest: 270,
}

const POSITION: Record<DirectionBoussole['code'], { top: string; left: string }> = {
  nord: { top: '4%', left: '50%' },
  est: { top: '50%', left: '96%' },
  sud: { top: '96%', left: '50%' },
  ouest: { top: '50%', left: '4%' },
}

interface CompassDialProps {
  directions: DirectionBoussole[]
  activeCode: DirectionBoussole['code'] | null
  exploredCodes: string[]
  onSelect: (code: DirectionBoussole['code']) => void
}

export default function CompassDial({ directions, activeCode, exploredCodes, onSelect }: CompassDialProps) {
  const needleAngle = activeCode ? ANGLE[activeCode] : 0

  return (
    <div className="relative mx-auto" style={{ width: '260px', height: '260px' }}>
      {/* Cadran */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 42%, rgba(201,168,76,0.1) 0%, rgba(15,10,4,0.4) 70%)',
          border: '1.5px solid rgba(201,168,76,0.35)',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.08)',
        }}
      />
      {/* Cercle intérieur décoratif */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '18%',
          border: '1px solid rgba(201,168,76,0.18)',
        }}
      />
      {/* Graduations discrètes */}
      {Array.from({ length: 24 }).map((_, i) => {
        const deg = i * 15
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: '1px',
              height: i % 6 === 0 ? '10px' : '5px',
              background: 'rgba(201,168,76,0.3)',
              transform: `rotate(${deg}deg) translateY(-125px)`,
            }}
          />
        )
      })}

      {/* Aiguille centrale */}
      <div
        className="absolute left-1/2 top-1/2 transition-transform duration-500"
        style={{
          width: '2px',
          height: '80px',
          marginLeft: '-1px',
          marginTop: '-64px',
          transformOrigin: '50% 80px',
          transform: `rotate(${needleAngle}deg)`,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '58px solid rgba(201,168,76,0.75)',
            marginLeft: '-5px',
          }}
        />
      </div>
      <div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: '14px',
          height: '14px',
          marginLeft: '-7px',
          marginTop: '-7px',
          background: '#c9a84c',
          boxShadow: '0 0 10px rgba(201,168,76,0.7)',
        }}
      />

      {/* Points cardinaux cliquables */}
      {directions.map(d => {
        const pos = POSITION[d.code]
        const explore = exploredCodes.includes(d.code)
        const active = activeCode === d.code
        return (
          <button
            key={d.code}
            onClick={() => onSelect(d.code)}
            className="absolute flex flex-col items-center justify-center rounded-full transition-all"
            style={{
              top: pos.top,
              left: pos.left,
              transform: 'translate(-50%, -50%)',
              width: '58px',
              height: '58px',
              background: active ? 'rgba(201,168,76,0.22)' : explore ? 'rgba(90,163,124,0.14)' : 'rgba(15,10,4,0.85)',
              border: active ? '1.5px solid rgba(201,168,76,0.7)' : explore ? '1px solid rgba(90,163,124,0.45)' : '1.5px solid rgba(201,168,76,0.3)',
              boxShadow: active ? '0 0 16px rgba(201,168,76,0.35)' : 'none',
            }}
          >
            <span className="text-sm font-black" style={{ color: explore ? '#5aa37c' : '#c9a84c' }}>
              {explore ? '✓' : d.label[0]}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: 'rgba(245,240,232,0.6)' }}>
              {d.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
