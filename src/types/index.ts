export type Universe = 'passeport-stage' | 'expedition-professionnelle' | 'mission-horizon'
export type Track = 'bachelor2' | 'pge2'
export type Specialization = 'marketing' | 'negociation' | 'finance'
export type CardType = 'conseil' | 'réflexion' | 'défi' | 'inspiration'
export type ContentType = CardType | 'situation' | 'question'
export type SimulationStatus = 'pending' | 'active' | 'completed'
export type EventType = 'incident' | 'urgence' | 'opportunité' | 'info'

export interface Group {
  id: string
  name: string
  slug: string
  year: 1 | 2 | 3
  universe: Universe
  track?: Track
  specialization?: Specialization
  active_mission: number
  locked: boolean
  created_at: string
}

export interface Mission {
  id: string
  universe: Universe
  number: number
  title: string
  description: string
  unlocked_for: string[]
}

export interface Content {
  id: string
  mission_id: string
  type: ContentType
  content: string
  feedback?: string
  tags: string[]
}

export interface Simulation {
  id: string
  group_id: string
  mission_id: string
  scenario_json: SimulationScenario
  started_at: string
  status: SimulationStatus
}

export interface SimulationScenario {
  title: string
  context: string
  company: string
  role: string
  characters: Character[]
  documents: SimulationDocument[]
  objective: string
  deliverables: string[]
  constraints: string[]
  specialization: Specialization
}

export interface Character {
  name: string
  role: string
  personality: string
}

export interface SimulationDocument {
  name: string
  description: string
  content: string
}

export interface SimulationEvent {
  id: string
  simulation_id: string
  type: EventType
  content: string
  injected_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  role: 'admin' | 'teacher'
}

export interface AIFeedback {
  pointFort: string
  axeAmelioration: string
  questionReflexion: string
  vigilanceProfessionnelle: string
}
