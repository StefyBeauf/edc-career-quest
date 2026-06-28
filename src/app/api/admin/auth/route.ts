import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createAdminClient } from '@/lib/supabase/server'

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

function signToken(email: string): string {
  const secret = process.env.ADMIN_SECRET ?? 'change-me-in-production'
  const payload = `${email}:${secret}`
  return createHash('sha256').update(payload).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string }
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('id, email, password_hash')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (error || !adminUser) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
    }

    const passwordHash = hashPassword(password)
    if (adminUser.password_hash !== passwordHash) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
    }

    const token = signToken(email)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
