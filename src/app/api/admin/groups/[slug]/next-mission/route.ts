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
      .select('id, slug, universe, track, active_mission')
      .eq('slug', slug)
      .single()

    if (groupError || !group) {
      return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
    }

    const { count } = await supabase
      .from('missions')
      .select('*', { count: 'exact', head: true })
      .eq('universe', group.universe)

    const universeMax = count ?? 1
    // L'Univers 2 (Expédition Professionnelle) réserve les cours 4-6 (univers détective) aux PGE2
    // PGE1 Groupe A suit son propre parcours à 3 checkpoints, distinct des 6 checkpoints B1
    const maxMission =
      (group.universe === 'expedition-professionnelle' && group.track === 'bachelor2') ||
      (group.universe === 'passeport-stage' && group.slug === 'pge1-groupe-a')
        ? Math.min(3, universeMax)
        : universeMax
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
