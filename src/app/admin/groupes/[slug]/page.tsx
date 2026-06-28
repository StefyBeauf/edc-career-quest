import { createAdminClient } from '@/lib/supabase/server'
import { generateQRCode } from '@/lib/qrcode'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import GroupControls from '@/components/admin/GroupControls'
import QRCodeDisplay from '@/components/admin/QRCodeDisplay'
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

const SPECIALIZATION_LABELS: Record<string, string> = {
  marketing: 'Marketing',
  negociation: 'Négociation',
  finance: 'Finance',
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GroupePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createAdminClient()

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  const group = data as Group

  const { data: missions } = await supabase
    .from('missions')
    .select('number, title')
    .eq('universe', group.universe)
    .eq('number', group.active_mission)
    .single()

  const qrDataUrl = await generateQRCode(slug)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const groupUrl = `${appUrl}/${slug}`

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-300 transition-colors">
          Tableau de bord
        </Link>
        <span>/</span>
        <span className="text-gray-300">{group.name}</span>
      </div>

      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">{group.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              group.locked
                ? 'bg-red-950 text-red-400 border border-red-800'
                : 'bg-green-950 text-green-400 border border-green-800'
            }`}>
              {group.locked ? 'Verrouillé' : 'Actif'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="font-semibold text-white mb-4">Informations du groupe</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Univers</dt>
                <dd className="text-white font-medium">{UNIVERSE_LABELS[group.universe] ?? group.universe}</dd>
              </div>
              {group.track && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Filière</dt>
                  <dd className="text-white">{TRACK_LABELS[group.track] ?? group.track}</dd>
                </div>
              )}
              {group.specialization && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Spécialisation</dt>
                  <dd className="text-white">{SPECIALIZATION_LABELS[group.specialization] ?? group.specialization}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Mission active</dt>
                <dd className="text-indigo-400 font-semibold">
                  #{group.active_mission}
                  {missions && (
                    <span className="text-gray-400 font-normal ml-2">— {missions.title}</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Slug</dt>
                <dd className="text-gray-300 font-mono text-xs">{group.slug}</dd>
              </div>
            </dl>
          </div>

          <QRCodeDisplay dataUrl={qrDataUrl} url={groupUrl} groupName={group.name} />
        </div>

        <div>
          <GroupControls
            slug={group.slug}
            locked={group.locked}
            activeMission={group.active_mission}
          />
        </div>
      </div>
    </div>
  )
}
