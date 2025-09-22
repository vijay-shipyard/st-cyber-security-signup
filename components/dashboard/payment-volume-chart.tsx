"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { month: "Oct 2023", online: 2800, inPerson: 1200 },
  { month: "Nov 2023", online: 3200, inPerson: 1800 },
  { month: "Dec 2023", online: 4100, inPerson: 1400 },
  { month: "Jan 2024", online: 2900, inPerson: 1600 },
  { month: "Feb 2024", online: 3800, inPerson: 1900 },
  { month: "Mar 2024", online: 4500, inPerson: 2100 },
]

export function PaymentVolumeChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Online vs. In-Person Payments</CardTitle>
        <Button variant="outline" size="sm">
          Show by months
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value}`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="online" fill="url(#onlineGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inPerson" fill="url(#inPersonGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="onlineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="inPersonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-2"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Online</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mr-2"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">In-Person</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
