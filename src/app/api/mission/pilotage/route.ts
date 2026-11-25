import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Lecture du pilotage de la Mission 2 B3 Marketing Digital (CLAUDE.md, sections 3.2 et 3.6).
// - Lecture seule, sans état : ne reçoit et ne renvoie aucun contenu d'équipe.
// - Renvoie aussi l'heure serveur : le navigateur calcule l'écart avec son horloge locale
//   pour que le chronomètre reste exact même si l'horloge de l'appareil est fausse.
// - Robuste avant la migration 004 : les colonnes absentes prennent des valeurs neutres
//   (phase 2 fermée, 0 minute ajoutée, pas de repère de session).

export const dynamic = 'force-dynamic'

const SLUG_VALIDE = /^[a-z0-9-]{1,80}$/

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('slug') ?? ''
  if (!SLUG_VALIDE.test(slug)) {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !group || group.universe !== 'mission-horizon') {
    return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
  }

  const bonus = Number(group.m2_minutes_bonus)
  return NextResponse.json(
    {
      missionActive: group.active_mission as number,
      phase2Ouverte: group.m2_phase2_ouverte === true,
      minutesBonus: Number.isFinite(bonus) ? Math.min(Math.max(Math.trunc(bonus), 0), 60) : 0,
      session: typeof group.m2_session === 'string' ? group.m2_session : null,
      heureServeur: Date.now(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
