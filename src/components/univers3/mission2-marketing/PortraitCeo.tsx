import { CEO } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Portrait illustré d'Alex Morgan, CEO FICTIF de STRYDE : silhouette géométrique en SVG,
// jamais la photo d'une personne réelle (CLAUDE.md, section 3.6). Remplaçable par un visuel
// fourni par Stéphanie (question ouverte 11).
export default function PortraitCeo({ taille = 56 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 64 64" role="img" aria-label={`Portrait illustré de ${CEO.nom}`} className="shrink-0">
      <circle cx="32" cy="32" r="31" fill={STRYDE.anthraciteClair} stroke={STRYDE.orange} strokeWidth="2" />
      <path d="M12 58c2-11 10-17 20-17s18 6 20 17" fill={STRYDE.noir} />
      <path d="M27 41l5 7 5-7" fill={STRYDE.blancCasse} />
      <circle cx="32" cy="27" r="11" fill={STRYDE.blancCasse} />
      <path d="M21 25c1-8 6-12 12-12 6 0 10 4 11 10-4-3-9-4-14-3-4 1-7 3-9 5z" fill={STRYDE.noir} />
      <rect x="22" y="56" width="20" height="3" rx="1.5" fill={STRYDE.orange} />
    </svg>
  )
}
