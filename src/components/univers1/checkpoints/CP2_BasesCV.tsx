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
    <div className="space-y-6">

      {/* Header */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 2 — Les bases du CV
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">
          Préparer ses bagages
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Ce qui fait la différence entre un CV ignoré et un CV lu
        </p>
      </div>

      {/* Bon / Mauvais réflexe — style déclaration douanière */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <span style={{ color: '#c9a84c' }}>🛂</span>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            Déclaration douanière — CV
          </p>
        </div>
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setToggle('mauvais')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: toggle === 'mauvais' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${toggle === 'mauvais' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: toggle === 'mauvais' ? '#fca5a5' : 'rgba(245,240,232,0.4)',
              }}
            >
              ✗ À déclarer
            </button>
            <button
              onClick={() => setToggle('bon')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: toggle === 'bon' ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${toggle === 'bon' ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: toggle === 'bon' ? '#6ee7b7' : 'rgba(245,240,232,0.4)',
              }}
            >
              ✓ Autorisé
            </button>
          </div>
          <div className="space-y-3">
            {bonMauvais.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4 transition-all"
                style={{
                  background: toggle === 'mauvais' ? 'rgba(239,68,68,0.07)' : 'rgba(52,211,153,0.07)',
                  border: `1px solid ${toggle === 'mauvais' ? 'rgba(239,68,68,0.2)' : 'rgba(52,211,153,0.2)'}`,
                }}
              >
                <p
                  className="font-semibold text-sm leading-relaxed"
                  style={{ color: toggle === 'mauvais' ? '#fca5a5' : '#6ee7b7' }}
                >
                  {toggle === 'mauvais' ? `✗ "${item.mauvais}"` : `✓ "${item.bon}"`}
                </p>
                <p className="text-xs mt-2" style={{ color: 'rgba(245,240,232,0.5)' }}>{item.explication}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conseils — style liste de bagages */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <span style={{ color: '#c9a84c' }}>🧳</span>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            Contenu des bagages — 10 conseils essentiels
          </p>
        </div>
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conseilsCV.map((conseil, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl p-3"
                style={{
                  background: 'rgba(201,168,76,0.05)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>{conseil}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist interactive */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: '#c9a84c' }}>✅</span>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
              Liste de bagages à valider
            </p>
          </div>
          <span className="font-black" style={{ color: '#e8c96a' }}>
            {score}<span style={{ color: 'rgba(232,201,106,0.4)' }}>/{checklistItems.length}</span>
          </span>
        </div>
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {/* Barre de progression dorée */}
          <div className="w-full rounded-full h-2 mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(score / checklistItems.length) * 100}%`,
                background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
              }}
            />
          </div>
          <div className="space-y-2">
            {checklistItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                style={{
                  background: checkList[i] ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${checkList[i] ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: checkList[i] ? '#c9a84c' : 'transparent',
                    border: `2px solid ${checkList[i] ? '#c9a84c' : 'rgba(255,255,255,0.2)'}`,
                  }}
                >
                  {checkList[i] && <span className="text-xs font-black" style={{ color: '#0f1e3d' }}>✓</span>}
                </span>
                <span
                  className="text-sm"
                  style={{ color: checkList[i] ? '#e8c96a' : 'rgba(245,240,232,0.6)' }}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
          {score === checklistItems.length && (
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <p className="font-black uppercase tracking-wider" style={{ color: '#e8c96a' }}>
                ✈ Ton CV est prêt à décoller !
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dans la tête du recruteur — style agent d'embarquement */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#0f1e3d', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <span style={{ color: '#c9a84c' }}>🎫</span>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            Conseils de l&apos;agent d&apos;embarquement
          </p>
        </div>
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs mb-4" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Tape sur une astuce pour la découvrir.
          </p>
          <div className="space-y-2">
            {astuceRecruteur.map((astuce, i) => (
              <button
                key={i}
                onClick={() => toggleAstuce(i)}
                className="w-full rounded-xl text-left transition-all overflow-hidden"
                style={{
                  background: astucesOuvertes[i] ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${astucesOuvertes[i] ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: astucesOuvertes[i] ? '#e8c96a' : 'rgba(245,240,232,0.6)' }}>
                    Astuce #{i + 1}
                  </span>
                  <span style={{ color: '#c9a84c' }}>{astucesOuvertes[i] ? '−' : '+'}</span>
                </div>
                {astucesOuvertes[i] && (
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.8)' }}>
                      &ldquo;{astuce}&rdquo;
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
