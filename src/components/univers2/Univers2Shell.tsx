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
    <div className="flex flex-col gap-6 px-4 pb-12 max-w-xl mx-auto w-full">
      {/* Section jalons */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: 'rgba(201,168,76,0.6)' }}
        >
          Jalons de l&apos;expédition
        </p>
        <MissionSelector
          missions={missions}
          activeMission={group.active_mission}
          selectedMission={selectedMission}
          onSelect={setSelectedMission}
        />
      </section>

      {/* Séparateur style corde */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.2)' }} />
        <span className="text-base" style={{ color: 'rgba(201,168,76,0.5)' }}>⛰</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.2)' }} />
      </div>

      {/* Section cartes */}
      <section>
        {isLocked ? (
          <MissionLocked group={group} />
        ) : (
          <CardDeck missionNumber={selectedMission} track={track} />
        )}
      </section>
    </div>
  )
}
