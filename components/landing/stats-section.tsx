"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function StatsSection() {
  const [counters, setCounters] = useState({
    companies: 0,
    countries: 0,
    volume: 0,
    uptime: 0,
  })

  const finalValues = {
    companies: 4000000,
    countries: 40,
    volume: 640,
    uptime: 99.99,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        companies: Math.floor(finalValues.companies * progress),
        countries: Math.floor(finalValues.countries * progress),
        volume: Math.floor(finalValues.volume * progress),
        uptime: Math.min(finalValues.uptime, finalValues.uptime * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters(finalValues)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      value: `${(counters.companies / 1000000).toFixed(1)}M+`,
      label: "Companies worldwide",
      description: "Trust SecurePay for their payments",
    },
    {
      value: `${counters.countries}+`,
      label: "Countries supported",
      description: "With local payment methods",
    },
    {
      value: `$${counters.volume}B+`,
      label: "Annual volume",
      description: "Processed securely every year",
    },
    {
      value: `${counters.uptime.toFixed(2)}%`,
      label: "Uptime guarantee",
      description: "With global infrastructure",
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powering the world's payments
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            SecurePay is trusted by millions of companies around the world to handle their most important transactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                {stat.value}
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{stat.label}</h3>
              <p className="text-slate-600 dark:text-slate-300">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
