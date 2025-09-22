"use client"

import { motion } from "framer-motion"
import { CreditCard, Shield, BarChart3, Globe, Zap, Lock } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: CreditCard,
      title: "Accept payments",
      description: "Online and in-person payments with support for 135+ currencies and local payment methods.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Cyber protection",
      description: "Built-in parametric cyber insurance with $50K coverage and expert remediation support.",
      color: "emerald",
    },
    {
      icon: BarChart3,
      title: "Advanced analytics",
      description: "Real-time insights into your revenue, customers, and business performance.",
      color: "purple",
    },
    {
      icon: Globe,
      title: "Global scale",
      description: "Process payments in 40+ countries with local acquiring and settlement.",
      color: "amber",
    },
    {
      icon: Zap,
      title: "Lightning fast",
      description: "Sub-second response times with 99.99% uptime and global infrastructure.",
      color: "red",
    },
    {
      icon: Lock,
      title: "Bank-level security",
      description: "PCI DSS Level 1 certified with advanced fraud protection and encryption.",
      color: "indigo",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything you need to grow your business
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From payment processing to cyber protection, SecurePay provides all the tools you need to accept payments
            securely and scale your revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg ${getColorClasses(feature.color)} flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
