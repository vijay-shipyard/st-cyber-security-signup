"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, X } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    customer: "Amazon Web Services",
    amount: "$12,450.00",
    status: "completed",
    time: "2 min ago",
  },
  {
    id: "TXN-002",
    customer: "Microsoft Azure",
    amount: "$8,340.00",
    status: "processing",
    time: "5 min ago",
  },
  {
    id: "TXN-003",
    customer: "Shopify Plus",
    amount: "$2,750.00",
    status: "failed",
    time: "12 min ago",
  },
  {
    id: "TXN-004",
    customer: "Salesforce",
    amount: "$5,100.00",
    status: "completed",
    time: "18 min ago",
  },
]

export function RecentTransactions() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-emerald-500" />
      case "processing":
        return <Clock className="h-3 w-3 text-blue-500" />
      case "failed":
        return <X className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <span className="text-sm text-slate-500">Today</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                  {transaction.customer.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{transaction.customer}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{transaction.amount}</p>
                <Badge variant="outline" className={`${getStatusColor(transaction.status)} text-xs`}>
                  <span className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1">{transaction.status}</span>
                  </span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
