'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { alertesUltimatum, REBONDISSEMENTS, textesEpreuve as T } from '@/lib/content/univers3-marketing-m2'
import { contexteUltimatum, texteRebondissement } from './contexteNarratif'
import type { EtatPartie } from './etatPartie'
import PortraitCeo from './PortraitCeo'
import { STRYDE } from './theme'

// Rebondissements chronométrés (fiche v3). Ils modifient les contraintes de l'épreuve en cours
// SANS ajouter de formulaire : une alerte prioritaire à l'arrivée, puis un rappel permanent
// dans l'épreuve (« Alertes reçues »).

export function CarteRebondissement({ id, etat }: { id: string; etat: EtatPartie }) {
  const r = REBONDISSEMENTS.find(x => x.id === id)
  if (!r) return null
  const texte = texteRebondissement(r, etat)
  return (
    <article className="rounded-xl p-4 space-y-2" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.55)', borderLeft: `4px solid ${STRYDE.orange}` }} data-testid={`m2-rebond-${r.id}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: STRYDE.orange }}>{r.categorie}</p>
      {r.messageClient ? (
        <div className="flex gap-3 items-start">
          <PortraitCeo taille={40} />
          <div className="space-y-1">
            <p className="text-[15px] font-semibold leading-relaxed">« {texte} »</p>
            <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{T.signature}</p>
          </div>
        </div>
      ) : (
        <p className="text-[15px] font-semibold leading-relaxed">{texte}</p>
      )}
    </article>
  )
}

/** Résumé des 3 alertes simultanées de l'ultimatum, pour l'alerte prioritaire d'ouverture. */
function ResumeUltimatum({ etat }: { etat: EtatPartie }) {
  const c = contexteUltimatum(etat)
  return (
    <ul className="space-y-2 text-sm">
      {[alertesUltimatum.client, alertesUltimatum.equipe, alertesUltimatum.planning].map((a, i) => (
        <li key={a.titre} className="rounded-xl p-3" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.45)' }}>
          <p className="font-black">Alerte {i + 1} · {a.titre}</p>
          <p className="mt-1 leading-relaxed">{a.texte(c)}</p>
        </li>
      ))}
    </ul>
  )
}

/**
 * Alerte prioritaire affichée UNE fois, au déclenchement (ou à la reprise si l'heure est passée).
 * La saisie en cours n'est pas touchée ; le focus revient au champ à la fermeture.
 */
export function AlertePrioritaire({ ids, etat, onFermer }: { ids: string[]; etat: EtatPartie; onFermer: () => void }) {
  const precedent = useRef<Element | null>(null)
  const bouton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    precedent.current = document.activeElement
    bouton.current?.focus()
    const surTouche = (ev: KeyboardEvent) => { if (ev.key === 'Escape') onFermer() }
    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('keydown', surTouche)
      if (precedent.current instanceof HTMLElement) precedent.current.focus()
    }
  }, [onFermer])

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto" style={{ background: 'rgba(11,11,12,0.78)' }}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="m2-alerte-prioritaire"
        className="w-full max-w-xl rounded-2xl p-5 space-y-4 motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-300"
        style={{ background: STRYDE.noir, border: `2px solid ${STRYDE.orange}`, color: STRYDE.blancCasse }}
        data-testid="m2-alerte-prioritaire"
      >
        <p id="m2-alerte-prioritaire" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]" style={{ color: STRYDE.orange }}>
          <span className="h-2 w-2 rounded-full motion-safe:animate-pulse" style={{ background: STRYDE.orange }} aria-hidden="true" />
          {T.alertePrioritaire}
        </p>
        <div className="space-y-3">
          {ids.map(id => (id === 'ultimatum' ? <ResumeUltimatum key={id} etat={etat} /> : <CarteRebondissement key={id} id={id} etat={etat} />))}
        </div>
        <button
          ref={bouton}
          type="button"
          onClick={onFermer}
          className="w-full rounded-xl px-5 py-3 font-black uppercase tracking-[0.12em]"
          style={{ background: STRYDE.orange, color: STRYDE.noir }}
        >
          {T.fermerAlerte}
        </button>
      </div>
    </div>,
    document.body,
  )
}
