'use client'

import { NB_EPREUVES } from '@/lib/content/univers3-marketing-m2'
import type { AnalyseEpreuveIA, VerdictIA } from '@/app/api/mission/analyse/schema'
import { decisionPartenariat } from './contexteNarratif'
import { alertesRecues, type EtatPartie } from './etatPartie'

// Appels à /api/mission/analyse depuis le navigateur. Seuls des identifiants (variantes,
// rebondissements reçus), les scores, la mémoire du client (résumés produits par l'IA) et les
// réponses de l'équipe sont envoyés ; aucune donnée identifiante (le nom d'agence n'est pas transmis).
// Renvoie null en cas d'erreur, de réponse invalide ou de délai dépassé : l'appelant affiche
// alors « Analyse en attente » (mode dégradé), sans jamais estimer de score.

const DELAI_NAVIGATEUR_MS = 17_000 // la route abandonne elle-même à 15 s

async function poster<T>(corps: unknown, cle: 'analyse' | 'verdict'): Promise<T | null> {
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

/** Mémoire du client : décision résumée et réaction du CEO pour les épreuves avant `jusqua`. */
function historique(e: EtatPartie, jusqua: number): Record<string, { resume: string; reaction: string }> {
  const h: Record<string, { resume: string; reaction: string }> = {}
  for (let i = 1; i < jusqua; i++) {
    const a = e.analyses[i]
    h[String(i)] = typeof a === 'object' ? { resume: a.resume_decision, reaction: a.reaction_ceo } : { resume: '', reaction: '' }
  }
  return h
}

/**
 * Scores AVANT l'épreuve n : ceux de la partie, sans les analyses des épreuves suivantes
 * (cas d'une relance tardive). Les variations des épreuves ≥ n déjà appliquées sont retirées
 * pour donner au CEO le bon palier de confiance (approximation : bornage 0-25 ignoré).
 */
function scoresAvant(e: EtatPartie, n: number) {
  const s = { ...e.scores }
  for (let i = n; i <= NB_EPREUVES; i++) {
    const a = e.analyses[i]
    if (typeof a !== 'object') continue
    for (const k of Object.keys(s) as (keyof typeof s)[]) s[k] = Math.min(25, Math.max(0, s[k] - a.variations[k]))
  }
  return s
}

export function demanderAnalyse(e: EtatPartie, n: number): Promise<AnalyseEpreuveIA | null> {
  return poster<AnalyseEpreuveIA>({
    type: 'epreuve',
    numero: n,
    reponses: e.reponses[n] ?? {},
    rebondissements: alertesRecues(e, n),
    variantes: e.variantes,
    historique: historique(e, n),
    scores: scoresAvant(e, n),
    contexte: { decisionPartenariat: decisionPartenariat(e) },
  }, 'analyse')
}

export function demanderVerdict(e: EtatPartie): Promise<VerdictIA | null> {
  return poster<VerdictIA>({ type: 'verdict', historique: historique(e, NB_EPREUVES + 1), scores: e.scores }, 'verdict')
}
