import QRCode from 'qrcode'

export async function generateQRCode(slug: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`
  return QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
    color: { dark: '#1a1a2e', light: '#ffffff' },
  })
}

export function getSlugFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const parts = parsed.pathname.split('/').filter(Boolean)
    return parts[0] || null
  } catch {
    return null
  }
}
