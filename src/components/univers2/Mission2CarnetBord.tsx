'use client'

import { useState, useCallback } from 'react'
import { profilsTribunal, profilsAvatars, type ProfilTribunal } from '@/lib/content/univers2-b2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

function IllustrationProfil({ profil }: { profil: ProfilTribunal }) {
  const avatar = profilsAvatars[profil.id] ?? { emoji: '👤', bgHex: '#4b5563', label: 'Profil inconnu' }

  const hasPhoto = profil.elements.some(e =>
    e.toLowerCase().includes('photo professionnelle') || e.toLowerCase().includes('photo correcte')
  )
  const hasNoPhoto = profil.elements.some(e =>
    e.toLowerCase().includes('aucune photo') || e.toLowerCase().includes('pas de photo')
  )
  const hasBaniere = profil.elements.some(e => e.toLowerCase().includes('bannière'))
  const hasReco = profil.elements.some(e => e.toLowerCase().includes('recommandation'))
  const hasPubli = profil.elements.some(e => e.toLowerCase().includes('publication'))

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${avatar.bgHex}40`, background: 'rgba(0,0,0,0.3)' }}
    >
      {/* Bannière */}
      <div
        className="h-14 w-full flex items-end px-4 pb-1"
        style={{
          background: hasBaniere
            ? `linear-gradient(135deg, ${avatar.bgHex}cc, ${avatar.bgHex}55)`
            : 'rgba(255,255,255,0.06)',
        }}
      >
        {hasBaniere && (
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: `${avatar.bgHex}` }}>
            Bannière personnalisée
          </span>
        )}
      </div>

      {/* Ligne avatar */}
      <div className="px-4 relative" style={{ marginTop: '-22px', paddingBottom: '12px' }}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 mb-2"
          style={{
            background: hasNoPhoto ? 'rgba(255,255,255,0.06)' : avatar.bgHex,
            borderColor: hasNoPhoto ? 'rgba(255,255,255,0.15)' : avatar.bgHex,
          }}
        >
          {hasNoPhoto ? '?' : avatar.emoji}
        </div>

        {/* Nom fictif + type */}
        <p className="font-black text-white text-sm leading-tight">
          {['A.M.', 'T.D.', 'C.R.', 'M.L.', 'S.P.', 'J.B.', 'L.F.', 'N.C.'][profil.id - 1]}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
          {avatar.label}
        </p>

        {/* Indicateurs visuels */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {hasPhoto && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#86efac', border: '1px solid rgba(34,197,94,0.25)' }}>
              ✓ Photo pro
            </span>
          )}
          {hasNoPhoto && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
              ✗ Sans photo
            </span>
          )}
          {hasReco && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#86efac', border: '1px solid rgba(34,197,94,0.25)' }}>
              ✓ Recommandations
            </span>
          )}
          {hasPubli && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>
              ✓ Publications
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Mission2CarnetBord() {
  const [vus, setVus] = useState<number[]>([])
  const [profil, setProfil] = useState<ProfilTribunal | null>(null)
  const [showIllustration, setShowIllustration] = useState(false)

  const tirer = useCallback(() => {
    const restants = profilsTribunal.filter(p => !vus.includes(p.id))
    const pool = restants.length > 0 ? restants : profilsTribunal
    const p = pool[Math.floor(Math.random() * pool.length)]
    setProfil(p)
    setShowIllustration(false)
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
        <>
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

          {/* Bouton illustration */}
          {!showIllustration ? (
            <button
              onClick={() => setShowIllustration(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
            >
              <span>🖼</span><span>Visualiser ce profil</span>
            </button>
          ) : (
            <IllustrationProfil profil={profil} />
          )}
        </>
      )}

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        Notez vos résultats de votre côté — vous en débattrez avec votre intervenant en fin de séance.
      </div>
    </div>
  )
}
