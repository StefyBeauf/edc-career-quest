import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSimulationScenario } from '@/lib/ai'
import type { Specialization } from '@/types'

export async function POST(request: Request) {
  const body = await request.json() as {
    groupId: string
    missionId: string
    specialization: string
    missionNumber: number
  }

  const { groupId, missionId, specialization, missionNumber } = body

  if (!groupId || !missionId || !specialization || !missionNumber) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  const scenario = await generateSimulationScenario(specialization as Specialization, missionNumber)

  const supabase = await createAdminClient()

  const { data, error } = await supabase
    .from('simulations')
    .insert({
      group_id: groupId,
      mission_id: missionId,
      scenario_json: scenario,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Erreur lors de la création de la simulation' }, { status: 500 })
  }

  return NextResponse.json({ simulation_id: data.id, scenario })
}
