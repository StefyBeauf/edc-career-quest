'use client'
import { useEffect, useState } from 'react'
import type { Group, Mission } from '@/types'
import CP1_MondeEntreprise from '@/components/univers1/checkpoints/CP1_MondeEntreprise'
import CP2_BasesCV from '@/components/univers1/checkpoints/CP2_BasesCV'
import CP3_RedactionCV from '@/components/univers1/checkpoints/CP3_RedactionCV'
import CP4_LectureOffre from '@/components/univers1/checkpoints/CP4_LectureOffre'
import CP5_Situations from '@/components/univers1/checkpoints/CP5_Situations'
import CP6_RoueEntretiens from '@/components/univers1/checkpoints/CP6_RoueEntretiens'
import { createClient } from '@/lib/supabase/client'

interface Props { group: Group }

const CHECKPOINTS = [
  { n: 1, titre: 'Découvrir le monde professionnel', desc: 'BtoB, BtoC et les marchés qui recrutent', icon: '🌐' },
  { n: 2, titre: 'Préparer ses bagages', desc: 'Construire un CV qui fait la différence', icon: '🧳' },
  { n: 3, titre: 'Valider son embarquement', desc: 'Rédiger sa candidature complète', icon: '🎫' },
  { n: 4, titre: 'Choisir son itinéraire', desc: 'Décrypter et sélectionner les offres', icon: '🗺️' },
  { n: 5, titre: 'Passer les contrôles', desc: 'Codes pro et préparation entretien', icon: '🪪' },
  { n: 6, titre: 'Décollage', desc: 'Simulation des questions d\'entretien', icon: '✈️' },
]

export default function Univers1Page({ group }: Props) {
  const [mission, setMission] = useState<Mission | null>(null)
  const [vue, setVue] = useState<'splash' | 'contenu'>('splash')
  const [appeared, setAppeared] = useState(false)
  const actif = group.active_mission

  useEffect(() => {
    createClient().from('missions').select('*')
      .eq('universe', 'passeport-stage').eq('number', actif).single()
      .then(({ data }) => setMission(data as Mission))
    setTimeout(() => setAppeared(true), 80)
  }, [actif])

  if (vue === 'contenu') {
    const cp = CHECKPOINTS[actif - 1]
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f1e3d 100%)' }}>
        <div className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
          <button onClick={() => setVue('splash')} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-opacity hover:opacity-70" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>←</button>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>Checkpoint {actif} sur 6</p>
            <p className="text-sm font-bold text-white truncate">{cp?.titre}</p>
          </div>
        </div>
        <div className="px-4 py-6 max-w-2xl mx-auto">
          {actif === 1 && <CP1_MondeEntreprise />}
          {actif === 2 && <CP2_BasesCV />}
          {actif === 3 && <CP3_RedactionCV />}
          {actif === 4 && <CP4_LectureOffre />}
          {actif === 5 && <CP5_Situations />}
          {actif === 6 && <CP6_RoueEntretiens />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1628' }}>

      {/* ═══ HERO — vraie photo passeport ═══ */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ minHeight: '56vh' }}>

        {/* Photo de fond */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("/hero-univers1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }} />

        {/* Voile sombre pour lisibilité */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(170deg, rgba(5,10,25,0.45) 0%, rgba(10,22,40,0.65) 40%, rgba(5,10,20,0.92) 75%, #0a1628 100%)',
        }} />

        {/* Placeholder avion SVG — supprimé, remplacé par photo */}
        <div className="hidden">
          <svg viewBox="0 0 200 80" className="w-40">
            <path d="M10,60 Q60,10 190,20" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="6,4"/>
            <text x="185" y="18" fontSize="14" fill="#c9a84c">✈</text>
          </svg>
        </div>

        {/* Contenu hero */}
        <div className={`relative z-10 flex flex-col items-center justify-center px-6 pt-10 pb-8 transition-all duration-700 ${appeared ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ minHeight: '56vh' }}>

          {/* Globe SVG doré */}
          <div className="mb-6 relative">
            <svg viewBox="0 0 120 120" className="w-28 h-28">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#c9a84c" strokeWidth="2"/>
              <circle cx="60" cy="60" r="54" fill="rgba(201,168,76,0.06)"/>
              <ellipse cx="60" cy="60" rx="54" ry="24" fill="none" stroke="#c9a84c" strokeWidth="1.2"/>
              <line x1="6" y1="60" x2="114" y2="60" stroke="#c9a84c" strokeWidth="1"/>
              <line x1="60" y1="6" x2="60" y2="114" stroke="#c9a84c" strokeWidth="1"/>
              <ellipse cx="60" cy="60" rx="28" ry="54" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
              {/* Mallette au centre */}
              <rect x="46" y="52" width="28" height="20" rx="3" fill="#c9a84c"/>
              <rect x="52" y="48" width="16" height="8" rx="2" fill="none" stroke="#c9a84c" strokeWidth="2"/>
              <line x1="46" y1="62" x2="74" y2="62" stroke="#0a1628" strokeWidth="1.5"/>
              <circle cx="60" cy="62" r="2" fill="#0a1628"/>
            </svg>
            {/* Point GPS */}
            <div className="absolute -bottom-1 -right-1 text-lg">📍</div>
          </div>

          {/* Titre principal */}
          <h1 className="text-center font-black uppercase leading-none mb-1" style={{ fontSize: 'clamp(2.4rem, 8vw, 3.2rem)', color: '#f0e8d4', letterSpacing: '0.04em', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
            PASSEPORT
          </h1>

          {/* Ligne décorée */}
          <div className="flex items-center gap-3 my-2 w-full max-w-xs">
            <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.6)' }}/>
            <p className="text-xs font-black uppercase tracking-widest whitespace-nowrap" style={{ color: '#c9a84c' }}>VERS LE STAGE</p>
            <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.6)' }}/>
          </div>

          {/* Groupe */}
          <p className="text-xs mt-1 mb-6 font-semibold" style={{ color: 'rgba(201,168,76,0.5)' }}>{group.name}</p>

          {/* Passeport physique miniature */}
          <div className="w-full max-w-xs rounded-xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.2)', background: 'linear-gradient(135deg, #1a2d50 0%, #0f1e3d 100%)' }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>PASSEPORT · EDC PARIS</p>
              <p className="text-white font-bold text-sm mt-0.5">Atelier Carrière — 1ère année</p>
            </div>
            <div className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Checkpoint actif</p>
                <p className="font-black text-white">{actif} / 6</p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Statut</p>
                <p className="text-sm font-bold" style={{ color: '#4ade80' }}>● EN COURS</p>
              </div>
            </div>
            {/* Ligne MRZ style passeport */}
            <div className="px-5 py-2" style={{ background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace' }}>
              <p className="text-xs" style={{ color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em' }}>EDC{'<'}STAGE{'<'}PARIS{'<'}{'<'}{'<'}{'<'}{'<'}{'<'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CHECKPOINTS ═══ */}
      <div className="flex-1 px-4 pb-8 pt-6" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1e38 100%)' }}>

        {/* Titre section */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.2)' }}/>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.6)' }}>Votre itinéraire</p>
          <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.2)' }}/>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          {CHECKPOINTS.map((cp, idx) => {
            const etat = cp.n < actif ? 'fait' : cp.n === actif ? 'actif' : 'verrouille'
            const isActif = etat === 'actif'
            const isFait = etat === 'fait'

            return (
              <div key={cp.n} className="relative">
                {idx < CHECKPOINTS.length - 1 && (
                  <div className="absolute left-[22px] top-full w-0.5 h-3 z-10" style={{ background: isFait ? '#c9a84c' : 'rgba(201,168,76,0.1)' }} />
                )}

                <button
                  onClick={() => isActif && setVue('contenu')}
                  disabled={!isActif}
                  className="w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: isActif
                      ? 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)'
                      : isFait ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                    border: isActif
                      ? '1.5px solid rgba(201,168,76,0.6)'
                      : isFait ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isActif ? '0 4px 24px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.1)' : 'none',
                  }}
                >
                  {/* Cercle */}
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-black flex-shrink-0" style={{
                    background: isActif ? '#c9a84c' : isFait ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.06)',
                    boxShadow: isActif ? '0 0 20px rgba(201,168,76,0.4)' : 'none',
                    color: isActif || isFait ? '#0a1628' : 'rgba(255,255,255,0.2)',
                    fontSize: isFait ? '1rem' : undefined,
                  }}>
                    {isFait ? '✓' : etat === 'verrouille' ? '🔒' : cp.icon}
                  </div>

                  {/* Texte */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-black uppercase tracking-widest" style={{ color: isActif ? '#c9a84c' : isFait ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.2)' }}>
                        CP {cp.n}
                      </p>
                      {isActif && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#c9a84c', color: '#0a1628' }}>ACTIF</span>}
                      {isFait && <span className="text-xs" style={{ color: 'rgba(201,168,76,0.5)' }}>Complété</span>}
                    </div>
                    <p className="font-bold text-sm" style={{ color: isActif ? '#f0e8d4' : isFait ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
                      {cp.titre}
                    </p>
                    {(isActif || isFait) && (
                      <p className="text-xs mt-0.5" style={{ color: isActif ? 'rgba(240,232,212,0.55)' : 'rgba(255,255,255,0.3)' }}>
                        {cp.desc}
                      </p>
                    )}
                  </div>

                  {isActif && <span style={{ color: '#c9a84c', fontSize: '1.2rem' }}>›</span>}
                </button>
              </div>
            )
          })}
        </div>

        {/* Tampon destination */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg viewBox="0 0 144 144" className="absolute inset-0 w-full h-full opacity-80">
              <circle cx="72" cy="72" r="68" fill="none" stroke="#1a3a6a" strokeWidth="3"/>
              <circle cx="72" cy="72" r="60" fill="none" stroke="#1a3a6a" strokeWidth="1.5"/>
              <path d="M 20,72 A 52,52 0 0,1 124,72" fill="none" stroke="#1a3a6a" strokeWidth="1"/>
              <text>
                <textPath href="#topArc" startOffset="50%" textAnchor="middle" fill="#1a3a6a" fontSize="10" fontWeight="bold" letterSpacing="2">
                  DESTINATION
                </textPath>
              </text>
              <defs>
                <path id="topArc" d="M 22,72 A 50,50 0 0,1 122,72"/>
                <path id="botArc" d="M 22,72 A 50,50 0 0,0 122,72"/>
              </defs>
              <text>
                <textPath href="#botArc" startOffset="50%" textAnchor="middle" fill="#1a3a6a" fontSize="10" fontWeight="bold" letterSpacing="2">
                  VOTRE AVENIR
                </textPath>
              </text>
              <text x="72" y="66" textAnchor="middle" fill="#1a3a6a" fontSize="28" fontWeight="bold">💼</text>
              <text x="72" y="84" textAnchor="middle" fill="#1a3a6a" fontSize="8" letterSpacing="1">EDC PARIS</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
