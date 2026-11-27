'use client'

import type { ReactNode } from 'react'
import { CEO, epreuves, INDICATEURS, statutContrat, textesVerdict as T } from '@/lib/content/univers3-marketing-m2'
import { BoutonRelancer } from './Consequences'
import { texteReponse } from './EcranEpreuve'
import { MAX_TENTATIVES_VERDICT, totalScores, verdictAJour, type EtatPartie } from './etatPartie'
import Jauges, { epreuvesEnAttente } from './Jauges'
import PortraitCeo from './PortraitCeo'
import { STRYDE } from './theme'

// Verdict final (fiche v3) : score sur 100, 4 indicateurs, évolution épreuve par épreuve,
// historique synthétique des décisions, dernier message du CEO et statut du contrat.
// Le statut est CALCULÉ PAR LE CODE à partir du score (barème de la fiche), jamais par l'IA.
// Pas de bilan réflexif, pas de classement, pas de note : un indicateur de jeu.
// Si des épreuves sont en attente d'analyse, le score est « provisoire » et elles sont listées.

interface Props {
  etat: EtatPartie
  verdictEnCours: boolean
  onRelancerVerdict: () => void
  analysesEnCours: number[]
  onRelancerAnalyse: (n: number) => void
  onRetour: () => void
}

function Carte({ titre, children, testid }: { titre: string; children: ReactNode; testid?: string }) {
  return (
    <section className="rounded-2xl p-5 space-y-3" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} data-testid={testid}>
      <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>{titre}</h3>
      {children}
    </section>
  )
}

const signe = (v: number) => (v > 0 ? `+${v}` : String(v))

function MessageCeo({ etat, verdictEnCours, onRelancerVerdict }: Pick<Props, 'etat' | 'verdictEnCours' | 'onRelancerVerdict'>) {
  const v = etat.verdict
  const epuise = (etat.tentativesVerdict ?? 0) >= MAX_TENTATIVES_VERDICT
  const boutonRelance = (libelle: string) => (epuise
    ? <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.relancesEpuisees}</p>
    : (
      <button type="button" onClick={onRelancerVerdict} disabled={verdictEnCours} className="rounded-lg px-4 py-2 text-sm font-black uppercase tracking-wider disabled:opacity-40" style={{ border: `1px solid ${STRYDE.orange}`, color: STRYDE.orange }}>
        {libelle}
      </button>
    ))

  if (verdictEnCours || v === undefined) {
    return (
      <div role="status" aria-live="polite" className="flex items-center gap-3" data-testid="m2-verdict-chargement">
        <span className="h-3 w-3 rounded-full motion-safe:animate-ping" style={{ background: STRYDE.orange }} aria-hidden="true" />
        <p className="text-sm font-semibold">{T.chargement}</p>
      </div>
    )
  }
  if (v === 'en-attente') {
    return (
      <div role="status" className="space-y-3" data-testid="m2-verdict-attente">
        <p className="text-sm">{T.enAttente}</p>
        {boutonRelance(T.relancer)}
      </div>
    )
  }
  return (
    <div className="space-y-4" data-testid="m2-verdict-ia">
      <blockquote className="text-[15px] leading-relaxed font-semibold pl-4" style={{ borderLeft: `3px solid ${STRYDE.orange}` }}>« {v.message_final_ceo} »</blockquote>
      <p className="text-sm leading-relaxed" style={{ color: STRYDE.texteSecondaire }}>{v.verdict_narratif}</p>
      {!verdictAJour(etat) && boutonRelance(T.mettreAJour)}
    </div>
  )
}

export default function EcranVerdict({ etat, verdictEnCours, onRelancerVerdict, analysesEnCours, onRelancerAnalyse, onRetour }: Props) {
  const total = totalScores(etat.scores)
  const provisoire = epreuvesEnAttente(etat).length > 0
  const statut = statutContrat(total)

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" data-testid="m2-verdict">
      <div className="text-center space-y-3 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>{T.surtitre}</p>
        <p className="text-6xl font-black tabular-nums" data-testid="m2-score-final">
          {total}<span className="text-2xl" style={{ color: STRYDE.texteSecondaire }}> / 100</span>
        </p>
        {provisoire && <p className="text-xs uppercase tracking-wider" style={{ color: STRYDE.texteSecondaire }}>{T.scoreFinal} {T.provisoire}</p>}
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: STRYDE.texteSecondaire }}>{T.statut}</p>
          <p className="inline-block mt-1 rounded-full px-5 py-2 text-lg font-black uppercase tracking-wide" style={{ background: STRYDE.orange, color: STRYDE.noir }} data-testid="m2-statut-contrat">
            {statut}{provisoire ? ` (${T.provisoire})` : ''}
          </p>
        </div>
      </div>

      <Carte titre={T.messageCeo} testid="m2-message-final">
        <div className="flex items-center gap-3">
          <PortraitCeo />
          <div>
            <p className="font-black">{CEO.nom}</p>
            <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{CEO.fonction}</p>
          </div>
        </div>
        <MessageCeo etat={etat} verdictEnCours={verdictEnCours} onRelancerVerdict={onRelancerVerdict} />
      </Carte>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Carte titre={T.scoreFinal}>
          <Jauges etat={etat} />
          <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.rappelSimulation}</p>
        </Carte>

        <Carte titre={T.evolution} testid="m2-evolution">
          <div className="overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr style={{ color: STRYDE.texteSecondaire }}>
                  <th scope="col" className="text-left font-bold py-1.5 pr-2">Épreuve</th>
                  {INDICATEURS.map(i => <th key={i.id} scope="col" className="font-bold px-1 text-[11px]">{i.label.split(' ')[0]}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: `1px solid ${STRYDE.bordure}` }}>
                  <th scope="row" className="text-left font-normal py-1.5 pr-2">{T.depart}</th>
                  {INDICATEURS.map(i => <td key={i.id} className="text-center">25</td>)}
                </tr>
                {epreuves.map(ep => {
                  const a = etat.analyses[ep.numero]
                  return (
                    <tr key={ep.numero} style={{ borderTop: `1px solid ${STRYDE.bordure}` }}>
                      <th scope="row" className="text-left font-normal py-1.5 pr-2">{ep.numero}. {ep.titre}</th>
                      {typeof a === 'object'
                        ? INDICATEURS.map(i => (
                          <td key={i.id} className="text-center font-bold" style={{ color: a.variations[i.id] > 0 ? STRYDE.orange : a.variations[i.id] < 0 ? STRYDE.blancCasse : STRYDE.texteSecondaire }}>
                            {signe(a.variations[i.id])}
                          </td>
                        ))
                        : <td colSpan={4} className="text-center text-xs" style={{ color: STRYDE.texteSecondaire }}>{etat.soumisLe[ep.numero] !== undefined ? T.analyseAttente : '—'}</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Carte>
      </div>

      <Carte titre={T.decisions} testid="m2-decisions">
        <ol className="space-y-3 text-sm">
          {epreuves.map(ep => {
            const resume = etat.decisionsResume[ep.numero]
            const attente = etat.analyses[ep.numero] === 'en-attente'
            return (
              <li key={ep.numero} className="space-y-1">
                <p className="font-bold">{ep.numero}. {ep.titre}</p>
                {resume
                  ? <p style={{ color: STRYDE.blancCasse }}>{resume}</p>
                  : <p style={{ color: STRYDE.texteSecondaire }}>{T.resumeIndisponible}</p>}
                {attente && <BoutonRelancer etat={etat} n={ep.numero} enCours={analysesEnCours.includes(ep.numero)} onRelancer={() => onRelancerAnalyse(ep.numero)} />}
              </li>
            )
          })}
        </ol>
      </Carte>

      <details className="rounded-2xl p-5" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} data-testid="m2-historique">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.15em]">{T.historique}</summary>
        <div className="mt-4 space-y-5">
          {epreuves.map(ep => {
            const a = etat.analyses[ep.numero]
            return (
              <article key={ep.numero} className="space-y-2">
                <h4 className="font-black">Épreuve {ep.numero} · {ep.titre}</h4>
                <dl className="space-y-1.5 text-sm">
                  {ep.champs.map(c => {
                    const v = texteReponse(c, etat.reponses[ep.numero]?.[c.id])
                    return v ? <div key={c.id}><dt className="inline font-bold">{c.label} </dt><dd className="inline whitespace-pre-line">{v}</dd></div> : null
                  })}
                </dl>
                {typeof a === 'object' && <p className="text-sm italic" style={{ color: STRYDE.texteSecondaire }}>{a.consequence}</p>}
              </article>
            )
          })}
        </div>
      </details>

      <div className="text-center pt-2">
        <button type="button" onClick={onRetour} className="rounded-xl px-6 py-3.5 font-black uppercase tracking-[0.12em]" style={{ background: STRYDE.orange, color: STRYDE.noir }} data-testid="m2-vers-retour">
          {T.versRetour} →
        </button>
      </div>
    </div>
  )
}
