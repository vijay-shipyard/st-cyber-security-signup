"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, CreditCard, DollarSign, TrendingUp, Users, MoreHorizontal, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SecurityScoreChart } from "@/components/dashboard/security-score-chart"
import { CustomerSegmentChart } from "@/components/dashboard/customer-segment-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SecurityMetrics } from "@/components/dashboard/security-metrics"
import { MonthlyHighlight } from "@/components/dashboard/monthly-highlight"

export default function DashboardOverview() {
  const [timeframe, setTimeframe] = useState("7d")

  const stats = [
    {
      title: "Total Revenue",
      value: "$24,835",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Customers",
      value: "394",
      change: "+8.2%",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Avg Transaction",
      value: "$174.89",
      change: "+3.2%",
      icon: CreditCard,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Success Rate",
      value: "98.3%",
      change: "+0.7%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back, Acme Corp. Here's your payment overview.
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <SecurityScoreChart />
        </motion.div>

        {/* Customer Segments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <CustomerSegmentChart />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-1"
        >
          <RecentTransactions />
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-1"
        >
          <SecurityMetrics />
        </motion.div>

        {/* Monthly Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-1"
        >
          <MonthlyHighlight />
        </motion.div>
      </div>
    </div>
  )
}
