import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Vercel envoie Authorization: Bearer CRON_SECRET à chaque déclenchement
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = await createAdminClient()
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  // Récupère toutes les sessions planifiées pour aujourd'hui ou avant
  const { data: schedules, error } = await supabase
    .from('session_schedules')
    .select('group_id, mission_number, scheduled_date')
    .lte('scheduled_date', today)
    .order('mission_number', { ascending: false })

  if (error || !schedules) {
    return NextResponse.json({ error: 'Erreur lecture planning' }, { status: 500 })
  }

  // Pour chaque groupe, on récupère la mission la plus haute dont la date est passée
  const maxByGroup = new Map<string, number>()
  for (const s of schedules) {
    const current = maxByGroup.get(s.group_id) ?? 0
    if (s.mission_number > current) {
      maxByGroup.set(s.group_id, s.mission_number)
    }
  }

  const results: { group_id: string; advanced_to: number }[] = []

  for (const [groupId, targetMission] of maxByGroup) {
    const { data: group } = await supabase
      .from('groups')
      .select('id, active_mission')
      .eq('id', groupId)
      .single()

    if (!group) continue
    if (targetMission <= group.active_mission) continue // déjà à jour

    await supabase
      .from('groups')
      .update({ active_mission: targetMission })
      .eq('id', groupId)

    results.push({ group_id: groupId, advanced_to: targetMission })
  }

  return NextResponse.json({
    date: today,
    groupes_avances: results.length,
    details: results,
  })
}
