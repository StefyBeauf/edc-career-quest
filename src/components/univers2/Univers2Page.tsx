import type { Group } from '@/types'
import UniverseHeader from '@/components/shared/UniverseHeader'
import Univers2Shell from './Univers2Shell'

interface Props {
  group: Group
}

export default async function Univers2Page({ group }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white">
      <UniverseHeader
        group={group}
        missionTitle="Expédition Professionnelle"
        missionNumber={group.active_mission}
      />
      <main>
        <Univers2Shell group={group} />
      </main>
    </div>
  )
}
