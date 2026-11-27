'use client'

import { useCallback, useState } from 'react'
import { Archivo } from 'next/font/google'
import Accueil from './mission2-marketing/Accueil'
import { EcranActivation, EcranRetour } from './mission2-marketing/EcransHorizon'
import { revenirAuVerdict } from './mission2-marketing/etatPartie'
import Partie from './mission2-marketing/Partie'
import { HORIZON, STRYDE } from './mission2-marketing/theme'
import { usePartie } from './mission2-marketing/usePartie'
import { usePilotage } from './mission2-marketing/usePilotage'

// B3 Marketing Digital — Mission 2 « Marketing Under Pressure », v3 (CLAUDE.md, section 3.2).
// Récit : le centre de contrôle Mission Horizon (identité U3 navy / or) active le simulateur
// STRYDE (identité noir / orange), puis l'équipe y revient après le verdict.
// Business game en équipe : une connexion par équipe, état de partie dans localStorage,
// aucune écriture serveur du contenu des équipes.

// Typographie STRYDE (titres) : police Google chargée par Next.js lui-même (next/font), sans
// nouvelle dépendance. Appliquée uniquement aux titres de la M2 ; le texte courant reste en Inter.
const archivo = Archivo({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-stryde', display: 'swap' })

export default function Mission2MarketingUnderPressure({ slug }: { total: number; slug: string }) {
  const { pilotage, statut } = usePilotage(slug)
  // undefined = pilotage injoignable : la purge ne s'appuie alors que sur la règle des 24 h.
  const session = statut === 'ok' ? pilotage?.session ?? null : undefined
  const { etat, charge, reprise, misAJour, demarrer, mettreAJour, sauverMaintenant } = usePartie(slug, statut !== 'chargement', session)
  // Simulateur activé depuis l'écran du centre de contrôle (non mémorisé : sans partie, on y revient).
  const [active, setActive] = useState(false)
  const activer = useCallback(() => setActive(true), [])
  // Identité du centre de contrôle avant l'activation et au retour ; STRYDE à l'intérieur du simulateur.
  const horizon = charge && (etat ? etat.etape === 'retour' : !active)

  return (
    // La coquille U3 est étroite (mobile-first) : la M2 s'élargit pour ordinateur et tablette
    // sans modifier MissionShell (exception assumée, CLAUDE.md section 3.6).
    <section
      className={`${archivo.variable} relative left-1/2 -translate-x-1/2 w-[min(72rem,calc(100vw-2rem))] rounded-3xl p-5 sm:p-8 motion-safe:transition-colors motion-safe:duration-1000 [&_h1]:font-[family-name:var(--font-stryde)] [&_h2]:font-[family-name:var(--font-stryde)] [&_h3]:font-[family-name:var(--font-stryde)] [&_h4]:font-[family-name:var(--font-stryde)]`}
      style={horizon
        ? { background: HORIZON.fond, border: `1px solid ${HORIZON.bordure}`, color: HORIZON.creme }
        : { background: STRYDE.noir, border: `1px solid ${STRYDE.bordure}`, color: STRYDE.blancCasse }}
      aria-label="Mission 2 — Marketing Under Pressure"
    >
      {!charge ? (
        <p className="py-16 text-center text-sm" style={{ color: STRYDE.texteSecondaire }} aria-live="polite">Chargement de la mission…</p>
      ) : !etat && !active ? (
        <EcranActivation onActiver={activer} misAJour={misAJour} />
      ) : !etat ? (
        <Accueil onEntrer={agence => demarrer(agence, pilotage?.minutesBonus ?? 0)} desactive={false} />
      ) : etat.etape === 'retour' ? (
        <EcranRetour onRevoirVerdict={() => mettreAJour(revenirAuVerdict)} />
      ) : (
        <Partie slug={slug} etat={etat} reprise={reprise} mettreAJour={mettreAJour} sauverMaintenant={sauverMaintenant} />
      )}
    </section>
  )
}
