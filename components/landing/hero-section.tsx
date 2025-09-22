"use client"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Eye, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const keyPoints = [
    {
      id: 1,
      icon: Zap,
      title: "Fast Compensation",
      subtitle: "Upon verified breach",
      description: "24hr payout guarantee",
      color: "from-green-500 to-emerald-600",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      icon: Shield,
      title: "Risk Monitoring",
      subtitle: "Tailored protection",
      description: "24/7 monitoring",
      color: "from-blue-500 to-cyan-600",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      icon: Users,
      title: "Expert Support",
      subtitle: "5 days remediation",
      description: "Elite team ready",
      color: "from-purple-500 to-violet-600",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      icon: Eye,
      title: "RiskRecon Visibility",
      subtitle: "Real-time monitoring",
      description: "Live risk data",
      color: "from-orange-500 to-red-600",
      iconColor: "text-orange-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % keyPoints.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-5 sm:px-7 lg:px-10 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-9"
          >
            <div className="space-y-7 mt-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="text-slate-900 dark:text-white">Payment framework</span>
                <br />
                <span className="text-slate-900 dark:text-white">to fuel </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  your growth
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
              >
                Join millions of businesses that trust SecurePay to accept payments online and in-person, integrate
                financial services, and build custom revenue models—with advanced cybersecurity baked into every
                transaction
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-start"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden"
              >
                <Button
                  onClick={() => (window.location.href = "/signup")}
                  size="lg"
                  className="relative h-14 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-semibold rounded-xl shadow-2xl border-0 group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Start now
                    <motion.div
                      animate={{ x: [0, 7, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center space-x-7 text-base text-slate-500 dark:text-slate-400"
            >
              <span>✓ No setup fees</span>
              <span>✓ No monthly fees</span>
              <span>✓ Cyber protection included</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Cyber Insurance Tile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end mt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Recommended Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute top-2 right-2 z-10"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-6 z-20 relative">
                  Recommended
                </div>
              </motion.div>
              {/* Tile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-center">
                <h2 className="text-xl font-bold text-white mb-2">Introducing Cyber Parametric Insurance</h2>
                <div className="w-20 h-1 bg-white/50 mx-auto rounded-full" />
              </div>

              {/* Carousel Container */}
              <div className="relative h-72 p-7">
                {/* Carousel Content */}
                <div className="relative h-full">
                  {keyPoints.map((point, index) => {
                    const IconComponent = point.icon
                    return (
                      <motion.div
                        key={point.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: currentSlide === index ? 1 : 0,
                          x: currentSlide === index ? 0 : 100,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                      >
                        {/* Professional Icon with Animation */}
                        <motion.div
                          animate={{
                            scale: currentSlide === index ? [1, 1.1, 1] : 1,
                            rotate: currentSlide === index ? [0, 5, -5, 0] : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className={`mb-5 p-5 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 shadow-lg`}
                        >
                          <IconComponent className={`w-14 h-14 ${point.iconColor}`} />
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: currentSlide === index ? 1 : 0,
                            y: currentSlide === index ? 0 : 20,
                          }}
                          transition={{ delay: 0.2 }}
                          className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                        >
                          {point.title}
                        </motion.h3>

                        {/* Subtitle */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: currentSlide === index ? 1 : 0,
                            y: currentSlide === index ? 0 : 20,
                          }}
                          transition={{ delay: 0.3 }}
                          className="text-slate-600 dark:text-slate-300 mb-3 text-sm"
                        >
                          {point.subtitle}
                        </motion.p>

                        {/* Key Point Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: currentSlide === index ? 1 : 0,
                            scale: currentSlide === index ? 1 : 0.8,
                          }}
                          transition={{ delay: 0.4 }}
                          className={`px-5 py-2 rounded-full bg-gradient-to-r ${point.color} text-white font-semibold shadow-lg text-sm`}
                        >
                          {point.description}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Vulnerability Assessment Button */}
              <div className="p-7 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="w-full"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 9px 22px -4px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => (window.location.href = "/risk-analysis")}
                      size="default"
                      className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg border-0 transition-all duration-300 text-sm"
                    >
                      Click here for a vulnerability assessment
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
