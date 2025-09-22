"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Shield, ShieldCheck, ShieldX, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function SecurityPanel() {
  // Mock security data (0-10 scale)
  const securityScore = 8.7
  const lastScan = "Today, 2:30 AM"
  const breachCoverage = "$50,000"
  const daysRemaining = 28
  const threatsBlocked = 23

  const securityItems = [
    {
      name: "SSL Certificate",
      status: "secure",
      details: "Valid until Jan 15, 2026",
    },
    {
      name: "Payment Endpoints",
      status: "secure",
      details: "All endpoints protected",
    },
    {
      name: "Admin Access",
      status: "warning",
      details: "2FA recommended for all admins",
    },
    {
      name: "Data Encryption",
      status: "secure",
      details: "AES-256 encryption active",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "danger":
        return <ShieldX className="h-4 w-4 text-red-500" />
      default:
        return <Shield className="h-4 w-4 text-slate-500" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return "text-emerald-500 dark:text-emerald-400"
    if (score >= 6.0) return "text-amber-500 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              Security Status
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * (securityScore * 10)) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className={getScoreColor(securityScore)}
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{ strokeDashoffset: 282.7 - (282.7 * (securityScore * 10)) / 100 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-2xl font-bold ${getScoreColor(securityScore)}`}
                  >
                    {securityScore}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs text-slate-500 dark:text-slate-400"
                  >
                    Security Score
                  </text>
                </svg>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">Last scan: {lastScan}</p>
                <div className="flex items-center justify-center mt-2 space-x-4">
                  <div className="flex items-center text-sm">
                    <Zap className="h-4 w-4 text-emerald-500 mr-1" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {threatsBlocked} threats blocked
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-3">
                {securityItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-200/30 dark:border-slate-600/30"
                  >
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2 text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.details}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-700/50 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2 rounded-lg mr-3">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              Cyber Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Breach Coverage</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{breachCoverage}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Plan Renewal</span>
                  <span>{daysRemaining} days remaining</span>
                </div>
                <Progress value={(daysRemaining / 30) * 100} className="h-2" />
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-emerald-50/80 dark:bg-emerald-900/30 backdrop-blur-sm p-4 rounded-lg flex items-start space-x-3 border border-emerald-200/50 dark:border-emerald-700/50"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Protection Active</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                    Your business is protected against cyber threats with immediate financial support in case of a
                    breach.
                  </p>
                </div>
              </motion.div>

              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Protection Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
