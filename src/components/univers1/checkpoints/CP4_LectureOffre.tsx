'use client'

import { useState } from 'react'
import ExerciseStepper from '../shared/ExerciseStepper'
import ExerciseHeader from '../shared/ExerciseHeader'
import TourDeControleAppel from '../shared/TourDeControleAppel'

const offre = {
  poste: 'Conseiller(ère) de Vente — Stage 6 mois',
  entreprise: 'Maison Dorcel & Fils',
  localisation: 'Paris 8ème (75) — Présentiel',
  presentation: 'Maison Dorcel & Fils est une enseigne parisienne spécialisée dans la vente de prêt-à-porter masculin haut de gamme. Nous recherchons un(e) conseiller(ère) de vente passionné(e) pour renforcer notre équipe pendant la saison printemps-été.',
  missions: [
    'Accueillir et conseiller la clientèle en boutique avec une approche personnalisée',
    'Identifier les besoins du client et proposer des articles adaptés (vente conseil)',
    'Réaliser les opérations d\'encaissement et de fidélisation (carte client, suivi CRM)',
    'Participer à la mise en valeur des collections et au merchandising visuel',
    'Contribuer à l\'atteinte des objectifs de chiffre d\'affaires et de satisfaction client',
  ],
  profil: [
    'Étudiant(e) en Bac+2/3 en commerce, vente ou management de la distribution',
    'Première expérience en vente ou en contact client appréciée',
    'Excellente présentation et aisance relationnelle indispensables',
    'Anglais conversationnel apprécié (clientèle internationale ponctuelle)',
  ],
}

const motsClesAttendus = ['vente conseil', 'CRM', 'merchandising', 'fidélisation', 'chiffre d\'affaires', 'présentation']

// ─── Exercice 1 — Quiz de décodage de l'offre ───
const quizOffre = [
  {
    question: 'Dans l\'offre, "Anglais conversationnel apprécié" signifie :',
    options: ['C\'est un critère bloquant', 'C\'est un plus, pas un critère éliminatoire', 'Il faut un niveau bilingue obligatoire'],
    bonne: 1,
    explication: '"Apprécié" = un plus qui valorise la candidature, mais ce n\'est jamais un filtre d\'entrée contrairement à "requis" ou "indispensable".',
  },
  {
    question: 'Qu\'est-ce que la "vente conseil" mentionnée dans l\'offre ?',
    options: ['Vendre le produit le plus cher en priorité', 'Écouter le besoin du client avant de proposer une solution adaptée', 'Suivre un script de vente sans l\'adapter'],
    bonne: 1,
    explication: 'En vente haut de gamme, on ne vend pas un produit : on répond à un besoin identifié par l\'écoute.',
  },
  {
    question: 'Le mot "CRM" dans une offre de vente en boutique signifie que :',
    options: ['L\'entreprise n\'a pas de outils numériques', 'Un outil de gestion de la relation client est utilisé pour suivre achats et préférences', 'C\'est un logiciel de comptabilité uniquement'],
    bonne: 1,
    explication: 'Même en boutique physique, les enseignes utilisent des outils CRM pour enregistrer les achats et relancer les clients.',
  },
  {
    question: 'Avant un entretien pour ce poste, la meilleure préparation est de :',
    options: ['Apprendre une présentation générique de soi', 'Visiter la boutique et comprendre le positionnement de la marque', 'Préparer uniquement des questions sur le salaire'],
    bonne: 1,
    explication: 'Pour un poste en boutique haut de gamme, ne pas connaître l\'enseigne se voit immédiatement en entretien.',
  },
]

// ─── Exercice 2 — Piège ou pas piège (offres suspectes) ───
const offresAAnalyser = [
  { texte: 'Rémunération : gratification légale de stage + tickets restaurant + 50 % pass Navigo.', piege: false, explication: 'C\'est un descriptif de rémunération précis et conforme à la légalité du stage. Rien de suspect.' },
  { texte: 'Rémunération : "à négocier selon profil, potentiel très élevé". Aucun montant précisé.', piege: true, explication: 'Une offre sérieuse indique toujours une fourchette ou un montant, même approximatif. Le flou sur la rémunération est un signal d\'alerte.' },
  { texte: 'Pour valider votre candidature, merci de verser des frais de dossier de 50 €.', piege: true, explication: 'Un employeur ne demande jamais d\'argent à un candidat. C\'est une arnaque classique à signaler.' },
  { texte: 'L\'entreprise précise son adresse, son secteur d\'activité et le nom du tuteur de stage.', piege: false, explication: 'Une offre transparente donne des informations vérifiables sur l\'entreprise et l\'encadrement du stage.' },
  { texte: '"Gagnez jusqu\'à 3000 €/mois dès votre premier stage, sans expérience requise."', piege: true, explication: 'Une promesse de rémunération largement supérieure aux plafonds légaux de stage, sans lien avec l\'expérience, est un signal d\'alerte classique.' },
  { texte: 'L\'offre précise les missions concrètes du stage et les compétences recherchées.', piege: false, explication: 'Des missions précises et des compétences définies sont les signes d\'une offre construite et légitime.' },
]

// ─── Exercice 3 ───
const argumentsAAttendre = [
  'En quoi cette offre correspond à votre projet professionnel',
  'Quelles compétences de votre parcours y sont directement utiles',
  'Ce que vous espérez apprendre pendant ce stage',
]

type StepDef = { n: 1 | 2 | 3; label: string; badge: '✅' | '🛫' }
const STEPS: StepDef[] = [
  { n: 1, label: 'Décoder l\'offre', badge: '✅' },
  { n: 2, label: 'Piège ou pas', badge: '✅' },
  { n: 3, label: 'Mon offre', badge: '🛫' },
]

export default function CP4_LectureOffre() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)
  const [briefingOuvert, setBriefingOuvert] = useState(true)

  // Exercice 1
  const [reponsesQuiz, setReponsesQuiz] = useState<(number | null)[]>(Array(quizOffre.length).fill(null))
  const [ex1Valide, setEx1Valide] = useState(false)

  // Exercice 2
  const [ex2Index, setEx2Index] = useState(0)
  const [ex2Reponse, setEx2Reponse] = useState<boolean | null>(null)
  const [ex2Termine, setEx2Termine] = useState(false)

  // Exercice 3
  const [argumentsCoches, setArgumentsCoches] = useState<boolean[]>(Array(argumentsAAttendre.length).fill(false))
  const [appele, setAppele] = useState(false)

  const toutesRepondues = reponsesQuiz.every(r => r !== null)
  const offreActuelle = offresAAnalyser[ex2Index]

  function choisirQuiz(qIndex: number, oIndex: number) {
    if (ex1Valide) return
    setReponsesQuiz(prev => prev.map((v, i) => i === qIndex ? oIndex : v))
  }

  function repondreEx2(rep: boolean) {
    if (ex2Reponse !== null) return
    setEx2Reponse(rep)
  }

  function suivantEx2() {
    if (ex2Index < offresAAnalyser.length - 1) {
      setEx2Index(i => i + 1)
      setEx2Reponse(null)
    } else {
      setEx2Termine(true)
    }
  }

  function toggleArgument(i: number) {
    setArgumentsCoches(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 4 — Choisir son itinéraire
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Décrypter une offre</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Tableau des départs — choisissez votre destination de stage
        </p>
      </div>

      {/* Briefing — offre de référence, consultable à tout moment */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
        <button onClick={() => setBriefingOuvert(v => !v)} className="w-full px-5 py-3 flex items-center justify-between" style={{ backgroundColor: '#0f1e3d' }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>✈ Briefing — l&apos;offre de référence</p>
          <span style={{ color: '#c9a84c' }}>{briefingOuvert ? '−' : '+'}</span>
        </button>
        {briefingOuvert && (
          <div className="p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div>
              <p className="text-base font-black text-white">{offre.poste}</p>
              <p className="text-sm" style={{ color: '#c9a84c' }}>{offre.entreprise} — {offre.localisation}</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{offre.presentation}</p>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(201,168,76,0.65)' }}>Missions</p>
              <ul className="space-y-1">
                {offre.missions.map((m, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'rgba(245,240,232,0.75)' }}>
                    <span style={{ color: '#c9a84c' }}>›</span>{m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(201,168,76,0.65)' }}>Profil recherché</p>
              <ul className="space-y-1">
                {offre.profil.map((p, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'rgba(245,240,232,0.75)' }}>
                    <span style={{ color: '#c9a84c' }}>›</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {motsClesAttendus.map((m, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#e8c96a' }}>{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <ExerciseStepper etape={etape} steps={STEPS} />

      {/* ═══ EXERCICE 1 — Décoder l'offre ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={1}
            titre="Décoder l'offre"
            consigne="Une offre cache toujours ses vrais critères dans quelques mots-clés. Discutez en équipage puis répondez."
            mode="cdb"
          />

          <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {quizOffre.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-semibold text-white">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const estChoisie = reponsesQuiz[qi] === oi
                    const estBonne = oi === q.bonne
                    let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)'
                    if (ex1Valide) {
                      if (estBonne) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71' }
                      else if (estChoisie) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c' }
                      else textColor = 'rgba(245,240,232,0.25)'
                    } else if (estChoisie) {
                      bg = 'rgba(201,168,76,0.12)'; border = 'rgba(201,168,76,0.4)'
                    }
                    return (
                      <button key={oi} onClick={() => choisirQuiz(qi, oi)} disabled={ex1Valide}
                        className="w-full text-left rounded-xl px-4 py-2.5 text-sm transition-all"
                        style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {ex1Valide && <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>{q.explication}</p>}
              </div>
            ))}

            {!ex1Valide ? (
              <button onClick={() => setEx1Valide(true)} disabled={!toutesRepondues}
                className="w-full py-3 rounded-xl font-black uppercase tracking-wider disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                Valider mes réponses
              </button>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setEtape(2)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                  Mots-clés repérés — Exercice 2 →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={2}
            titre="Piège ou pas piège"
            consigne="Toutes les offres ne se valent pas. Repérez celles qui cachent un signal d'alerte."
            mode="cdb"
          />

          {!ex2Termine ? (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>Offre {ex2Index + 1} sur {offresAAnalyser.length}</p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(ex2Index / offresAAnalyser.length) * 100}%`, background: '#c9a84c' }} />
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <p className="text-sm leading-relaxed italic text-white">&ldquo;{offreActuelle.texte}&rdquo;</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: '⚠️ Piège', val: true }, { label: '✓ OK', val: false }].map(({ label, val }) => {
                    const isCorrect = ex2Reponse !== null && val === offreActuelle.piege
                    const isWrong = ex2Reponse === val && val !== offreActuelle.piege
                    let bg = 'rgba(255,255,255,0.05)', border = 'rgba(255,255,255,0.1)', textColor = 'rgba(245,240,232,0.8)'
                    if (ex2Reponse !== null) {
                      if (isCorrect) { bg = 'rgba(46,204,113,0.12)'; border = 'rgba(46,204,113,0.5)'; textColor = '#2ecc71' }
                      else if (isWrong) { bg = 'rgba(231,76,60,0.12)'; border = 'rgba(231,76,60,0.5)'; textColor = '#e74c3c' }
                      else textColor = 'rgba(245,240,232,0.25)'
                    }
                    return (
                      <button key={label} onClick={() => repondreEx2(val)} disabled={ex2Reponse !== null}
                        className="rounded-xl py-3 px-3 text-sm font-bold transition-all text-center"
                        style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}>
                        {label}
                      </button>
                    )
                  })}
                </div>
                {ex2Reponse !== null && (
                  <div className="mt-4 rounded-xl p-4 space-y-3" style={{ background: 'rgba(15,30,61,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>{offreActuelle.explication}</p>
                    <button onClick={suivantEx2} className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider" style={{ background: '#c9a84c', color: '#0f1e3d' }}>
                      {ex2Index < offresAAnalyser.length - 1 ? 'Offre suivante →' : 'Terminer l\'exercice →'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Exercice terminé</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
                Retenez les signaux d&apos;alerte identifiés, réutilisables pour trier vos propres candidatures.
              </p>
              <button onClick={() => setEtape(3)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
                Contrôle de sûreté passé — Exercice 3 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeader
            numero={3}
            titre="Destination confirmée — mon choix d'offre"
            consigne="Quelle destination pour votre stage ? Présentez votre choix à la tour de contrôle."
            mode="tdc"
          />

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="px-5 py-3" style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>Arguments à préparer sur une offre réelle</p>
            </div>
            <div className="p-5 space-y-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              {argumentsAAttendre.map((label, i) => (
                <button key={i} onClick={() => toggleArgument(i)} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                  style={{ background: argumentsCoches[i] ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${argumentsCoches[i] ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: argumentsCoches[i] ? '#c9a84c' : 'transparent', border: `2px solid ${argumentsCoches[i] ? '#c9a84c' : 'rgba(255,255,255,0.2)'}` }}>
                    {argumentsCoches[i] && <span className="text-xs font-black" style={{ color: '#0f1e3d' }}>✓</span>}
                  </span>
                  <span className="text-sm" style={{ color: argumentsCoches[i] ? '#e8c96a' : 'rgba(245,240,232,0.6)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <TourDeControleAppel
            appele={appele}
            onAppeler={() => setAppele(true)}
            texteAttente="Votre équipage a choisi sa destination. Votre intervenante va challenger la pertinence réelle de ce choix pour votre projet professionnel."
          />
        </div>
      )}
    </div>
  )
}
