'use client'

import { useEffect, useRef, useState } from 'react'
import {
  mission1SeVendre as M, evaluerFormulation, contientSurvente, compterMots, melanger,
  type Verdict, type FeedbackMission, type CiblePitch, type AmorcePitch,
} from '@/lib/content/univers3'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeader from './shared/ExerciseHeader'
import MissionHeader from './shared/MissionHeader'

type AxeCle = (typeof M.axeChamps)[number]['cle']

interface Etat {
  etape: number // 0 = accueil, 1 à 5 = étapes, 6 = fiche finale
  ficheAtteinte: boolean
  profils: string[]
  profilsChoisis: boolean
  relance: string
  tirages: number[] // index de qualité par manche, sans doublon
  retirages: boolean[] // 1 re-tirage possible par manche
  formulations: string[]
  verdicts: (Verdict | null)[]
  manche: number
  ordrePhrases: number[]
  placements: Record<number, Verdict>
  classementValide: boolean
  pitch: Record<string, string>
  pitchConstruit: boolean
  cible: CiblePitch['id'] | null
  competence: string | null
  competenceChoisie: boolean
  axe: Record<AxeCle, string>
  ficheValidee: boolean
}

// Tirages aléatoires faits côté client, au montage, pour éviter un écart de rendu serveur/client.
function etatInitial(): Etat {
  return {
    etape: 0,
    ficheAtteinte: false,
    profils: [],
    profilsChoisis: false,
    relance: '',
    tirages: melanger(M.qualites.map((_, i) => i)).slice(0, 3),
    retirages: [false, false, false],
    formulations: ['', '', ''],
    verdicts: [null, null, null],
    manche: 0,
    ordrePhrases: melanger(M.phrases.map((_, i) => i)),
    placements: {},
    classementValide: false,
    pitch: Object.fromEntries(M.amorcesPitch.map(a => [a.id, a.id === 'presentation' ? a.amorce : ''])),
    pitchConstruit: false,
    cible: null,
    competence: null,
    competenceChoisie: false,
    axe: { progresser: '', pourquoi: '', action: '' },
    ficheValidee: false,
  }
}

// Persistance : sessionStorage uniquement (effacé à la fermeture de l'onglet), jamais de serveur.
// Chaque accès est protégé : si le stockage est indisponible, la mission fonctionne sans reprise.
function lireEtat(cle: string): Etat | null {
  try {
    const brut = window.sessionStorage.getItem(cle)
    if (!brut) return null
    const e = JSON.parse(brut) as Etat
    if (typeof e.etape !== 'number' || e.tirages?.length !== 3 || e.ordrePhrases?.length !== M.phrases.length) return null
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

// Feedback du pitch : règles de la fiche, dans cet ordre.
function feedbackPitch(pitch: Record<string, string>): FeedbackMission {
  const apport = phrasePitch(M.amorcesPitch.find(a => a.id === 'apport')!, pitch.apport ?? '')
  if (evaluerFormulation(apport) === 'vague') return M.feedbacksPitch.manqueCompetence
  if (compterMots(pitch.alternance ?? '') < 6) return M.feedbacksPitch.tropGeneral
  if (contientSurvente(assemblerPitch(pitch))) return M.feedbacksFormulation.pretentieux
  return M.feedbacksPitch.credible
}

const STYLE_PRIMAIRE = { background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#050a1a' }
const STYLE_SECONDAIRE = { background: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.4)', color: '#c9a84c' }
const STYLE_CARTE = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }
const STYLE_CHAMP = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }
const COULEUR_FEEDBACK = { success: '#5aa37c', alert: '#f39c12', neutral: '#c9a84c' }
const COULEUR_CATEGORIE: Record<Verdict, string> = { vague: '#f39c12', pretentieux: '#c0563f', credible: '#5aa37c' }
const CATEGORIES: Verdict[] = ['vague', 'pretentieux', 'credible']

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

function Champ({ label, value, onChange, rows = 2, champRef }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
  champRef?: React.Ref<HTMLTextAreaElement>
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.75)' }}>{label}</span>
      <textarea
        ref={champRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-xl px-4 py-3 text-sm resize-none"
        style={STYLE_CHAMP}
      />
    </label>
  )
}

export default function Mission1SeVendre({ total, slug }: { total: number; slug: string }) {
  const cle = `b3-m1-se-vendre:${slug}`
  const [etat, setEtat] = useState<Etat | null>(null)

  // États d'interface non persistés
  const [alerteMax, setAlerteMax] = useState(false)
  const [exempleVisible, setExempleVisible] = useState(false)
  const [chronoOuvert, setChronoOuvert] = useState(false)
  const [secondes, setSecondes] = useState(45)
  const [chronoActif, setChronoActif] = useState(false)
  const [presentation, setPresentation] = useState(false)
  const [copie, setCopie] = useState<'ok' | 'erreur' | null>(null)
  const champQualiteRef = useRef<HTMLTextAreaElement>(null)

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

  const nomsProfils = M.profils.filter(p => etat.profils.includes(p.id)).map(p => p.nom)
  const pitchTexte = assemblerPitch(etat.pitch)
  const nbMots = compterMots(pitchTexte)
  const [motsMin, motsMax] = M.pitchMotsCible

  // ── Étape 1 : 2 profils maximum, le 3ᵉ clic est refusé ──
  const basculerProfil = (id: string) => {
    if (etat.profils.includes(id)) {
      setAlerteMax(false)
      maj({ profils: etat.profils.filter(p => p !== id) })
      return
    }
    if (etat.profils.length >= 2) {
      setAlerteMax(true)
      return
    }
    setAlerteMax(false)
    maj({ profils: [...etat.profils, id] })
  }

  // ── Étape 2 ──
  const manche = etat.manche
  const qualiteCourante = M.qualites[etat.tirages[manche]]
  const verdictCourant = etat.verdicts[manche]
  // L'exemple porte toujours sur une AUTRE qualité que celle tirée.
  const qualitesAvecExemple = M.qualites.filter(q => q.exemple && q.qualite !== qualiteCourante.qualite)
  const exempleAutre = qualitesAvecExemple[manche % qualitesAvecExemple.length]

  // Re-tirage : uniquement parmi les qualités pas encore tirées (aucun doublon sur les 3 manches).
  const retirer = () => {
    const libres = M.qualites.map((_, i) => i).filter(i => !etat.tirages.includes(i))
    const nouveau = libres[Math.floor(Math.random() * libres.length)]
    maj({
      tirages: etat.tirages.map((t, i) => (i === manche ? nouveau : t)),
      retirages: etat.retirages.map((r, i) => (i === manche ? true : r)),
    })
    setExempleVisible(false)
  }
  const majFormulation = (v: string) => maj({
    formulations: etat.formulations.map((f, i) => (i === manche ? v : f)),
    verdicts: etat.verdicts.map((d, i) => (i === manche ? null : d)),
  })
  const transformer = () => maj({
    verdicts: etat.verdicts.map((d, i) => (i === manche ? evaluerFormulation(etat.formulations[manche]) : d)),
  })
  const ameliorer = () => {
    maj({ verdicts: etat.verdicts.map((d, i) => (i === manche ? null : d)) })
    setTimeout(() => champQualiteRef.current?.focus(), 0)
  }

  // ── Étape 3 ──
  const nonPlaces = etat.ordrePhrases.filter(i => etat.placements[i] === undefined)
  const placer = (i: number, c: Verdict) => {
    if (etat.classementValide) return
    maj({ placements: { ...etat.placements, [i]: c } })
  }
  const retirerPlacement = (i: number) => {
    if (etat.classementValide) return
    const p = { ...etat.placements }
    delete p[i]
    maj({ placements: p })
  }
  const score = etat.ordrePhrases.filter(i => etat.placements[i] === M.phrases[i].categorie).length

  // ── Fiche : uniquement les saisies de l'étudiant ──
  const forces = etat.tirages.map((t, i) => ({ qualite: M.qualites[t].qualite, formulation: etat.formulations[i].trim() }))
  const texteFiche = [
    'Mon positionnement commercial',
    '',
    '1. Mon style commercial dominant',
    `${nomsProfils.join(' / ')} — ${etat.relance.trim()}`,
    '',
    '2. Mes 3 forces commerciales',
    ...forces.map(f => `- ${f.qualite} : ${f.formulation}`),
    '',
    '3. Ce que je peux apporter à une entreprise',
    etat.pitch.apport?.trim() ?? '',
    '',
    '4. Mon pitch commercial en 45 secondes',
    pitchTexte,
    '',
    '5. Mon axe de progression',
    etat.competence ?? '',
    ...M.axeChamps.map(c => `${c.label.replace(/…$/, '')} ${etat.axe[c.cle].trim()}`),
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
            { n: 1, label: 'Profil', picto: '1' },
            { n: 2, label: 'Forces', picto: '2' },
            { n: 3, label: 'Crédibilité', picto: '3' },
            { n: 4, label: 'Pitch', picto: '4' },
            { n: 5, label: 'Progression', picto: '5' },
          ]}
        />
      )}

      {etat.ficheAtteinte && etat.etape >= 1 && etat.etape <= 5 && (
        <button onClick={() => allerA(6)} className="text-xs font-bold underline" style={{ color: '#c9a84c' }}>
          ← Revenir à ma fiche
        </button>
      )}

      {/* ═══ ACCUEIL ═══ */}
      {etat.etape === 0 && (
        <div className="space-y-4">
          <div className="rounded-2xl p-5 space-y-2" style={STYLE_CARTE}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'monospace' }}>
              Briefing · {M.meta.dureeMinutes[0]} à {M.meta.dureeMinutes[1]} min
            </p>
            <p className="text-sm text-white leading-relaxed">
              5 étapes pour passer de « je cherche une alternance » à « je sais expliquer ce que j&apos;apporte ».
            </p>
            <p className="text-xs" style={{ color: 'rgba(200,220,255,0.55)' }}>
              Diagnostic individuel → échange en binôme → pitch express devant ton intervenante.
            </p>
          </div>
          <BoutonPrincipal onClick={() => allerA(1)}>Lancer la mission →</BoutonPrincipal>
        </div>
      )}

      {/* ═══ ÉTAPE 1 — Quel commercial suis-je ? ═══ */}
      {etat.etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader numero={1} titre="Quel commercial suis-je ?" consigne="Choisis 1 ou 2 profils qui te ressemblent le plus." mode="feedback" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {M.profils.map(p => {
              const actif = etat.profils.includes(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => basculerProfil(p.id)}
                  aria-pressed={actif}
                  className="rounded-xl p-3 text-left transition-all"
                  style={{
                    background: actif ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.04)',
                    border: actif ? '1.5px solid rgba(201,168,76,0.7)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <p className="text-sm font-black" style={{ color: actif ? '#c9a84c' : 'white' }}>{actif ? '✓ ' : ''}{p.nom}</p>
                  <p className="text-xs mt-1 leading-snug" style={{ color: 'rgba(200,220,255,0.65)' }}>{p.description}</p>
                </button>
              )
            })}
          </div>

          {alerteMax && <Feedback fb={{ type: 'alert', message: M.profilsMaxMessage }} />}

          {!etat.profilsChoisis ? (
            <BoutonPrincipal onClick={() => maj({ profilsChoisis: true })} disabled={etat.profils.length === 0}>
              Choisir mon profil
            </BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <Feedback fb={M.profilsFeedback} />
              <Champ label={M.profilsRelance} value={etat.relance} onChange={v => maj({ relance: v })} rows={3} />
              <p className="text-xs leading-snug" style={{ color: 'rgba(200,220,255,0.55)' }}>{M.profilsMessageCle}</p>
              <BoutonPrincipal onClick={() => allerA(2)} disabled={etat.relance.trim().length === 0 || etat.profils.length === 0}>
                Étape suivante →
              </BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 2 — Ce que j'apporte vraiment ═══ */}
      {etat.etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader numero={2} titre="Ce que j'apporte vraiment" consigne="Transforme la qualité tirée en contribution professionnelle concrète." mode="feedback" />

          <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.5)', fontFamily: 'monospace' }}>Manche {manche + 1} / 3</p>

          <div className="rounded-2xl p-5 flex items-center justify-between gap-3" style={STYLE_CARTE}>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.7)' }}>Qualité tirée</p>
              <p className="text-2xl font-black" style={{ color: '#c9a84c' }}>{qualiteCourante.qualite}</p>
            </div>
            <button
              onClick={retirer}
              disabled={etat.retirages[manche] || verdictCourant !== null}
              className="text-xs font-bold px-3 py-2 rounded-lg flex-shrink-0"
              style={{ ...STYLE_SECONDAIRE, opacity: etat.retirages[manche] || verdictCourant !== null ? 0.35 : 1 }}
            >
              ↻ Nouveau tirage
            </button>
          </div>

          <Champ label={M.qualiteAmorce} value={etat.formulations[manche]} onChange={majFormulation} rows={3} champRef={champQualiteRef} />

          <div>
            <button onClick={() => setExempleVisible(v => !v)} className="text-xs font-bold underline" style={{ color: 'rgba(201,168,76,0.85)' }}>
              {exempleVisible ? 'Masquer l\'exemple' : 'Voir un exemple'}
            </button>
            {exempleVisible && exempleAutre && (
              <p className="mt-2 text-xs italic leading-snug rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(200,220,255,0.7)' }}>
                Exemple pour une autre qualité ({exempleAutre.qualite}) : « {exempleAutre.exemple} »
              </p>
            )}
          </div>

          {verdictCourant === null ? (
            <BoutonPrincipal onClick={transformer} disabled={etat.formulations[manche].trim().length === 0}>
              Transformer ma qualité
            </BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <Feedback fb={M.feedbacksFormulation[verdictCourant]} />
              <BoutonSecondaire onClick={ameliorer}>Améliorer ma formulation</BoutonSecondaire>
              {manche < 2 ? (
                <BoutonPrincipal onClick={() => { maj({ manche: manche + 1 }); setExempleVisible(false) }}>Manche suivante →</BoutonPrincipal>
              ) : (
                <BoutonPrincipal onClick={() => allerA(3)}>Étape suivante →</BoutonPrincipal>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 3 — Se vendre sans se survendre ═══ */}
      {etat.etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader numero={3} titre="Se vendre sans se survendre" consigne="Classe chaque phrase : glisse-la dans une colonne ou utilise les boutons." mode="feedback" />

          {nonPlaces.length > 0 && (
            <div className="space-y-2">
              {nonPlaces.map(i => (
                <div
                  key={i}
                  draggable
                  onDragStart={e => e.dataTransfer.setData('text/plain', String(i))}
                  className="rounded-xl p-3 space-y-2 cursor-grab"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p className="text-sm text-white">« {M.phrases[i].texte} »</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px]" style={{ color: 'rgba(200,220,255,0.45)' }}>Classer la phrase :</span>
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        onClick={() => placer(i, c)}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg"
                        style={{ border: `1px solid ${COULEUR_CATEGORIE[c]}80`, color: COULEUR_CATEGORIE[c], background: 'rgba(0,0,0,0.15)' }}
                      >
                        {M.categoriesLabels[c]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CATEGORIES.map(c => {
              const places = etat.ordrePhrases.filter(i => etat.placements[i] === c)
              return (
                <div
                  key={c}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault()
                    const brut = e.dataTransfer.getData('text/plain')
                    if (brut !== '') placer(Number(brut), c)
                  }}
                  className="rounded-xl p-2.5 space-y-2 min-h-[90px]"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1.5px dashed ${COULEUR_CATEGORIE[c]}66` }}
                >
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: COULEUR_CATEGORIE[c] }}>{M.categoriesLabels[c]}</p>
                  {places.map(i => {
                    const juste = M.phrases[i].categorie === c
                    return (
                      <div
                        key={i}
                        className="rounded-lg p-2 text-xs leading-snug"
                        style={{
                          background: etat.classementValide ? (juste ? 'rgba(90,163,124,0.16)' : 'rgba(192,86,63,0.16)') : 'rgba(255,255,255,0.06)',
                          border: etat.classementValide ? `1px solid ${juste ? '#5aa37c' : '#c0563f'}` : '1px solid transparent',
                          color: 'white',
                        }}
                      >
                        <p>{M.phrases[i].texte}</p>
                        {etat.classementValide && !juste && (
                          <p className="mt-1 font-bold" style={{ color: '#e08a78' }}>→ {M.categoriesLabels[M.phrases[i].categorie]}</p>
                        )}
                        {!etat.classementValide && (
                          <button onClick={() => retirerPlacement(i)} className="mt-1 underline" style={{ color: 'rgba(200,220,255,0.5)' }}>
                            Retirer
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {!etat.classementValide ? (
            <BoutonPrincipal onClick={() => maj({ classementValide: true })} disabled={nonPlaces.length > 0}>
              Valider mon classement
            </BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-3xl font-black" style={{ color: '#c9a84c', fontFamily: 'monospace' }}>{score} / {M.phrases.length}</p>
              <Feedback fb={{ type: 'neutral', message: M.phrasesSynthese }} />
              <BoutonPrincipal onClick={() => allerA(4)}>Étape suivante →</BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 4 — Mon pitch commercial (Mode 2) ═══ */}
      {etat.etape === 4 && (
        <div className="space-y-4">
          <ExerciseHeader numero={4} titre="Mon pitch commercial" consigne="Complète chaque amorce, puis assemble ton pitch de 45 secondes." mode="validation" />

          {M.amorcesPitch.map(a => (
            <Champ
              key={a.id}
              label={a.id === 'presentation' ? 'Présentation (à ajuster : étudiant / étudiante, spécialité…)' : a.amorce}
              value={etat.pitch[a.id] ?? ''}
              onChange={v => maj({ pitch: { ...etat.pitch, [a.id]: v } })}
            />
          ))}

          <p className="text-xs font-bold" style={{ color: nbMots >= motsMin && nbMots <= motsMax ? '#5aa37c' : 'rgba(200,220,255,0.6)', fontFamily: 'monospace' }}>
            {nbMots} mots · cible {motsMin}–{motsMax}
          </p>

          {!etat.pitchConstruit ? (
            <BoutonPrincipal onClick={() => maj({ pitchConstruit: true })}>Construire mon pitch</BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl p-4 text-sm leading-relaxed text-white" style={STYLE_CARTE}>{pitchTexte}</div>
              {nbMots < motsMin && <Feedback fb={{ type: 'alert', message: M.pitchTropCourt }} />}
              {nbMots > motsMax && <Feedback fb={{ type: 'alert', message: M.pitchTropLong }} />}
              {nbMots >= motsMin && nbMots <= motsMax && <Feedback fb={feedbackPitch(etat.pitch)} />}

              <div className="space-y-2">
                <p className="text-xs font-bold" style={{ color: 'rgba(200,220,255,0.6)' }}>Adapter à ma cible</p>
                <div className="grid grid-cols-3 gap-2">
                  {M.ciblesPitch.map(c => (
                    <button
                      key={c.id}
                      onClick={() => maj({ cible: etat.cible === c.id ? null : c.id })}
                      aria-pressed={etat.cible === c.id}
                      className="rounded-lg py-2 text-xs font-bold"
                      style={etat.cible === c.id ? { ...STYLE_SECONDAIRE, background: 'rgba(201,168,76,0.25)' } : { border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                {etat.cible && (
                  <p className="text-sm italic rounded-lg p-3" style={{ background: 'rgba(201,168,76,0.08)', color: '#e8d080' }}>
                    {M.ciblesPitch.find(c => c.id === etat.cible)!.question}
                  </p>
                )}
              </div>

              <BoutonSecondaire onClick={() => setChronoOuvert(o => !o)}>⏱ Tester mon pitch</BoutonSecondaire>
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

              <p className="text-xs text-center font-bold" style={{ color: '#c9a84c' }}>🧑‍🏫 {M.rappelMode2}</p>
              <BoutonPrincipal onClick={() => { setChronoActif(false); allerA(5) }}>Étape suivante →</BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉTAPE 5 — Mon axe de progression ═══ */}
      {etat.etape === 5 && (
        <div className="space-y-4">
          <ExerciseHeader numero={5} titre="Mon axe de progression" consigne={M.competencesQuestion} mode="feedback" />

          <div className="flex flex-wrap gap-2">
            {M.competences.map(c => {
              const actif = etat.competence === c
              return (
                <button
                  key={c}
                  onClick={() => maj({ competence: c })}
                  aria-pressed={actif}
                  className="rounded-full px-3 py-1.5 text-xs font-bold"
                  style={actif ? STYLE_PRIMAIRE : { border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.8)' }}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {!etat.competenceChoisie ? (
            <BoutonPrincipal onClick={() => maj({ competenceChoisie: true })} disabled={!etat.competence}>
              Choisir mon axe de progression
            </BoutonPrincipal>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>Compétence : {etat.competence}</p>
              {M.axeChamps.map(c => (
                <Champ key={c.cle} label={c.label} value={etat.axe[c.cle]} onChange={v => maj({ axe: { ...etat.axe, [c.cle]: v } })} />
              ))}
              <BoutonPrincipal onClick={() => allerA(6)} disabled={M.axeChamps.some(c => etat.axe[c.cle].trim().length === 0)}>
                Voir ma fiche →
              </BoutonPrincipal>
            </div>
          )}
        </div>
      )}

      {/* ═══ FICHE FINALE ═══ */}
      {etat.etape === 6 && (
        <div className="space-y-4">
          <div id="fiche-positionnement" className="rounded-2xl p-5 space-y-4" style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.3)' }}>
            <h3 className="text-lg font-black uppercase tracking-wide" style={{ color: '#c9a84c' }}>Mon positionnement commercial</h3>

            {[
              { n: 1, titre: 'Mon style commercial dominant', etape: 1, contenu: <><p className="font-bold">{nomsProfils.join(' / ')}</p><p>{etat.relance}</p></> },
              { n: 2, titre: 'Mes 3 forces commerciales', etape: 2, contenu: <ul className="space-y-1">{forces.map((f, i) => <li key={i}><span className="font-bold">{f.qualite} :</span> {f.formulation}</li>)}</ul> },
              { n: 3, titre: 'Ce que je peux apporter à une entreprise', etape: 4, contenu: <p>{etat.pitch.apport}</p> },
              { n: 4, titre: 'Mon pitch commercial en 45 secondes', etape: 4, contenu: <p>{pitchTexte}</p> },
              { n: 5, titre: 'Mon axe de progression', etape: 5, contenu: <><p className="font-bold">{etat.competence}</p>{M.axeChamps.map(c => <p key={c.cle}>{c.label.replace(/…$/, '')} {etat.axe[c.cle]}</p>)}</> },
            ].map(r => (
              <div key={r.n} className="space-y-1 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.8)' }}>{r.n}. {r.titre}</p>
                  {!etat.ficheValidee && (
                    <button onClick={() => allerA(r.etape)} className="no-print text-xs underline" style={{ color: 'rgba(200,220,255,0.55)' }}>Modifier</button>
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
              🎯 {nomsProfils.join(' / ')}
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
