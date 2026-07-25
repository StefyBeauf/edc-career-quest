'use client'

export default function ProductionLivrable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.06)', border: '1px dashed rgba(201,168,76,0.35)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#c9a84c' }}>
        📋 Production à reporter dans le livrable
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>
        {children}
      </p>
    </div>
  )
}
