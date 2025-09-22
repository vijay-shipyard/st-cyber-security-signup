"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Clock, Download, Filter, Search, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TransactionsPanel() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock transaction data
  const transactions = [
    {
      id: "txn_1NjE2CKF6S7X",
      customer: "Globex Corporation",
      amount: "$1,250.00",
      status: "completed",
      date: "Today, 10:45 AM",
      method: "Visa •••• 4242",
    },
    {
      id: "txn_1NjD8BKF6S7X",
      customer: "Initech LLC",
      amount: "$3,840.00",
      status: "completed",
      date: "Today, 9:12 AM",
      method: "Mastercard •••• 5555",
    },
    {
      id: "txn_1NjC3DKF6S7X",
      customer: "Massive Dynamic",
      amount: "$750.00",
      status: "processing",
      date: "Today, 8:30 AM",
      method: "Apple Pay",
    },
    {
      id: "txn_1NiZ9FKF6S7X",
      customer: "Stark Industries",
      amount: "$2,100.00",
      status: "completed",
      date: "Yesterday, 4:23 PM",
      method: "Bank Transfer",
    },
    {
      id: "txn_1NiX7GKF6S7X",
      customer: "Wayne Enterprises",
      amount: "$5,000.00",
      status: "failed",
      date: "Yesterday, 2:15 PM",
      method: "Amex •••• 7890",
    },
    {
      id: "txn_1NiW2HKF6S7X",
      customer: "Acme Corp",
      amount: "$899.99",
      status: "completed",
      date: "Yesterday, 1:05 PM",
      method: "PayPal",
    },
    {
      id: "txn_1NiU1IKF6S7X",
      customer: "Cyberdyne Systems",
      amount: "$1,499.99",
      status: "refunded",
      date: "Yesterday, 11:30 AM",
      method: "Visa •••• 9876",
    },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
      case "refunded":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-3 w-3 mr-1" />
      case "processing":
        return <Clock className="h-3 w-3 mr-1" />
      case "failed":
        return <X className="h-3 w-3 mr-1" />
      case "refunded":
        return <Download className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 w-[200px] bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50"
              >
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Completed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Processing</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Failed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Transaction</th>
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Customer</th>
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Amount</th>
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Date</th>
                    <th className="h-12 px-4 text-left font-medium text-slate-500 dark:text-slate-400">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="border-b border-slate-100/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors"
                      >
                        <td className="p-4 align-middle font-mono text-xs">{transaction.id}</td>
                        <td className="p-4 align-middle font-medium">{transaction.customer}</td>
                        <td className="p-4 align-middle font-medium">{transaction.amount}</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className={`${getStatusColor(transaction.status)} backdrop-blur-sm`}>
                            <span className="flex items-center">
                              {getStatusIcon(transaction.status)}
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-slate-500 dark:text-slate-400">{transaction.date}</td>
                        <td className="p-4 align-middle">{transaction.method}</td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-slate-500 dark:text-slate-400">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
