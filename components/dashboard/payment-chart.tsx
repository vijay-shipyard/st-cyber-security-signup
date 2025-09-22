"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PaymentChartProps {
  timeframe: string
}

export function PaymentChart({ timeframe }: PaymentChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate random data based on timeframe
    const generateData = () => {
      let days: number

      switch (timeframe) {
        case "7d":
          days = 7
          break
        case "30d":
          days = 30
          break
        case "90d":
          days = 90
          break
        default:
          days = 7
      }

      const baseAmount = timeframe === "7d" ? 3000 : timeframe === "30d" ? 2500 : 2000
      const variance = timeframe === "7d" ? 1500 : timeframe === "30d" ? 2000 : 3000

      const newData = []
      const today = new Date()

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Generate a random amount with an upward trend
        const trendFactor = 1 + (days - i) / (days * 2) // Creates a slight upward trend
        const randomAmount = Math.floor((baseAmount + Math.random() * variance) * trendFactor)

        newData.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          amount: randomAmount,
        })
      }

      return newData
    }

    setData(generateData())
  }, [timeframe])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Amount"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="url(#colorGradient)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
