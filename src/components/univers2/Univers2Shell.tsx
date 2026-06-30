'use client'

import { useState } from 'react'
import type { Group, Track } from '@/types'
import { getMissionsForTrack } from '@/lib/content/univers2'
import MissionSelector from './MissionSelector'
import CardDeck from './CardDeck'
import MissionLocked from '@/components/shared/MissionLocked'
import Mission1Boussole from './Mission1Boussole'
import Mission2CarnetBord from './Mission2CarnetBord'
import Mission3LongueVue from './Mission3LongueVue'
import Dossier4Pistes from './Dossier4Pistes'
import Dossier5Contacts from './Dossier5Contacts'
import Dossier6Opportunite from './Dossier6Opportunite'

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
      {/* Section navigation — repère stable et identique pour toutes les missions */}
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

      {/* Section contenu de mission */}
      <section>
        {isLocked ? (
          <MissionLocked group={group} />
        ) : selectedMission === 1 ? (
          <Mission1Boussole />
        ) : selectedMission === 2 ? (
          <Mission2CarnetBord />
        ) : selectedMission === 3 ? (
          <Mission3LongueVue />
        ) : track === 'pge2' && selectedMission === 4 ? (
          <Dossier4Pistes />
        ) : track === 'pge2' && selectedMission === 5 ? (
          <Dossier5Contacts />
        ) : track === 'pge2' && selectedMission === 6 ? (
          <Dossier6Opportunite />
        ) : (
          <CardDeck missionNumber={selectedMission} track={track} />
        )}
      </section>
    </div>
  )
}
