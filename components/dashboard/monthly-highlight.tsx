"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

const data = [
  { day: 1, value: 2400 },
  { day: 2, value: 1398 },
  { day: 3, value: 9800 },
  { day: 4, value: 3908 },
  { day: 5, value: 4800 },
  { day: 6, value: 3800 },
  { day: 7, value: 4300 },
]

export function MonthlyHighlight() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">$24,835</h3>
            <p className="text-blue-100">Revenue this month</p>
          </div>
          <TrendingUp className="h-8 w-8 text-blue-200" />
        </div>

        <div className="h-20 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="value" stroke="rgba(255,255,255,0.8)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-sm text-blue-100">
          <span>vs last month</span>
          <span className="flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12.5%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
