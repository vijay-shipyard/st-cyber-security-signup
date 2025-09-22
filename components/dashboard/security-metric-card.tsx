"use client"

import { Card, CardContent } from "@/components/ui/card"

interface SecurityMetricCardProps {
  title: string
  grade: string
  gradeColor: string
  chartColor: string
  riskLevel: string
  metrics: Array<{
    label: string
    value: string
    status: "good" | "warning" | "error"
  }>
  chartData: Array<{
    date: string
    value: number
  }>
}

export function SecurityMetricCard({ title, grade, gradeColor, riskLevel, metrics }: SecurityMetricCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLetterGrade = (score: number): string => {
    if (score >= 9.0) return "A+"
    if (score >= 8.5) return "A"
    if (score >= 8.0) return "A-"
    if (score >= 7.5) return "B+"
    if (score >= 7.0) return "B"
    if (score >= 6.5) return "B-"
    if (score >= 6.0) return "C+"
    if (score >= 5.5) return "C"
    if (score >= 5.0) return "C-"
    if (score >= 4.0) return "D"
    return "F"
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-fit">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          <span className="text-xs text-slate-600 dark:text-slate-400">{riskLevel}</span>
        </div>

        <div className="flex items-start space-x-4">
          {/* Grade Circle */}
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 ${gradeColor} rounded-full flex items-center justify-center`}>
              <div className="text-center">
                <div className="text-lg font-bold text-white">A+</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1.5">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(metric.status)}`} />
                    <span className="text-slate-600 dark:text-slate-400 truncate">{metric.label}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white ml-2">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
