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
  { n: 1, titre: 'Découvrir le monde professionnel', desc: 'Comprendre les entreprises et les marchés BtoB / BtoC.', icon: '🌐' },
  { n: 2, titre: 'Préparer ses bagages', desc: 'Construire son premier CV et valoriser ses compétences.', icon: '🧳' },
  { n: 3, titre: 'Valider son embarquement', desc: 'Rédiger une candidature (CV + lettre de motivation) adaptée.', icon: '🎫' },
  { n: 4, titre: 'Choisir son itinéraire', desc: 'Rechercher les offres de stage et sélectionner les bonnes opportunités.', icon: '🗺️' },
  { n: 5, titre: 'Passer les contrôles', desc: 'Découvrir les codes professionnels et préparer son entretien.', icon: '🪪' },
  { n: 6, titre: 'Décollage', desc: 'Simulation d\'entretien et questions les plus fréquentes.', icon: '✈️' },
]

export default function Univers1Page({ group }: Props) {
  const [mission, setMission] = useState<Mission | null>(null)
  const [vue, setVue] = useState<'splash' | 'contenu'>('splash')
  const [visible, setVisible] = useState(false)
  const actif = group.active_mission

  useEffect(() => {
    const supabase = createClient()
    supabase.from('missions').select('*').eq('universe', 'passeport-stage').eq('number', actif).single()
      .then(({ data }) => setMission(data as Mission))
    setTimeout(() => setVisible(true), 100)
  }, [actif])

  if (vue === 'contenu') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0f1e3d 0%, #1a2744 100%)' }}>
        <div className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(15,30,61,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <button onClick={() => setVue('splash')} className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>←</button>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Checkpoint {actif} / 6</p>
            <p className="text-sm font-bold text-white">{CHECKPOINTS[actif - 1]?.titre}</p>
          </div>
        </div>
        <div className="px-4 py-6">
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
    <div className="min-h-screen flex flex-col" style={{ background: '#f0e6cc' }}>

      {/* HERO — style template */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f1e3d 0%, #1a2744 85%, #f0e6cc 100%)', paddingBottom: '40px' }}>

        {/* Globe watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg viewBox="0 0 300 300" className="w-80 h-80" fill="none">
            <circle cx="150" cy="150" r="120" stroke="#c9a84c" strokeWidth="1"/>
            <circle cx="150" cy="150" r="80" stroke="#c9a84c" strokeWidth="0.8"/>
            <circle cx="150" cy="150" r="40" stroke="#c9a84c" strokeWidth="0.6"/>
            <ellipse cx="150" cy="150" rx="120" ry="50" stroke="#c9a84c" strokeWidth="0.6"/>
            <ellipse cx="150" cy="150" rx="120" ry="20" stroke="#c9a84c" strokeWidth="0.4"/>
            <line x1="30" y1="150" x2="270" y2="150" stroke="#c9a84c" strokeWidth="0.6"/>
            <line x1="150" y1="30" x2="150" y2="270" stroke="#c9a84c" strokeWidth="0.6"/>
          </svg>
        </div>

        {/* Avion déco */}
        <div className="absolute top-6 right-6 opacity-30 text-4xl" style={{ transform: 'rotate(15deg)' }}>✈️</div>

        <div className={`relative text-center px-6 pt-10 pb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#c9a84c', letterSpacing: '0.3em' }}>
            ✈ EDC Career Quest · {group.name}
          </p>
          <h1 className="font-black uppercase leading-none mb-2" style={{ fontSize: '2.8rem', color: '#f0e6cc', letterSpacing: '0.08em', textShadow: '0 0 40px rgba(201,168,76,0.3)' }}>
            VOTRE<br />
            <span style={{ color: '#c9a84c' }}>ITINÉRAIRE</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.3)' }} />
            <p className="text-xs font-bold uppercase tracking-widest px-2" style={{ color: 'rgba(201,168,76,0.7)' }}>
              6 checkpoints · 1 destination
            </p>
            <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.3)' }} />
          </div>
        </div>
      </div>

      {/* CHECKPOINTS — style infographie */}
      <div className="flex-1 px-4 py-6 space-y-3" style={{ background: '#f0e6cc' }}>
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6b5a3a' }}>
          DESTINATION : VOTRE PREMIER STAGE 📍
        </p>

        {CHECKPOINTS.map((cp, idx) => {
          const etat = cp.n < actif ? 'fait' : cp.n === actif ? 'actif' : 'verrouille'
          const isActif = etat === 'actif'
          const isFait = etat === 'fait'

          return (
            <div key={cp.n} className="relative">
              {/* Ligne verticale de connexion */}
              {idx < CHECKPOINTS.length - 1 && (
                <div className="absolute left-7 top-full w-px h-3 z-10" style={{ background: isFait ? '#c9a84c' : 'rgba(107,90,58,0.2)' }} />
              )}

              <button
                onClick={() => isActif && setVue('contenu')}
                disabled={!isActif}
                className="w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200"
                style={{
                  background: isActif
                    ? 'linear-gradient(135deg, #0f1e3d 0%, #1a2744 100%)'
                    : isFait
                    ? 'rgba(201,168,76,0.12)'
                    : 'rgba(107,90,58,0.06)',
                  border: isActif
                    ? '2px solid #c9a84c'
                    : isFait
                    ? '1px solid rgba(201,168,76,0.3)'
                    : '1px solid rgba(107,90,58,0.15)',
                  boxShadow: isActif ? '0 8px 32px rgba(201,168,76,0.2)' : 'none',
                  transform: isActif ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                {/* Cercle numéro */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 font-black"
                  style={{
                    background: isActif ? '#c9a84c' : isFait ? 'rgba(201,168,76,0.8)' : 'rgba(107,90,58,0.15)',
                    boxShadow: isActif ? '0 0 20px rgba(201,168,76,0.5)' : 'none',
                    color: isActif || isFait ? '#0f1e3d' : '#9a8a6a',
                  }}
                >
                  {isFait ? '✓' : etat === 'verrouille' ? '🔒' : cp.icon}
                </div>

                {/* Texte */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: isActif ? '#c9a84c' : isFait ? '#9a7a3a' : '#9a8a6a' }}>
                      CHECKPOINT {cp.n}
                    </p>
                    {isActif && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#c9a84c', color: '#0f1e3d' }}>
                        EN COURS
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm leading-tight" style={{ color: isActif ? '#f0e6cc' : isFait ? '#3a2a1a' : '#9a8a6a' }}>
                    {cp.titre}
                  </p>
                  {(isActif || isFait) && (
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: isActif ? 'rgba(240,230,204,0.7)' : 'rgba(58,42,26,0.6)' }}>
                      {cp.desc}
                    </p>
                  )}
                </div>

                {isActif && (
                  <div className="text-xl flex-shrink-0" style={{ color: '#c9a84c' }}>›</div>
                )}
              </button>
            </div>
          )
        })}

        {/* Destination finale */}
        <div className="rounded-2xl p-4 text-center mt-4" style={{ background: '#0f1e3d', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.6)' }}>Destination finale</p>
          <p className="font-black text-lg uppercase mt-1" style={{ color: '#c9a84c' }}>📍 VOTRE PREMIER STAGE</p>
          {mission && <p className="text-xs mt-1" style={{ color: 'rgba(240,230,204,0.5)' }}>{mission.description}</p>}
        </div>
      </div>
    </div>
  )
}
