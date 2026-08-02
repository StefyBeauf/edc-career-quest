'use client'

import { useState } from 'react'
import {
  JOBBOARDS, objectifsRecherche, fichesJobboards, PLAN_CHAMPS, PROFIL_ENQUETE,
  type ObjectifRecherche, type FicheJobboard,
} from '@/lib/content/univers2-cours4'
import ExerciseStepper from './shared/ExerciseStepper'
import ExerciseHeaderDetective from './shared/ExerciseHeaderDetective'
import DossierPaper from './shared/DossierPaper'

export default function Cours4EnqueteJobboards() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)

  // Exercice 1 — Quel jobboard pour quelle mission ?
  const [objectifIndex, setObjectifIndex] = useState(0)
  const [selection, setSelection] = useState<string[]>([])
  const [valide, setValide] = useState(false)
  const objectifCourant: ObjectifRecherche = objectifsRecherche[objectifIndex]

  function toggleJobboard(nom: string) {
    if (valide) return
    setSelection(prev => prev.includes(nom) ? prev.filter(j => j !== nom) : [...prev, nom])
  }

  function objectifSuivant() {
    if (objectifIndex < objectifsRecherche.length - 1) {
      setObjectifIndex(i => i + 1)
      setSelection([])
      setValide(false)
    } else {
      setEtape(2)
    }
  }

  // Exercice 2 — Fiche suspect jobboard
  const [ficheIndex, setFicheIndex] = useState(0)
  const [corrigeVisible, setCorrigeVisible] = useState(false)
  const ficheCourante: FicheJobboard = fichesJobboards[ficheIndex]

  function ficheSuivante() {
    if (ficheIndex < fichesJobboards.length - 1) {
      setFicheIndex(i => i + 1)
      setCorrigeVisible(false)
    } else {
      setEtape(3)
    }
  }

  // Exercice 3 — Plan d'enquête stage (Mode 2)
  const [reponsesPlan, setReponsesPlan] = useState<Record<string, string>>({})
  const [dossierSoumis, setDossierSoumis] = useState(false)

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(220,201,160,0.05)', border: '1px solid rgba(220,201,160,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a256' }}>
          Cours 4 — Enquête jobboards
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Choisir les bons canaux</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(220,201,160,0.55)' }}>
          Comprendre l&apos;intérêt de chaque jobboard et savoir où concentrer ses candidatures.
        </p>
      </div>

      <ExerciseStepper
        etape={etape}
        steps={[
          { n: 1, label: 'Observer les pistes', picto: '🔍' },
          { n: 2, label: 'Analyser les indices', picto: '🧩' },
          { n: 3, label: 'Construire le dossier', picto: '📁' },
        ]}
      />

      {/* ═══ EXERCICE 1 ═══ */}
      {etape === 1 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={1}
            titre="Quel jobboard pour quelle mission ?"
            consigne="Choisissez le ou les jobboards pertinents, puis comparez avec les recommandations."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(220,201,160,0.5)' }}>
            Objectif {objectifIndex + 1} sur {objectifsRecherche.length}
          </p>

          <DossierPaper label="Objectif de recherche" tampon="MISSION">
            <p className="font-black text-lg">{objectifCourant.objectif}</p>
          </DossierPaper>

          <div className="grid grid-cols-2 gap-2">
            {JOBBOARDS.map(jb => {
              const selected = selection.includes(jb)
              const isRecommande = valide && objectifCourant.recommandes.includes(jb)
              const isSelectedWrong = valide && selected && !objectifCourant.recommandes.includes(jb)
              return (
                <button
                  key={jb}
                  onClick={() => toggleJobboard(jb)}
                  disabled={valide}
                  className="rounded-xl px-3 py-2.5 text-xs font-bold text-left transition-all"
                  style={{
                    background: isRecommande ? 'rgba(90,163,124,0.14)' : isSelectedWrong ? 'rgba(192,86,63,0.14)' : selected ? 'rgba(201,162,86,0.14)' : 'rgba(255,255,255,0.04)',
                    border: isRecommande ? '1.5px solid rgba(90,163,124,0.5)' : isSelectedWrong ? '1.5px solid rgba(192,86,63,0.5)' : selected ? '1.5px solid rgba(201,162,86,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                >
                  {selected ? '☑' : '☐'} {jb}
                </button>
              )
            })}
          </div>

          {!valide ? (
            <button
              onClick={() => setValide(true)}
              disabled={selection.length === 0}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008', opacity: selection.length === 0 ? 0.4 : 1 }}
            >
              Voir les recommandations
            </button>
          ) : (
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,86,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a256' }}>
                Canaux recommandés : {objectifCourant.recommandes.join(' · ')}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}><span className="font-bold">Avantages : </span>{objectifCourant.avantages}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}><span className="font-bold">Limites : </span>{objectifCourant.limites}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}><span className="font-bold">Réflexe : </span>{objectifCourant.reflexe}</p>

              <button
                onClick={objectifSuivant}
                className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider mt-2"
                style={{ background: 'rgba(201,162,86,0.12)', border: '1.5px solid rgba(201,162,86,0.4)', color: '#c9a256' }}
              >
                {objectifIndex < objectifsRecherche.length - 1 ? 'Objectif suivant →' : 'Analyser les indices — Exercice 2 →'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 2 ═══ */}
      {etape === 2 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={2}
            titre="Fiche suspect jobboard"
            consigne="Analysez les indices en groupe avant de découvrir la fiche corrigée."
            mode="feedback"
          />

          <p className="text-xs" style={{ color: 'rgba(220,201,160,0.5)' }}>
            Fiche {ficheIndex + 1} sur {fichesJobboards.length}
          </p>

          <DossierPaper label={`Jobboard — fiche suspect`} tampon="À IDENTIFIER">
            <p className="font-black text-lg mb-2">{ficheCourante.nom}</p>
            <div className="space-y-1 text-xs leading-relaxed">
              {ficheCourante.indices.map((ind, i) => <p key={i}>▸ {ind}</p>)}
            </div>
          </DossierPaper>

          {!corrigeVisible ? (
            <button
              onClick={() => setCorrigeVisible(true)}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008' }}
            >
              Voir la fiche corrigée
            </button>
          ) : (
            <>
              <DossierPaper label={`${ficheCourante.nom} — fiche corrigée`} tampon="DOSSIER RÉSOLU">
                <div className="space-y-2 text-xs leading-relaxed">
                  <p><span className="font-black">Intérêt principal : </span>{ficheCourante.interetPrincipal}</p>
                  <p><span className="font-black">Type d&apos;offres : </span>{ficheCourante.typeOffres}</p>
                  <p><span className="font-black">Profil pertinent : </span>{ficheCourante.profilPertinent}</p>
                  <p><span className="font-black">Limites : </span>{ficheCourante.limites}</p>
                  <p><span className="font-black">Bon usage : </span>{ficheCourante.bonUsage}</p>
                </div>
              </DossierPaper>
              <button
                onClick={ficheSuivante}
                className="w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider"
                style={{ background: 'rgba(201,162,86,0.12)', border: '1.5px solid rgba(201,162,86,0.4)', color: '#c9a256' }}
              >
                {ficheIndex < fichesJobboards.length - 1 ? 'Fiche suivante →' : 'Construire le dossier — Exercice 3 →'}
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══ EXERCICE 3 — Plan d'enquête stage (Mode 2) ═══ */}
      {etape === 3 && (
        <div className="space-y-4">
          <ExerciseHeaderDetective
            numero={3}
            titre="Plan d'enquête stage"
            consigne="Construisez un plan de candidature priorisé pour le profil donné."
            mode="validation"
          />

          <DossierPaper label="Profil assigné" tampon="DOSSIER À TRAITER">
            <p className="text-xs leading-relaxed">
              <span className="font-black">{PROFIL_ENQUETE.public}</span>, recherche un stage en <span className="font-black">{PROFIL_ENQUETE.recherche}</span>, disponible en <span className="font-black">{PROFIL_ENQUETE.disponibilite}</span>, intérêt pour <span className="font-black">{PROFIL_ENQUETE.interet}</span>.
            </p>
          </DossierPaper>

          <div className="space-y-3">
            {PLAN_CHAMPS.map(champ => (
              <div key={champ.cle}>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: '#c9a256' }}>
                  {champ.label}
                </label>
                <textarea
                  value={reponsesPlan[champ.cle] ?? ''}
                  onChange={e => setReponsesPlan(prev => ({ ...prev, [champ.cle]: e.target.value }))}
                  placeholder={champ.placeholder}
                  rows={2}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
            ))}
          </div>

          {!dossierSoumis ? (
            <button
              onClick={() => setDossierSoumis(true)}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a256, #e8d080)', color: '#171008', boxShadow: '0 8px 32px rgba(201,162,86,0.25)' }}
            >
              📁 Soumettre le dossier
            </button>
          ) : (
            <div className="rounded-2xl p-5 text-center space-y-2" style={{ background: 'rgba(201,162,86,0.08)', border: '1.5px solid rgba(201,162,86,0.4)' }}>
              <p className="text-2xl">🔍</p>
              <p className="font-black text-white">Dossier soumis.</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,201,160,0.8)' }}>
                Présentez-le maintenant à l&apos;enquêtrice pour valider la cohérence de vos canaux et affiner votre stratégie avant de passer au Cours 5.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
