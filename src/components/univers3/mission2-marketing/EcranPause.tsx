'use client'

import { CEO, DERNIERE_EPREUVE_PHASE_1, epreuves, textesAnalyse, textesPause as T } from '@/lib/content/univers3-marketing-m2'
import type { EtatPartie } from './etatPartie'
import Jauges from './Jauges'
import PortraitCeo from './PortraitCeo'
import { STRYDE } from './theme'
import type { StatutPilotage } from './usePilotage'

// Écran de fin de phase 1 (pause de 20 min, hors chronomètre). Les équipes en avance attendent ici.
// Il affiche les 4 indicateurs, le dernier message d'Alex Morgan (sa réaction à l'épreuve 2,
// aucun appel IA supplémentaire) puis le texte de transition mot pour mot.
// Verrou : la phase 2 ne démarre que si l'intervenante l'a ouverte depuis l'admin
// (statut relu toutes les 10 s par Partie.tsx). Tant que le statut est inconnu
// (serveur injoignable), le verrou reste fermé.

interface Props {
  etat: EtatPartie
  phase2Ouverte: boolean
  statut: StatutPilotage
  onCommencer: () => void
}

export default function EcranPause({ etat, phase2Ouverte, statut, onCommencer }: Props) {
  const phase1 = epreuves.filter(e => e.phase === 1)
  const derniere = etat.analyses[DERNIERE_EPREUVE_PHASE_1]
  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" data-testid="m2-pause">
      <div className="text-center space-y-3 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>{T.surtitre} · Pause</p>
      </div>

      <section className="rounded-2xl p-5 space-y-3 max-w-3xl mx-auto" style={{ background: STRYDE.anthracite, border: '1px solid rgba(255,91,20,0.45)' }} aria-label={T.messageCeo} data-testid="m2-message-ceo-pause">
        <div className="flex items-center gap-3">
          <PortraitCeo />
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>{T.messageCeo}</p>
            <p className="font-black">{CEO.nom}</p>
          </div>
        </div>
        <p className="text-[15px] font-semibold leading-relaxed">
          {typeof derniere === 'object' ? `« ${derniere.reaction_ceo} »` : textesAnalyse.enAttente}
        </p>
      </section>

      <h2 className="text-2xl sm:text-3xl font-black max-w-3xl mx-auto leading-tight text-center" data-testid="m2-transition">{T.titre}</h2>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl p-5 space-y-4" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} aria-labelledby="m2-bilan-phase1">
          <h3 id="m2-bilan-phase1" className="text-sm font-black uppercase tracking-[0.2em]">{T.bilanTitre}</h3>
          <Jauges etat={etat} />
          <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.rappelSimulation}</p>
        </section>

        <section className="rounded-2xl p-5 space-y-4 flex flex-col" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
          <ul className="space-y-2 text-sm">
            {phase1.map(e => (
              <li key={e.numero} className="flex items-center gap-2">
                <span aria-hidden="true" style={{ color: STRYDE.orange }}>✓</span>
                <span>Épreuve {e.numero} · {e.titre}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.sauvegarde}</p>

          <div className="mt-auto space-y-3 pt-2">
            <p className="text-sm font-semibold" role="status" aria-live="polite" data-testid="m2-statut-phase2">
              {phase2Ouverte ? T.ouverte : statut === 'indisponible' ? T.horsLigne : T.attente}
            </p>
            <button
              type="button"
              disabled={!phase2Ouverte}
              onClick={() => { if (phase2Ouverte) onCommencer() }}
              className="w-full rounded-xl px-6 py-3.5 font-black uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-opacity"
              style={{ background: STRYDE.orange, color: STRYDE.noir }}
            >
              {phase2Ouverte ? `${T.bouton} →` : `🔒 ${T.bouton}`}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
