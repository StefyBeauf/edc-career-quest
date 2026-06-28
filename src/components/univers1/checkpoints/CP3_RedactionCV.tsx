'use client'

import { useState } from 'react'
import { formulationsCV } from '@/lib/content/univers1'

const checklistEnvoi = [
  'J\'ai adapté mon CV à cette offre spécifique',
  'J\'ai utilisé des mots-clés de la fiche de poste',
  'Chaque expérience commence par un verbe d\'action',
  'J\'ai au moins un résultat chiffré ou quantifié',
  'Mon email et téléphone sont à jour et visibles',
  'J\'ai relu mon CV au moins 3 fois',
  'Quelqu\'un d\'autre a relu mon CV',
  'Le fichier est en PDF nommé NOM_Prénom_CV.pdf',
  'Le CV fait maximum 1 page',
  'Je suis capable de justifier chaque ligne en entretien',
]

const structureCV = [
  {
    section: 'En-tête',
    couleur: 'sky',
    contenu: 'Prénom NOM (grand), Titre du poste visé, Téléphone, Email pro, LinkedIn, Mobilité : Île-de-France',
    piege: 'Éviter la photo sauf si demandée, et jamais de date de naissance.',
  },
  {
    section: 'Accroche (optionnelle)',
    couleur: 'blue',
    contenu: '2-3 lignes max résumant votre profil et votre objectif professionnel',
    piege: 'Éviter les formules creuses : "étudiant dynamique et motivé".',
  },
  {
    section: 'Formation',
    couleur: 'indigo',
    contenu: 'Diplôme — Établissement — Ville — Année (anti-chronologique)',
    piege: 'Pour un profil junior, la formation vient AVANT les expériences.',
  },
  {
    section: 'Expériences',
    couleur: 'sky',
    contenu: 'Intitulé poste — Entreprise — Durée / Dates — 3-5 missions clés avec verbes d\'action',
    piege: 'Chaque ligne = action + résultat concret si possible.',
  },
  {
    section: 'Compétences',
    couleur: 'blue',
    contenu: 'Langues (niveau réel), Informatique (outils précis), Compétences métier',
    piege: 'Ne jamais mentir sur les langues. Le recruteur peut tester.',
  },
  {
    section: 'Centres d\'intérêt',
    couleur: 'indigo',
    contenu: 'Activités montrant curiosité, leadership, engagement, créativité',
    piege: 'Éviter "voyages, cinéma, musique" — trop génériques.',
  },
]

const couleurMap: Record<string, string> = {
  sky: 'bg-sky-900/30 border-sky-400/20',
  blue: 'bg-blue-900/30 border-blue-400/20',
  indigo: 'bg-indigo-900/30 border-indigo-400/20',
}

const titreMap: Record<string, string> = {
  sky: 'text-sky-300',
  blue: 'text-blue-300',
  indigo: 'text-indigo-300',
}

export default function CP3_RedactionCV() {
  const [checkList, setCheckList] = useState<boolean[]>(Array(checklistEnvoi.length).fill(false))
  const [notes, setNotes] = useState('')
  const [exemplesOuverts, setExemplesOuverts] = useState<boolean[]>(Array(formulationsCV.length).fill(false))

  function toggleCheck(i: number) {
    setCheckList(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  function toggleExemple(i: number) {
    setExemplesOuverts(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  const score = checkList.filter(Boolean).length

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Rédiger son CV</h2>
        <p className="text-sky-200 text-sm">Structure, formulations et pièges à éviter</p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Structure idéale d&apos;un CV junior</p>
        <div className="space-y-3">
          {structureCV.map((section, i) => (
            <div key={i} className={`rounded-xl border p-4 ${couleurMap[section.couleur]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${titreMap[section.couleur]}`}>
                  {i + 1}. {section.section}
                </span>
              </div>
              <p className="text-sky-100 text-sm">{section.contenu}</p>
              <p className="text-orange-300 text-xs mt-2 italic">⚠ {section.piege}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Exemples de formulations</p>
        <p className="text-sky-200 text-sm mb-4">Clique pour voir l&apos;exemple complet.</p>
        <div className="space-y-2">
          {formulationsCV.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleExemple(i)}
              className="w-full text-left rounded-xl border border-white/10 overflow-hidden"
            >
              <div className={`px-4 py-3 transition-colors ${exemplesOuverts[i] ? 'bg-sky-900/40' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sky-300 text-xs font-semibold uppercase tracking-wider">{item.type}</span>
                  <span className="text-sky-400 text-lg">{exemplesOuverts[i] ? '−' : '+'}</span>
                </div>
                {exemplesOuverts[i] && (
                  <p className="text-white text-sm mt-2 font-medium leading-relaxed">"{item.exemple}"</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">Zone de travail personnel</p>
        <p className="text-sky-200 text-sm mb-3">Note ici tes idées de formulations, tes expériences à valoriser, tes compétences clés.</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Écris ici ce que tu pourrais mettre sur ton CV... Expériences, compétences, résultats dont tu es fier(e), centres d'intérêt pertinents..."
          className="w-full min-h-40 rounded-xl bg-white/5 border border-white/10 text-sky-100 placeholder:text-sky-400/50 p-4 text-sm resize-y focus:outline-none focus:border-sky-400/50"
        />
        <p className="text-sky-400 text-xs mt-2">{notes.length} caractères saisis (ces notes ne sont pas sauvegardées)</p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Checklist avant envoi</p>
          <span className="text-sm font-bold text-white">{score} / {checklistEnvoi.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-5">
          <div
            className="bg-gradient-to-r from-sky-400 to-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(score / checklistEnvoi.length) * 100}%` }}
          />
        </div>
        <div className="space-y-2">
          {checklistEnvoi.map((item, i) => (
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
        {score === checklistEnvoi.length && (
          <div className="mt-4 rounded-xl bg-green-500/10 border border-green-400/30 p-4 text-center">
            <p className="text-green-300 font-semibold">CV prêt à envoyer. Bonne chance !</p>
          </div>
        )}
      </div>
    </div>
  )
}
