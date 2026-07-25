'use client'

export default function TourDeControleAppel({
  appele, onAppeler, texteAttente,
}: {
  appele: boolean
  onAppeler: () => void
  texteAttente: string
}) {
  if (!appele) {
    return (
      <button
        onClick={onAppeler}
        className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d', boxShadow: '0 8px 32px rgba(201,168,76,0.25)' }}
      >
        🛫 Appeler la tour de contrôle
      </button>
    )
  }
  return (
    <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(243,156,18,0.08)', border: '1.5px solid rgba(243,156,18,0.4)' }}>
      <p className="text-2xl">📡</p>
      <p className="font-black text-white">Tour de contrôle appelée !</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{texteAttente}</p>
    </div>
  )
}
