'use client'

import { useState } from 'react'
import type { Group, Track } from '@/types'
import { getMissionsForTrack } from '@/lib/content/univers2'
import MissionSelector from './MissionSelector'
import MissionSelectorGrid from './MissionSelectorGrid'
import MissionSelectorStepper from './MissionSelectorStepper'
import MissionSelectorTabs from './MissionSelectorTabs'
import MissionSelectorCompact from './MissionSelectorCompact'
import MissionSelectorWheel from './MissionSelectorWheel'
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

// Une mise en page de navigation différente pour chaque épisode — pas systématiquement la frise "jalons"
const SELECTOR_LABELS: Record<number, string> = {
  1: 'Jalons de l\'expédition',
  2: 'Votre progression',
  3: 'Étapes du parcours',
  4: 'Dossiers à explorer',
  5: 'Avancement',
  6: 'Roue des missions',
}

export default function Univers2Shell({ group }: Univers2ShellProps) {
  const track = (group.track ?? 'bachelor2') as Track
  const missions = getMissionsForTrack(track)
  const [selectedMission, setSelectedMission] = useState(group.active_mission)

  const isLocked = selectedMission > group.active_mission
  const episode = group.active_mission

  const selectorProps = {
    missions,
    activeMission: group.active_mission,
    selectedMission,
    onSelect: setSelectedMission,
  }

  return (
    <div className="flex flex-col gap-6 px-4 pb-12 max-w-xl mx-auto w-full">
      {/* Section navigation — mise en page différente selon l'épisode */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: 'rgba(201,168,76,0.6)' }}
        >
          {SELECTOR_LABELS[episode] ?? 'Navigation'}
        </p>
        {episode === 1 && <MissionSelector {...selectorProps} />}
        {episode === 2 && <MissionSelectorStepper {...selectorProps} />}
        {episode === 3 && <MissionSelectorTabs {...selectorProps} />}
        {episode === 4 && <MissionSelectorGrid {...selectorProps} />}
        {episode === 5 && <MissionSelectorCompact {...selectorProps} />}
        {episode === 6 && <MissionSelectorWheel {...selectorProps} />}
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
