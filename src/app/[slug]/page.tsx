import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Group } from '@/types'
import Univers1Page from '@/components/univers1/Univers1Page'
import Univers2Page from '@/components/univers2/Univers2Page'
import Univers3Page from '@/components/univers3/Univers3Page'
import GroupLocked from '@/components/shared/GroupLocked'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function StudentPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !group) return notFound()

  const g = group as Group

  if (g.locked) return <GroupLocked group={g} />

  if (g.universe === 'passeport-stage') return <Univers1Page group={g} />
  if (g.universe === 'expedition-professionnelle') return <Univers2Page group={g} />
  if (g.universe === 'mission-horizon') return <Univers3Page group={g} />

  return notFound()
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return { title: `EDC Career Quest — ${slug}` }
}
