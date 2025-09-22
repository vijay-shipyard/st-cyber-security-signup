"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, FileText } from "lucide-react"

const complianceStandards = [
  {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    compliance: 95,
    status: "Compliant",
    lastAudit: "2024-01-15",
    nextAudit: "2024-07-15",
    requirements: { met: 11, total: 12 },
  },
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control 2",
    compliance: 88,
    status: "In Progress",
    lastAudit: "2023-12-01",
    nextAudit: "2024-06-01",
    requirements: { met: 22, total: 25 },
  },
  {
    name: "GDPR",
    description: "General Data Protection Regulation",
    compliance: 92,
    status: "Compliant",
    lastAudit: "2024-01-20",
    nextAudit: "2024-07-20",
    requirements: { met: 23, total: 25 },
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    compliance: 78,
    status: "Needs Attention",
    lastAudit: "2023-11-15",
    nextAudit: "2024-05-15",
    requirements: { met: 39, total: 50 },
  },
]

export function ComplianceStatus() {
  const averageCompliance = Math.round(
    complianceStandards.reduce((sum, std) => sum + std.compliance, 0) / complianceStandards.length,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Compliance Status</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">Regulatory compliance overview</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{averageCompliance}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Average</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceStandards.map((standard, index) => (
            <div key={standard.name} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-slate-900 dark:text-white">{standard.name}</h3>
                    <Badge
                      variant={
                        standard.status === "Compliant"
                          ? "default"
                          : standard.status === "In Progress"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {standard.status === "Compliant" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {standard.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                      {standard.status === "Needs Attention" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {standard.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{standard.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{standard.compliance}%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {standard.requirements.met}/{standard.requirements.total} requirements
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <Progress value={standard.compliance} className="h-2" />
              </div>

              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Last audit: {new Date(standard.lastAudit).toLocaleDateString()}</span>
                <span>Next audit: {new Date(standard.nextAudit).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
