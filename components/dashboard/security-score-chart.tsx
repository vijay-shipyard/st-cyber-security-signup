"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { Shield, TrendingUp } from "lucide-react"

const data = [
  { date: "Dec 1", score: 7.8, day: 1 },
  { date: "Dec 3", score: 7.9, day: 3 },
  { date: "Dec 5", score: 7.7, day: 5 },
  { date: "Dec 7", score: 7.8, day: 7 },
  { date: "Dec 9", score: 7.6, day: 9 },
  { date: "Dec 11", score: 7.8, day: 11 },
  { date: "Dec 13", score: 7.7, day: 13 },
  { date: "Dec 15", score: 7.9, day: 15 },
  { date: "Dec 17", score: 7.8, day: 17 },
  { date: "Dec 19", score: 7.7, day: 19 },
  { date: "Dec 21", score: 7.6, day: 21 },
  { date: "Dec 23", score: 7.8, day: 23 },
  { date: "Dec 25", score: 8.9, day: 25 }, // Security fix implemented
  { date: "Dec 27", score: 9.1, day: 27 },
  { date: "Dec 29", score: 9.0, day: 29 },
  { date: "Dec 31", score: 8.7, day: 31 },
]

export function SecurityScoreChart() {
  const currentScore = data[data.length - 1].score
  const previousScore = data[data.length - 7].score
  const improvement = Math.round((currentScore - previousScore) * 10) / 10

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle>Security Score Trend</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">Last 30 days</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{currentScore}/10</div>
          <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3 mr-1" />+{improvement} this week
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[7, 10]}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`${value}/10`, "Security Score"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <ReferenceLine
                x="Dec 25"
                stroke="#10b981"
                strokeDasharray="5 5"
                label={{ value: "Security Fix", position: "top" }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                connectNulls={false}
                isAnimationActive={true}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="80%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Security Enhancement Deployed
            </span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Multi-factor authentication and advanced threat detection implemented on Dec 25th
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
