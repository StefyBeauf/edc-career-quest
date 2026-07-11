import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

interface ScheduleEntry {
  mission_number: number
  scheduled_date: string | null
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createAdminClient()

  const { data: group } = await supabase
    .from('groups')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!group) return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })

  const { data } = await supabase
    .from('session_schedules')
    .select('mission_number, scheduled_date')
    .eq('group_id', group.id)
    .order('mission_number')

  return NextResponse.json({ schedule: data ?? [] })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createAdminClient()

  const { data: group } = await supabase
    .from('groups')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!group) return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })

  const body = await req.json() as { entries: ScheduleEntry[] }

  // Supprime l'ancien planning puis réinsère
  await supabase.from('session_schedules').delete().eq('group_id', group.id)

  const toInsert = body.entries
    .filter(e => e.scheduled_date !== null && e.scheduled_date !== '')
    .map(e => ({
      group_id: group.id,
      mission_number: e.mission_number,
      scheduled_date: e.scheduled_date,
    }))

  if (toInsert.length > 0) {
    const { error } = await supabase.from('session_schedules').insert(toInsert)
    if (error) return NextResponse.json({ error: 'Erreur sauvegarde' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
