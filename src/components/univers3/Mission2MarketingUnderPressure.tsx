'use client'

import { Archivo } from 'next/font/google'
import Accueil from './mission2-marketing/Accueil'
import Partie from './mission2-marketing/Partie'
import { STRYDE } from './mission2-marketing/theme'
import { usePartie } from './mission2-marketing/usePartie'
import { usePilotage } from './mission2-marketing/usePilotage'

// B3 Marketing Digital — Mission 2 « Marketing Under Pressure » (CLAUDE.md, section 3.2).
// Business game en équipe : une connexion par équipe, état de partie dans localStorage,
// aucune écriture serveur du contenu des équipes.

// Typographie STRYDE (titres) : police Google chargée par Next.js lui-même (next/font), sans
// nouvelle dépendance. Appliquée uniquement aux titres de la M2 ; le texte courant reste en Inter.
const archivo = Archivo({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-stryde', display: 'swap' })

export default function Mission2MarketingUnderPressure({ slug }: { total: number; slug: string }) {
  const { pilotage, statut } = usePilotage(slug)
  // undefined = pilotage injoignable : la purge ne s'appuie alors que sur la règle des 24 h.
  const session = statut === 'ok' ? pilotage?.session ?? null : undefined
  const { etat, charge, reprise, demarrer, mettreAJour, sauverMaintenant } = usePartie(slug, statut !== 'chargement', session)

  return (
    // La coquille U3 est étroite (mobile-first) : la M2 s'élargit pour ordinateur et tablette
    // sans modifier MissionShell (exception assumée, CLAUDE.md section 3.6).
    <section
      className={`${archivo.variable} relative left-1/2 -translate-x-1/2 w-[min(72rem,calc(100vw-2rem))] rounded-3xl p-5 sm:p-8 [&_h1]:font-[family-name:var(--font-stryde)] [&_h2]:font-[family-name:var(--font-stryde)] [&_h3]:font-[family-name:var(--font-stryde)] [&_h4]:font-[family-name:var(--font-stryde)]`}
      style={{ background: STRYDE.noir, border: `1px solid ${STRYDE.bordure}`, color: STRYDE.blancCasse }}
      aria-label="Mission 2 — Marketing Under Pressure"
    >
      {!charge ? (
        <p className="py-16 text-center text-sm" style={{ color: STRYDE.texteSecondaire }} aria-live="polite">Chargement de la mission…</p>
      ) : !etat ? (
        <Accueil onEntrer={agence => demarrer(agence, pilotage?.minutesBonus ?? 0)} desactive={false} />
      ) : (
        <Partie slug={slug} etat={etat} reprise={reprise} mettreAJour={mettreAJour} sauverMaintenant={sauverMaintenant} />
      )}
    </section>
  )
}
