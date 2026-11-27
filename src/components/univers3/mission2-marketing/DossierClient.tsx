'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { dossierClient as D } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'
import PortraitCeo from './PortraitCeo'
import VisuelStryde from './VisuelStryde'

// Dossier client STRYDE, consultable à tout moment dans un tiroir latéral.
// Le tiroir se superpose à l'épreuve sans la démonter : une réponse en cours de saisie
// n'est jamais perdue (elle vit dans l'état de partie, pas dans le tiroir).

const ONGLETS = [
  { id: 'brief', label: 'Brief' },
  { id: 'collection', label: 'Collection' },
  { id: 'marque', label: 'La marque' },
  { id: 'fabrication', label: 'Fabrication' },
  { id: 'moyens', label: 'Moyens et distribution' },
  { id: 'attentes', label: 'Attentes du client' },
  { id: 'conception', label: 'Conception' },
] as const
type OngletId = (typeof ONGLETS)[number]['id']

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>{titre}</h3>
      {children}
    </section>
  )
}

function Liste({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed list-disc pl-5" style={{ color: STRYDE.blancCasse }}>
      {items.map(i => <li key={i}>{i}</li>)}
    </ul>
  )
}

function Contenu({ onglet }: { onglet: OngletId }) {
  switch (onglet) {
    case 'brief':
      return (
        <dl className="divide-y" style={{ borderColor: STRYDE.bordure }}>
          {Object.entries(D.brief).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-2.5 text-sm" style={{ borderColor: STRYDE.bordure }}>
              <dt className="font-bold" style={{ color: STRYDE.texteSecondaire }}>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )
    case 'collection':
      return (
        <div className="space-y-6">
          {D.collection.map(m => (
            <article key={m.id} className="space-y-2">
              <VisuelStryde src={m.visuel} legende={m.nom} hauteur="aspect-video" />
              <h3 className="font-black uppercase tracking-wide">{m.nom}</h3>
              <Liste items={m.description} />
            </article>
          ))}
        </div>
      )
    case 'marque':
      return (
        <div className="space-y-6">
          <Bloc titre="Histoire"><Liste items={D.histoire} /></Bloc>
          <Bloc titre="Équipe dirigeante">
            <ul className="space-y-3">
              {D.equipeDirigeante.map(f => (
                <li key={f.nom} className="flex gap-3 text-sm">
                  {f.portrait ? (
                    <PortraitCeo taille={40} />
                  ) : (
                    // Avatar à initiales pour les autres membres de l'équipe.
                    <span aria-hidden="true" className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-black text-xs" style={{ background: STRYDE.anthraciteClair, color: STRYDE.orange }}>
                      {f.nom.split(' ').map(p => p[0]).join('')}
                    </span>
                  )}
                  <span><strong>{f.nom}</strong>, {f.role}. <span style={{ color: STRYDE.texteSecondaire }}>{f.parcours}</span></span>
                </li>
              ))}
            </ul>
          </Bloc>
          <Bloc titre="Valeurs">
            <ul className="space-y-1.5 text-sm">
              {D.valeurs.map(v => <li key={v.nom}><strong>{v.nom}</strong> : {v.description}</li>)}
            </ul>
          </Bloc>
        </div>
      )
    case 'fabrication':
      return (
        <div className="space-y-6">
          <Bloc titre="Matériaux"><Liste items={D.materiaux} /></Bloc>
          <Bloc titre="Fabrication"><Liste items={D.fabrication} /></Bloc>
          <Bloc titre="Packaging"><Liste items={D.packaging} /></Bloc>
          <Bloc titre="Engagements environnementaux"><Liste items={D.engagementsEnvironnementaux} /></Bloc>
        </div>
      )
    case 'moyens':
      return (
        <div className="space-y-6">
          <Bloc titre="Ressources"><Liste items={D.ressources} /></Bloc>
          <Bloc titre="Distribution"><Liste items={D.distribution} /></Bloc>
        </div>
      )
    case 'attentes':
      return <Bloc titre="Ce que le client attend de votre agence"><Liste items={D.attentesClient} /></Bloc>
    case 'conception':
      return <Bloc titre="Origine des modèles"><Liste items={D.conception} /></Bloc>
  }
}

export default function DossierClient({ ouvert, onFermer }: { ouvert: boolean; onFermer: () => void }) {
  const [onglet, setOnglet] = useState<OngletId>('brief')
  const panneau = useRef<HTMLDivElement>(null)
  const boutonFermer = useRef<HTMLButtonElement>(null)
  // La partie se réaffiche chaque seconde (chronomètre) : la fonction de fermeture est lue via
  // une référence pour que l'effet ci-dessous ne se relance pas (il volerait le focus).
  const fermer = useRef(onFermer)
  useEffect(() => { fermer.current = onFermer }, [onFermer])

  useEffect(() => {
    if (!ouvert) return
    const ouvreur = document.activeElement as HTMLElement | null
    boutonFermer.current?.focus()
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { fermer.current(); return }
      // Le focus clavier reste dans le tiroir tant qu'il est ouvert.
      if (e.key !== 'Tab' || !panneau.current) return
      const focusables = panneau.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
      const premier = focusables[0]
      const dernier = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus() }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus() }
    }
    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('keydown', surTouche)
      ouvreur?.focus() // retour au bouton « Dossier client » (ou au champ en cours de saisie)
    }
  }, [ouvert])

  if (!ouvert) return null

  // Rendu dans <body> : le cadre de la M2 est décalé par une transformation CSS, qui empêcherait
  // un élément « fixed » de couvrir tout l'écran.
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 motion-safe:animate-in motion-safe:fade-in" onClick={onFermer} aria-hidden="true" />
      <div
        ref={panneau}
        role="dialog"
        aria-modal="true"
        aria-labelledby="m2-dossier-titre"
        className="relative h-full w-full sm:w-[34rem] flex flex-col shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-300"
        style={{ background: STRYDE.noir, color: STRYDE.blancCasse, borderLeft: `1px solid ${STRYDE.bordure}` }}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${STRYDE.bordure}` }}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: STRYDE.texteSecondaire }}>Confidentiel</p>
            <h2 id="m2-dossier-titre" className="text-lg font-black uppercase tracking-wide">Dossier client STRYDE</h2>
          </div>
          <button ref={boutonFermer} type="button" onClick={onFermer} className="rounded-lg px-3 py-2 text-sm font-bold" style={{ border: `1px solid ${STRYDE.bordure}` }}>
            Fermer
          </button>
        </div>

        <div role="tablist" aria-label="Rubriques du dossier" className="flex gap-1.5 overflow-x-auto px-5 py-3" style={{ borderBottom: `1px solid ${STRYDE.bordure}` }}>
          {ONGLETS.map(o => {
            const actif = o.id === onglet
            return (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={actif}
                aria-controls="m2-dossier-contenu"
                onClick={() => setOnglet(o.id)}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap"
                style={actif
                  ? { background: STRYDE.orange, color: STRYDE.noir }
                  : { background: STRYDE.anthracite, color: STRYDE.blancCasse, border: `1px solid ${STRYDE.bordure}` }}
              >
                {o.label}
              </button>
            )
          })}
        </div>

        <div id="m2-dossier-contenu" role="tabpanel" tabIndex={0} className="flex-1 overflow-y-auto px-5 py-5" data-testid="m2-dossier">
          <Contenu onglet={onglet} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
