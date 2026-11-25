'use client'

import type { ReactNode } from 'react'
import { epreuves, INDICATEURS, textesBilan as T } from '@/lib/content/univers3-marketing-m2'
import { BoutonRelancer } from './Consequences'
import { texteReponse } from './EcranEpreuve'
import { bilanAJour, MAX_TENTATIVES_BILAN, type EtatPartie } from './etatPartie'
import Jauges from './Jauges'
import { STRYDE } from './theme'

// Écran de fin de mission : score final, évolution par épreuve, résumé des 6 décisions,
// bilan rédigé par l'IA (3 points forts, 2 points de vigilance, compétences, recommandation),
// historique complet et message de clôture (mot pour mot).
// Les épreuves sans analyse sont signalées « en attente » : rien n'est estimé à leur place.

interface Props {
  etat: EtatPartie
  bilanEnCours: boolean
  onRelancerBilan: () => void
  analysesEnCours: number[]
  onRelancerAnalyse: (n: number) => void
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

function BilanIA({ etat, bilanEnCours, onRelancerBilan }: Pick<Props, 'etat' | 'bilanEnCours' | 'onRelancerBilan'>) {
  const b = etat.bilan
  const epuise = (etat.tentativesBilan ?? 0) >= MAX_TENTATIVES_BILAN
  const boutonRelance = (libelle: string) => (epuise
    ? <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.relancesEpuisees}</p>
    : (
      <button type="button" onClick={onRelancerBilan} disabled={bilanEnCours} className="rounded-lg px-4 py-2 text-sm font-black uppercase tracking-wider disabled:opacity-40" style={{ border: `1px solid ${STRYDE.orange}`, color: STRYDE.orange }}>
        {libelle}
      </button>
    ))

  if (bilanEnCours || b === undefined) {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl p-5 flex items-center gap-3" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} data-testid="m2-bilan-chargement">
        <span className="h-3 w-3 rounded-full motion-safe:animate-ping" style={{ background: STRYDE.orange }} aria-hidden="true" />
        <p className="text-sm font-semibold">{T.chargement}</p>
      </div>
    )
  }
  if (b === 'en-attente') {
    return (
      <div role="status" className="rounded-2xl p-5 space-y-3" style={{ background: STRYDE.anthracite, border: `1px dashed ${STRYDE.bordure}` }} data-testid="m2-bilan-attente">
        <p className="text-sm">{T.enAttente}</p>
        {boutonRelance(T.relancer)}
      </div>
    )
  }
  return (
    <div className="space-y-4" data-testid="m2-bilan-ia">
      {!bilanAJour(etat) && boutonRelance(T.mettreAJour)}
      <div className="grid gap-4 md:grid-cols-2">
        <Carte titre={T.pointsForts}>
          <ul className="space-y-2 text-sm">{b.points_forts.map(p => <li key={p} className="flex gap-2"><span aria-hidden="true" style={{ color: STRYDE.orange }}>✓</span>{p}</li>)}</ul>
        </Carte>
        <Carte titre={T.pointsVigilance}>
          <ul className="space-y-2 text-sm">{b.points_vigilance.map(p => <li key={p} className="flex gap-2"><span aria-hidden="true" style={{ color: STRYDE.blancCasse }}>→</span>{p}</li>)}</ul>
        </Carte>
      </div>
      <Carte titre={T.recommandation}><p className="text-[15px] font-semibold">{b.recommandation}</p></Carte>
    </div>
  )
}

export default function EcranBilan({ etat, bilanEnCours, onRelancerBilan, analysesEnCours, onRelancerAnalyse }: Props) {
  // Compétences : celles du bilan IA, sinon celles relevées par les analyses d'épreuves (jamais inventées).
  const competences = typeof etat.bilan === 'object'
    ? etat.bilan.competences_mobilisees
    : [...new Set(Object.values(etat.analyses).flatMap(a => (typeof a === 'object' ? a.competences_mobilisees : [])))]

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" data-testid="m2-bilan">
      <div className="text-center space-y-2 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>Bilan de mission</p>
        <h2 className="text-3xl sm:text-4xl font-black max-w-3xl mx-auto leading-tight">{T.titre}</h2>
      </div>

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

      <BilanIA etat={etat} bilanEnCours={bilanEnCours} onRelancerBilan={onRelancerBilan} />

      {competences.length > 0 && (
        <Carte titre={T.competences}>
          <ul className="flex flex-wrap gap-2">
            {competences.map(c => <li key={c} className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.4)' }}>{c}</li>)}
          </ul>
        </Carte>
      )}

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
                    return v ? <div key={c.id}><dt className="inline font-bold">{c.label} : </dt><dd className="inline whitespace-pre-line">{v}</dd></div> : null
                  })}
                </dl>
                {typeof a === 'object' && <p className="text-sm italic" style={{ color: STRYDE.texteSecondaire }}>{a.consequence}</p>}
              </article>
            )
          })}
        </div>
      </details>

      <blockquote className="rounded-2xl p-6 sm:p-8 text-center text-lg leading-relaxed font-semibold" style={{ background: STRYDE.noir, border: `1px solid ${STRYDE.orange}` }} data-testid="m2-cloture">
        {T.messageCloture}
      </blockquote>
    </div>
  )
}
