'use client'

import { useState } from 'react'
import { conseilsCV, astuceRecruteur } from '@/lib/content/univers1'

const checklistItems = [
  'Coordonnées complètes (téléphone, email professionnel, LinkedIn)',
  'Email présentable (prénom.nom@...)',
  'Une seule page (profil junior)',
  'Verbes d\'action en début de chaque expérience',
  'Au moins un résultat chiffré',
  'Compétences listées et vérifiables',
  'Niveaux de langue réels indiqués',
  'Formation présentée avec établissement, diplôme et année',
  'Centres d\'intérêt en lien avec votre profil',
  'Zéro faute d\'orthographe (relu 3 fois)',
  'Format PDF envoyé (pas Word)',
  'Nom de fichier professionnel : NOM_Prénom_CV.pdf',
]

const bonMauvais = [
  {
    mauvais: 'Passionné par les challenges',
    bon: 'A géré un budget de 2 000 € pour un projet associatif',
    explication: 'Préférer des faits concrets aux formules creuses.',
  },
  {
    mauvais: 'Très bon relationnel',
    bon: 'Animé des formations pour 15 collaborateurs sur un logiciel CRM',
    explication: 'Montrer plutôt que proclamer : une action vaut mieux qu\'un adjectif.',
  },
  {
    mauvais: 'Maîtrise d\'Excel',
    bon: 'Maîtrise d\'Excel (tableaux croisés dynamiques, formules INDEX/EQUIV)',
    explication: 'Préciser le niveau réel évite les surprises en entretien.',
  },
  {
    mauvais: 'Objectif : trouver un stage',
    bon: 'Candidat en PGE1 cherchant à développer des compétences en marketing digital dans une entreprise innovante',
    explication: 'L\'objectif doit montrer ce que vous apportez, pas ce que vous cherchez.',
  },
  {
    mauvais: 'Job d\'été dans un restaurant (juillet-août)',
    bon: 'Serveur — Restaurant Le Bistrot (2 mois) : accueil clientèle, gestion des commandes, travail en équipe en pic d\'activité',
    explication: 'Même une petite expérience se valorise avec des mots précis.',
  },
]

export default function CP2_BasesCV() {
  const [toggle, setToggle] = useState<'bon' | 'mauvais'>('mauvais')
  const [checkList, setCheckList] = useState<boolean[]>(Array(checklistItems.length).fill(false))
  const [astucesOuvertes, setAstucesOuvertes] = useState<boolean[]>(Array(astuceRecruteur.length).fill(false))

  function toggleCheck(i: number) {
    setCheckList(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  function toggleAstuce(i: number) {
    setAstucesOuvertes(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  const score = checkList.filter(Boolean).length

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Les bases du CV</h2>
        <p className="text-sky-200 text-sm">Ce qui fait la différence entre un CV ignoré et un CV lu</p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Bon réflexe / Mauvais réflexe</p>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setToggle('mauvais')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              toggle === 'mauvais' ? 'bg-red-500/30 border border-red-400/40 text-red-200' : 'bg-white/5 border border-white/10 text-sky-300'
            }`}
          >
            Mauvais réflexe
          </button>
          <button
            onClick={() => setToggle('bon')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              toggle === 'bon' ? 'bg-green-500/30 border border-green-400/40 text-green-200' : 'bg-white/5 border border-white/10 text-sky-300'
            }`}
          >
            Bon réflexe
          </button>
        </div>
        <div className="space-y-3">
          {bonMauvais.map((item, i) => (
            <div key={i} className={`rounded-xl border p-4 transition-all ${
              toggle === 'mauvais'
                ? 'bg-red-900/20 border-red-400/20'
                : 'bg-green-900/20 border-green-400/20'
            }`}>
              <p className={`font-medium text-sm ${toggle === 'mauvais' ? 'text-red-200' : 'text-green-200'}`}>
                {toggle === 'mauvais' ? `❌ "${item.mauvais}"` : `✓ "${item.bon}"`}
              </p>
              <p className="text-sky-200 text-xs mt-2">{item.explication}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">10 conseils essentiels</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {conseilsCV.map((conseil, i) => (
            <div key={i} className="flex gap-3 rounded-xl bg-sky-900/20 border border-sky-400/20 p-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500/30 flex items-center justify-center text-sky-300 text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-sky-100 text-sm leading-relaxed">{conseil}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Checklist CV interactive</p>
          <span className="text-sm font-bold text-white">{score} / {checklistItems.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-5">
          <div
            className="bg-gradient-to-r from-sky-400 to-indigo-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(score / checklistItems.length) * 100}%` }}
          />
        </div>
        <div className="space-y-2">
          {checklistItems.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                checkList[i]
                  ? 'bg-green-500/10 border-green-400/30 text-green-200'
                  : 'bg-white/5 border-white/10 text-sky-200 hover:bg-white/10'
              }`}
            >
              <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                checkList[i] ? 'bg-green-500 border-green-500' : 'border-white/30'
              }`}>
                {checkList[i] && <span className="text-white text-xs">✓</span>}
              </span>
              <span className="text-sm">{item}</span>
            </button>
          ))}
        </div>
        {score === checklistItems.length && (
          <div className="mt-4 rounded-xl bg-green-500/10 border border-green-400/30 p-4 text-center">
            <p className="text-green-300 font-semibold">Ton CV est prêt à décoller !</p>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Dans la tête du recruteur</p>
        <p className="text-sky-200 text-sm mb-4">Tape sur une astuce pour la découvrir.</p>
        <div className="space-y-3">
          {astuceRecruteur.map((astuce, i) => (
            <button
              key={i}
              onClick={() => toggleAstuce(i)}
              className="w-full rounded-xl border border-white/10 overflow-hidden text-left transition-all"
            >
              <div className={`px-4 py-3 transition-colors ${astucesOuvertes[i] ? 'bg-indigo-900/40' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sky-200 text-sm font-medium">Astuce recruteur #{i + 1}</span>
                  <span className="text-indigo-300 text-lg">{astucesOuvertes[i] ? '−' : '+'}</span>
                </div>
                {astucesOuvertes[i] && (
                  <p className="text-white text-sm mt-2 leading-relaxed">"{astuce}"</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
