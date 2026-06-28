import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateAIFeedback } from '@/lib/ai'
import type { Simulation } from '@/types'

export async function POST(request: Request) {
  const body = await request.json() as {
    simulationId: string
    studentResponse: string
    deliverable: string
  }

  const { simulationId, studentResponse, deliverable } = body

  if (!simulationId || !studentResponse || !deliverable) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  const supabase = await createAdminClient()

  const { data: sim, error: simError } = await supabase
    .from('simulations')
    .select('*')
    .eq('id', simulationId)
    .single()

  if (simError || !sim) {
    return NextResponse.json({ error: 'Simulation introuvable' }, { status: 404 })
  }

  const simulation = sim as Simulation
  const feedback = await generateAIFeedback(simulation.scenario_json, studentResponse, deliverable)

  return NextResponse.json(feedback)
}
