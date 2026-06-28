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
      .select('id, locked')
      .eq('slug', slug)
      .single()

    if (groupError || !group) {
      return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
    }

    const { error } = await supabase
      .from('groups')
      .update({ locked: !group.locked })
      .eq('slug', slug)

    if (error) throw error

    return NextResponse.json({ success: true, locked: !group.locked })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
