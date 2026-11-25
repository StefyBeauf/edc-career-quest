'use client'

import type { AnalyseEpreuveIA, BilanIA } from '@/app/api/mission/analyse/schema'
import { contexteUltimatum } from './contexteNarratif'
import type { EtatPartie } from './etatPartie'

// Appels à /api/mission/analyse depuis le navigateur. Seuls des identifiants (variantes) et les
// réponses de l'équipe sont envoyés ; aucune donnée identifiante (le nom d'agence n'est pas transmis).
// Renvoie null en cas d'erreur, de réponse invalide ou de délai dépassé : l'appelant affiche
// alors « Analyse en attente » (mode dégradé), sans jamais estimer de score.

const DELAI_NAVIGATEUR_MS = 17_000 // la route abandonne elle-même à 15 s

async function poster<T>(corps: unknown, cle: 'analyse' | 'bilan'): Promise<T | null> {
  const ctrl = new AbortController()
  const minuterie = setTimeout(() => ctrl.abort(), DELAI_NAVIGATEUR_MS)
  try {
    const res = await fetch('/api/mission/analyse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corps),
      signal: ctrl.signal,
    })
    const json = await res.json() as { statut?: string } & Record<string, unknown>
    return res.ok && json.statut === 'ok' && json[cle] ? json[cle] as T : null
  } catch {
    return null
  } finally {
    clearTimeout(minuterie)
  }
}

export function demanderAnalyse(e: EtatPartie, n: number): Promise<AnalyseEpreuveIA | null> {
  const resumesPrecedents: Record<string, string> = {}
  for (let i = 1; i < n; i++) if (e.decisionsResume[i]) resumesPrecedents[String(i)] = e.decisionsResume[i]!
  const ctx = contexteUltimatum(e)
  return poster<AnalyseEpreuveIA>({
    type: 'epreuve',
    numero: n,
    reponses: e.reponses[n] ?? {},
    variantes: e.variantes,
    resumesPrecedents,
    contexte: { decisionPartenariat: ctx.decisionPartenariat, concept: ctx.concept, canaux: ctx.canaux },
  }, 'analyse')
}

export function demanderBilan(e: EtatPartie): Promise<BilanIA | null> {
  const epreuves = [1, 2, 3, 4, 5, 6].map(n => {
    const a = e.analyses[n]
    return typeof a === 'object'
      ? { resume: a.resume_decision, point_fort: a.point_fort, point_vigilance: a.point_vigilance }
      : { resume: '', point_fort: '', point_vigilance: '' }
  })
  return poster<BilanIA>({ type: 'bilan', epreuves, scores: e.scores }, 'bilan')
}
