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
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900 text-white">
      <UniverseHeader
        group={group}
        missionTitle={mission?.title}
        missionNumber={group.active_mission}
      />

      <main className="px-4 pb-8">
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
