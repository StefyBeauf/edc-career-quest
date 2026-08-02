'use client'

import type { ReactNode } from 'react'

interface DossierPaperProps {
  label: string
  tampon?: string
  children: ReactNode
}

export default function DossierPaper({ label, tampon = 'CONFIDENTIEL', children }: DossierPaperProps) {
  return (
    <div className="relative">
      {/* Onglet de dossier */}
      <div
        className="inline-block px-4 py-1.5 rounded-t-lg text-[10px] font-black uppercase tracking-widest"
        style={{ background: '#c9a256', color: '#2b2416' }}
      >
        {label}
      </div>

      <div
        className="rounded-b-lg rounded-tr-lg p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #ece1c4 0%, #d9c79e 100%)',
          color: '#2b2416',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
        }}
      >
        {/* Tampon confidentiel */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: '12px', right: '16px', border: '2px solid #9c3a30', color: '#9c3a30',
            padding: '3px 10px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em',
            transform: 'rotate(8deg)', opacity: 0.7, borderRadius: '4px',
          }}
        >
          {tampon}
        </div>

        {/* Trombone décoratif */}
        <div
          className="absolute pointer-events-none"
          style={{ top: '-6px', left: '18px', width: '18px', height: '34px', border: '3px solid rgba(120,120,120,0.55)', borderRadius: '9px', borderBottom: 'none' }}
        />

        <div className="relative" style={{ paddingRight: '104px' }}>{children}</div>
      </div>
    </div>
  )
}
