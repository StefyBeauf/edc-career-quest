import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props { group: Group }

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#0f0a04' }}>

      {/* ═══ HERO plein écran — vraie photo ═══ */}
      <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>

        {/* Photo réelle d'exploration (Unsplash — licence gratuite) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/hero-univers2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />

        {/* Voile sombre pour la lisibilité du texte */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(170deg, rgba(8,4,2,0.35) 0%, rgba(15,8,3,0.5) 40%, rgba(8,4,1,0.82) 70%, rgba(5,2,0,0.97) 100%)',
        }} />

        {/* Voile chaud sur le haut pour accentuer l'atmosphère */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(180,100,20,0.25) 0%, transparent 60%)',
        }} />

        {/* ── Contenu ── */}
        <div className="relative z-10 flex flex-col min-h-[100svh] px-6">

          {/* En-tête */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-2">
              <div style={{ width: '20px', height: '1px', background: '#c9a84c' }} />
              <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: '#c9a84c' }}>EDC Paris</span>
              <div style={{ width: '20px', height: '1px', background: '#c9a84c' }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,210,130,0.65)' }}>{group.name}</span>
          </div>

          {/* Espace central */}
          <div className="flex-1" />

          {/* Bloc texte principal — calé en bas */}
          <div className="pb-10">

            {/* Badge */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] px-4 py-2" style={{ background: '#c9a84c', color: '#0f0a04' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0a04', display: 'inline-block' }} />
                Mission {group.active_mission} / 6
              </span>
            </div>

            {/* Catégorie */}
            <p className="text-xs font-black uppercase tracking-[0.32em] mb-3" style={{ color: 'rgba(201,168,76,0.75)' }}>
              Expédition Professionnelle
            </p>

            {/* Grand titre */}
            <h1 style={{
              fontSize: 'clamp(2.8rem, 12vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#fff8f0',
              textShadow: '0 2px 30px rgba(0,0,0,0.8)',
              marginBottom: '1.2rem',
            }}>
              L&apos;HEURE<br />
              <span style={{ color: '#f5c842', textShadow: '0 0 50px rgba(245,200,66,0.45)' }}>
                D&apos;EXPLORER
              </span>
            </h1>

            {/* Séparateur */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.6)' }} />
              <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '9px', letterSpacing: '0.3em', fontWeight: 700 }}>✦</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            </div>

            {/* Citation */}
            <p className="text-sm italic leading-relaxed mb-6" style={{ color: 'rgba(255,225,160,0.8)', fontFamily: 'Georgia, serif', borderLeft: '2px solid rgba(201,168,76,0.5)', paddingLeft: '14px' }}>
              &ldquo;Votre équipement est prêt. Il est maintenant temps de quitter le camp de base et d&apos;avancer sur le terrain.&rdquo;
            </p>

            {/* Indicateur actif */}
            <div className="flex items-center gap-2">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f5c842', boxShadow: '0 0 10px rgba(245,200,66,0.8)', animation: 'pulse 2s infinite' }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,210,120,0.7)' }}>Session en cours</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENU MISSIONS ═══ */}
      <main style={{ background: '#0f0a04' }}>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
