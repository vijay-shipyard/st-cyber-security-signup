"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, CreditCard, Menu, Moon, Search, Settings, Sun, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function DashboardHeader({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 z-30 px-4 shadow-lg">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-2 rounded-lg relative">
              <CreditCard className="h-6 w-6 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="h-2 w-2 text-white" />
              </motion.div>
            </div>
            <span className="font-bold text-xl hidden md:inline ml-2 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              SecurePay
            </span>
          </motion.div>
        </div>

        <div className="flex items-center space-x-2">
          {showSearch ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative"
            >
              <Input
                placeholder="Search..."
                className="pr-8 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <X
                size={18}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            </motion.div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search size={20} />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50"
            >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div>
                    <p className="font-medium">New payment received</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">$1,250.00 from Global Retail Partners</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">10 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Security alert</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Unusual login attempt detected</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Cyber protection active</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your monthly scan is complete</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50"
            >
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuItem>Team Members</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white font-medium shadow-lg">
              DC
            </div>
            <span className="ml-2 font-medium">DemoCo</span>
          </div>
        </div>
      </div>
    </header>
  )
}
