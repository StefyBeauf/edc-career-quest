'use client'

import { useState, useCallback } from 'react'
import { profilsTribunal, type ProfilTribunal } from '@/lib/content/univers2-b2'

export default function Mission2CarnetBord() {
  const [vus, setVus] = useState<number[]>([])
  const [profil, setProfil] = useState<ProfilTribunal | null>(null)

  const tirer = useCallback(() => {
    const restants = profilsTribunal.filter(p => !vus.includes(p.id))
    const pool = restants.length > 0 ? restants : profilsTribunal
    const p = pool[Math.floor(Math.random() * pool.length)]
    setProfil(p)
    setVus(prev => restants.length > 0 ? [...prev, p.id] : [p.id])
  }, [vus])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Mission 2 — Ouvrir son carnet de bord</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Le Tribunal du recruteur</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Comprendre le rôle de LinkedIn, la première impression, et ce qu&apos;un profil dit de nous.</p>
      </div>

      <button
        onClick={tirer}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">👀</span>
        <span>Nouveau profil à juger</span>
      </button>

      {profil && (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(201,168,76,0.1)' }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>Profil #{profil.id} à l&apos;audience</span>
          </div>
          <div className="p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="space-y-2">
              {profil.elements.map((el, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,240,200,0.85)' }}>
                  <span style={{ color: '#c9a84c' }}>▸</span>{el}
                </div>
              ))}
            </div>
            <div className="pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
              <p className="font-bold text-white">{profil.question}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
