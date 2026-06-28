import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Group } from '@/types'

const UNIVERSE_LABELS: Record<string, string> = {
  'passeport-stage': 'Passeport Stage',
  'expedition-professionnelle': 'Expédition Professionnelle',
  'mission-horizon': 'Mission Horizon',
}

const TRACK_LABELS: Record<string, string> = {
  bachelor2: 'Bachelor 2',
  pge2: 'PGE 2',
}

export default async function AdminDashboard() {
  const supabase = await createAdminClient()
  const { data: groups } = await supabase
    .from('groups')
    .select('*')
    .order('name')

  const groupList = (groups ?? []) as Group[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400 mt-1 text-sm">{groupList.length} groupe{groupList.length !== 1 ? 's' : ''} au total</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groupList.map((group) => (
          <Link
            key={group.id}
            href={`/admin/groupes/${group.slug}`}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-700 hover:bg-gray-800/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {group.name}
              </h2>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                group.locked
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : 'bg-green-950 text-green-400 border border-green-800'
              }`}>
                {group.locked ? 'Verrouillé' : 'Actif'}
              </span>
            </div>

            <div className="space-y-1.5 text-sm text-gray-400">
              <p>
                <span className="text-gray-500">Univers :</span>{' '}
                {UNIVERSE_LABELS[group.universe] ?? group.universe}
              </p>
              {group.track && (
                <p>
                  <span className="text-gray-500">Filière :</span>{' '}
                  {TRACK_LABELS[group.track] ?? group.track}
                </p>
              )}
              <p>
                <span className="text-gray-500">Mission active :</span>{' '}
                <span className="text-indigo-400 font-medium">#{group.active_mission}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {groupList.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>Aucun groupe trouvé dans la base de données.</p>
        </div>
      )}
    </div>
  )
}
