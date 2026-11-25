'use client'

import { formaterTemps } from './useChrono'
import { STRYDE } from './theme'

// Affichage du temps restant. Lisible et non anxiogène : l'orange apparaît sous 5 minutes,
// une pulsation discrète sous 1 minute (désactivée si l'utilisateur réduit les animations).
export default function Chronometre({ restantMs, termine }: { restantMs: number; termine?: boolean }) {
  const sousCinq = restantMs <= 5 * 60_000
  const sousUne = restantMs <= 60_000 && restantMs > 0
  return (
    <div
      role="timer"
      aria-label={termine ? 'Épreuve terminée' : `Temps restant : ${formaterTemps(restantMs)}`}
      className={`rounded-xl px-4 py-2 text-center tabular-nums ${sousUne ? 'motion-safe:animate-pulse' : ''}`}
      style={{
        background: sousCinq && !termine ? STRYDE.orangeDoux : STRYDE.anthracite,
        border: `1px solid ${sousCinq && !termine ? 'rgba(255,91,20,0.55)' : STRYDE.bordure}`,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: STRYDE.texteSecondaire }}>
        {termine ? 'Épreuve' : 'Temps restant'}
      </p>
      <p className="text-3xl font-black" style={{ color: sousCinq && !termine ? STRYDE.orange : STRYDE.blancCasse }} data-testid="m2-chrono">
        {termine ? 'Terminée' : formaterTemps(restantMs)}
      </p>
    </div>
  )
}
