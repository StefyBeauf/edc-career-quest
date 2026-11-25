'use client'

import type { ReactNode } from 'react'
import {
  DECISIONS_PARTENARIAT, ETAPES_NARRATIVES, epreuves, RAPPELS, textesChrono as TC, textesEpreuve as T, type ChampEpreuve, type Epreuve,
} from '@/lib/content/univers3-marketing-m2'
import BoutonValider from './BoutonValider'
import ChampReponse, { lignesCanaux } from './ChampReponse'
import type { EtatPartie } from './etatPartie'
import { STRYDE } from './theme'

// Écran d'une épreuve, structuré par les 5 étapes narratives (Alerte → Investigation →
// Concertation → Décision → Conséquences). Ces étapes organisent l'écran, sans chronomètre propre :
// seule l'épreuve est chronométrée. Une décision validée est définitive (lecture seule ensuite).

interface Props {
  epreuve: Epreuve
  etat: EtatPartie
  onReponse: (champId: string, valeur: string) => void
  onBlur: () => void
  onValider: () => void
  onOuvrirDossier: () => void
  /** Contenu propre à l'épreuve (fiche créateur, fil social, alertes de l'ultimatum). */
  annexe?: ReactNode
  /** Zone des conséquences (feedback), affichée après soumission. */
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

function Etape({ numero, titre, children }: { numero: number; titre: string; children: ReactNode }) {
  return (
    <section className="space-y-3" aria-labelledby={`m2-etape-${numero}`}>
      <h3 id={`m2-etape-${numero}`} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: STRYDE.texteSecondaire }}>
        <span className="h-5 w-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: STRYDE.anthraciteClair, color: STRYDE.orange }}>{numero}</span>
        {titre}
      </h3>
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
              <div key={l.label}><dt className="inline font-bold">{l.label} : </dt><dd className="inline whitespace-pre-line">{l.texte}</dd></div>
            ))}
          </dl>
        </div>
      ))}
    </aside>
  )
}

export default function EcranEpreuve({ epreuve, etat, onReponse, onBlur, onValider, onOuvrirDossier, annexe, consequences, suite }: Props) {
  const n = epreuve.numero
  const reponses = etat.reponses[n] ?? {}
  const soumis = etat.soumisLe[n] !== undefined
  const vides = epreuve.champs.filter(c => !texteReponse(c, reponses[c.id])).length
  const etapeActive = soumis ? 4 : vides < epreuve.champs.length ? 3 : 0
  // L'alerte budget de l'épreuve 3 est un message du client : mise en scène comme tel.
  const messageClient = n === 3

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>
          Épreuve {n} / 6 · Phase {epreuve.phase}
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tight" data-testid="m2-etape">{epreuve.titre}</h2>
      </div>

      <ol className="grid grid-cols-5 gap-1.5" aria-label="Étapes de l’épreuve">
        {ETAPES_NARRATIVES.map((nom, i) => (
          <li
            key={nom}
            aria-current={i === etapeActive ? 'step' : undefined}
            className="rounded-lg px-1 py-1.5 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider"
            style={i === etapeActive
              ? { background: STRYDE.orange, color: STRYDE.noir }
              : { background: STRYDE.anthracite, color: i < etapeActive ? STRYDE.blancCasse : STRYDE.texteSecondaire }}
          >
            {nom}
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <Etape numero={1} titre={ETAPES_NARRATIVES[0]}>
            <div
              role={messageClient ? 'alert' : undefined}
              className="rounded-xl p-4 text-[15px] leading-relaxed"
              style={messageClient
                ? { background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.55)' }
                : { background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}
            >
              {messageClient && <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: STRYDE.orange }}>Message du client · STRYDE</p>}
              <p className={messageClient ? 'font-semibold' : ''}>{messageClient ? `« ${epreuve.situation} »` : epreuve.situation}</p>
            </div>
            {annexe}
          </Etape>

          <Etape numero={2} titre={ETAPES_NARRATIVES[1]}>
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
          </Etape>

          <Etape numero={3} titre={ETAPES_NARRATIVES[2]}>
            <p className="text-sm" style={{ color: STRYDE.texteSecondaire }}>{T.concertation}</p>
          </Etape>

          <Rappels n={n} etat={etat} />
        </div>

        <div className="space-y-6">
          {!soumis ? (
            <Etape numero={4} titre={ETAPES_NARRATIVES[3]}>
              <div className="rounded-2xl p-5 space-y-5" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
                {epreuve.champs.map(c => (
                  <ChampReponse
                    key={c.id}
                    idBase={`m2-${n}-${c.id}`}
                    champ={c}
                    valeur={reponses[c.id] ?? ''}
                    onChange={v => onReponse(c.id, v)}
                    onBlur={onBlur}
                  />
                ))}
                <BoutonValider onValider={onValider} avertissement={vides > 0 ? T.champsVides(vides) : undefined} />
              </div>
            </Etape>
          ) : (
            <Etape numero={5} titre={ETAPES_NARRATIVES[4]}>
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
            </Etape>
          )}
        </div>
      </div>
    </div>
  )
}
