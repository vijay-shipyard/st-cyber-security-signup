"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Shield, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRiskLevel, getRiskInsights } from "@/lib/risk-calculator"

interface RiskAnalysisProps {
  domain: string
  riskScore: number
  onContinue: () => void
}

export default function RiskAnalysis({ domain, riskScore, onContinue }: RiskAnalysisProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= riskScore) {
            clearInterval(interval)
            return riskScore
          }
          return prev + 1
        })
      }, 20)

      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [riskScore])

  const { level, color } = getRiskLevel(riskScore)
  const riskInsights = getRiskInsights(riskScore, domain)

  return (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Your Security Risk Analysis
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          We've analyzed <span className="font-semibold">{domain}</span> using RiskRecon's advanced security assessment
          technology. Here's what we found:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="col-span-1 bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 text-center"
        >
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">Risk Score</h3>

          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={riskScore >= 80 ? "#10b981" : riskScore >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * animatedScore) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 - (282.7 * riskScore) / 100 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-3xl font-bold"
                fill="currentColor"
              >
                {animatedScore}
              </text>
              <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" className="text-sm" fill="currentColor">
                out of 100
              </text>
            </svg>
          </div>

          <div className={`flex items-center justify-center space-x-2 ${color}`}>
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{level} Risk</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="col-span-2 bg-white dark:bg-slate-700 rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">Key Risk Insights</h3>

          <div className="space-y-6">
            {riskInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                className="flex space-x-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white">{insight.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 p-4 bg-slate-50 dark:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-500"
          >
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white">How This Affects Your Business</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  These vulnerabilities could lead to data breaches, service disruptions, or unauthorized access to your
                  systems. Our parametric protection provides immediate financial support and expert remediation if
                  these risks materialize into actual breaches.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={onContinue}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
        >
          Keep Your Environment Secure
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}
