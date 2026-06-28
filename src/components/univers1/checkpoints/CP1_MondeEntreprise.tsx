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

  const badgeCouleur: Record<string, string> = {
    BtoB: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
    BtoC: 'bg-sky-500/20 text-sky-200 border-sky-500/30',
    BtoBtoC: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30',
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Le monde de l&apos;entreprise</h2>
        <p className="text-sky-200 text-sm">Comprends la différence BtoB / BtoC avant ton stage</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-400/20 p-5">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">Mini-cours</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-blue-900/40 border border-blue-500/20 p-4">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">BtoB</span>
            <p className="text-white font-semibold mt-1">Business to Business</p>
            <p className="text-sky-200 text-sm mt-2">Une entreprise vend à une autre entreprise. Cycle de vente long, plusieurs décisionnaires, relation sur la durée.</p>
            <p className="text-blue-300 text-xs mt-2 italic">Ex : Airbus vend des avions à Air France</p>
          </div>
          <div className="rounded-xl bg-sky-900/40 border border-sky-500/20 p-4">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">BtoC</span>
            <p className="text-white font-semibold mt-1">Business to Consumer</p>
            <p className="text-sky-200 text-sm mt-2">Une entreprise vend directement au grand public. Volume élevé, décision rapide, marketing de masse.</p>
            <p className="text-sky-300 text-xs mt-2 italic">Ex : Zara vend ses vêtements en boutique</p>
          </div>
          <div className="rounded-xl bg-indigo-900/40 border border-indigo-500/20 p-4">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">BtoBtoC</span>
            <p className="text-white font-semibold mt-1">Les deux à la fois</p>
            <p className="text-sky-200 text-sm mt-2">L&apos;entreprise a des clients professionnels ET des particuliers. Stratégies différentes selon la cible.</p>
            <p className="text-indigo-300 text-xs mt-2 italic">Ex : Orange — forfaits pro + particuliers</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold">Exemples d&apos;entreprises</p>
          <div className="flex gap-2 flex-wrap">
            {(['tous', 'BtoB', 'BtoC', 'BtoBtoC'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filtre === f
                    ? 'bg-sky-500 text-white'
                    : 'bg-white/10 text-sky-200 hover:bg-white/20'
                }`}
              >
                {f === 'tous' ? 'Tous' : f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entreprisesFiltrees.map(e => (
            <div key={e.nom} className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{e.nom}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeCouleur[e.type]}`}>{e.type}</span>
              </div>
              <span className="text-sky-400 text-xs">{e.secteur}</span>
              <p className="text-sky-200 text-sm">{e.exemple}</p>
            </div>
          ))}
        </div>
        {entreprisesFiltrees.length === 0 && (
          <p className="text-center text-sky-300 py-4">Aucune entreprise dans cette catégorie pour cet échantillon.</p>
        )}
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Quiz — Sauras-tu identifier le modèle ?</p>
        {!quizTermine ? (
          <div>
            <p className="text-xs text-sky-400 mb-2">Question {quizIndex + 1} / {quizQuestions.length}</p>
            <p className="text-white font-medium mb-4">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((opt, i) => {
                let style = 'bg-white/5 border-white/10 text-sky-100 hover:bg-white/10'
                if (reponseChoisie !== null) {
                  if (i === question.reponse) style = 'bg-green-500/20 border-green-400/40 text-green-200'
                  else if (i === reponseChoisie) style = 'bg-red-500/20 border-red-400/40 text-red-200'
                }
                return (
                  <button
                    key={i}
                    onClick={() => choisirReponse(i)}
                    className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all ${style}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {reponseChoisie !== null && (
              <div className="mt-4 rounded-xl bg-sky-900/40 border border-sky-400/20 p-4">
                <p className="text-sky-200 text-sm">{question.explication}</p>
                <button
                  onClick={questionSuivante}
                  className="mt-3 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"
                >
                  {quizIndex < quizQuestions.length - 1 ? 'Question suivante' : 'Voir mon score'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-3xl font-bold text-white">{score} / {quizQuestions.length}</p>
            <p className="text-sky-200">
              {score === quizQuestions.length
                ? 'Parfait ! Tu maîtrises les bases BtoB / BtoC.'
                : score >= 3
                ? 'Bien joué ! Quelques points à revoir.'
                : 'Relis le mini-cours et retente ta chance.'}
            </p>
            <button
              onClick={relancerQuiz}
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"
            >
              Rejouer
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-indigo-500/10 to-sky-500/10 border border-indigo-400/20 p-5">
        <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">Conseil du jour</p>
        <p className="text-sky-100">{conseil}</p>
      </div>
    </div>
  )
}
