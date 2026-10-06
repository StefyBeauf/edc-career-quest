'use client'

import { useEffect, useRef, useState } from 'react'
import {
  mission1SignatureDigitale as M, profilDominantDigital, evaluerFormulationDigital, coachPitchHeuristique,
  dureePitchSecondes, compterMots, melanger,
  type ProfilDigitalId, type VerdictDigital, type ActionCoach, type ReponseCoach, type FeedbackMission, type AmorcePitch,
} from '@/lib/content/univers3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import MissionHeader from './shared/MissionHeader'

// B3 Marketing Digital — Mission 1 « Trouver sa signature digitale ».
// Structure calquée sur Mission1SeVendre.tsx (parcours Négociation), sans le modifier.

type AxeCle = (typeof M.axeChamps)[number]['cle']
type EtapeCoach = 'profil' | 'formulation' | 'pitch'
type RetourCoach = ReponseCoach & { action: ActionCoach }

interface Etat {
  etape: number // 0 = accueil, 1 à 6 = étapes
  ficheAtteinte: boolean
  // Étape 1
  quizCommence: boolean
  ordreReponses: number[][] // ordre d'affichage des 4 réponses, tiré au sort par question
  reponses: number[] // index (d'origine) de la réponse choisie, question par question
  // Étape 2
  profilId: ProfilDigitalId | null
  coachProfil: ReponseCoach | null
  nuanceOuverte: boolean
  nuance: string[]
  // Étape 3
  tirages: number[] // index de phrase vague par manche, sans doublon
  retirages: boolean[] // 1 re-tirage possible par manche
  formulations: string[]
  verdicts: (VerdictDigital | null)[]
  pistes: (string | null)[] // piste du coach IA ; null = message de référence (repli)
  manche: number
  // Étape 4
  pitch: Record<string, string>
  pitchConstruit: boolean
  coachPitch: RetourCoach | null
  // Étape 5
  cartesRecues: string[]
  carteRetenue: string | null
  // Étape 6
  axe: string | null
  axeChamps: Record<AxeCle, string>
  axeValide: boolean
  ficheValidee: boolean
  // Nombre d'appels au coach IA par étape (limite : M.limiteAppelsCoach)
  appels: Record<EtapeCoach, number>
}

// Tirages aléatoires faits côté client, au montage, pour éviter un écart de rendu serveur/client.
function etatInitial(): Etat {
  return {
    etape: 0,
    ficheAtteinte: false,
    quizCommence: false,
    ordreReponses: M.questions.map(q => melanger(q.reponses.map((_, i) => i))),
    reponses: [],
    profilId: null,
    coachProfil: null,
    nuanceOuverte: false,
    nuance: M.nuanceChamps.map(() => ''),
    tirages: melanger(M.phrasesVagues.map((_, i) => i)).slice(0, 3),
    retirages: [false, false, false],
    formulations: ['', '', ''],
    verdicts: [null, null, null],
    pistes: [null, null, null],
    manche: 0,
    pitch: Object.fromEntries(M.amorcesPitch.map(a => [a.id, a.id === 'presentation' ? a.amorce : ''])),
    pitchConstruit: false,
    coachPitch: null,
    cartesRecues: [],
    carteRetenue: null,
    axe: null,
    axeChamps: { progresser: '', pourquoi: '', action: '' },
    axeValide: false,
    ficheValidee: false,
    appels: { profil: 0, formulation: 0, pitch: 0 },
  }
}

// Persistance : sessionStorage uniquement (effacé à la fermeture de l'onglet), jamais de serveur.
// Chaque accès est protégé : si le stockage est indisponible, la mission fonctionne sans reprise.
function lireEtat(cle: string): Etat | null {
  try {
    const brut = window.sessionStorage.getItem(cle)
    if (!brut) return null
    const e = JSON.parse(brut) as Etat
    if (typeof e.etape !== 'number' || e.tirages?.length !== 3 || e.ordreReponses?.length !== M.questions.length || !Array.isArray(e.reponses)) return null
    return e
  } catch {
    return null
  }
}

function ecrireEtat(cle: string, etat: Etat) {
  try {
    window.sessionStorage.setItem(cle, JSON.stringify(etat))
  } catch {
    // stockage indisponible (navigation privée) : on continue sans reprise
  }
}

// Appel au coach IA, via la route serveur uniquement. Renvoie null en cas d'erreur, de réponse
// invalide ou de délai dépassé (8 s) : l'appelant affiche alors le repli heuristique.
const DELAI_COACH_MS = 8000
async function appelerCoach(corps: Record<string, unknown>): Promise<ReponseCoach | null> {
  const controleur = new AbortController()
  const minuterie = setTimeout(() => controleur.abort(), DELAI_COACH_MS)
  try {
    const res = await fetch('/api/mission/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corps),
      signal: controleur.signal,
    })
    if (!res.ok) return null
    const d = await res.json() as ReponseCoach
    return typeof d.message === 'string' && d.message.trim() ? d : null
  } catch {
    return null
  } finally {
    clearTimeout(minuterie)
  }
}

function avecPoint(t: string) {
  return /[.!?…]$/.test(t) ? t : `${t}.`
}

function phrasePitch(a: AmorcePitch, valeur: string) {
  const v = valeur.trim()
  if (!v) return ''
  if (a.id === 'presentation') return avecPoint(v)
  return avecPoint(`${a.amorce.replace(/…$/, '')} ${v}`)
}

function assemblerPitch(pitch: Record<string, string>) {
  return M.amorcesPitch.map(a => phrasePitch(a, pitch[a.id] ?? '')).filter(Boolean).join(' ')
}

const STYLE_PRIMAIRE = { background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }
const STYLE_SECONDAIRE = { background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }
const STYLE_CARTE = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }
const STYLE_CHAMP = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }
const COULEUR_FEEDBACK = { success: '#5aa37c', alert: '#f39c12', neutral: '#c9a84c' }
const COULEUR_DISCRET = 'rgba(200,220,255,0.6)'

function BoutonPrincipal({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl font-black uppercase tracking-wider text-sm transition-all"
      style={{ ...STYLE_PRIMAIRE, opacity: disabled ? 0.4 : 1 }}
    >
      {children}
    </button>
  )
}

function BoutonSecondaire({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
      style={{ ...STYLE_SECONDAIRE, opacity: disabled ? 0.35 : 1 }}
    >
      {children}
    </button>
  )
}

function Feedback({ fb }: { fb: FeedbackMission }) {
  const couleur = COULEUR_FEEDBACK[fb.type]
  return (
    <p className="rounded-xl px-4 py-3 text-sm font-semibold leading-snug" style={{ background: `${couleur}1f`, border: `1px solid ${couleur}66`, color: couleur }}>
      {fb.message}
    </p>
  )
}

// Retour du coach (IA ou repli) : verdict éventuel, message de 2 phrases maximum, question éventuelle.
function RetourDuCoach({ verdict, message, question }: { verdict?: VerdictDigital; message: string; question?: string }) {
  const type: FeedbackMission['type'] = verdict === 'clair' ? 'success' : verdict ? 'alert' : 'neutral'
  const couleur = COULEUR_FEEDBACK[type]
  return (
    <div role="status" className="rounded-xl px-4 py-3 space-y-1.5" style={{ background: `${couleur}1f`, border: `1px solid ${couleur}66` }}>
      {verdict && <p className="text-xs font-black uppercase tracking-widest" style={{ color: couleur }}>{M.verdictsLabels[verdict]}</p>}
      <p className="text-sm font-semibold leading-snug" style={{ color: couleur }}>{message}</p>
      {question && <p className="text-sm italic leading-snug" style={{ color: '#e8d080' }}>{question}</p>}
    </div>
  )
}

function Chargement({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="rounded-xl px-4 py-3 text-sm font-semibold animate-pulse" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}>
      {children}
    </p>
  )
}

function MicroTexte({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-snug" style={{ color: COULEUR_DISCRET }}>{children}</p>
}

function Champ({ label, value, onChange, rows = 2, champRef, maxLength = 400 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
  champRef?: React.Ref<HTMLTextAreaElement>; maxLength?: number
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.75)' }}>{label}</span>
      <textarea
        ref={champRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        className="w-full rounded-xl px-4 py-3 text-sm resize-none"
        style={STYLE_CHAMP}
      />
    </label>
  )
}

export default function Mission1SignatureDigitale({ total, slug }: { total: number; slug: string }) {
  const cle = `b3-marketing-digital-m1:${slug}`
  const [etat, setEtat] = useState<Etat | null>(null)

  // États d'interface non persistés
  const [chargement, setChargement] = useState<EtapeCoach | null>(null)
  const [exempleVisible, setExempleVisible] = useState(false)
  const [chronoOuvert, setChronoOuvert] = useState(false)
  const [secondes, setSecondes] = useState(45)
  const [chronoActif, setChronoActif] = useState(false)
  const [presentation, setPresentation] = useState(false)
  const [copie, setCopie] = useState<'ok' | 'erreur' | null>(null)
  const champFormulationRef = useRef<HTMLTextAreaElement>(null)

  /* eslint-disable react-hooks/set-state-in-effect -- initialisation unique au montage (sessionStorage + tirages aléatoires), nécessaire pour éviter un écart de rendu serveur/client */
  useEffect(() => {
    setEtat(lireEtat(cle) ?? etatInitial())
  }, [cle])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Écriture différée (~300 ms) à chaque changement d'étape ou saisie.
  useEffect(() => {
    if (!etat) return
    const t = setTimeout(() => ecrireEtat(cle, etat), 300)
    return () => clearTimeout(t)
  }, [etat, cle])

  // Chrono d'entraînement de 45 s : rien n'est enregistré.
  useEffect(() => {
    if (!chronoActif) return
    const t = setInterval(() => {
      setSecondes(s => {
        if (s <= 1) {
          setChronoActif(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [chronoActif])

  if (!etat) return null

  const maj = (partiel: Partial<Etat>) => setEtat(e => (e ? { ...e, ...partiel } : e))
  const allerA = (etape: number) => {
    maj({ etape, ...(etape === 6 ? { ficheAtteinte: true } : {}) })
    setExempleVisible(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const compterAppel = (etapeCoach: EtapeCoach) => setEtat(e => (e ? { ...e, appels: { ...e.appels, [etapeCoach]: e.appels[etapeCoach] + 1 } } : e))
  const coachDisponible = (etapeCoach: EtapeCoach) => etat.appels[etapeCoach] < M.limiteAppelsCoach

  const profil = M.profils.find(p => p.id === etat.profilId) ?? null
  const fiche = M.fichesProfils.find(f => f.profilId === etat.profilId) ?? null
  const pitchTexte = assemblerPitch(etat.pitch)
  const nbMots = compterMots(pitchTexte)
  const [motsMin, motsMax] = M.pitchMotsCible

  // ── Étape 1 : quiz, une question par écran ──
  const numeroQuestion = Math.min(etat.reponses.length, M.questions.length - 1)
  const quizTermine = etat.reponses.length === M.questions.length
  const questionCourante = M.questions[numeroQuestion]
  const repondre = (indexReponse: number) => maj({ reponses: [...etat.reponses, indexReponse] })

  // Fin du quiz : le profil est calculé ici (et mémorisé, car le départage final peut être un tirage),
  // puis le coach IA personnalise la fiche. Sans réponse de l'IA, la fiche statique reste affichée seule.
  const decouvrirProfil = async () => {
    const profilId = etat.profilId ?? profilDominantDigital(etat.reponses)
    maj({ profilId })
    allerA(2)
    if (etat.coachProfil || !coachDisponible('profil')) return
    setChargement('profil')
    compterAppel('profil')
    const retour = await appelerCoach({ action: 'profil', profilId, reponses: etat.reponses })
    setChargement(null)
    if (retour) maj({ coachProfil: { message: retour.message, question: retour.question } })
  }

  // ── Étape 3 ──
  const manche = etat.manche
  const phraseCourante = M.phrasesVagues[etat.tirages[manche]]
  const verdictCourant = etat.verdicts[manche]
  // L'exemple porte toujours sur une AUTRE phrase que celle tirée.
  const phrasesAvecExemple = M.phrasesVagues.filter(p => p.exemple && p.texte !== phraseCourante.texte)
  const exempleAutre = phrasesAvecExemple[manche % phrasesAvecExemple.length]

  const surManche = <T,>(liste: T[], valeur: T, index = manche) => liste.map((v, i) => (i === index ? valeur : v))

  // Re-tirage : uniquement parmi les phrases pas encore tirées (aucun doublon sur les 3 manches).
  const retirer = () => {
    const libres = M.phrasesVagues.map((_, i) => i).filter(i => !etat.tirages.includes(i))
    const nouveau = libres[Math.floor(Math.random() * libres.length)]
    maj({ tirages: surManche(etat.tirages, nouveau), retirages: surManche(etat.retirages, true) })
    setExempleVisible(false)
  }
  const majFormulation = (v: string) => maj({
    formulations: surManche(etat.formulations, v),
    verdicts: surManche(etat.verdicts, null),
    pistes: surManche(etat.pistes, null),
  })
  // Verdict : coach IA en priorité ; heuristique côté client en repli (erreur, délai, limite d'appels).
  const testerFormulation = async () => {
    const texte = etat.formulations[manche]
    const index = manche
    let retour: ReponseCoach | null = null
    if (coachDisponible('formulation')) {
      setChargement('formulation')
      compterAppel('formulation')
      retour = await appelerCoach({ action: 'formulation', phraseIndex: etat.tirages[index], texte })
      setChargement(null)
    }
    const verdict = retour?.verdict ?? evaluerFormulationDigital(texte)
    setEtat(e => (e ? {
      ...e,
      verdicts: e.verdicts.map((v, i) => (i === index ? verdict : v)),
      pistes: e.pistes.map((p, i) => (i === index ? (retour?.verdict ? retour.message : null) : p)),
    } : e))
  }
  const ameliorer = () => {
    maj({ verdicts: surManche(etat.verdicts, null), pistes: surManche(etat.pistes, null) })
    setTimeout(() => champFormulationRef.current?.focus(), 0)
  }

  // ── Étape 4 : les 4 boutons renvoient un diagnostic ou une question, jamais un pitch réécrit ──
  const coacherPitch = async (action: ActionCoach) => {
    let retour: ReponseCoach | null = null
    if (coachDisponible('pitch')) {
      setChargement('pitch')
      compterAppel('pitch')
      retour = await appelerCoach({ action, pitch: pitchTexte })
      setChargement(null)
    }
    const apport = phrasePitch(M.amorcesPitch.find(a => a.id === 'apport')!, etat.pitch.apport ?? '')
    maj({ coachPitch: { action, ...(retour ?? coachPitchHeuristique(action, pitchTexte, apport)) } })
  }
  const majPitch = (id: string, v: string) => maj({ pitch: { ...etat.pitch, [id]: v }, coachPitch: null })

  // ── Étape 5 ──
  const carte = (id: string | null) => M.cartesFeedback.find(c => c.id === id)
  const ajouterCarte = (id: string) => maj({ cartesRecues: [...etat.cartesRecues, id] })
  const retirerCarte = (position: number) => {
    const restantes = etat.cartesRecues.filter((_, i) => i !== position)
    maj({ cartesRecues: restantes, carteRetenue: etat.carteRetenue && restantes.includes(etat.carteRetenue) ? etat.carteRetenue : null })
  }
  const cartesDistinctes = M.cartesFeedback.filter(c => etat.cartesRecues.includes(c.id))
  const feedbackPret = etat.cartesRecues.length >= M.cartesMinimum && etat.carteRetenue !== null

  // ── Fiche : uniquement les saisies de l'étudiant (et le profil issu de ses réponses) ──
  const forces = etat.tirages.map((t, i) => ({ depart: M.phrasesVagues[t].texte, formulation: etat.formulations[i].trim() }))
  const carteRetenue = carte(etat.carteRetenue)
  const texteFiche = [
    M.ficheTitre,
    '',
    `1. ${M.ficheRubriques[0]}`,
    profil?.nom ?? '',
    ...etat.nuance.map(n => n.trim()).filter(Boolean),
    '',
    `2. ${M.ficheRubriques[1]}`,
    ...forces.map(f => `- ${f.formulation}`),
    '',
    `3. ${M.ficheRubriques[2]}`,
    etat.pitch.apport?.trim() ?? '',
    '',
    `4. ${M.ficheRubriques[3]}`,
    pitchTexte,
    '',
    `5. ${M.ficheRubriques[4]}`,
    etat.axe ?? '',
    ...M.axeChamps.map(c => `${c.label.replace(/…$/, '')} ${etat.axeChamps[c.cle].trim()}`),
    '',
    `6. ${M.ficheRubriques[5]}`,
    carteRetenue ? `${carteRetenue.label} — ${carteRetenue.signification}` : '',
  ].join('\n')

  const copier = () => {
    navigator.clipboard.writeText(texteFiche).then(() => setCopie('ok')).catch(() => setCopie('erreur'))
  }

  return (
    <div className="space-y-5">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #fiche-positionnement, #fiche-positionnement * { visibility: visible !important; color: #000 !important; background: #fff !important; border-color: #ccc !important; }
          #fiche-positionnement { position: absolute; left: 0; top: 0; width: 100%; padding: 24px; }
          #fiche-positionnement .no-print { display: none !important; }
        }
      `}</style>

      <MissionHeader n={1} total={total} titre={M.titre} objectif={M.promesse} />

      {etat.etape >= 1 && (
        <ExerciseStepper
          etape={etat.etape}
          steps={[
            { n: 1, label: 'Quiz', picto: '1' },
            { n: 2, label: 'Profil', picto: '2' },
            { n: 3, label: 'Apport', picto: '3' },
            { n: 4, label: 'Pitch', picto: '4' },
            { n: 5, label: 'Pairs', picto: '5' },
            { n: 6, label: 'Fiche', picto: '6' },
          ]}
        />
      )}

      {etat.ficheAtteinte && etat.axeValide && etat.etape >= 1 && etat.etape <= 5 && (
        <button onClick={() => allerA(6)} className="text-xs font-bold underline" style={{ color: '#c9a84c' }}>
          ← Revenir à ma fiche
        </button>
      )}

      {/* ═══ ACCUEIL ═══ */}
      {etat.etape === 0 && (
        <div className="space-y-4">
          <div className="rounded-2xl p-5 space-y-2" style={STYLE_CARTE}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'monospace' }}>
              Briefing · séance de {M.meta.duree.replace('h', ' h')}
            </p>
            <p className="text-sm text-white leading-relaxed">
              6 étapes pour passer de « je cherche une alternance en marketing digital » à « je sais expliquer quel profil je suis et ce que j&apos;apporte ».
            </p>
            <p className="text-xs" style={{ color: 'rgba(200,220,255,0.55)' }}>
              Diagnostic individuel → coaching → échange entre pairs → pitch devant ton intervenante.
            </p>
          </div>
          <BoutonPrincipal onClick={() => allerA(1)}>Lancer la mission →</BoutonPrincipal>
        </div>
      )}

      {/* ═══ ÉTAPE 1 — Quel profil digital suis-je ? ═══ */}
      {etat.etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader numero={1} titre="Quel profil digital suis-je ?" consigne="Une question par écran : choisis la réponse qui te ressemble le plus." mode="feedback" />

          {!etat.quizCommence && (
            <div className="space-y-4">
              <Feedback fb={{ type: 'neutral', message: M.microTextes.lancement }} />
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.8)' }}>{M.consigneQuiz}</p>
              <BoutonPrincipal onClick={() => maj({ quizCommence: true })}>Répondre au quiz</BoutonPrincipal>
            </div>
          )}

          {etat.quizCommence && !quizTermine && (
            <div className="space-y-3">
              <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.5)', fontFamily: 'monospace' }}>
                Question {numeroQuestion + 1} / {M.questions.length}
              </p>
              <p className="text-lg font-black text-white leading-snug">{questionCourante.question}</p>
              <div className="space-y-2">
                {etat.ordreReponses[numeroQuestion].map(i => (
                  <button
                    key={i}
                    onClick={() => repondre(i)}
                    className="w-full rounded-xl p-3.5 text-left text-sm font-semibold text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    {questionCourante.reponses[i].texte}
                  </button>
                ))}
              </div>
              {etat.reponses.length > 0 && (
                <button onClick={() => maj({ reponses: etat.reponses.slice(0, -1) })} className="text-xs underline" style={{ color: 'rgba(200,220,255,0.5)' }}>
                  ← Question précédente
                </button>
              )}
            </div>
          )}

          {quizTermine && (
            <div className="space-y-3">
              <Feedback fb={{ type: 'success', message: `Quiz terminé : ${M.questions.length} réponses enregistrées.` }} />
              <BoutonPrincipal onClick={decouvrirProfil}>Découvrir mon profil</BoutonPrincipal>
              {!etat.profilId && (
                <button onClick={() => maj({ reponses: etat.reponses.slice(0, -1) })} className="text-xs underline" style={{ color: 'rgba(200,220,255,0.5)' }}>
                  ← Modifier ma dernière réponse
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 2 — Mon profil digital ═══ */}
      {etat.etape === 2 && profil && fiche && (
        <div className="space-y-4">
          <ExerciseHeader numero={2} titre="Mon profil digital" consigne="Lis ta fiche, puis nuance-la : un profil n'est pas une étiquette." mode="feedback" />

          <div className="rounded-2xl p-5 space-y-3" style={STYLE_CARTE}>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>Ton profil dominant est</p>
              <p className="text-2xl font-black" style={{ color: '#c9a84c' }}>{profil.nom}</p>
            </div>
            {[
              { titre: 'Traduction professionnelle', texte: fiche.traduction },
              { titre: 'Tes forces possibles', texte: `${fiche.forces.join(', ')}.` },
              { titre: 'Point de vigilance', texte: fiche.vigilance },
              { titre: 'Phrase à retravailler', texte: `« ${fiche.phrase} »` },
              { titre: 'Question de réflexion', texte: etat.coachProfil?.question ?? fiche.questionReflexion },
            ].map(l => (
              <div key={l.titre} className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.8)' }}>{l.titre}</p>
                <p className="text-sm text-white leading-relaxed">{l.texte}</p>
              </div>
            ))}
          </div>

          {chargement === 'profil' && <Chargement>Ton coach personnalise ta fiche…</Chargement>}
          {etat.coachProfil && (
            <div className="rounded-xl px-4 py-3 space-y-1" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>Ce que tes réponses ajoutent</p>
              <p className="text-sm leading-snug" style={{ color: '#f5ecd0' }}>{etat.coachProfil.message}</p>
            </div>
          )}

          {!etat.nuanceOuverte ? (
            <BoutonPrincipal onClick={() => maj({ nuanceOuverte: true })}>Je nuance mon profil</BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              {M.nuanceChamps.map((label, i) => (
                <Champ key={label} label={label} value={etat.nuance[i]} onChange={v => maj({ nuance: etat.nuance.map((n, j) => (j === i ? v : n)) })} />
              ))}
              <MicroTexte>{M.rappelConfidentialite}</MicroTexte>
              <MicroTexte>{M.microTextes.apresProfil}</MicroTexte>
              <BoutonPrincipal onClick={() => allerA(3)} disabled={etat.nuance.some(n => n.trim().length === 0)}>
                Étape suivante →
              </BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 3 — Ce que j'apporte vraiment ═══ */}
      {etat.etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader numero={3} titre="Ce que j'apporte vraiment" consigne="Transforme la phrase vague en contribution professionnelle concrète." mode="feedback" />

          <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.5)', fontFamily: 'monospace' }}>Manche {manche + 1} / 3</p>

          <div className="rounded-2xl p-5 flex items-center justify-between gap-3" style={STYLE_CARTE}>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>Phrase tirée</p>
              <p className="text-xl font-black" style={{ color: '#c9a84c' }}>« {phraseCourante.texte} »</p>
            </div>
            <button
              onClick={retirer}
              disabled={etat.retirages[manche] || verdictCourant !== null || chargement !== null}
              className="text-xs font-bold px-3 py-2 rounded-lg flex-shrink-0"
              style={{ ...STYLE_SECONDAIRE, opacity: etat.retirages[manche] || verdictCourant !== null || chargement !== null ? 0.35 : 1 }}
            >
              ↻ Nouveau tirage
            </button>
          </div>

          <Champ label={M.formulationAmorce} value={etat.formulations[manche]} onChange={majFormulation} rows={3} champRef={champFormulationRef} />
          <MicroTexte>{M.microTextes.transversal} {M.rappelConfidentialite}</MicroTexte>

          <div>
            <button onClick={() => setExempleVisible(v => !v)} className="text-xs font-bold underline" style={{ color: 'rgba(201,168,76,0.85)' }}>
              {exempleVisible ? 'Masquer l\'exemple' : 'Voir un exemple'}
            </button>
            {exempleVisible && exempleAutre && (
              <p className="mt-2 text-xs italic leading-snug rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(200,220,255,0.7)' }}>
                Exemple pour une autre phrase (« {exempleAutre.texte} ») : « {exempleAutre.exemple} »
              </p>
            )}
          </div>

          {chargement === 'formulation' && <Chargement>Ton coach analyse ta formulation…</Chargement>}

          {verdictCourant === null ? (
            <BoutonPrincipal onClick={testerFormulation} disabled={etat.formulations[manche].trim().length === 0 || chargement !== null}>
              Tester ma formulation
            </BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <RetourDuCoach verdict={verdictCourant} message={etat.pistes[manche] ?? M.feedbacksVerdict[verdictCourant].message} />
              <BoutonSecondaire onClick={ameliorer}>Améliorer ma formulation</BoutonSecondaire>
              {manche < 2 ? (
                <BoutonPrincipal onClick={() => { maj({ manche: manche + 1 }); setExempleVisible(false) }}>Manche suivante →</BoutonPrincipal>
              ) : (
                <>
                  <MicroTexte>{M.microTextes.apresForces}</MicroTexte>
                  <BoutonPrincipal onClick={() => allerA(4)}>Construire mon pitch →</BoutonPrincipal>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 4 — Mon pitch 45 secondes ═══ */}
      {etat.etape === 4 && (
        <div className="space-y-4">
          <ExerciseHeader numero={4} titre="Mon pitch 45 secondes" consigne="Complète chaque amorce, puis assemble ton pitch." mode="feedback" />
          <MicroTexte>{M.microTextes.pitch}</MicroTexte>

          {M.amorcesPitch.map(a => (
            <Champ
              key={a.id}
              label={a.id === 'presentation' ? 'Présentation (à ajuster : étudiant / étudiante…)' : a.amorce}
              value={etat.pitch[a.id] ?? ''}
              onChange={v => majPitch(a.id, v)}
              maxLength={300}
            />
          ))}
          <MicroTexte>{M.rappelConfidentialite}</MicroTexte>

          <p className="text-xs font-bold" style={{ color: nbMots >= motsMin && nbMots <= motsMax ? '#5aa37c' : COULEUR_DISCRET, fontFamily: 'monospace' }}>
            {nbMots} mots · cible {motsMin}–{motsMax} · environ {dureePitchSecondes(nbMots)} s à l&apos;oral
          </p>

          {!etat.pitchConstruit ? (
            <BoutonPrincipal onClick={() => maj({ pitchConstruit: true })}>Construire mon pitch</BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl p-4 text-sm leading-relaxed text-white" style={STYLE_CARTE}>{pitchTexte}</div>
              {nbMots < motsMin && <Feedback fb={{ type: 'alert', message: M.pitchTropCourt }} />}
              {nbMots > motsMax && <Feedback fb={{ type: 'alert', message: M.pitchTropLong }} />}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {M.boutonsCoachPitch.map(b => (
                  <BoutonSecondaire key={b.action} onClick={() => coacherPitch(b.action)} disabled={chargement !== null || pitchTexte.length === 0}>
                    {b.label}
                  </BoutonSecondaire>
                ))}
              </div>
              {chargement === 'pitch' && <Chargement>Ton coach analyse ton pitch…</Chargement>}
              {chargement !== 'pitch' && etat.coachPitch && (
                <RetourDuCoach verdict={etat.coachPitch.verdict} message={etat.coachPitch.message} question={etat.coachPitch.question} />
              )}

              <button onClick={() => setChronoOuvert(o => !o)} className="text-xs font-bold underline" style={{ color: 'rgba(201,168,76,0.85)' }}>
                {chronoOuvert ? 'Masquer le chrono' : '⏱ Chrono 45 secondes (optionnel)'}
              </button>
              {chronoOuvert && (
                <div className="rounded-xl p-4 text-center space-y-3" style={STYLE_CARTE}>
                  <p className="text-4xl font-black" style={{ color: secondes === 0 ? '#c0563f' : '#c9a84c', fontFamily: 'monospace' }}>
                    0:{String(secondes).padStart(2, '0')}
                  </p>
                  <div className="flex justify-center gap-2">
                    <button onClick={() => setChronoActif(true)} disabled={chronoActif || secondes === 0} className="text-xs font-bold px-3 py-2 rounded-lg" style={{ ...STYLE_SECONDAIRE, opacity: chronoActif || secondes === 0 ? 0.35 : 1 }}>Démarrer</button>
                    <button onClick={() => setChronoActif(false)} disabled={!chronoActif} className="text-xs font-bold px-3 py-2 rounded-lg" style={{ ...STYLE_SECONDAIRE, opacity: chronoActif ? 1 : 0.35 }}>Arrêter</button>
                    <button onClick={() => { setChronoActif(false); setSecondes(45) }} className="text-xs font-bold px-3 py-2 rounded-lg" style={STYLE_SECONDAIRE}>Réinitialiser</button>
                  </div>
                </div>
              )}

              <BoutonPrincipal onClick={() => { setChronoActif(false); allerA(5) }} disabled={pitchTexte.length === 0}>Présenter en binôme →</BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 5 — Feedback entre pairs (Mode 2) ═══ */}
      {etat.etape === 5 && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c', fontFamily: 'monospace' }}>Étape 5</p>
              <h3 className="text-lg font-black text-white">Feedback entre pairs</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(200,220,255,0.5)' }}>Présente ton pitch en binôme ou en mini-groupe. Chaque camarade choisit une carte.</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
              🤝 Entre pairs
            </span>
          </div>

          <div className="rounded-2xl p-4 text-sm leading-relaxed text-white" style={STYLE_CARTE}>{pitchTexte}</div>

          <div className="space-y-2">
            <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.75)' }}>Enregistre chaque carte reçue (au moins {M.cartesMinimum})</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {M.cartesFeedback.map(c => (
                <button key={c.id} onClick={() => ajouterCarte(c.id)} className="rounded-xl p-3 text-left" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-sm font-black text-white">＋ {c.label}</p>
                  <p className="text-xs mt-0.5 leading-snug" style={{ color: 'rgba(200,220,255,0.65)' }}>{c.signification}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.75)' }}>Cartes reçues : {etat.cartesRecues.length}</p>
            <div className="flex flex-wrap gap-2">
              {etat.cartesRecues.map((id, position) => (
                <button key={`${id}-${position}`} onClick={() => retirerCarte(position)} aria-label={`Retirer la carte ${carte(id)?.label}`} className="rounded-full px-3 py-1.5 text-xs font-bold" style={STYLE_SECONDAIRE}>
                  {carte(id)?.label} ✕
                </button>
              ))}
            </div>
          </div>

          {etat.cartesRecues.length >= M.cartesMinimum ? (
            <div className="space-y-2">
              <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.75)' }}>Quel feedback retiens-tu ?</p>
              <div className="flex flex-wrap gap-2">
                {cartesDistinctes.map(c => {
                  const actif = etat.carteRetenue === c.id
                  return (
                    <button key={c.id} onClick={() => maj({ carteRetenue: c.id })} aria-pressed={actif} className="rounded-full px-3 py-1.5 text-xs font-bold" style={actif ? STYLE_PRIMAIRE : { border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.8)' }}>
                      {c.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <Feedback fb={{ type: 'alert', message: `Il te faut au moins ${M.cartesMinimum} cartes pour continuer.` }} />
          )}

          <BoutonPrincipal onClick={() => allerA(6)} disabled={!feedbackPret}>Choisir mon axe de progression →</BoutonPrincipal>
        </div>
      )}

      {/* ═══ ÉTAPE 6 — Axe de progression, puis fiche finale (Mode 2) ═══ */}
      {etat.etape === 6 && !etat.axeValide && (
        <div className="space-y-4">
          <ExerciseHeader numero={6} titre="Ma fiche finale" consigne="Choisis d'abord ton axe de progression pour cette année." mode="validation" />

          <div className="flex flex-wrap gap-2">
            {M.axesProgression.map(a => {
              const actif = etat.axe === a
              return (
                <button key={a} onClick={() => maj({ axe: a })} aria-pressed={actif} className="rounded-full px-3 py-1.5 text-xs font-bold" style={actif ? STYLE_PRIMAIRE : { border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.8)' }}>
                  {a}
                </button>
              )
            })}
          </div>

          {etat.axe && (
            <div className="space-y-3">
              {M.axeChamps.map(c => (
                <Champ key={c.cle} label={c.label} value={etat.axeChamps[c.cle]} onChange={v => maj({ axeChamps: { ...etat.axeChamps, [c.cle]: v } })} />
              ))}
            </div>
          )}
          <BoutonPrincipal onClick={() => { maj({ axeValide: true }); window.scrollTo({ top: 0, behavior: 'smooth' }) }} disabled={!etat.axe || M.axeChamps.some(c => etat.axeChamps[c.cle].trim().length === 0)}>
            Voir ma fiche →
          </BoutonPrincipal>
        </div>
      )}

      {etat.etape === 6 && etat.axeValide && (
        <div className="space-y-4">
          <div id="fiche-positionnement" className="rounded-2xl p-5 space-y-4" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.3)' }}>
            <h3 className="text-lg font-black uppercase tracking-wide" style={{ color: '#c9a84c' }}>{M.ficheTitre}</h3>

            {[
              { modifier: () => allerA(2), contenu: <><p className="font-bold">{profil?.nom}</p>{etat.nuance.map((n, i) => <p key={i}>{n}</p>)}</> },
              { modifier: () => allerA(3), contenu: <ul className="space-y-1">{forces.map((f, i) => <li key={i}>• {f.formulation}</li>)}</ul> },
              { modifier: () => allerA(4), contenu: <p>{etat.pitch.apport}</p> },
              { modifier: () => allerA(4), contenu: <p>{pitchTexte}</p> },
              { modifier: () => maj({ axeValide: false }), contenu: <><p className="font-bold">{etat.axe}</p>{M.axeChamps.map(c => <p key={c.cle}>{c.label.replace(/…$/, '')} {etat.axeChamps[c.cle]}</p>)}</> },
              { modifier: () => allerA(5), contenu: <p><span className="font-bold">{carteRetenue?.label}</span> — {carteRetenue?.signification}</p> },
            ].map((r, i) => (
              <div key={i} className="space-y-1 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.8)' }}>{i + 1}. {M.ficheRubriques[i]}</p>
                  {!etat.ficheValidee && (
                    <button onClick={r.modifier} className="no-print text-xs underline" style={{ color: 'rgba(200,220,255,0.55)' }}>Modifier</button>
                  )}
                </div>
                <div className="text-sm leading-relaxed text-white whitespace-pre-line">{r.contenu}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <BoutonSecondaire onClick={copier}>Copier</BoutonSecondaire>
            <BoutonSecondaire onClick={() => window.print()}>Imprimer</BoutonSecondaire>
            <BoutonSecondaire onClick={() => setPresentation(true)}>Présenter</BoutonSecondaire>
          </div>
          {copie === 'ok' && <p className="text-xs text-center" style={{ color: '#5aa37c' }}>Fiche copiée dans le presse-papiers.</p>}
          {copie === 'erreur' && <p className="text-xs text-center" style={{ color: '#f39c12' }}>Copie impossible sur cet appareil : utilise Imprimer.</p>}

          {!etat.ficheValidee ? (
            <BoutonPrincipal onClick={() => maj({ ficheValidee: true })}>Valider ma fiche</BoutonPrincipal>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-3" style={{ background: 'rgba(201,168,76,0.08)', border: '1.5px solid rgba(201,168,76,0.4)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.85)' }}>{M.messageFin}</p>
              <BoutonPrincipal onClick={() => setPresentation(true)}>Présenter à l&apos;intervenante</BoutonPrincipal>
              <button onClick={() => maj({ ficheValidee: false })} className="text-xs underline" style={{ color: 'rgba(200,220,255,0.5)' }}>Modifier ma fiche</button>
            </div>
          )}
        </div>
      )}

      {/* ═══ MODE PRÉSENTATION — lisible depuis le fond de la salle ═══ */}
      {presentation && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-6 sm:p-12 flex flex-col" style={{ background: '#050a1a' }}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <p className="text-sm sm:text-xl font-black uppercase tracking-widest" style={{ color: '#c9a84c', fontFamily: 'monospace' }}>
              🎯 {profil?.nom}
            </p>
            <button onClick={() => setPresentation(false)} className="text-sm font-bold px-4 py-2 rounded-lg flex-shrink-0" style={STYLE_SECONDAIRE}>
              Fermer
            </button>
          </div>
          <p className="flex-1 flex items-center text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug" style={{ color: '#f5ecd0' }}>
            {pitchTexte}
          </p>
        </div>
      )}
    </div>
  )
}
