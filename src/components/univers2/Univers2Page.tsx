import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props { group: Group }

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#1a1a0e' }}>

      {/* HERO — poster plein écran style affiche aventure */}
      <div className="relative overflow-hidden" style={{ minHeight: '55vh' }}>

        {/* Fond dégradé simulant ciel/montagne */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #7eb8d4 0%, #4a90b8 15%, #2a6a8a 30%, #1a4a3a 55%, #0d2a1a 75%, #1a1a0e 100%)',
        }} />

        {/* Silhouette montagne SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-40">
            <path d="M0,200 L0,120 L60,60 L100,90 L150,20 L200,80 L250,40 L300,100 L340,50 L400,90 L400,200 Z" fill="#0d2a1a" opacity="0.9"/>
            <path d="M0,200 L0,150 L80,100 L130,130 L180,80 L230,120 L280,85 L330,120 L400,95 L400,200 Z" fill="#0a1f14" opacity="0.95"/>
            <path d="M0,200 L0,170 L100,130 L160,155 L220,120 L280,150 L350,125 L400,145 L400,200 Z" fill="#091a10"/>
          </svg>
        </div>

        {/* Soleil levant */}
        <div className="absolute top-8 right-12 w-20 h-20 rounded-full opacity-40" style={{
          background: 'radial-gradient(circle, #ffdd88 0%, #ff9944 40%, transparent 70%)',
          filter: 'blur(4px)',
        }} />

        {/* Boussole déco */}
        <div className="absolute top-6 left-6 opacity-25">
          <svg viewBox="0 0 60 60" className="w-12 h-12">
            <circle cx="30" cy="30" r="28" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
            <polygon points="30,8 33,30 30,52 27,30" fill="#c9a84c" opacity="0.8"/>
            <polygon points="8,30 30,27 52,30 30,33" fill="#888" opacity="0.6"/>
            <text x="30" y="6" textAnchor="middle" fill="#c9a84c" fontSize="6" fontWeight="bold">N</text>
          </svg>
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 px-6 pt-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.9)', color: '#0d2a1a' }}>
              🧭 Sémestre {group.active_mission <= 3 ? '1' : '2'}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)' }}>
              {group.name}
            </span>
          </div>

          <h1 className="font-black uppercase leading-none" style={{ fontSize: '2.6rem', color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            L&apos;EXPÉDITION
          </h1>
          <h2 className="font-black uppercase" style={{ fontSize: '2.2rem', color: '#c9a84c', textShadow: '0 0 30px rgba(201,168,76,0.5)', letterSpacing: '0.05em' }}>
            COMMENCE
          </h2>

          {/* Citation */}
          <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
              <span className="text-2xl leading-none mr-1" style={{ color: '#c9a84c', fontFamily: 'serif' }}>&ldquo;</span>
              Votre équipement est prêt. Il est maintenant temps de quitter le camp de base et d&apos;avancer sur le terrain.
              <span className="text-2xl leading-none ml-1" style={{ color: '#c9a84c', fontFamily: 'serif' }}>&rdquo;</span>
            </p>
          </div>

          {/* CTA badge */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest" style={{ background: '#c9a84c', color: '#0d2a1a' }}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              L&apos;aventure continue !
            </div>
            <div className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
              ⛺ Camp de base
            </div>
          </div>
        </div>
      </div>

      {/* CONTENU MISSIONS */}
      <main style={{ background: '#1a1a0e' }}>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
