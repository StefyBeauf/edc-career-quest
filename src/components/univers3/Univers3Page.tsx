import { createClient } from '@/lib/supabase/server'
import type { Group, Simulation, Mission } from '@/types'
import UniverseHeader from '@/components/shared/UniverseHeader'
import SimulationLauncher from './SimulationLauncher'
import SimulationRunner from './SimulationRunner'

interface Props {
  group: Group
}

export default async function Univers3Page({ group }: Props) {
  const supabase = await createClient()

  const { data: missionData } = await supabase
    .from('missions')
    .select('*')
    .eq('universe', 'mission-horizon')
    .eq('number', group.active_mission)
    .single()

  const mission = missionData as Mission | null

  const { data: simData } = await supabase
    .from('simulations')
    .select('*')
    .eq('group_id', group.id)
    .eq('mission_id', mission?.id ?? '')
    .eq('status', 'active')
    .maybeSingle()

  const activeSimulation = simData as Simulation | null

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050a1a 0%, #0a1628 60%, #0d1f3c 100%)' }}
    >
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

      {/* Header style hologramme */}
      <div className="relative z-10 text-center pt-6 pb-2 px-4">
        <div
          className="inline-block px-6 py-1 mb-2 border rounded-sm text-xs tracking-widest uppercase"
          style={{
            borderColor: '#c9a84c',
            color: '#c9a84c',
            background: 'rgba(201, 168, 76, 0.08)',
            fontFamily: 'monospace',
          }}
        >
          CLASSIFIÉ — NIVEAU ALPHA
        </div>
        <h1
          className="text-3xl font-black uppercase tracking-widest animate-pulse"
          style={{
            color: '#e8f0ff',
            textShadow: '0 0 20px rgba(200, 220, 255, 0.5), 0 0 40px rgba(100, 160, 255, 0.3)',
            fontFamily: 'monospace',
            animationDuration: '3s',
          }}
        >
          MISSION HORIZON
        </h1>
        <p
          className="text-xs mt-1 tracking-widest"
          style={{ color: '#c9a84c', fontFamily: 'monospace' }}
        >
          UNIVERS 3 — SIMULATION PROFESSIONNELLE
        </p>
      </div>

      <UniverseHeader
        group={group}
        missionTitle={mission?.title}
        missionNumber={group.active_mission}
      />

      <main className="relative z-10 px-4 pb-16">
        {!activeSimulation ? (
          <SimulationLauncher
            group={group}
            mission={mission}
          />
        ) : (
          <SimulationRunner
            simulation={activeSimulation}
            scenario={activeSimulation.scenario_json}
          />
        )}
      </main>
    </div>
  )
}
