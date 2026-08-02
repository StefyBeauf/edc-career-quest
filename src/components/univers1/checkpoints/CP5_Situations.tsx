'use client'

import { useState, useEffect } from 'react'
import { situations, Situation } from '@/lib/content/univers1'
import ExerciseStepper from '../shared/ExerciseStepper'
import ExerciseHeader from '../shared/ExerciseHeader'
import TourDeControleAppel from '../shared/TourDeControleAppel'

const NB_INCIDENTS = 5

// Situations à forte nuance (contexte, degré de gravité, marge de manœuvre) — réservées à l'exercice 3
const IDS_NUANCEES = [4, 8, 12, 17, 26, 39, 42, 49]
const situationsNuancees = situations.filter(s => IDS_NUANCEES.includes(s.id))

// ─── Contenu Exercice 2 — Tenue & attitude professionnelle ───
const itemsAttitude: { texte: string; bonne: boolean; explication: string }[] = [
  { texte: 'Arriver au moins 10 minutes avant l\'heure prévue le premier jour de stage.', bonne: true, explication: 'La ponctualité, surtout le premier jour, montre votre sérieux et votre respect de l\'équipe qui vous accueille.' },
  { texte: 'Porter une tenue de sport ou de plage dans un bureau classique.', bonne: false, explication: 'Même sans dress code strict, une tenue trop décontractée envoie un mauvais signal en environnement professionnel.' },
  { texte: 'Se renseigner en amont sur le dress code de l\'entreprise avant de choisir sa tenue.', bonne: true, explication: 'Anticiper le dress code évite un décalage gênant dès le premier jour — n\'hésitez pas à demander avant de venir.' },
  { texte: 'Consulter son téléphone en pleine conversation avec un collègue ou un client.', bonne: false, explication: 'Cela montre un manque d\'attention et de respect envers votre interlocuteur, même pour une notification rapide.' },
  { texte: 'Ranger son téléphone portable pendant les réunions et les échanges avec l\'équipe.', bonne: true, explication: 'Rester concentré sur l\'échange en cours est un signe basique mais très apprécié de professionnalisme.' },
  { texte: 'Arriver en retard sans prévenir personne.', bonne: false, explication: 'Un retard non signalé perturbe l\'organisation de l\'équipe et donne une image négative de votre fiabilité.' },
  { texte: 'Adopter une tenue sobre et soignée, même en l\'absence de dress code strict.', bonne: true, explication: 'Dans le doute, une tenue sobre reste toujours le choix le plus sûr pour un stage.' },
  { texte: 'Bâiller ou soupirer ostensiblement pendant une réunion.', bonne: false, explication: 'Même en cas de fatigue, ces attitudes sont perçues comme un désintérêt et manquent de respect envers le groupe.' },
  { texte: 'Rester poli et courtois avec tous les collègues, quel que soit leur poste.', bonne: true, explication: 'Le respect ne se limite pas à la hiérarchie directe : c\'est un réflexe professionnel de base, avec tout le monde.' },
  { texte: 'Copier la tenue la plus décontractée vue dans l\'entreprise sans se renseigner sur le contexte.', bonne: false, explication: 'Une tenue vue une fois ne veut pas dire qu\'elle est adaptée à toutes les situations (client, réunion, jour normal).' },
]

function melanger<T>(arr: T[]): T[] {
  const copie = [...arr]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}

type StepDef = { n: 1 | 2 | 3; label: string; badge: '✅' | '🛫' }
const STEPS: StepDef[] = [
  { n: 1, label: '5 incidents en vol', badge: '✅' },
  { n: 2, label: 'Tenue & attitude', badge: '✅' },
  { n: 3, label: 'Débriefing', badge: '🛫' },
]

function tirerSituations(n: number): Situation[] {
  return melanger(situations).slice(0, n)
}

export default function CP5_Situations() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — 5 incidents en vol
  const [incidents, setIncidents] = useState<Situation[] | null>(null)
  const [incidentIndex, setIncidentIndex] = useState(0)
  const [reponseIncident, setReponseIncident] = useState<'A' | 'B' | 'C' | null>(null)

  // Exercice 2 — Tenue & attitude
  const [itemsOrdre] = useState(() => melanger(itemsAttitude))
  const [coches, setCoches] = useState<boolean[]>(Array(itemsAttitude.length).fill(false))
  const [ex2Valide, setEx2Valide] = useState(false)

  // Exercice 3 — Débriefing
  const [situation3, setSituation3] = useState<Situation | null>(null)
  const [reponseEquipage, setReponseEquipage] = useState('')
  const [appele, setAppele] = useState(false)

  // Tirages aléatoires effectués côté client uniquement, après montage (évite un écart de rendu serveur/client)
  /* eslint-disable react-hooks/set-state-in-effect -- initialisation unique au montage, nécessaire pour éviter un écart de rendu serveur/client */
  useEffect(() => {
    setIncidents(tirerSituations(NB_INCIDENTS))
    setSituation3(situationsNuancees[Math.floor(Math.random() * situationsNuancees.length)])
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  const incidentActuel = incidents ? incidents[incidentIndex] : null

  function repondreIncident(opt: 'A' | 'B' | 'C') {
    if (reponseIncident !== null) return
    setReponseIncident(opt)
  }

  function incidentSuivant() {
    if (incidentIndex < NB_INCIDENTS - 1) {
      setIncidentIndex(i => i + 1)
      setReponseIncident(null)
    } else {
      setEtape(2)
    }
  }

  function toggleCoche(i: number) {
    if (ex2Valide) return
    setCoches(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  const getOption = (s: Situation, opt: 'A' | 'B' | 'C') => opt === 'A' ? s.optionA : opt === 'B' ? s.optionB : s.optionC
  const getFeedback = (s: Situation, opt: 'A' | 'B' | 'C') => opt === 'A' ? s.feedbackA : opt === 'B' ? s.feedbackB : s.feedbackC

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 5 — Passer les contrôles
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Posture professionnelle</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Contrôle de sûreté — chaque situation est un portique à passer
        </p>
      </div>

      <ExerciseStepper etape={etape} steps={STEPS} />

      {/* ═══ EXERCICE 1 — 5 incidents en vol ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="5 incidents en vol"
            consigne="Discutez en équipage puis choisissez votre réaction, à chaque incident."
            mode="cdb"
          />

          {!incidentActuel ? (
            <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>Tirage des incidents…</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>Incident {incidentIndex + 1} sur {NB_INCIDENTS}</p>
                <div className="flex gap-1">
                  {Array.from({ length: NB_INCIDENTS }).map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full" style={{ background: i <= incidentIndex ? '#c9a84c' : 'rgba(255,255,255,0.15)' }} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden">
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(90deg, rgba(239,68,68,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span>⚠️</span>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#fca5a5' }}>Incident en vol</p>
                </div>
                <div className="px-5 py-5" style={{ background: 'linear-gradient(135deg, rgba(26,39,68,0.95), rgba(15,30,61,0.95))', border: '1px solid rgba(239,68,68,0.15)', borderTop: 'none' }}>
                  <p className="text-white text-base font-semibold leading-relaxed">{incidentActuel.situation}</p>
                </div>
              </div>

              <div className="space-y-2">
                {(['A', 'B', 'C'] as const).map(opt => {
                  let style: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.85)' }
                  if (reponseIncident !== null) {
                    if (opt === incidentActuel.bonneOption) style = { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.4)', color: '#6ee7b7' }
                    else if (opt === reponseIncident) style = { background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }
                    else style = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(245,240,232,0.3)' }
                  }
                  return (
                    <button key={opt} onClick={() => repondreIncident(opt)} disabled={reponseIncident !== null} className="w-full text-left rounded-xl px-5 py-4 transition-all" style={style}>
                      <div className="flex gap-3 items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c' }}>{opt}</span>
                        <span className="text-sm leading-relaxed pt-1">{getOption(incidentActuel, opt)}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {reponseIncident && (
                <div className="space-y-3">
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.85)' }}>{getFeedback(incidentActuel, reponseIncident)}</p>
                  </div>
                  <button onClick={incidentSuivant} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                    {incidentIndex < NB_INCIDENTS - 1 ? 'Incident suivant →' : 'Tous les contrôles passés — Exercice 2 →'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 — Tenue & attitude professionnelle ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Tenue & attitude professionnelle"
            consigne="Cochez uniquement les bonnes pratiques à adopter en stage — tenue et comportement."
            mode="cdb"
          />

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>À adopter en stage ?</p>
            </div>
            <div className="p-5 space-y-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              {itemsOrdre.map((item, i) => {
                let bg = coches[i] ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)'
                let border = coches[i] ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'
                if (ex2Valide) {
                  const correct = coches[i] === item.bonne
                  bg = correct ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)'
                  border = correct ? 'rgba(46,204,113,0.35)' : 'rgba(231,76,60,0.35)'
                }
                return (
                  <div key={i}>
                    <button onClick={() => toggleCoche(i)} disabled={ex2Valide} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" style={{ background: bg, border: `1px solid ${border}` }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: coches[i] ? '#c9a84c' : 'transparent', border: `2px solid ${coches[i] ? '#c9a84c' : 'rgba(255,255,255,0.2)'}` }}>
                        {coches[i] && <span className="text-xs font-black" style={{ color: '#0f1e3d' }}>✓</span>}
                      </span>
                      <span className="text-sm" style={{ color: coches[i] ? '#e8c96a' : 'rgba(245,240,232,0.7)' }}>{item.texte}</span>
                    </button>
                    {ex2Valide && (
                      <p className="text-xs mt-1 mb-1 px-4 leading-relaxed" style={{ color: 'rgba(245,240,232,0.5)' }}>
                        {item.bonne ? '✓ Bonne pratique — ' : '✗ À éviter — '}{item.explication}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {!ex2Valide ? (
            <button onClick={() => setEx2Valide(true)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
              Valider mes réponses
            </button>
          ) : (
            <div className="space-y-4">
              <button onClick={() => setEtape(3)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                Contrôle passé — Exercice 3 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Débriefing d'équipage ═══ */}
      {etape === 3 && situation3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Débriefing d'équipage"
            consigne="Cette situation n'a pas de bonne réponse unique. Construisez votre position en équipage."
            mode="tdc"
          />

          <div className="rounded-2xl overflow-hidden">
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(90deg, rgba(243,156,18,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(243,156,18,0.25)' }}>
              <span>🧭</span>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f39c12' }}>Situation à nuancer</p>
            </div>
            <div className="px-5 py-5" style={{ background: 'linear-gradient(135deg, rgba(26,39,68,0.95), rgba(15,30,61,0.95))', border: '1px solid rgba(243,156,18,0.15)', borderTop: 'none' }}>
              <p className="text-white text-base font-semibold leading-relaxed">{situation3.situation}</p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Réponse argumentée de l&apos;équipage</p>
            <textarea value={reponseEquipage} onChange={e => setReponseEquipage(e.target.value)} rows={4} placeholder="Que décidez-vous de faire, et pourquoi ?"
              className="w-full rounded-lg p-2.5 text-sm bg-transparent resize-none outline-none" style={{ color: 'rgba(245,240,232,0.85)', border: '1px solid rgba(201,168,76,0.2)' }} />
          </div>

          <TourDeControleAppel
            appele={appele}
            onAppeler={() => setAppele(true)}
            texteAttente="Votre équipage a construit sa position. Votre intervenante va apporter la nuance de contexte que l'application ne peut pas objectiver."
          />
        </div>
      )}
    </div>
  )
}
