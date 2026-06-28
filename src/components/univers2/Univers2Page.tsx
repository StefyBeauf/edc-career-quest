import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props { group: Group }

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#1a0e06' }}>

      {/* ═══ HERO — coucher de soleil, table de bois, globe en laiton ═══ */}
      <div className="relative overflow-hidden" style={{ minHeight: '64vh' }}>

        {/* Ciel coucher de soleil */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #ff9a1a 0%, #f5c842 8%, #e8a020 18%, #b06020 32%, #6a3820 52%, #3a2010 68%, #2a1508 100%)',
        }} />

        {/* Halo solaire */}
        <div className="absolute pointer-events-none" style={{ top: '-10%', left: '-5%', width: '55%', height: '55%' }}>
          <div style={{
            width: '100%', height: '100%',
            background: 'radial-gradient(ellipse at 30% 30%, rgba(255,200,80,0.55) 0%, rgba(255,140,20,0.3) 30%, transparent 65%)',
            filter: 'blur(18px)',
          }} />
        </div>

        {/* Eau / mer turquoise en bas du ciel */}
        <div className="absolute" style={{ top: '34%', left: 0, right: 0, height: '28%' }}>
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3ab8c8" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#1a6070" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <rect width="400" height="80" fill="url(#seaGrad)"/>
            {/* Îles silhouettes */}
            <ellipse cx="80" cy="35" rx="50" ry="22" fill="#2a5a20" opacity="0.7"/>
            <ellipse cx="200" cy="28" rx="70" ry="18" fill="#1e4a16" opacity="0.75"/>
            <ellipse cx="320" cy="38" rx="45" ry="16" fill="#2a5a20" opacity="0.65"/>
            <ellipse cx="150" cy="42" rx="30" ry="10" fill="#254f1a" opacity="0.6"/>
            <ellipse cx="360" cy="48" rx="25" ry="10" fill="#2a5a20" opacity="0.55"/>
          </svg>
        </div>

        {/* Table en bois */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '46%' }}>
          <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B4513"/>
                <stop offset="30%" stopColor="#7a3810"/>
                <stop offset="100%" stopColor="#4a2008"/>
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#woodGrad)"/>
            {/* Veines du bois */}
            {[12,28,44,60,76,92,108,124,140,156].map((y, i) => (
              <path key={i}
                d={`M0,${y} Q${60+i*12},${y-3} ${200+i*8},${y+2} Q${300-i*5},${y-1} 400,${y+1}`}
                fill="none" stroke={i%2===0 ? 'rgba(60,20,0,0.18)' : 'rgba(120,60,20,0.12)'} strokeWidth="1.2"/>
            ))}
            {/* Bord avant de la table */}
            <rect x="0" y="0" width="400" height="12" fill="rgba(180,90,20,0.4)"/>
            <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(255,200,100,0.15)" strokeWidth="1"/>
          </svg>
        </div>

        {/* ── Globe terrestre SVG ── */}
        <div className="absolute" style={{ right: '4%', bottom: '28%', width: '38vw', maxWidth: '170px' }}>
          <svg viewBox="0 0 140 170" className="w-full">
            <defs>
              <radialGradient id="g1" cx="38%" cy="32%">
                <stop offset="0%" stopColor="#6ad4d8"/>
                <stop offset="40%" stopColor="#2a9aaa"/>
                <stop offset="100%" stopColor="#0d5060"/>
              </radialGradient>
              <radialGradient id="g2" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255,200,80,0.25)"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
            </defs>
            {/* Socle laiton */}
            <ellipse cx="70" cy="162" rx="30" ry="7" fill="#8a6010" opacity="0.7"/>
            <rect x="58" y="140" width="24" height="24" rx="4" fill="url(#brassBase)"/>
            <defs>
              <linearGradient id="brassBase" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4a830"/>
                <stop offset="100%" stopColor="#8a6010"/>
              </linearGradient>
              <linearGradient id="brassRing" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c9a84c"/>
                <stop offset="50%" stopColor="#f0d060"/>
                <stop offset="100%" stopColor="#a07820"/>
              </linearGradient>
            </defs>
            {/* Anneau méridien en laiton */}
            <ellipse cx="70" cy="68" rx="64" ry="64" fill="none" stroke="url(#brassRing)" strokeWidth="5" opacity="0.9"/>
            {/* Globe */}
            <circle cx="70" cy="68" r="58" fill="url(#g1)"/>
            {/* Reflet soleil sur le globe */}
            <circle cx="70" cy="68" r="58" fill="url(#g2)" opacity="0.5"/>
            {/* Grille latitude/longitude */}
            <ellipse cx="70" cy="68" rx="58" ry="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
            <ellipse cx="70" cy="68" rx="58" ry="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <line x1="12" y1="68" x2="128" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
            <ellipse cx="70" cy="68" rx="30" ry="58" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            {/* Continents */}
            <path d="M55,30 Q65,24 72,32 Q80,26 88,34 Q92,42 85,48 Q76,54 68,48 Q58,44 52,36 Z" fill="#c8a840" opacity="0.85"/>
            <path d="M60,54 Q70,50 76,58 Q80,66 74,72 Q66,76 60,70 Q54,64 60,54Z" fill="#c8a840" opacity="0.8"/>
            <path d="M38,56 Q46,52 50,60 Q48,68 42,66 Q36,62 38,56Z" fill="#c8a840" opacity="0.75"/>
            <path d="M86,60 Q94,56 98,64 Q96,72 90,70 Q84,66 86,60Z" fill="#c8a840" opacity="0.7"/>
            {/* Reflet brillant */}
            <ellipse cx="50" cy="46" rx="16" ry="10" fill="rgba(255,255,255,0.08)" transform="rotate(-20,50,46)"/>
          </svg>
        </div>

        {/* ── Carnet ouvert avec carte ── */}
        <div className="absolute" style={{ bottom: '18%', left: '18%', right: '38%' }}>
          <svg viewBox="0 0 200 130" className="w-full opacity-90">
            <defs>
              <linearGradient id="pageLeft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ddc880"/>
                <stop offset="100%" stopColor="#c8aa60"/>
              </linearGradient>
              <linearGradient id="pageRight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8d890"/>
                <stop offset="100%" stopColor="#d4bc70"/>
              </linearGradient>
            </defs>
            {/* Page gauche */}
            <path d="M4,8 Q4,4 8,4 L98,4 L98,126 Q52,122 4,126 Z" fill="url(#pageLeft)"/>
            {/* Page droite */}
            <path d="M102,4 L192,4 Q196,4 196,8 L196,126 Q148,122 102,126 Z" fill="url(#pageRight)"/>
            {/* Reliure */}
            <rect x="96" y="0" width="8" height="130" fill="#6a4010" rx="2"/>
            <line x1="100" y1="0" x2="100" y2="130" stroke="rgba(255,200,100,0.3)" strokeWidth="1"/>
            {/* Carte monde sur la droite */}
            <ellipse cx="148" cy="65" rx="38" ry="28" fill="rgba(80,180,180,0.3)" stroke="rgba(80,180,180,0.4)" strokeWidth="0.8"/>
            <path d="M128,58 Q136,54 140,60 Q146,54 152,59 Q158,54 162,60 Q165,66 160,70 Q152,74 144,70 Q136,66 128,58Z" fill="rgba(80,140,60,0.6)"/>
            <path d="M116,66 Q122,63 126,68 Q124,74 118,72Z" fill="rgba(80,140,60,0.5)"/>
            <path d="M158,70 Q164,67 168,72 Q166,78 160,76Z" fill="rgba(80,140,60,0.5)"/>
            {/* Tracé de route pointillé */}
            <path d="M108,80 Q128,70 148,75 Q165,68 178,80" fill="none" stroke="rgba(160,80,20,0.6)" strokeWidth="1" strokeDasharray="4,3"/>
            <circle cx="108" cy="80" r="2" fill="rgba(200,80,20,0.7)"/>
            <circle cx="178" cy="80" r="2" fill="rgba(200,80,20,0.7)"/>
            {/* Lignes de texte sur la gauche */}
            {[18,26,34,42,50,58,66,74,82,90,98,106].map(y => (
              <line key={y} x1="12" y1={y} x2="88" y2={y} stroke="rgba(100,60,10,0.2)" strokeWidth="0.8"/>
            ))}
            {/* Rose des vents miniature */}
            <text x="24" y="118" textAnchor="middle" fill="rgba(100,60,10,0.5)" fontSize="10">✦</text>
            <text x="24" y="112" textAnchor="middle" fill="rgba(100,60,10,0.4)" fontSize="4">N</text>
          </svg>
        </div>

        {/* ── Boussole en laiton ── */}
        <div className="absolute" style={{ bottom: '14%', left: '6%', width: '18vw', maxWidth: '76px' }}>
          <svg viewBox="0 0 80 80" className="w-full opacity-95">
            <defs>
              <radialGradient id="compassFace" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#f5e8c0"/>
                <stop offset="100%" stopColor="#c8a040"/>
              </radialGradient>
              <linearGradient id="compassBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0b840"/>
                <stop offset="50%" stopColor="#c09020"/>
                <stop offset="100%" stopColor="#806010"/>
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="38" fill="url(#compassBody)"/>
            <circle cx="40" cy="40" r="32" fill="url(#compassFace)"/>
            {/* Graduations */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
              const rad = (deg * Math.PI) / 180
              const x1 = 40 + 28 * Math.sin(rad), y1 = 40 - 28 * Math.cos(rad)
              const x2 = 40 + 24 * Math.sin(rad), y2 = 40 - 24 * Math.cos(rad)
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(80,50,10,0.5)" strokeWidth={deg%90===0?1.5:0.8}/>
            })}
            {/* Rose des vents */}
            <polygon points="40,14 42,38 40,62 38,38" fill="#c0301a" opacity="0.9"/>
            <polygon points="40,14 42,38 40,62 38,38" fill="#c0301a" opacity="0.9" transform="rotate(180,40,40)"/>
            <polygon points="14,40 38,38 62,40 38,42" fill="#888" opacity="0.7"/>
            <polygon points="14,40 38,38 62,40 38,42" fill="#888" opacity="0.7" transform="rotate(180,40,40)"/>
            <text x="40" y="10" textAnchor="middle" fill="rgba(80,40,10,0.8)" fontSize="7" fontWeight="bold">N</text>
            <text x="40" y="75" textAnchor="middle" fill="rgba(80,40,10,0.6)" fontSize="6">S</text>
            <text x="74" y="43" textAnchor="middle" fill="rgba(80,40,10,0.6)" fontSize="6">E</text>
            <text x="6" y="43" textAnchor="middle" fill="rgba(80,40,10,0.6)" fontSize="6">O</text>
            <circle cx="40" cy="40" r="3" fill="#c09020"/>
            <circle cx="40" cy="40" r="1.5" fill="#f0d060"/>
          </svg>
        </div>

        {/* ── Jumelles ── */}
        <div className="absolute text-4xl" style={{ bottom: '22%', left: '2%', opacity: 0.75, transform: 'rotate(-12deg)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
          🔭
        </div>

        {/* ── Carnet fermé (journal en cuir) ── */}
        <div className="absolute" style={{ bottom: '20%', left: '34%', opacity: 0.8 }}>
          <svg viewBox="0 0 55 70" className="w-12 h-14">
            <defs>
              <linearGradient id="leatherGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6b3010"/>
                <stop offset="100%" stopColor="#3a1808"/>
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="51" height="66" rx="3" fill="url(#leatherGrad)"/>
            <rect x="4" y="4" width="47" height="62" rx="2" fill="none" stroke="rgba(180,100,40,0.3)" strokeWidth="1"/>
            <line x1="12" y1="2" x2="12" y2="68" stroke="rgba(255,180,80,0.15)" strokeWidth="1.5"/>
            {/* Sangle */}
            <rect x="38" y="28" width="16" height="14" rx="2" fill="#8a5020" opacity="0.8"/>
            <rect x="42" y="32" width="8" height="6" rx="1" fill="rgba(201,168,76,0.7)"/>
          </svg>
        </div>

        {/* ── Sac à dos (en haut à droite dans l'image) ── */}
        <div className="absolute text-5xl" style={{ bottom: '44%', right: '2%', opacity: 0.6, transform: 'rotate(5deg)', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}>
          🎒
        </div>

        {/* ── Texte hero ── */}
        <div className="relative z-10 px-5 pt-7 pb-4">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.92)', color: '#2a1008', boxShadow: '0 2px 12px rgba(201,168,76,0.4)' }}>
              Mission {group.active_mission}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.35)', color: 'rgba(255,220,140,0.9)', backdropFilter: 'blur(4px)' }}>
              {group.name}
            </span>
          </div>

          <h1 className="font-black uppercase leading-tight" style={{ fontSize: 'clamp(2rem,7vw,2.8rem)', color: '#fff8e8', textShadow: '0 3px 24px rgba(0,0,0,0.7)', letterSpacing: '0.02em' }}>
            L&apos;EXPÉDITION
          </h1>
          <h2 className="font-black uppercase" style={{ fontSize: 'clamp(1.5rem,5vw,2.2rem)', color: '#f5c842', textShadow: '0 0 30px rgba(245,200,66,0.7)', letterSpacing: '0.06em' }}>
            PROFESSIONNELLE
          </h2>

          <div className="mt-5 rounded-2xl p-4" style={{ background: 'rgba(20,10,4,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,168,76,0.25)', boxShadow: 'inset 0 1px 0 rgba(255,220,140,0.1)' }}>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,230,160,0.9)' }}>
              <span className="text-xl mr-1" style={{ color: '#f5c842', fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              Votre équipement est prêt. Il est maintenant temps de quitter le camp de base et d&apos;avancer sur le terrain.
              <span className="text-xl ml-1" style={{ color: '#f5c842', fontFamily: 'Georgia, serif' }}>&rdquo;</span>
            </p>
            <p className="text-xs mt-2 font-semibold" style={{ color: 'rgba(201,168,76,0.6)' }}>— Carnet de l&apos;explorateur</p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f5c842', boxShadow: '0 0 8px rgba(245,200,66,0.8)' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,220,140,0.75)' }}>L&apos;aventure continue</span>
          </div>
        </div>
      </div>

      {/* ═══ CONTENU MISSIONS ═══ */}
      <main style={{ background: 'linear-gradient(180deg, #1a0e06 0%, #120a04 100%)' }}>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
