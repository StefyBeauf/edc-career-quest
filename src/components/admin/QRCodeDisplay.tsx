'use client'

import { useState } from 'react'
import Image from 'next/image'

interface QRCodeDisplayProps {
  dataUrl: string
  url: string
  groupName: string
}

export default function QRCodeDisplay({ dataUrl, url, groupName }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  function handleDownload() {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `qr-${groupName.toLowerCase().replace(/\s+/g, '-')}.png`
    link.click()
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center gap-4">
      <div className="bg-white rounded-lg p-3">
        <Image src={dataUrl} alt={`QR Code — ${groupName}`} width={200} height={200} />
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-500 mb-1">URL du groupe</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-gray-800 text-indigo-300 text-xs rounded-lg px-3 py-2 truncate">
            {url}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
          >
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
      >
        Télécharger le QR Code
      </button>
    </div>
  )
}
