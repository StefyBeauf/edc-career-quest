'use client'

import type { ProfilCreateur } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Fiche du créateur tiré au sort pour l'épreuve 4. Avatar à initiales : jamais de photo réelle.
export default function FicheCreateur({ profil }: { profil: ProfilCreateur }) {
  const p = profil
  const sombre = ['#2A2A2F', '#1C1C1F'].includes(p.avatar.couleur)
  return (
    <article className="rounded-2xl overflow-hidden" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} data-testid="m2-createur">
      <header className="flex items-center gap-4 p-4" style={{ borderBottom: `1px solid ${STRYDE.bordure}` }}>
        <span
          aria-hidden="true"
          className="h-14 w-14 shrink-0 rounded-full flex items-center justify-center text-lg font-black"
          style={{ background: p.avatar.couleur, color: sombre ? STRYDE.orange : STRYDE.noir, border: `2px solid ${STRYDE.orange}` }}
        >
          {p.avatar.initiales}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: STRYDE.texteSecondaire }}>Proposition de partenariat</p>
          <h4 className="text-lg font-black">{p.nom}</h4>
          <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{p.reseaux}</p>
        </div>
      </header>
      <dl className="p-4 space-y-3 text-sm">
        {[
          ['Univers', p.univers],
          ['Audience', p.audience],
          ['Collaborations', p.collaborations],
          ['Tarif demandé', p.tarif],
          ['Réputation', p.reputation],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: STRYDE.texteSecondaire }}>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        <div>
          <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: STRYDE.texteSecondaire }}>Exemples de publications</dt>
          <dd><ul className="list-disc pl-5 space-y-1">{p.publications.map(x => <li key={x}>{x}</li>)}</ul></dd>
        </div>
        <div className="rounded-xl p-3" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.4)' }}>
          <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: STRYDE.orange }}>Ce que vous avez repéré en ligne</dt>
          <dd><ul className="list-disc pl-5 space-y-1 mt-1">{p.signauxAlerte.map(x => <li key={x}>{x}</li>)}</ul></dd>
        </div>
      </dl>
    </article>
  )
}
