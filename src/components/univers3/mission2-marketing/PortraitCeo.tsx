import Image from 'next/image'
import { VISUELS_STRYDE } from '@/lib/content/univers3-marketing-m2'
import { STRYDE } from './theme'

// Portrait de Stéphanie Vador, CEO de STRYDE, fourni par Stéphanie (2026-11-27).
export default function PortraitCeo({ taille = 56 }: { taille?: number }) {
  return (
    <Image
      src={VISUELS_STRYDE.portraitCeo}
      alt="Portrait de Stéphanie Vador, CEO de STRYDE"
      width={taille}
      height={taille}
      className="shrink-0 rounded-full object-cover"
      style={{ border: `2px solid ${STRYDE.orange}` }}
    />
  )
}
