'use client'

import { alertesUltimatum as A, type ContexteUltimatum } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Les 3 alertes simultanées de l'épreuve 6 : mise en scène intense mais lisible et non anxiogène
// (apparition décalée et douce, aucun clignotement ; aucune animation si l'utilisateur les réduit).
const ALERTES = [
  { cle: 'client', etiquette: 'Client', ...A.client },
  { cle: 'equipe', etiquette: 'Équipe', ...A.equipe },
  { cle: 'planning', etiquette: 'Planning', ...A.planning },
] as const

const DELAIS = ['', 'motion-safe:delay-150', 'motion-safe:delay-300']

export default function AlertesUltimatum({ contexte }: { contexte: ContexteUltimatum }) {
  return (
    <div className="grid gap-3" role="list" aria-label="Trois alertes simultanées" data-testid="m2-alertes-ultimatum">
      {ALERTES.map((a, i) => (
        <article
          key={a.cle}
          role="listitem"
          className={`rounded-xl p-4 space-y-1.5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 motion-safe:duration-500 motion-safe:fill-mode-both ${DELAIS[i]}`}
          style={{ background: STRYDE.anthracite, border: '1px solid rgba(255,91,20,0.45)', borderLeft: `4px solid ${STRYDE.orange}` }}
        >
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: STRYDE.orange }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: STRYDE.orange }} aria-hidden="true" />
            Alerte {i + 1} · {a.etiquette}
          </p>
          <h4 className="font-black">{a.titre}</h4>
          <p className="text-sm leading-relaxed">{a.texte(contexte)}</p>
        </article>
      ))}
    </div>
  )
}
