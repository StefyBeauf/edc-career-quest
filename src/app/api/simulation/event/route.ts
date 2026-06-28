import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSimulationEvent } from '@/lib/ai'
import type { Simulation, EventType } from '@/types'

export async function POST(request: Request) {
  const body = await request.json() as {
    simulationId: string
    eventType: string
    elapsedMinutes: number
  }

  const { simulationId, eventType, elapsedMinutes } = body

  if (!simulationId || !eventType || elapsedMinutes === undefined) {
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
  const content = await generateSimulationEvent(simulation.scenario_json, eventType as EventType, elapsedMinutes)

  const { data: event, error: eventError } = await supabase
    .from('simulation_events')
    .insert({
      simulation_id: simulationId,
      type: eventType,
      content,
      injected_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'événement' }, { status: 500 })
  }

  return NextResponse.json({ event_id: event.id, content, type: eventType })
}
