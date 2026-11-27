'use client'

import {
  DERNIERE_EPREUVE_PHASE_1, DUREE_VIE_PARTIE_MS, NB_EPREUVES, NUMEROS_EPREUVES, profilsCreateurs, variantesCrise,
} from '@/lib/content/univers3-marketing-m2'
import { maintenant } from './usePilotage'

// ─── État de partie de la M2 (CLAUDE.md, sections 3.2 et 7) ─────────────────
// Persistance : localStorage UNIQUEMENT (exception validée pour la M2 : la reprise doit
// survivre à la fermeture de l'onglet). Rien n'est jamais envoyé en base.
//   Clé d'une partie : b3-marketing-digital-m2:<slug>:<partieId>
//   Pointeur        : b3-marketing-digital-m2:<slug>:courante  → partieId en cours
// Purge automatique : 24 h après la création, ou quand l'intervenante ferme la mission
// (le repère de session du groupe change). Reprise possible sur le même navigateur seulement.
// Version 3 (refonte à 4 épreuves) : un état d'une autre version (v2 à 6 épreuves, enregistré
// avec `version: 1`) n'est JAMAIS interprété : il est effacé et l'équipe relance sa partie.

export type IndicateurId = 'pertinence' | 'confiance' | 'cohesion' | 'credibilite'
export type Scores = Record<IndicateurId, number>

/** Retour d'Alex Morgan après une épreuve (sortie IA validée par le serveur). */
export interface Analyse {
  variations: Scores
  reaction_ceo: string
  consequence: string
  resume_decision: string
  informations_manquantes: string[]
}

/** Dernier message du CEO (le statut du contrat, lui, est calculé par le code). */
export interface VerdictCeo {
  message_final_ceo: string
  verdict_narratif: string
}

/** 1 à 4 = épreuves ; 'pause' entre les phases ; 'verdict' puis 'retour' (centre de contrôle). */
export type Etape = 1 | 2 | 3 | 4 | 'pause' | 'verdict' | 'retour'

export const VERSION_ETAT = 3

export interface EtatPartie {
  version: typeof VERSION_ETAT
  partieId: string
  agence: string
  creeLe: number
  /** Repère de session du groupe au moment de la création (null avant la migration 004). */
  session: string | null
  /** Vrai si le pilotage était injoignable à la création : le repère sera adopté plus tard, sans purge. */
  sessionInconnue?: boolean
  etape: Etape
  /** Heure de début de chaque épreuve (heure corrigée) : base du chronomètre. */
  debutsEpreuves: Partial<Record<number, number>>
  /** Minutes ajoutées par l'intervenante au début de chaque épreuve (seul l'ajout ultérieur compte). */
  bonusAuDebut: Partial<Record<number, number>>
  reponses: Partial<Record<number, Record<string, string>>>
  soumisLe: Partial<Record<number, number>>
  /** Vrai si l'épreuve a été envoyée automatiquement à l'expiration du temps. */
  soumisAuto?: Partial<Record<number, boolean>>
  /** Alertes du chronomètre déjà affichées (minutes restantes), pour ne pas les répéter au rechargement. */
  alertesVues?: Partial<Record<number, number[]>>
  /** Rebondissements déjà déclenchés par épreuve ('R1'…'R4', 'ultimatum') : jamais deux fois. */
  alertesDeclenchees: Partial<Record<number, string[]>>
  /** Dernier cumul de minutes ajoutées connu : sert si le pilotage est injoignable après un rechargement. */
  dernierBonus?: number
  decisionsResume: Partial<Record<number, string>>
  /** Tirages aléatoires, faits une seule fois puis mémorisés (créateur : épreuve 2 ; crise : épreuve 3). */
  variantes: { createur?: string; crise?: string }
  /** L'agence part du maximum : 25 points par indicateur. */
  scores: Scores
  analyses: Partial<Record<number, Analyse | 'en-attente'>>
  /** Nombre d'appels d'analyse lancés par épreuve (1 automatique + relances limitées). */
  tentativesAnalyse?: Partial<Record<number, number>>
  /** Dernier message du CEO (ou « en attente »), avec les épreuves analysées qu'il prend en compte. */
  verdict?: VerdictCeo | 'en-attente'
  verdictEpreuves?: number[]
  tentativesVerdict?: number
  termine: boolean
}

export const SCORES_DEPART: Scores = { pertinence: 25, confiance: 25, cohesion: 25, credibilite: 25 }

const PREFIXE = 'b3-marketing-digital-m2'
const prefixeGroupe = (slug: string) => `${PREFIXE}:${slug}:`
const clePointeur = (slug: string) => `${prefixeGroupe(slug)}courante`
export const clePartie = (slug: string, partieId: string) => `${prefixeGroupe(slug)}${partieId}`

// Code lisible à l'écran : sans 0/O ni 1/I/L pour éviter les confusions.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
function genererPartieId(): string {
  const octets = new Uint8Array(6)
  crypto.getRandomValues(octets)
  return Array.from(octets, o => ALPHABET[o % ALPHABET.length]).join('')
}

export const formaterCode = (partieId: string) => `${partieId.slice(0, 3)}-${partieId.slice(3)}`

function estEtatValide(e: unknown): e is EtatPartie {
  if (!e || typeof e !== 'object') return false
  const x = e as Partial<EtatPartie>
  return x.version === VERSION_ETAT
    && typeof x.partieId === 'string' && /^[A-Z0-9]{6}$/.test(x.partieId)
    && typeof x.agence === 'string'
    && typeof x.creeLe === 'number'
    && x.etape !== undefined
    && typeof x.scores === 'object' && x.scores !== null
}

// Tous les accès au stockage sont protégés : en navigation privée stricte ou stockage plein,
// la partie reste jouable, simplement sans reprise.
function lire(cle: string): EtatPartie | null {
  try {
    const brut = window.localStorage.getItem(cle)
    if (!brut) return null
    const e: unknown = JSON.parse(brut)
    return estEtatValide(e) ? e : null
  } catch {
    return null
  }
}

export function ecrirePartie(slug: string, etat: EtatPartie) {
  try {
    window.localStorage.setItem(clePartie(slug, etat.partieId), JSON.stringify(etat))
    window.localStorage.setItem(clePointeur(slug), etat.partieId)
  } catch {
    // stockage indisponible : on continue sans reprise
  }
}

/** Vrai si la valeur stockée est une partie d'une AUTRE version (ex. v2 à 6 épreuves). */
function estAncienneVersion(cle: string): boolean {
  try {
    const brut = window.localStorage.getItem(cle)
    const e: unknown = brut ? JSON.parse(brut) : null
    return !!e && typeof e === 'object' && (e as { version?: unknown }).version !== VERSION_ETAT
  } catch {
    return false
  }
}

/** Relit une partie stockée (synchronisation entre onglets) ; null si absente ou invalide. */
export function relirePartie(slug: string, partieId: string): EtatPartie | null {
  return lire(clePartie(slug, partieId))
}

/**
 * Purge des parties de ce groupe sur ce navigateur.
 * @param sessionCourante repère lu dans le pilotage ; `undefined` si le serveur n'a pas répondu
 *        (dans ce cas, seule la règle des 24 h s'applique, pour ne jamais effacer par erreur).
 * @returns vrai si une partie d'une ancienne version a été effacée (message neutre à afficher).
 */
export function purgerParties(slug: string, sessionCourante: string | null | undefined): boolean {
  let ancienneVersion = false
  try {
    const prefixe = prefixeGroupe(slug)
    const pointeur = clePointeur(slug)
    const aSupprimer: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const cle = window.localStorage.key(i)
      if (!cle || !cle.startsWith(prefixe) || cle === pointeur) continue
      const e = lire(cle)
      if (!e && estAncienneVersion(cle)) ancienneVersion = true
      const perimee = !e
        || maintenant() - e.creeLe > DUREE_VIE_PARTIE_MS
        || (sessionCourante !== undefined && !e.sessionInconnue && e.session !== sessionCourante)
      if (perimee) aSupprimer.push(cle)
    }
    aSupprimer.forEach(cle => window.localStorage.removeItem(cle))
    const id = window.localStorage.getItem(pointeur)
    if (id && !window.localStorage.getItem(clePartie(slug, id))) window.localStorage.removeItem(pointeur)
  } catch {
    // stockage indisponible : rien à purger
  }
  return ancienneVersion
}

/** Partie en cours de ce groupe sur ce navigateur (après purge), ou null. */
export function lirePartieCourante(slug: string): EtatPartie | null {
  try {
    const id = window.localStorage.getItem(clePointeur(slug))
    return id ? lire(clePartie(slug, id)) : null
  } catch {
    return null
  }
}

/** @param session repère de session du groupe, ou `undefined` si le pilotage est injoignable. */
export function nouvellePartie(agence: string, session: string | null | undefined, minutesBonus: number): EtatPartie {
  const debut = maintenant()
  return {
    version: VERSION_ETAT,
    partieId: genererPartieId(),
    agence,
    creeLe: debut,
    session: session ?? null,
    sessionInconnue: session === undefined,
    // « Entrer en mission » lance directement l'épreuve 1 et son chronomètre.
    etape: 1,
    debutsEpreuves: { 1: debut },
    bonusAuDebut: { 1: minutesBonus },
    reponses: {},
    soumisLe: {},
    alertesDeclenchees: {},
    decisionsResume: {},
    variantes: {},
    scores: { ...SCORES_DEPART },
    analyses: {},
    termine: false,
  }
}

// ─── Transitions de la partie ───────────────────────────────────────────────
// Fonctions pures, appelées via mettreAJour(). Chacune est idempotente : un double clic,
// un rechargement ou une expiration simultanée ne peut ni soumettre deux fois ni sauter une épreuve.

/** Soumission d'une épreuve (validation anticipée ou expiration). Les réponses sont conservées telles quelles. */
export function soumettreEpreuve(e: EtatPartie, n: number, auto: boolean): EtatPartie {
  if (e.etape !== n || e.soumisLe[n] !== undefined) return e
  return {
    ...e,
    soumisLe: { ...e.soumisLe, [n]: maintenant() },
    soumisAuto: { ...e.soumisAuto, [n]: auto },
  }
}

/**
 * Après le retour du CEO sur une épreuve soumise : épreuve suivante, pause ou verdict.
 * L'équipe avance uniquement dans sa phase : après l'épreuve 2, elle attend à la pause.
 * Le temps non utilisé n'est jamais reporté sur l'épreuve suivante.
 */
export function passerALaSuite(e: EtatPartie, minutesBonus: number): EtatPartie {
  const n = e.etape
  if (typeof n !== 'number' || e.soumisLe[n] === undefined) return e
  if (n === DERNIERE_EPREUVE_PHASE_1) return { ...e, etape: 'pause' }
  if (n === NB_EPREUVES) return { ...e, etape: 'verdict', termine: true }
  return demarrerEpreuve(e, n + 1, minutesBonus)
}

/** Début de la phase 2, seulement depuis la pause (le verrou est vérifié par l'appelant). */
export function demarrerPhase2(e: EtatPartie, minutesBonus: number): EtatPartie {
  return e.etape === 'pause' ? demarrerEpreuve(e, DERNIERE_EPREUVE_PHASE_1 + 1, minutesBonus) : e
}

/** Verdict → écran de retour au centre de contrôle (et inversement pour revoir le verdict). */
export function allerAuRetour(e: EtatPartie): EtatPartie {
  return e.etape === 'verdict' ? { ...e, etape: 'retour' } : e
}
export function revenirAuVerdict(e: EtatPartie): EtatPartie {
  return e.etape === 'retour' ? { ...e, etape: 'verdict' } : e
}

// ─── Rebondissements ─────────────────────────────────────────────────────────
// Un rebondissement est marqué « déclenché » dès son premier affichage. L'état de partie est
// sauvegardé aussitôt : un rafraîchissement ou une reprise ne le redéclenche jamais.
export const alertesRecues = (e: EtatPartie, n: number) => e.alertesDeclenchees?.[n] ?? []

export function marquerRebondissements(e: EtatPartie, n: number, ids: string[]): EtatPartie {
  const deja = alertesRecues(e, n)
  const nouveaux = ids.filter(id => !deja.includes(id))
  if (nouveaux.length === 0) return e
  return { ...e, alertesDeclenchees: { ...e.alertesDeclenchees, [n]: [...deja, ...nouveaux] } }
}

// Tirage aléatoire (Math.random, côté client) fait UNE SEULE FOIS, au premier démarrage de
// l'épreuve concernée, puis mémorisé dans l'état de partie : un rechargement ne retire jamais.
function tirer<T extends { id: string }>(liste: T[]): string {
  return liste[Math.floor(Math.random() * liste.length)].id
}

function avecTirages(e: EtatPartie, n: number): EtatPartie['variantes'] {
  const variantes = { ...e.variantes }
  if (n >= 2 && !variantes.createur) variantes.createur = tirer(profilsCreateurs)
  if (n >= 3 && !variantes.crise) variantes.crise = tirer(variantesCrise)
  return variantes
}

/** Filet de sécurité : complète un tirage manquant pour l'épreuve en cours (sans jamais retirer). */
export function assurerTirages(e: EtatPartie): EtatPartie {
  if (typeof e.etape !== 'number' || e.etape < 2) return e
  const manque = !e.variantes.createur || (e.etape >= 3 && !e.variantes.crise)
  return manque ? { ...e, variantes: avecTirages(e, e.etape) } : e
}

function demarrerEpreuve(e: EtatPartie, n: number, minutesBonus: number): EtatPartie {
  return {
    ...e,
    variantes: avecTirages(e, n),
    etape: n as Etape,
    debutsEpreuves: { ...e.debutsEpreuves, [n]: e.debutsEpreuves[n] ?? maintenant() },
    bonusAuDebut: { ...e.bonusAuDebut, [n]: e.bonusAuDebut[n] ?? minutesBonus },
  }
}

export function marquerAlerte(e: EtatPartie, n: number, minutes: number): EtatPartie {
  const vues = e.alertesVues?.[n] ?? []
  if (vues.includes(minutes)) return e
  return { ...e, alertesVues: { ...e.alertesVues, [n]: [...vues, minutes] } }
}

/** Saisie d'une réponse : refusée si l'épreuve n'est pas en cours ou déjà soumise (décision définitive). */
export function modifierReponse(e: EtatPartie, n: number, champId: string, valeur: string): EtatPartie {
  if (e.etape !== n || e.soumisLe[n] !== undefined) return e
  return { ...e, reponses: { ...e.reponses, [n]: { ...e.reponses[n], [champId]: valeur } } }
}

// ─── Analyse IA : attribution unique des points (idempotence côté client) ──────
// La route /api/mission/analyse est sans état : c'est l'état de partie qui garantit qu'une
// épreuve n'est scorée qu'une fois. Une analyse appliquée est mémorisée avec le numéro de
// l'épreuve ; toute réponse tardive ou en double (rafraîchissement, double clic, relance)
// est ignorée. Les indicateurs restent bornés entre 0 et 25.

/** 1 analyse automatique + 3 relances au maximum par épreuve (maîtrise des coûts). */
export const MAX_TENTATIVES_ANALYSE = 4

export const analyseAppliquee = (e: EtatPartie, n: number) => typeof e.analyses[n] === 'object'

export function peutLancerAnalyse(e: EtatPartie, n: number): boolean {
  return e.soumisLe[n] !== undefined && !analyseAppliquee(e, n) && (e.tentativesAnalyse?.[n] ?? 0) < MAX_TENTATIVES_ANALYSE
}

export function compterTentative(e: EtatPartie, n: number): EtatPartie {
  return { ...e, tentativesAnalyse: { ...e.tentativesAnalyse, [n]: (e.tentativesAnalyse?.[n] ?? 0) + 1 } }
}

const borner = (v: number) => Math.min(25, Math.max(0, v))

export function appliquerAnalyse(e: EtatPartie, n: number, a: Analyse): EtatPartie {
  if (analyseAppliquee(e, n)) return e // déjà comptée : jamais deux fois
  return {
    ...e,
    scores: {
      pertinence: borner(e.scores.pertinence + a.variations.pertinence),
      confiance: borner(e.scores.confiance + a.variations.confiance),
      cohesion: borner(e.scores.cohesion + a.variations.cohesion),
      credibilite: borner(e.scores.credibilite + a.variations.credibilite),
    },
    analyses: { ...e.analyses, [n]: a },
    decisionsResume: { ...e.decisionsResume, [n]: a.resume_decision },
  }
}

/** Échec de l'analyse : réponses conservées, AUCUN score estimé. */
export function marquerAnalyseEnAttente(e: EtatPartie, n: number): EtatPartie {
  if (analyseAppliquee(e, n)) return e
  return { ...e, analyses: { ...e.analyses, [n]: 'en-attente' } }
}

// ─── Verdict final (1 appel IA, relances limitées) ──────────────────────────
// L'IA rédige seulement le dernier message du CEO ; le statut du contrat est calculé par le code.
/** 1 message automatique + 2 relances / mises à jour au maximum. */
export const MAX_TENTATIVES_VERDICT = 3

/** Épreuves dont l'analyse est appliquée (base du message final). */
export const epreuvesAnalysees = (e: EtatPartie) => NUMEROS_EPREUVES.filter(n => analyseAppliquee(e, n))

/** Le message est à jour : rédigé après la dernière analyse arrivée. */
export function verdictAJour(e: EtatPartie): boolean {
  if (typeof e.verdict !== 'object') return false
  const base = e.verdictEpreuves ?? []
  return epreuvesAnalysees(e).every(n => base.includes(n))
}

export function compterTentativeVerdict(e: EtatPartie): EtatPartie {
  return { ...e, tentativesVerdict: (e.tentativesVerdict ?? 0) + 1 }
}

export function appliquerVerdict(e: EtatPartie, v: VerdictCeo, epreuves: number[]): EtatPartie {
  return { ...e, verdict: v, verdictEpreuves: epreuves }
}

/** Échec : on garde un message précédent s'il existe, sinon « en attente ». */
export function marquerVerdictEnAttente(e: EtatPartie): EtatPartie {
  return typeof e.verdict === 'object' ? e : { ...e, verdict: 'en-attente' }
}

/** Total sur 100. */
export const totalScores = (s: Scores) => s.pertinence + s.confiance + s.cohesion + s.credibilite
