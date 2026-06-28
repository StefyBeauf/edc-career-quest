import type { Group } from '@/types'
import Univers2Shell from './Univers2Shell'

interface Props { group: Group }

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#0f0a04' }}>

      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden" style={{ minHeight: '100vh' }}>

        {/* Couche 1 — ciel coucher de soleil */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(175deg, #c8660a 0%, #e8920a 12%, #d4780a 22%, #8a4a10 38%, #4a2808 58%, #2a1606 78%, #140c04 100%)',
        }} />

        {/* Couche 2 — halo solaire intense */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 5%, rgba(255,180,60,0.45) 0%, rgba(220,120,20,0.2) 40%, transparent 70%)',
        }} />

        {/* Couche 3 — profondeur bas de page (table sombre) */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(0deg, rgba(8,4,1,0.92) 0%, rgba(15,8,3,0.7) 30%, transparent 60%)',
        }} />

        {/* Couche 4 — grain de film */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '150px',
        }} />

        {/* Couche 5 — liseré doré horizontal (ligne d'horizon stylisée) */}
        <div className="absolute pointer-events-none" style={{ top: '38%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 20%, rgba(245,200,80,0.9) 50%, rgba(201,168,76,0.6) 80%, transparent 100%)' }} />

        {/* ── Contenu éditorial ── */}
        <div className="relative z-10 flex flex-col min-h-screen px-6">

          {/* En-tête */}
          <div className="flex items-center justify-between pt-8 mb-auto">
            <div className="flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: '#c9a84c' }}>EDC Paris</span>
              <div className="w-5 h-px" style={{ background: '#c9a84c' }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,210,120,0.6)' }}>{group.name}</span>
          </div>

          {/* Badge mission */}
          <div className="mt-16 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-sm" style={{ background: '#c9a84c', color: '#0f0a04', letterSpacing: '0.18em' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#0f0a04' }} />
              Mission {group.active_mission}
            </span>
          </div>

          {/* Titre éditorial */}
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.35em] mb-4" style={{ color: 'rgba(201,168,76,0.7)' }}>
              Expédition Professionnelle
            </p>
            <h1 style={{
              fontSize: 'clamp(3rem, 13vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              color: '#fff8f0',
              textTransform: 'uppercase',
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            }}>
              L&apos;HEURE<br />
              <span style={{ color: '#f5c842', textShadow: '0 0 60px rgba(245,200,66,0.5)' }}>D&apos;OSER</span>
            </h1>
          </div>

          {/* Ligne décorative */}
          <div className="flex items-center gap-4 mb-8">
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.3)' }} />
            <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '10px', letterSpacing: '0.3em', fontWeight: 700 }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.3)' }} />
          </div>

          {/* Citation */}
          <div className="mb-8" style={{ borderLeft: '2px solid #c9a84c', paddingLeft: '16px' }}>
            <p className="text-base italic leading-relaxed" style={{ color: 'rgba(255,230,170,0.85)', fontFamily: 'Georgia, serif' }}>
              &ldquo;Votre équipement est prêt. Il est maintenant temps de quitter le camp de base et d&apos;avancer sur le terrain.&rdquo;
            </p>
            <p className="text-xs mt-2 font-bold uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.55)' }}>Carnet de l&apos;explorateur</p>
          </div>

          {/* Stats visuelles — style magazine */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { chiffre: '6', label: 'Missions' },
              { chiffre: '2A', label: 'Promotion' },
              { chiffre: group.active_mission.toString(), label: 'En cours' },
            ].map(({ chiffre, label }) => (
              <div key={label} className="text-center py-4 rounded-sm" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="font-black" style={{ fontSize: '1.8rem', color: '#f5c842', lineHeight: 1, textShadow: '0 0 20px rgba(245,200,66,0.4)' }}>{chiffre}</p>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,210,120,0.5)' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Indicateur de défilement */}
          <div className="flex flex-col items-center gap-2 pb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: 'rgba(201,168,76,0.5)' }}>Explorez</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(180deg, rgba(201,168,76,0.5) 0%, transparent 100%)' }} />
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
