"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardOverview from "@/components/dashboard/dashboard-overview"
import { useMediaQuery } from "@/hooks/use-media-query"
import ErrorBoundary from '@/components/error-boundary'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex">
          <DashboardSidebar open={sidebarOpen && isDesktop} />

          <motion.main
            className={`flex-1 transition-all duration-300 ${sidebarOpen && isDesktop ? "ml-64" : "ml-0"} pt-16`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <DashboardOverview />
            </div>
          </motion.main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
