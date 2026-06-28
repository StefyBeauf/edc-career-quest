'use client'

import { useState } from 'react'
import type { Group, Track } from '@/types'
import { getMissionsForTrack } from '@/lib/content/univers2'
import MissionSelector from './MissionSelector'
import CardDeck from './CardDeck'
import MissionLocked from '@/components/shared/MissionLocked'

interface Univers2ShellProps {
  group: Group
}

export default function Univers2Shell({ group }: Univers2ShellProps) {
  const track = (group.track ?? 'bachelor2') as Track
  const missions = getMissionsForTrack(track)
  const [selectedMission, setSelectedMission] = useState(group.active_mission)

  const isLocked = selectedMission > group.active_mission

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 max-w-xl mx-auto w-full">
      <MissionSelector
        missions={missions}
        activeMission={group.active_mission}
        selectedMission={selectedMission}
        onSelect={setSelectedMission}
      />

      <div>
        {isLocked ? (
          <MissionLocked group={group} />
        ) : (
          <CardDeck missionNumber={selectedMission} track={track} />
        )}
      </div>
    </div>
  )
}
