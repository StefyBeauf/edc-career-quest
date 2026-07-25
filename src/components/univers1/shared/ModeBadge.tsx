'use client'

export default function ModeBadge({ mode }: { mode: 'cdb' | 'tdc' }) {
  if (mode === 'cdb') {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.3)', color: '#2ecc71' }}>
        ✅ Correction de bord
      </span>
    )
  }
  return (
    <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(243,156,18,0.12)', border: '1px solid rgba(243,156,18,0.35)', color: '#f39c12' }}>
      🛫 Tour de contrôle
    </span>
  )
}
