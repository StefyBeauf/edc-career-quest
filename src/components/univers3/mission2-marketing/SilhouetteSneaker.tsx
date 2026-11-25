import type { Silhouette } from '@/lib/content/univers3-marketing-m2'

// Silhouette de sneaker dessinée en SVG (aucun logo, aucune photo de produit réel) pour la
// comparaison visuelle de l'épreuve 5. Les différences portent sur la semelle et la bande.
export default function SilhouetteSneaker({ s, legende }: { s: Silhouette; legende: string }) {
  const semelle = {
    crantee: 'M18 92 L186 92 L190 104 L14 104 Z M30 104 l6 6 l6 -6 M60 104 l6 6 l6 -6 M90 104 l6 6 l6 -6 M120 104 l6 6 l6 -6 M150 104 l6 6 l6 -6',
    lisse: 'M18 92 L186 92 Q192 100 186 106 L18 106 Q12 100 18 92 Z',
    sculptee: 'M14 88 Q60 82 100 90 Q150 98 192 88 L194 108 Q100 114 12 108 Z',
    plate: 'M18 94 L188 94 L188 102 L18 102 Z',
  }[s.profilSemelle]
  return (
    <figure className="space-y-1.5">
      <svg viewBox="0 0 204 120" role="img" aria-label={legende} className="w-full h-auto">
        <path d="M20 92 Q22 56 52 48 L92 40 Q108 36 116 50 L150 62 Q184 70 186 92 Z" fill={s.tige} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        <path d="M60 48 L66 70 M74 44 L80 66 M88 41 L94 63" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" />
        {s.bande && <path d="M70 84 Q110 62 160 70 L164 80 Q112 74 76 92 Z" fill={s.accent} />}
        <path d={semelle} fill={s.semelle} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
      </svg>
      <figcaption className="text-center text-xs font-bold">{legende}</figcaption>
    </figure>
  )
}
