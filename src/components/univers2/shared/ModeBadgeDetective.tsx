'use client'

export default function ModeBadgeDetective({ mode }: { mode: 'feedback' | 'validation' }) {
  if (mode === 'feedback') {
    return (
      <span
        className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0"
        style={{ background: 'rgba(220,201,160,0.1)', border: '1px solid rgba(220,201,160,0.35)', color: '#dcc9a0' }}
      >
        🔍 Feedback immédiat
      </span>
    )
  }
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0"
      style={{ background: 'rgba(156,58,48,0.12)', border: '1px solid rgba(156,58,48,0.4)', color: '#cf8c7f' }}
    >
      🧑‍💼 Validation intervenante
    </span>
  )
}
