'use client'

export default function MissionHeader({ n, total, titre, objectif }: { n: number; total: number; titre: string; objectif: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)' }}>
      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'monospace' }}>
        Mission {n} / {total}
      </p>
      <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">{titre}</h2>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{objectif}</p>
    </div>
  )
}
