"use client"

import dynamic from 'next/dynamic'

const SecurityDashboard = dynamic(() => import("@/components/dashboard/security-dashboard"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading Security Dashboard...</p>
      </div>
    </div>
  )
})

export default function SecurityPage() {
  return <SecurityDashboard />
}
