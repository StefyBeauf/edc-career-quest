'use client'

export default function ModeBadge({ mode }: { mode: 'feedback' | 'validation' }) {
  if (mode === 'feedback') {
    return (
      <span
        className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0"
        style={{ background: 'rgba(90,163,124,0.14)', border: '1px solid rgba(90,163,124,0.4)', color: '#5aa37c' }}
      >
        💬 Feedback immédiat
      </span>
    )
  }
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0"
      style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
    >
      🧑‍🏫 Validation intervenante
    </span>
  )
}
