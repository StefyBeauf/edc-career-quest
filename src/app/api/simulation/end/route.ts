import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json() as { simulationId: string }
  const { simulationId } = body

  if (!simulationId) {
    return NextResponse.json({ error: 'Paramètre manquant' }, { status: 400 })
  }

  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('simulations')
    .update({ status: 'completed' })
    .eq('id', simulationId)

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la fermeture' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
