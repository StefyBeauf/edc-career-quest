'use client'

import { useState, useEffect } from 'react'
import { entreprises, Entreprise } from '@/lib/content/univers1'

const conseilsJour = [
  'En BtoB, le cycle de vente est long car plusieurs personnes doivent valider la décision. Patience et suivi sont clés.',
  'Connaître le modèle économique d\'une entreprise avant un entretien montre votre sérieux et votre préparation.',
  'BtoC = volume et rapidité. BtoB = relation et expertise. Ces deux logiques demandent des compétences commerciales différentes.',
  'Beaucoup d\'entreprises mélangent BtoB et BtoC : c\'est le modèle BtoBtoC. Orange, Amazon et L\'Oréal en sont des exemples.',
  'Lors d\'un stage en entreprise, comprendre qui sont les clients réels vous permet de mieux comprendre vos missions.',
  'Le chiffre d\'affaires d\'une entreprise BtoB est souvent concentré sur un petit nombre de grands clients stratégiques.',
  'En entretien, citer un client connu de l\'entreprise montre que vous avez fait des recherches. C\'est très valorisé.',
  'Le secteur BtoB représente plus de 60 % du commerce mondial. C\'est le premier marché à maîtriser pour beaucoup de métiers.',
  'La fidélisation d\'un client BtoB coûte 5 à 7 fois moins cher que l\'acquisition d\'un nouveau client. D\'où l\'importance du suivi.',
  'Avant un stage ou alternance, repérez si l\'entreprise vend à des professionnels ou au grand public. Votre rôle sera très différent.',
]

const quizQuestions = [
  {
    question: 'Une entreprise qui vend des logiciels de comptabilité à des cabinets d\'experts-comptables est :',
    options: ['BtoC', 'BtoB', 'BtoBtoC'],
    reponse: 1,
    explication: 'Elle vend exclusivement à des professionnels (les cabinets), pas aux particuliers. C\'est bien du BtoB.',
  },
  {
    question: 'Netflix propose des abonnements directement aux particuliers. Son modèle est :',
    options: ['BtoB', 'BtoC', 'BtoBtoC'],
    reponse: 1,
    explication: 'Netflix vend directement au consommateur final (vous !). C\'est un modèle BtoC pur.',
  },
  {
    question: 'Amazon vend à la fois aux particuliers et aux entreprises (via AWS et Marketplace). C\'est un modèle :',
    options: ['BtoB uniquement', 'BtoC uniquement', 'BtoBtoC'],
    reponse: 2,
    explication: 'Amazon combine les deux : boutique grand public (BtoC) et services cloud pour entreprises (BtoB). D\'où le BtoBtoC.',
  },
  {
    question: 'Quel élément est caractéristique du cycle de vente BtoB ?',
    options: ['Achat impulsif et rapide', 'Plusieurs décisionnaires impliqués', 'Prix fixé à l\'avance'],
    reponse: 1,
    explication: 'En BtoB, les décisions d\'achat impliquent souvent plusieurs personnes (acheteur, direction, finance), ce qui allonge le cycle.',
  },
  {
    question: 'Un distributeur grossiste qui vend des produits alimentaires à des supermarchés est :',
    options: ['BtoC', 'BtoB', 'BtoBtoC'],
    reponse: 1,
    explication: 'Il vend aux supermarchés (entreprises), pas aux consommateurs finaux. C\'est du BtoB — même si les produits finissent chez le grand public.',
  },
]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const badgeCouleur: Record<string, { bg: string; text: string; border: string; label: string }> = {
  BtoB: { bg: '#1a2744', text: '#93c5fd', border: 'rgba(59,130,246,0.3)', label: 'PROFESSIONNEL' },
  BtoC: { bg: '#1a2744', text: '#67e8f9', border: 'rgba(6,182,212,0.3)', label: 'GRAND PUBLIC' },
  BtoBtoC: { bg: '#1a2744', text: '#c4b5fd', border: 'rgba(139,92,246,0.3)', label: 'HYBRIDE' },
}

export default function CP1_MondeEntreprise() {
  const [exemplesAffiches, setExemplesAffiches] = useState<Entreprise[]>([])
  const [conseil, setConseil] = useState('')
  const [filtre, setFiltre] = useState<'tous' | 'BtoB' | 'BtoC' | 'BtoBtoC'>('tous')
  const [quizIndex, setQuizIndex] = useState(0)
  const [reponseChoisie, setReponseChoisie] = useState<number | null>(null)
  const [quizTermine, setQuizTermine] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setExemplesAffiches(shuffle(entreprises).slice(0, 12))
    setConseil(conseilsJour[Math.floor(Math.random() * conseilsJour.length)])
  }, [])

  const entreprisesFiltrees = filtre === 'tous'
    ? exemplesAffiches
    : exemplesAffiches.filter(e => e.type === filtre)

  const question = quizQuestions[quizIndex]

  function choisirReponse(index: number) {
    if (reponseChoisie !== null) return
    setReponseChoisie(index)
    if (index === question.reponse) {
      setScore(s => s + 1)
    }
  }

  function questionSuivante() {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(i => i + 1)
      setReponseChoisie(null)
    } else {
      setQuizTermine(true)
    }
  }

  function relancerQuiz() {
    setQuizIndex(0)
    setReponseChoisie(null)
    setQuizTermine(false)
    setScore(0)
  }

  return (
    <div className="space-y-6">

      {/* Header section */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 1 — Monde de l&apos;entreprise
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">
          Comprendre le terrain
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          BtoB, BtoC, BtoBtoC — les modèles qui comptent avant ton stage
        </p>
      </div>

      {/* Mini-cours — style tampons de passeport */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a84c' }}>
          Tampons de passeport
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              type: 'BtoB',
              full: 'Business to Business',
              desc: 'Une entreprise vend à une autre entreprise. Cycle de vente long, plusieurs décisionnaires, relation sur la durée.',
              ex: 'Airbus vend des avions à Air France',
              color: '#3b82f6',
            },
            {
              type: 'BtoC',
              full: 'Business to Consumer',
              desc: 'Une entreprise vend directement au grand public. Volume élevé, décision rapide, marketing de masse.',
              ex: 'Zara vend ses vêtements en boutique',
              color: '#06b6d4',
            },
            {
              type: 'BtoBtoC',
              full: 'Les deux à la fois',
              desc: 'L\'entreprise a des clients professionnels ET des particuliers. Stratégies différentes selon la cible.',
              ex: 'Orange — forfaits pro + particuliers',
              color: '#8b5cf6',
            },
          ].map((item) => (
            <div
              key={item.type}
              className="rounded-xl p-4 flex gap-4 items-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(${item.color === '#3b82f6' ? '59,130,246' : item.color === '#06b6d4' ? '6,182,212' : '139,92,246'},0.25)`,
              }}
            >
              {/* Tampon circulaire */}
              <div
                className="w-14 h-14 rounded-full flex-shrink-0 flex flex-col items-center justify-center"
                style={{
                  border: `2px solid ${item.color}`,
                  opacity: 0.9,
                }}
              >
                <span className="text-xs font-black" style={{ color: item.color }}>
                  {item.type}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">{item.full}</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.6)' }}>{item.desc}</p>
                <p className="text-xs mt-2 italic" style={{ color: item.color }}>Ex : {item.ex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exemples d'entreprises */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <p className="text-sm font-bold uppercase tracking-wider text-white">Destinations connues</p>
          <div className="flex gap-2 flex-wrap">
            {(['tous', 'BtoB', 'BtoC', 'BtoBtoC'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: filtre === f ? '#c9a84c' : 'rgba(255,255,255,0.06)',
                  color: filtre === f ? '#0f1e3d' : 'rgba(201,168,76,0.7)',
                  border: `1px solid ${filtre === f ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
                }}
              >
                {f === 'tous' ? 'Tous' : f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {entreprisesFiltrees.map(e => {
            const style = badgeCouleur[e.type]
            return (
              <div
                key={e.nom}
                className="rounded-xl p-4 flex flex-col gap-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${style.border}`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-bold text-sm">{e.nom}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0"
                    style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                  >
                    {e.type}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#c9a84c', opacity: 0.7 }}>
                  {e.secteur}
                </span>
                <p className="text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>{e.exemple}</p>
              </div>
            )
          })}
        </div>
        {entreprisesFiltrees.length === 0 && (
          <p className="text-center py-4" style={{ color: 'rgba(245,240,232,0.4)' }}>Aucune entreprise dans cette catégorie.</p>
        )}
      </div>

      {/* Quiz — style destinations à choisir */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <div
          className="px-5 py-3"
          style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            Quiz — Choisissez votre destination
          </p>
        </div>
        <div className="p-5">
          {!quizTermine ? (
            <div>
              <p className="text-xs mb-3" style={{ color: 'rgba(245,240,232,0.4)' }}>
                Question {quizIndex + 1} / {quizQuestions.length}
              </p>
              <p className="text-white font-semibold mb-4 leading-relaxed">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((opt, i) => {
                  let bg = 'rgba(255,255,255,0.05)'
                  let border = 'rgba(255,255,255,0.1)'
                  let color = 'rgba(245,240,232,0.8)'
                  if (reponseChoisie !== null) {
                    if (i === question.reponse) {
                      bg = 'rgba(52,211,153,0.1)'
                      border = 'rgba(52,211,153,0.4)'
                      color = '#6ee7b7'
                    } else if (i === reponseChoisie) {
                      bg = 'rgba(248,113,113,0.1)'
                      border = 'rgba(248,113,113,0.4)'
                      color = '#fca5a5'
                    } else {
                      color = 'rgba(245,240,232,0.3)'
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => choisirReponse(i)}
                      className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all flex items-center gap-3"
                      style={{ backgroundColor: bg, border: `1px solid ${border}`, color }}
                    >
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {reponseChoisie !== null && (
                <div
                  className="mt-4 rounded-xl p-4"
                  style={{ backgroundColor: 'rgba(15,30,61,0.6)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>
                    {question.explication}
                  </p>
                  <button
                    onClick={questionSuivante}
                    className="mt-3 px-5 py-2 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                    style={{ backgroundColor: '#c9a84c', color: '#0f1e3d' }}
                  >
                    {quizIndex < quizQuestions.length - 1 ? 'Question suivante →' : 'Voir mon score'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <p
                className="text-5xl font-black"
                style={{ color: '#e8c96a' }}
              >
                {score}<span className="text-2xl" style={{ color: 'rgba(232,201,106,0.5)' }}>/{quizQuestions.length}</span>
              </p>
              <p className="font-semibold" style={{ color: 'rgba(245,240,232,0.7)' }}>
                {score === quizQuestions.length
                  ? 'Parfait ! Tu maîtrises les bases BtoB / BtoC.'
                  : score >= 3
                  ? 'Bien joué ! Quelques points à revoir.'
                  : 'Relis le mini-cours et retente ta chance.'}
              </p>
              <button
                onClick={relancerQuiz}
                className="px-6 py-2 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                style={{ backgroundColor: '#c9a84c', color: '#0f1e3d' }}
              >
                Rejouer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conseil du commandant de bord */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.25)' }}
      >
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#0f1e3d' }}
        >
          <span style={{ color: '#c9a84c' }}>✈</span>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            Message du commandant de bord
          </p>
        </div>
        <div
          className="px-5 py-4"
          style={{ background: 'rgba(15,30,61,0.6)' }}
        >
          <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.8)' }}>
            &ldquo;{conseil}&rdquo;
          </p>
        </div>
      </div>

    </div>
  )
}
