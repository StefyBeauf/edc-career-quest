import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props { group: Group }

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#2c1f0e' }}>

      {/* ═══ HERO — ambiance table de bois, globe, carnet ═══ */}
      <div className="relative overflow-hidden" style={{ minHeight: '60vh' }}>

        {/* Fond bois chaud */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, #6b9db8 0%, #4a7a9a 20%, #2a5a40 45%, #1a3a20 65%, #2c1f0e 85%, #1a1008 100%)',
        }} />

        {/* Texture grain de bois en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{
          background: 'linear-gradient(180deg, transparent 0%, #2c1f0e 100%)',
        }} />

        {/* Soleil levant / lumière chaude */}
        <div className="absolute top-4 right-0 left-0 flex justify-center pointer-events-none">
          <div className="w-48 h-32 rounded-full opacity-25" style={{
            background: 'radial-gradient(ellipse, #ffe08a 0%, #ff9944 40%, transparent 70%)',
            filter: 'blur(20px)',
          }} />
        </div>

        {/* Globe SVG réaliste */}
        <div className="absolute top-6 right-4 opacity-70">
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <defs>
              <radialGradient id="globeGrad" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#7ab8d4"/>
                <stop offset="60%" stopColor="#3a82aa"/>
                <stop offset="100%" stopColor="#1a4a6a"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#globeGrad)"/>
            <ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
            <ellipse cx="50" cy="50" rx="22" ry="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
            <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
            {/* Continents stylisés */}
            <path d="M30,30 Q40,25 45,35 Q50,28 55,33 Q60,25 65,32 Q68,38 62,42 Q55,48 48,42 Q40,38 30,30Z" fill="rgba(80,140,60,0.8)"/>
            <path d="M20,48 Q28,44 35,50 Q32,58 25,56 Q18,54 20,48Z" fill="rgba(80,140,60,0.7)"/>
            <path d="M60,55 Q70,50 75,60 Q72,68 65,65 Q58,62 60,55Z" fill="rgba(80,140,60,0.7)"/>
            {/* Brillance */}
            <ellipse cx="35" cy="35" rx="12" ry="8" fill="rgba(255,255,255,0.1)" transform="rotate(-20, 35, 35)"/>
            {/* Socle en laiton */}
            <ellipse cx="50" cy="98" rx="18" ry="4" fill="#8a6a2a" opacity="0.6"/>
            <rect x="47" y="96" width="6" height="6" rx="1" fill="#c9a84c" opacity="0.7"/>
          </svg>
        </div>

        {/* Boussole déco */}
        <div className="absolute top-8 left-5 opacity-40">
          <svg viewBox="0 0 56 56" className="w-11 h-11">
            <circle cx="28" cy="28" r="26" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="1.5"/>
            <polygon points="28,6 30,28 28,50 26,28" fill="#c9a84c"/>
            <polygon points="6,28 28,26 50,28 28,30" fill="#888" opacity="0.7"/>
            <circle cx="28" cy="28" r="3" fill="#c9a84c"/>
            <text x="28" y="4" textAnchor="middle" fill="#c9a84c" fontSize="5" fontWeight="bold">N</text>
          </svg>
        </div>

        {/* Carnet ouvert stylisé */}
        <div className="absolute bottom-16 left-4 opacity-50">
          <svg viewBox="0 0 80 60" className="w-20 h-15">
            <rect x="2" y="5" width="36" height="50" rx="2" fill="#e8d4a0" stroke="#8a6a2a" strokeWidth="1"/>
            <rect x="38" y="5" width="36" height="50" rx="2" fill="#f0e0b0" stroke="#8a6a2a" strokeWidth="1"/>
            <line x1="40" y1="5" x2="40" y2="55" stroke="#6a4a1a" strokeWidth="1.5"/>
            {[14,20,26,32,38,44].map(y => (
              <line key={y} x1="8" y1={y} x2="34" y2={y} stroke="rgba(106,74,26,0.3)" strokeWidth="0.8"/>
            ))}
            {[14,20,26,32].map(y => (
              <line key={y} x1="44" y1={y} x2="70" y2={y} stroke="rgba(106,74,26,0.3)" strokeWidth="0.8"/>
            ))}
            <path d="M44,36 Q52,32 60,36 Q56,42 48,40Z" fill="rgba(60,120,80,0.4)"/>
          </svg>
        </div>

        {/* Sac à dos déco */}
        <div className="absolute bottom-12 right-6 opacity-45 text-5xl" style={{ transform: 'rotate(-8deg)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>
          🎒
        </div>

        {/* Contenu texte */}
        <div className="relative z-10 px-5 pt-8 pb-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.9)', color: '#1a0e04' }}>
              🧭 Mission {group.active_mission}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.35)', color: 'rgba(255,255,255,0.75)' }}>
              {group.name}
            </span>
          </div>

          <h1 className="font-black uppercase leading-tight" style={{ fontSize: 'clamp(2.2rem,7vw,3rem)', color: '#ffffff', textShadow: '0 3px 20px rgba(0,0,0,0.6)' }}>
            L&apos;EXPÉDITION
          </h1>
          <h2 className="font-black uppercase" style={{ fontSize: 'clamp(1.8rem,6vw,2.4rem)', color: '#c9a84c', textShadow: '0 0 30px rgba(201,168,76,0.6)', letterSpacing: '0.04em' }}>
            PROFESSIONNELLE
          </h2>

          <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)' }}>
              <span className="text-xl mr-1" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              Votre équipement est prêt. Il est maintenant temps de quitter le camp de base et d&apos;avancer sur le terrain.
              <span className="text-xl ml-1" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>&rdquo;</span>
            </p>
            <p className="text-xs mt-2 font-semibold" style={{ color: 'rgba(201,168,76,0.6)' }}>— Carnet de l&apos;explorateur</p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>L&apos;aventure continue</span>
          </div>
        </div>
      </div>

      {/* ═══ CONTENU MISSIONS ═══ */}
      <main style={{ background: 'linear-gradient(180deg, #2c1f0e 0%, #1a1008 100%)' }}>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
