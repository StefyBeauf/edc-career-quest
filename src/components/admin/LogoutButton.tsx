'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
    >
      {loading ? 'Déconnexion...' : 'Déconnexion'}
    </button>
  )
}
