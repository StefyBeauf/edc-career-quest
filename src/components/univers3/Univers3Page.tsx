import type { Group } from '@/types'
import HorizonShell from './HorizonShell'

interface Props {
  group: Group
}

export default async function Univers3Page({ group }: Props) {
  const missionNumber = group.active_mission

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: '#050a1a' }}
    >
      {/* Photo de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("/hero-univers3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }} />
      {/* Voile spatial sombre */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(170deg, rgba(2,5,15,0.5) 0%, rgba(5,10,25,0.65) 35%, rgba(3,7,18,0.88) 65%, #050a1a 90%)',
      }} />

      {/* Étoiles CSS */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { top: '5%', left: '12%', size: 2, opacity: 0.8 },
          { top: '8%', left: '34%', size: 1, opacity: 0.6 },
          { top: '3%', left: '58%', size: 2, opacity: 0.9 },
          { top: '12%', left: '78%', size: 1, opacity: 0.5 },
          { top: '18%', left: '22%', size: 1, opacity: 0.7 },
          { top: '15%', left: '90%', size: 2, opacity: 0.6 },
          { top: '25%', left: '5%', size: 1, opacity: 0.8 },
          { top: '30%', left: '45%', size: 1, opacity: 0.4 },
          { top: '35%', left: '70%', size: 2, opacity: 0.7 },
          { top: '40%', left: '15%', size: 1, opacity: 0.6 },
          { top: '45%', left: '85%', size: 1, opacity: 0.9 },
          { top: '50%', left: '30%', size: 2, opacity: 0.5 },
          { top: '55%', left: '60%', size: 1, opacity: 0.7 },
          { top: '60%', left: '8%', size: 1, opacity: 0.6 },
          { top: '65%', left: '50%', size: 2, opacity: 0.4 },
          { top: '70%', left: '92%', size: 1, opacity: 0.8 },
          { top: '75%', left: '25%', size: 1, opacity: 0.5 },
          { top: '2%', left: '48%', size: 1, opacity: 0.9 },
          { top: '20%', left: '65%', size: 1, opacity: 0.6 },
          { top: '42%', left: '38%', size: 1, opacity: 0.7 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Courbe de la Terre en bas */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '160px' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <radialGradient id="earthGlow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#1a4080" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#0d2a5c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#050a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="720" cy="200" rx="900" ry="180" fill="url(#earthGlow)" />
          <ellipse cx="720" cy="210" rx="840" ry="140" fill="#0d1f3c" fillOpacity="0.4" />
        </svg>
      </div>

      {/* HERO spatial — calqué sur le template */}
      <div className="relative z-10 px-4 pt-8 pb-6">

        {/* Étoile boussole déco (coin haut gauche comme le template) */}
        <div className="absolute top-4 left-4 opacity-40">
          <svg viewBox="0 0 50 50" className="w-10 h-10">
            <polygon points="25,2 27,23 25,48 23,23" fill="#c9a84c"/>
            <polygon points="2,25 23,23 48,25 23,27" fill="#c9a84c" opacity="0.6"/>
            <circle cx="25" cy="25" r="3" fill="#c9a84c"/>
          </svg>
        </div>

        {/* Vaisseau déco (coin haut droit comme le template) */}
        <div className="absolute top-5 right-4 opacity-35 text-3xl" style={{ transform: 'rotate(-20deg)' }}>
          🚀
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-2 mb-5 mt-2">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'monospace' }}>
            DOSSIER CONFIDENTIEL
          </span>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-4">
          <h1 className="font-black uppercase leading-none mb-1" style={{ fontSize: '2.8rem', color: '#e8f0ff', fontFamily: 'monospace', textShadow: '0 0 30px rgba(150,200,255,0.4)', letterSpacing: '0.05em' }}>
            MISSION
          </h1>
          <h2 className="font-black uppercase" style={{ fontSize: '2.2rem', color: '#c9a84c', fontFamily: 'monospace', textShadow: '0 0 20px rgba(201,168,76,0.5)', letterSpacing: '0.1em' }}>
            HORIZON
          </h2>
        </div>

        {/* Ligne de données style HUD */}
        <div className="flex justify-center gap-4 mb-4 flex-wrap">
          {[
            { label: 'MISSION', value: `M-0${group.active_mission}` },
            { label: 'SECTEUR', value: group.specialization?.toUpperCase() ?? 'B3' },
            { label: 'STATUT', value: 'ACTIF' },
          ].map(item => (
            <div key={item.label} className="text-center px-3 py-2 rounded" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-xs" style={{ color: 'rgba(200,220,255,0.4)', fontFamily: 'monospace' }}>{item.label}</p>
              <p className="text-sm font-black" style={{ color: '#c9a84c', fontFamily: 'monospace' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Info groupe */}
        <p className="text-center text-xs" style={{ color: 'rgba(200,220,255,0.4)', fontFamily: 'monospace' }}>
          AGENT : {group.name.toUpperCase()}
        </p>
      </div>

      <main className="relative z-10">
        <HorizonShell group={group} missionNumber={missionNumber} />
      </main>
    </div>
  )
}
