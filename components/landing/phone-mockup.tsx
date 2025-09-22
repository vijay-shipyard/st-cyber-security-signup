"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Users, Eye } from "lucide-react"

export default function PhoneMockup() {
  const [currentView, setCurrentView] = useState(0)
  const [animatedScore, setAnimatedScore] = useState(0)

  // Cycle through different views
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Animate score
  useEffect(() => {
    const targetScore = currentView === 0 ? 95 : currentView === 1 ? 88 : currentView === 2 ? 92 : 90

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev < targetScore) {
            return Math.min(prev + 3, targetScore)
          } else if (prev > targetScore) {
            return Math.max(prev - 3, targetScore)
          }
          return targetScore
        })
      }, 50)

      setTimeout(() => clearInterval(interval), 800)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentView])

  const views = [
    {
      title: "Fast Compensation",
      subtitle: "Upon verified breach",
      icon: Zap,
      color: "from-emerald-400 to-emerald-600",
      keyPoint: "24hr Payout",
      graphic: "💰",
    },
    {
      title: "Risk Monitoring",
      subtitle: "Tailored protection",
      icon: Eye,
      color: "from-blue-400 to-blue-600",
      keyPoint: "24/7 Monitoring",
      graphic: "🎯",
    },
    {
      title: "Expert Support",
      subtitle: "5 days post-breach",
      icon: Users,
      color: "from-purple-400 to-purple-600",
      keyPoint: "Elite Team Ready",
      graphic: "🚀",
    },
    {
      title: "RiskRecon Visibility",
      subtitle: "Real-time insights",
      icon: Shield,
      color: "from-amber-400 to-amber-600",
      keyPoint: "Live Risk Data",
      graphic: "👁️",
    },
  ]

  const currentViewData = views[currentView]
  const IconComponent = currentViewData.icon

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative"
    >
      {/* Phone Frame */}
      <div className="relative w-80 h-[640px] bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden relative">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />

          {/* Screen Content */}
          <div className="pt-8 px-6 h-full flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                {/* Large Graphic */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl mb-6"
                >
                  {currentViewData.graphic}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
                >
                  {currentViewData.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 dark:text-slate-400 mb-8"
                >
                  {currentViewData.subtitle}
                </motion.p>

                {/* Animated Circle with Key Point */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="relative mb-8"
                >
                  <div className="w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="4"
                        strokeDasharray="251.3"
                        strokeLinecap="round"
                        className={`bg-gradient-to-r ${currentViewData.color} stroke-current`}
                        style={{
                          stroke:
                            currentView === 0
                              ? "#10b981"
                              : currentView === 1
                                ? "#3b82f6"
                                : currentView === 2
                                  ? "#8b5cf6"
                                  : "#f59e0b",
                        }}
                        initial={{ strokeDashoffset: 251.3 }}
                        animate={{ strokeDashoffset: 251.3 - (251.3 * animatedScore) / 100 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mb-2"
                      >
                        <IconComponent className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                      </motion.div>
                      <motion.span
                        className="text-lg font-bold text-slate-900 dark:text-white"
                        key={animatedScore}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {animatedScore}%
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* Key Point Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${currentViewData.color} text-white rounded-full font-semibold text-lg shadow-lg`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-3 h-3 bg-white rounded-full mr-3"
                  />
                  {currentViewData.keyPoint}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
      />
    </motion.div>
  )
}
