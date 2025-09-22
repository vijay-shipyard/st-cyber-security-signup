"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Eye, TrendingUp } from "lucide-react"

const threats = [
  {
    type: "Phishing Attempts",
    severity: "High",
    count: 23,
    blocked: 21,
    trend: "up",
    description: "Email-based social engineering attacks targeting employees",
  },
  {
    type: "Malware Detection",
    severity: "Critical",
    count: 5,
    blocked: 4,
    trend: "down",
    description: "Malicious software attempts on endpoint devices",
  },
  {
    type: "Unauthorized Access",
    severity: "Medium",
    count: 12,
    blocked: 10,
    trend: "stable",
    description: "Failed login attempts from suspicious locations",
  },
  {
    type: "Data Exfiltration",
    severity: "High",
    count: 3,
    blocked: 3,
    trend: "down",
    description: "Attempts to extract sensitive business data",
  },
  {
    type: "DDoS Attempts",
    severity: "Medium",
    count: 8,
    blocked: 7,
    trend: "up",
    description: "Distributed denial of service attacks on infrastructure",
  },
]

export function ThreatAnalysis() {
  const totalThreats = threats.reduce((sum, threat) => sum + threat.count, 0)
  const totalBlocked = threats.reduce((sum, threat) => sum + threat.blocked, 0)
  const blockRate = Math.round((totalBlocked / totalThreats) * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Threat Analysis</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">Last 30 days</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{blockRate}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Blocked</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threats.map((threat, index) => (
            <div key={threat.type} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-slate-900 dark:text-white">{threat.type}</h3>
                    <Badge
                      variant={
                        threat.severity === "Critical"
                          ? "destructive"
                          : threat.severity === "High"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {threat.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                  {threat.trend === "down" && <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />}
                  {threat.trend === "stable" && <div className="w-4 h-0.5 bg-slate-400" />}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{threat.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-400">Detected: {threat.count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Blocked: {threat.blocked}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {Math.round((threat.blocked / threat.count) * 100)}% success rate
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
