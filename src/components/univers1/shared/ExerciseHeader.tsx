'use client'

import ModeBadge from './ModeBadge'

export default function ExerciseHeader({
  numero, titre, consigne, mode,
}: {
  numero: number
  titre: string
  consigne: string
  mode: 'cdb' | 'tdc'
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice {numero}</p>
        <h3 className="text-lg font-black text-white">{titre}</h3>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>{consigne}</p>
      </div>
      <ModeBadge mode={mode} />
    </div>
  )
}
