'use client'

import { dossierClient, type ProfilCreateur, type VarianteCrise } from '@/lib/content/univers3-marketing-m2'
import SilhouetteSneaker from './SilhouetteSneaker'
import { STRYDE } from './theme'

// Simulation de fil social pour l'épreuve 5 (variante tirée au sort). Aucun tri des commentaires :
// c'est à l'équipe de distinguer faits, ressemblances, accusations et points à vérifier.

interface Props {
  variante: VarianteCrise
  /** Réaction du créateur, affichée seulement si l'équipe a ACCEPTÉ le partenariat à l'épreuve 4. */
  createurPartenaire?: ProfilCreateur
}

const initiales = (auteur: string) => auteur.replace(/^@/, '').slice(0, 2).toUpperCase()

export default function FilSocial({ variante: v, createurPartenaire }: Props) {
  const modele = dossierClient.collection.find(m => m.id === v.modeleConcerne)!
  return (
    <div className="space-y-4" data-testid="m2-fil-social">
      <article className="rounded-2xl p-4 space-y-3" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
        <header className="flex items-center gap-3">
          <span aria-hidden="true" className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-black" style={{ background: STRYDE.orange, color: STRYDE.noir }}>
            {initiales(v.publication.auteur)}
          </span>
          <div>
            <p className="text-sm font-bold">{v.publication.auteur}</p>
            <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{v.publication.abonnes}</p>
          </div>
          <span className="ml-auto text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded" style={{ background: STRYDE.orange, color: STRYDE.noir }}>Viral</span>
        </header>
        <p className="text-[15px] font-semibold">{v.publication.texte}</p>
        <div className="grid grid-cols-2 gap-3 rounded-xl p-3" style={{ background: STRYDE.blancCasse }}>
          <SilhouetteSneaker s={v.comparaison.stryde} legende={modele.nom} />
          <SilhouetteSneaker s={v.comparaison.concurrent} legende={`${v.marqueFictive} ${v.modeleFictif}`} />
        </div>
        <p className="text-xs" style={{ color: STRYDE.texteSecondaire }}>{v.publication.vues} · {v.publication.partages}</p>
      </article>

      <section className="rounded-2xl p-4 space-y-2" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }} aria-label="Points relevés par les internautes">
        <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.texteSecondaire }}>Ce que relèvent les internautes</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div><p className="font-bold">Points communs</p><ul className="list-disc pl-5">{v.comparaison.communs.map(x => <li key={x}>{x}</li>)}</ul></div>
          <div><p className="font-bold">Différences</p><ul className="list-disc pl-5">{v.comparaison.differences.map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </section>

      <section className="space-y-2" aria-label="Commentaires">
        <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.texteSecondaire }}>Commentaires</p>
        <ul className="space-y-2">
          {createurPartenaire && (
            <li className="rounded-xl p-3 text-sm" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.5)' }} data-testid="m2-reaction-createur">
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: STRYDE.orange }}>Votre créateur partenaire</p>
              <p><strong>{createurPartenaire.reactionCrise.auteur}</strong> {createurPartenaire.reactionCrise.texte}</p>
            </li>
          )}
          {v.commentaires.map(c => (
            <li key={c.auteur + c.texte} className="flex gap-3 rounded-xl p-3 text-sm" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
              <span aria-hidden="true" className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: STRYDE.anthraciteClair, color: STRYDE.blancCasse }}>
                {initiales(c.auteur)}
              </span>
              <p><strong>{c.auteur}</strong> {c.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl p-4 space-y-2" style={{ background: STRYDE.noir, border: `1px dashed ${STRYDE.bordure}` }} aria-label="Éléments transmis par le client">
        <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: STRYDE.orange }}>Éléments transmis par STRYDE sur l’origine du design</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">{v.origineDesign.map(x => <li key={x}>{x}</li>)}</ul>
      </section>
    </div>
  )
}
