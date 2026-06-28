import type { Group } from '@/types'

export const GROUPS_SEED: Omit<Group, 'id' | 'created_at'>[] = [
  { name: 'B1 Groupe A', slug: 'b1-groupe-a', year: 1, universe: 'passeport-stage', active_mission: 1, locked: false },
  { name: 'B1 Groupe B', slug: 'b1-groupe-b', year: 1, universe: 'passeport-stage', active_mission: 1, locked: false },
  { name: 'PGE1 Groupe A', slug: 'pge1-groupe-a', year: 1, universe: 'passeport-stage', active_mission: 1, locked: false },
  { name: 'B2 Groupe A', slug: 'b2-groupe-a', year: 2, universe: 'expedition-professionnelle', track: 'bachelor2', active_mission: 1, locked: false },
  { name: 'B2 Groupe B', slug: 'b2-groupe-b', year: 2, universe: 'expedition-professionnelle', track: 'bachelor2', active_mission: 1, locked: false },
  { name: 'PGE2 Groupe A', slug: 'pge2-groupe-a', year: 2, universe: 'expedition-professionnelle', track: 'pge2', active_mission: 1, locked: false },
  { name: 'B3 Marketing Digital', slug: 'b3-marketing-digital', year: 3, universe: 'mission-horizon', specialization: 'marketing', active_mission: 1, locked: false },
  { name: 'B3 Négociation', slug: 'b3-negociation', year: 3, universe: 'mission-horizon', specialization: 'negociation', active_mission: 1, locked: false },
  { name: 'B3 Finance', slug: 'b3-finance', year: 3, universe: 'mission-horizon', specialization: 'finance', active_mission: 1, locked: false },
]

export function getUniverseLabel(universe: Group['universe']) {
  const labels = {
    'passeport-stage': '✈️ Passeport vers le Stage',
    'expedition-professionnelle': '🧭 Expédition Professionnelle',
    'mission-horizon': '🚀 Mission Horizon',
  }
  return labels[universe]
}

export function getUniverseTheme(universe: Group['universe']) {
  const themes = {
    'passeport-stage': {
      bg: 'from-sky-900 via-blue-800 to-indigo-900',
      card: 'bg-sky-950/60 border-sky-700/40',
      accent: 'text-sky-300',
      button: 'bg-sky-500 hover:bg-sky-400',
      badge: 'bg-sky-800 text-sky-200',
      glow: 'shadow-sky-500/20',
    },
    'expedition-professionnelle': {
      bg: 'from-emerald-900 via-teal-800 to-cyan-900',
      card: 'bg-emerald-950/60 border-emerald-700/40',
      accent: 'text-emerald-300',
      button: 'bg-emerald-500 hover:bg-emerald-400',
      badge: 'bg-emerald-800 text-emerald-200',
      glow: 'shadow-emerald-500/20',
    },
    'mission-horizon': {
      bg: 'from-violet-900 via-purple-800 to-fuchsia-900',
      card: 'bg-violet-950/60 border-violet-700/40',
      accent: 'text-violet-300',
      button: 'bg-violet-500 hover:bg-violet-400',
      badge: 'bg-violet-800 text-violet-200',
      glow: 'shadow-violet-500/20',
    },
  }
  return themes[universe]
}
