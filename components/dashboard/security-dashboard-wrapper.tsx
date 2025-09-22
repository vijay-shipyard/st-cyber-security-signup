"use client"

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Dynamically import SecurityDashboard with no SSR to prevent server-side rendering issues
const SecurityDashboard = dynamic(
  () => import('@/components/dashboard/security-dashboard'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Security Dashboard...</p>
        </div>
      </div>
    )
  }
)

export default function SecurityDashboardWrapper() {
  return <SecurityDashboard />
}