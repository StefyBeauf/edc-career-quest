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
      .select('id, active_mission')
      .eq('slug', slug)
      .single()

    if (groupError || !group) {
      return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
    }

    const prevMission = Math.max(group.active_mission - 1, 1)

    const { error } = await supabase
      .from('groups')
      .update({ active_mission: prevMission })
      .eq('slug', slug)

    if (error) throw error

    return NextResponse.json({ success: true, active_mission: prevMission })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
