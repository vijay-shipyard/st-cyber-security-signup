"use client"

import dynamic from 'next/dynamic'

// Dynamically import DashboardOverview with no SSR to prevent server-side rendering issues
const DashboardOverview = dynamic(
  () => import('@/components/dashboard/dashboard-overview'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Dashboard...</p>
        </div>
      </div>
    )
  }
)

export default function DashboardOverviewWrapper() {
  return <DashboardOverview />
}