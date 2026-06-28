import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props {
  group: Group
}

export default async function Univers2Page({ group }: Props) {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(160deg, #0d1f2d 0%, #1a2744 30%, #1a4a3a 70%, #0d1f2d 100%)',
      }}
    >
      {/* Texture overlay — lignes topographiques */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 28px,
            #c9a84c 28px,
            #c9a84c 29px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 28px,
            #c9a84c 28px,
            #c9a84c 29px
          )`,
        }}
      />

      {/* Bannière immersive */}
      <header className="relative px-4 pt-safe-top pb-6 pt-6 overflow-hidden">
        {/* Halo doré en haut */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: '#c9a84c' }}
        />

        {/* Badge groupe */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ color: '#c9a84c', borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)' }}
          >
            Univers 2 — Expédition
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
          >
            {group.name}
          </span>
        </div>

        {/* Titre principal style affiche */}
        <div className="text-center mb-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
            style={{ color: 'rgba(201,168,76,0.7)' }}
          >
            Semestre {group.active_mission !== undefined ? `— Mission ${group.active_mission}` : ''}
          </p>
          <h1
            className="text-3xl font-black leading-none uppercase mb-1"
            style={{ letterSpacing: '-0.01em', textShadow: '0 2px 20px rgba(201,168,76,0.3)' }}
          >
            L&apos;Expédition
          </h1>
          <h2
            className="text-xl font-bold"
            style={{ color: '#c9a84c', letterSpacing: '0.05em' }}
          >
            Professionnelle
          </h2>
        </div>

        {/* Citation carnet de voyage */}
        <div
          className="mx-auto max-w-sm rounded-xl px-5 py-4 border-l-4 relative"
          style={{
            background: 'rgba(26,74,58,0.35)',
            borderLeftColor: '#c9a84c',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="absolute top-2 left-4 text-3xl font-serif opacity-30 leading-none"
            style={{ color: '#c9a84c' }}
          >
            &ldquo;
          </span>
          <p className="text-sm italic leading-relaxed pl-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Le chemin ne se voit pas d&apos;en bas. Il se découvre pas à pas.
          </p>
          <p className="text-xs mt-2 pl-4 font-semibold" style={{ color: 'rgba(201,168,76,0.7)' }}>
            — Carnet de l&apos;explorateur
          </p>
        </div>

        {/* Badge Mission active */}
        <div className="flex justify-center mt-4">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#c9a84c',
              boxShadow: '0 0 16px rgba(201,168,76,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            Mission active
          </div>
        </div>
      </header>

      <main>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
