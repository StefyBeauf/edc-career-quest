'use client'

import ExerciseHeaderDetective from './shared/ExerciseHeaderDetective'
import ExerciseStepper from './shared/ExerciseStepper'
import DossierPaper from './shared/DossierPaper'
import { BOIS_SOMBRE, BEIGE, DORE, ROUGE_DISCRET, GRIS_FUME } from './shared/theme-detective'

const SWATCHES = [
  { nom: 'Bois sombre', hex: BOIS_SOMBRE },
  { nom: 'Noir doux', hex: '#171008' },
  { nom: 'Beige (papier)', hex: BEIGE },
  { nom: 'Doré (laiton)', hex: DORE },
  { nom: 'Rouge discret', hex: ROUGE_DISCRET },
  { nom: 'Gris fumé', hex: GRIS_FUME },
]

export default function DetectiveDesignShowcase() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(220,201,160,0.05)', border: '1px solid rgba(220,201,160,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a256' }}>
          Design system — Univers détective (S2)
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Le dossier confidentiel</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(220,201,160,0.55)' }}>
          Cours 4, 5 et 6 — chaque exercice se présente comme une pièce de dossier : papier vieilli, tampon, trombone.
        </p>
      </div>

      {/* ═══ Le dossier confidentiel — motif central de l'univers ═══ */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(220,201,160,0.6)' }}>
          Contenant d&apos;exercice — dossier confidentiel
        </p>
        <DossierPaper label="Jobboard — fiche suspect" tampon="CONFIDENTIEL">
          <p className="font-black text-lg mb-2">Welcome to the Jungle</p>
          <div className="space-y-1 text-xs leading-relaxed">
            <p>▸ Intérêt principal : culture d&apos;entreprise visible</p>
            <p>▸ Type d&apos;offres : start-up, scale-up</p>
            <p>▸ Limites : moins d&apos;offres grands groupes</p>
          </div>
        </DossierPaper>
      </div>

      {/* Une deuxième pièce du dossier, pour montrer la répétition du motif */}
      <div>
        <DossierPaper label="Profil — pièce n°2" tampon="DOSSIER EN COURS">
          <p className="font-black text-base mb-2">Plan d&apos;enquête stage</p>
          <div className="space-y-1.5 text-xs leading-relaxed">
            <p>▸ 3 jobboards prioritaires</p>
            <p>▸ 2 mots-clés de recherche</p>
            <p>▸ 1 action réseau</p>
          </div>
        </DossierPaper>
      </div>

      {/* Palette */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(220,201,160,0.6)' }}>Palette</p>
        <div className="grid grid-cols-3 gap-2">
          {SWATCHES.map(s => (
            <div key={s.nom} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ height: '48px', background: s.hex }} />
              <div className="px-2 py-1.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-xs font-bold text-white">{s.nom}</p>
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carte des pistes */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(220,201,160,0.6)' }}>Carte des pistes</p>
        <div
          className="rounded-lg p-6 relative"
          style={{ background: 'linear-gradient(160deg, #ddd0a8 0%, #c9b989 100%)', minHeight: '200px' }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.9 }}>
            <line x1="20%" y1="50%" x2="50%" y2="25%" stroke="#9c3a30" strokeWidth="1.5" />
            <line x1="20%" y1="50%" x2="78%" y2="30%" stroke="#9c3a30" strokeWidth="1.5" />
            <line x1="20%" y1="50%" x2="55%" y2="75%" stroke="#9c3a30" strokeWidth="1.5" />
          </svg>
          <div className="absolute rounded-full" style={{ left: '18%', top: '48%', width: '10px', height: '10px', background: '#171008' }} />
          <div className="absolute flex flex-col items-center gap-1" style={{ left: 'calc(50% - 26px)', top: '16%' }}>
            <div className="rounded-sm px-2.5 py-2 text-center" style={{ background: '#e8dcc0', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'rotate(-2deg)' }}>
              <span style={{ fontSize: '18px' }}>🔍</span>
            </div>
            <div className="rounded-full" style={{ width: '6px', height: '6px', background: '#9c3a30' }} />
          </div>
          <div className="absolute flex flex-col items-center gap-1" style={{ left: 'calc(78% - 26px)', top: '20%' }}>
            <div className="rounded-sm px-2.5 py-2 text-center" style={{ background: '#e8dcc0', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'rotate(3deg)' }}>
              <span style={{ fontSize: '18px' }}>🎯</span>
            </div>
            <div className="rounded-full" style={{ width: '6px', height: '6px', background: '#9c3a30' }} />
          </div>
          <div className="absolute flex flex-col items-center gap-1" style={{ left: 'calc(55% - 26px)', top: '64%' }}>
            <div className="rounded-sm px-2.5 py-2 text-center" style={{ background: '#e8dcc0', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'rotate(-1deg)' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
            <div className="rounded-full" style={{ width: '6px', height: '6px', background: '#9c3a30' }} />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(220,201,160,0.6)' }}>Progression</p>
        <ExerciseStepper
          etape={2}
          steps={[
            { n: 1, label: 'Observer les pistes', picto: '🔍' },
            { n: 2, label: 'Analyser les indices', picto: '🧩' },
            { n: 3, label: 'Construire le dossier', picto: '📁' },
          ]}
        />
      </div>

      {/* En-tête d'exercice + badges de mode */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(220,201,160,0.6)' }}>En-tête d&apos;exercice</p>
        <div className="rounded-2xl p-4 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <ExerciseHeaderDetective
            numero={1}
            titre="Quel jobboard pour quelle mission ?"
            consigne="Choisissez le ou les jobboards pertinents pour l'objectif donné."
            mode="feedback"
          />
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <ExerciseHeaderDetective
            numero={3}
            titre="Plan d'enquête stage"
            consigne="Construisez un plan de candidature priorisé."
            mode="validation"
          />
        </div>
      </div>
    </div>
  )
}
