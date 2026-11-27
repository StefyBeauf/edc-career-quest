// Couche visuelle STRYDE, appliquée À L'INTÉRIEUR de la M2 uniquement (CLAUDE.md, section 3.6).
// La coquille U3 (navy / or) reste inchangée autour.
// Contrastes vérifiés (WCAG AA) : blanc cassé sur noir ≈ 17:1 · orange sur noir ≈ 7:1 ·
// noir sur orange ≈ 7:1 · texte secondaire sur anthracite ≈ 7:1.
export const STRYDE = {
  noir: '#0B0B0C',
  anthracite: '#1C1C1F',
  anthraciteClair: '#2A2A2F',
  blancCasse: '#F2EEE6',
  texteSecondaire: '#B9B4AA',
  orange: '#FF5B14',
  orangeDoux: 'rgba(255,91,20,0.12)',
  bordure: 'rgba(242,238,230,0.12)',
} as const

// Identité du centre de contrôle Mission Horizon (coquille U3 navy / or), utilisée pour les
// écrans d'activation et de retour qui encadrent le simulateur STRYDE (fiche v3).
// Contrastes (WCAG AA) : crème sur navy ≈ 16:1 · or sur navy ≈ 8:1 · navy sur or ≈ 8:1.
export const HORIZON = {
  fond: '#050a1a',
  panneau: '#0d1f3c',
  or: '#c9a84c',
  creme: '#f5ecd0',
  texteSecondaire: '#b9c2d3',
  bordure: 'rgba(201,168,76,0.35)',
} as const
