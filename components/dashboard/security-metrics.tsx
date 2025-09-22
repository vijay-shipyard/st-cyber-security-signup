"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

const securityItems = [
  {
    name: "SSL Certificate",
    status: "secure",
    value: "Valid",
  },
  {
    name: "2FA Enabled",
    status: "warning",
    value: "Partial",
  },
  {
    name: "Fraud Detection",
    status: "secure",
    value: "Active",
  },
  {
    name: "Data Encryption",
    status: "secure",
    value: "AES-256",
  },
]

export function SecurityMetrics() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Shield className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600" />
          Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Cyber Protection Active</span>
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            $50,000 breach coverage • 23 threats blocked this month
          </p>
        </div>

        <div className="space-y-4">
          {securityItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <span className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
