import type { ReactNode } from 'react'
import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'

export const metadata = {
  title: 'Admin — EDC Career Quest',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-indigo-400 font-bold text-lg leading-none">EDC</span>
            <span className="text-gray-400 text-sm hidden sm:block">Career Quest — Admin</span>
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
