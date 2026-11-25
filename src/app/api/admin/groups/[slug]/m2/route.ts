import { NextRequest, NextResponse } from 'next/server'
import { createHash, randomUUID, timingSafeEqual } from 'crypto'
import { createAdminClient } from '@/lib/supabase/server'
import { specialisationB3 } from '@/lib/content/univers3'

// Pilotage de la Mission 2 B3 Marketing Digital par l'intervenante (CLAUDE.md, section 15, option A).
// Écrit UNIQUEMENT les 3 colonnes de pilotage du groupe (migration 004) : aucun contenu d'équipe.
//   ouvrir-phase2 / refermer-phase2 : verrou de la phase 2 (toutes les équipes du groupe).
//   ajouter-temps                   : +N minutes sur l'épreuve en cours de chaque équipe (cumul 0-60).
//   fermer-mission                  : remet le pilotage à zéro et change le repère de session ;
//                                     chaque navigateur efface alors sa partie locale (purge).
//
// Sécurité : contrairement aux autres routes /api/admin (non couvertes par proxy.ts, anomalie
// préexistante signalée), celle-ci vérifie que le cookie admin_session correspond bien à un
// compte de la table admin_users (même calcul que /api/admin/auth).

const MINUTES_AUTORISEES = [1, 2, 5, 10]
const BONUS_MAX = 60

function jeton(email: string): string {
  const secret = process.env.ADMIN_SECRET ?? 'change-me-in-production'
  return createHash('sha256').update(`${email}:${secret}`).digest('hex')
}

async function sessionAdminValide(req: NextRequest, supabase: Awaited<ReturnType<typeof createAdminClient>>): Promise<boolean> {
  const cookie = req.cookies.get('admin_session')?.value
  if (!cookie || !/^[a-f0-9]{64}$/.test(cookie)) return false
  const { data } = await supabase.from('admin_users').select('email')
  const attendu = Buffer.from(cookie)
  return (data ?? []).some(({ email }: { email: string }) => {
    const b = Buffer.from(jeton(email))
    return b.length === attendu.length && timingSafeEqual(b, attendu)
  })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const supabase = await createAdminClient()

    if (!(await sessionAdminValide(req, supabase))) {
      return NextResponse.json({ error: 'Session expirée : reconnectez-vous à l’admin.' }, { status: 401 })
    }

    const corps = await req.json().catch(() => null) as { action?: string; minutes?: number } | null
    const action = corps?.action

    const { data: group, error } = await supabase.from('groups').select('*').eq('slug', slug).single()
    if (error || !group) return NextResponse.json({ error: 'Groupe introuvable' }, { status: 404 })
    if (group.universe !== 'mission-horizon' || specialisationB3(group.specialization).id !== 'marketing-digital') {
      return NextResponse.json({ error: 'Réservé aux groupes B3 Marketing Digital' }, { status: 400 })
    }
    if (!('m2_phase2_ouverte' in group)) {
      return NextResponse.json({ error: 'Migration 004 non exécutée dans Supabase : pilotage M2 indisponible.' }, { status: 409 })
    }

    let maj: Record<string, unknown>
    if (action === 'ouvrir-phase2') maj = { m2_phase2_ouverte: true }
    else if (action === 'refermer-phase2') maj = { m2_phase2_ouverte: false }
    else if (action === 'ajouter-temps') {
      const minutes = Number(corps?.minutes)
      if (!MINUTES_AUTORISEES.includes(minutes)) return NextResponse.json({ error: 'Durée non autorisée' }, { status: 400 })
      const actuel = Number(group.m2_minutes_bonus) || 0
      if (actuel + minutes > BONUS_MAX) return NextResponse.json({ error: `Plafond de ${BONUS_MAX} minutes ajoutées atteint.` }, { status: 400 })
      maj = { m2_minutes_bonus: actuel + minutes }
    } else if (action === 'fermer-mission') {
      maj = { m2_phase2_ouverte: false, m2_minutes_bonus: 0, m2_session: randomUUID() }
    } else {
      return NextResponse.json({ error: 'Action inconnue' }, { status: 400 })
    }

    const { data: apres, error: errMaj } = await supabase
      .from('groups')
      .update(maj)
      .eq('slug', slug)
      .select('m2_phase2_ouverte, m2_minutes_bonus, m2_session')
      .single()
    if (errMaj || !apres) throw errMaj

    return NextResponse.json({
      success: true,
      phase2Ouverte: apres.m2_phase2_ouverte === true,
      minutesBonus: Number(apres.m2_minutes_bonus) || 0,
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
