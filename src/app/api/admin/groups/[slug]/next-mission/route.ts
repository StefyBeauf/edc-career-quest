import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createAdminClient()

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id, universe, active_mission')
      .eq('slug', slug)
      .single()

    if (groupError || !group) {
      return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
    }

    const { count } = await supabase
      .from('missions')
      .select('*', { count: 'exact', head: true })
      .eq('universe', group.universe)

    const maxMission = count ?? 1
    const nextMission = Math.min(group.active_mission + 1, maxMission)

    const { error } = await supabase
      .from('groups')
      .update({ active_mission: nextMission })
      .eq('slug', slug)

    if (error) throw error

    return NextResponse.json({ success: true, active_mission: nextMission })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
