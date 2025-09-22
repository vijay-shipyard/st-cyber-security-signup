"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  Wallet,
  Plus,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DashboardSidebarProps {
  open: boolean
}

export default function DashboardSidebar({ open }: DashboardSidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: CreditCard, label: "Payments", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Wallet, label: "Balances", active: false },
    { icon: Users, label: "Customers", active: false },
    { icon: Shield, label: "Security", active: false },
    { icon: Link, label: "Integrations", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: open ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-20 overflow-y-auto"
    >
      <div className="p-4 space-y-6">
        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            New Payment Link
          </Button>
        </motion.div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              {item.label === "Security" ? (
                <Link href="/security">
                  <button
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                    )}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Security
                  </button>
                </Link>
              ) : item.label === "Overview" ? (
                <Link href="/dashboard">
                  <button
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      item.active
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    Overview
                  </button>
                </Link>
              ) : (
                <button
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    item.active
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Security Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2 rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 ml-2">Cyber Protection</h3>
          </div>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-3">
            Your business is protected with $50,000 in breach coverage.
          </p>
          <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            Security Score: 85/100
          </div>
        </motion.div>

        {/* Mobile App Promotion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Get mobile app</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Manage payments on the go with our mobile app
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                <span className="text-xs">📱</span>
              </div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                <span className="text-xs">🍎</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
