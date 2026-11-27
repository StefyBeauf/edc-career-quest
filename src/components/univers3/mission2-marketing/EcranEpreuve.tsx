'use client'

import type { ReactNode } from 'react'
import {
  DECISIONS_PARTENARIAT, epreuves, NB_EPREUVES, RAPPELS, REBONDISSEMENTS, textesChrono as TC, textesEpreuve as T, type ChampEpreuve, type Epreuve,
} from '@/lib/content/univers3-marketing-m2'
import BoutonValider from './BoutonValider'
import ChampReponse, { lignesCanaux } from './ChampReponse'
import { alertesRecues, type EtatPartie } from './etatPartie'
import { CarteRebondissement } from './Rebondissements'
import { STRYDE } from './theme'

// Écran d'une épreuve (v3), simplifié en 4 blocs sans saisie supplémentaire :
// Situation → Alertes reçues → Votre décision → Retour d'Alex Morgan.
// Une décision validée est définitive (lecture seule ensuite).

interface Props {
  epreuve: Epreuve
  etat: EtatPartie
  onReponse: (champId: string, valeur: string) => void
  onBlur: () => void
  onValider: () => void
  onOuvrirDossier: () => void
  /** Vrai tant que tous les rebondissements de l'épreuve ne sont pas arrivés. */
  validationBloquee: boolean
  /** Contenu propre à l'épreuve (fiche créateur, fil social, alertes de l'ultimatum). */
  annexe?: ReactNode
  /** Retour du CEO, affiché après soumission. */
  consequences: ReactNode
  /** Bouton de passage à la suite, affiché après soumission. */
  suite: ReactNode
}

/** Texte lisible d'une réponse (canaux en liste, décision en libellé). */
export function texteReponse(champ: ChampEpreuve, valeur: string | undefined): string {
  const v = (valeur ?? '').trim()
  if (!v) return ''
  if (champ.type === 'canaux') return lignesCanaux(v).join(' · ')
  if (champ.type === 'decision') return DECISIONS_PARTENARIAT.find(d => d.id === v)?.label ?? ''
  return v
}

/** Champs visibles : un champ lié à un rebondissement n'apparaît qu'après celui-ci. */
export function champsVisibles(epreuve: Epreuve, etat: EtatPartie): ChampEpreuve[] {
  const recus = alertesRecues(etat, epreuve.numero)
  return epreuve.champs.filter(c => !c.visibleApres || recus.includes(c.visibleApres))
}

function Bloc({ titre, children, accent = false }: { titre: string; children: ReactNode; accent?: boolean }) {
  return (
    <section className="space-y-3">
      <h3 className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: accent ? STRYDE.orange : STRYDE.texteSecondaire }}>{titre}</h3>
      {children}
    </section>
  )
}

function Rappels({ n, etat }: { n: number; etat: EtatPartie }) {
  const blocs = (RAPPELS[n] ?? []).map(r => {
    const ep = epreuves.find(e => e.numero === r.epreuve)!
    const lignes = r.champs
      .map(id => { const c = ep.champs.find(x => x.id === id)!; return { label: c.label, texte: texteReponse(c, etat.reponses[r.epreuve]?.[id]) } })
      .filter(l => l.texte)
    return { ep, lignes }
  }).filter(b => b.lignes.length > 0)
  if (blocs.length === 0) return null
  return (
    <aside className="rounded-xl p-4 space-y-3" style={{ background: STRYDE.noir, border: `1px solid ${STRYDE.bordure}` }} data-testid="m2-rappel">
      <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>{T.rappelTitre}</p>
      {blocs.map(b => (
        <div key={b.ep.numero} className="space-y-1.5">
          <p className="text-xs font-bold" style={{ color: STRYDE.texteSecondaire }}>Épreuve {b.ep.numero} · {b.ep.titre}</p>
          <dl className="space-y-1 text-sm">
            {b.lignes.map(l => (
              <div key={l.label}><dt className="inline font-bold">{l.label} </dt><dd className="inline whitespace-pre-line">{l.texte}</dd></div>
            ))}
          </dl>
        </div>
      ))}
    </aside>
  )
}

export default function EcranEpreuve({ epreuve, etat, onReponse, onBlur, onValider, onOuvrirDossier, validationBloquee, annexe, consequences, suite }: Props) {
  const n = epreuve.numero
  const reponses = etat.reponses[n] ?? {}
  const soumis = etat.soumisLe[n] !== undefined
  const visibles = champsVisibles(epreuve, etat)
  const vides = visibles.filter(c => !texteReponse(c, reponses[c.id])).length
  // Rebondissements reçus, du plus récent au plus ancien (rappel permanent dans l'épreuve).
  const recus = REBONDISSEMENTS.filter(r => alertesRecues(etat, n).includes(r.id)).reverse()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>
          Épreuve {n} / {NB_EPREUVES} · Phase {epreuve.phase}
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tight" data-testid="m2-etape">{epreuve.titre}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          {recus.length > 0 && (
            <Bloc titre={T.alertesRecues} accent>
              <div className="space-y-3" data-testid="m2-alertes-recues">
                {recus.map(r => <CarteRebondissement key={r.id} id={r.id} etat={etat} />)}
              </div>
            </Bloc>
          )}

          <Bloc titre={T.situation}>
            <div className="rounded-xl p-4 text-[15px] leading-relaxed" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
              <p>{epreuve.situation}</p>
            </div>
            <p className="text-sm font-bold">{T.travailDemande}</p>
            <ul className="space-y-1.5 text-sm list-disc pl-5" style={{ color: STRYDE.blancCasse }}>
              {epreuve.travailDemande.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOuvrirDossier} className="text-sm font-bold underline underline-offset-4" style={{ color: STRYDE.orange }}>
                {T.ouvrirDossier}
              </button>
              <span className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.rechercheAutorisee}</span>
            </div>
            {annexe}
          </Bloc>

          <Rappels n={n} etat={etat} />
        </div>

        <div className="space-y-6">
          {!soumis ? (
            <Bloc titre={T.votreDecision}>
              <div className="rounded-2xl p-5 space-y-5" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
                {visibles.map(c => (
                  <ChampReponse
                    key={c.id}
                    idBase={`m2-${n}-${c.id}`}
                    champ={c}
                    valeur={reponses[c.id] ?? ''}
                    onChange={v => onReponse(c.id, v)}
                    onBlur={onBlur}
                  />
                ))}
                <BoutonValider onValider={onValider} bloque={validationBloquee} avertissement={vides > 0 ? T.champsVides(vides) : undefined} />
              </div>
            </Bloc>
          ) : (
            <Bloc titre={T.retourCeo}>
              <p className="text-sm font-semibold" data-testid="m2-soumis">{etat.soumisAuto?.[n] ? TC.soumisAuto : TC.soumisManuel}</p>
              {consequences}
              <details className="rounded-xl p-4" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
                <summary className="cursor-pointer text-sm font-bold">{T.vosReponses}</summary>
                <dl className="mt-3 space-y-2 text-sm">
                  {epreuve.champs.map(c => (
                    <div key={c.id}>
                      <dt className="font-bold" style={{ color: STRYDE.texteSecondaire }}>{c.label}</dt>
                      <dd className="whitespace-pre-line">{texteReponse(c, reponses[c.id]) || <em style={{ color: STRYDE.texteSecondaire }}>{T.nonRenseigne}</em>}</dd>
                    </div>
                  ))}
                </dl>
              </details>
              {suite}
            </Bloc>
          )}
        </div>
      </div>
    </div>
  )
}
