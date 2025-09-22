"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Search,
  Globe,
  Lock,
  Wifi,
  Database,
  Server,
} from "lucide-react"

import { calculateRiskScore, getVulnerabilities } from "@/lib/risk-calculator"

export default function RiskAnalysisPage() {
  const [domain, setDomain] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentScanStep, setCurrentScanStep] = useState(0)
  const [scanProgress, setScanProgress] = useState(0)
  const [riskData, setRiskData] = useState({
    score: 0,
    grade: "",
    vulnerabilities: [],
    insights: [],
  })

  const scanSteps = [
    { icon: Globe, label: "Scanning domain infrastructure", duration: 2000 },
    { icon: Lock, label: "Analyzing SSL certificates", duration: 1800 },
    { icon: Wifi, label: "Checking network security", duration: 1900 },
    { icon: Database, label: "Evaluating data exposure", duration: 1600 },
    { icon: Server, label: "Assessing server configuration", duration: 1700 },
    { icon: Shield, label: "Generating risk report", duration: 1500 },
  ]

  useEffect(() => {
    if (isAnalyzing) {
      let stepIndex = 0
      let progress = 0

      const runScanStep = () => {
        if (stepIndex < scanSteps.length) {
          setCurrentScanStep(stepIndex)

          // Animate progress for this step
          const stepDuration = scanSteps[stepIndex].duration
          const progressIncrement = 100 / scanSteps.length / (stepDuration / 50)

          const progressInterval = setInterval(() => {
            progress += progressIncrement
            setScanProgress(Math.min(progress, ((stepIndex + 1) / scanSteps.length) * 100))
          }, 50)

          setTimeout(() => {
            clearInterval(progressInterval)
            stepIndex++
            if (stepIndex < scanSteps.length) {
              runScanStep()
            } else {
              // Complete the scan
              setScanProgress(100)
              setTimeout(() => {
                const score = calculateRiskScore()
                setRiskData({
                  score,
                  grade: score >= 80 ? "A-" : score >= 70 ? "B" : score >= 60 ? "B-" : "C",
                  vulnerabilities: getVulnerabilities(score),
                  insights: [
                    "Your domain shows moderate cyber risk exposure",
                    "SSL certificate management needs attention",
                    "Network security could be strengthened",
                    "Regular security updates recommended",
                  ],
                })
                setIsAnalyzing(false)
                setShowResults(true)
              }, 1000)
            }
          }, stepDuration)
        }
      }

      runScanStep()
    }
  }, [isAnalyzing])

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain) return

    setIsAnalyzing(true)
    setCurrentScanStep(0)
    setScanProgress(0)
  }

  const riskImpacts = [
    {
      icon: DollarSign,
      title: "Financial Loss",
      description: "Average breach costs $4.45M globally",
      color: "text-red-600",
    },
    {
      icon: Clock,
      title: "Downtime",
      description: "Average 287 days to identify and contain",
      color: "text-orange-600",
    },
    {
      icon: Users,
      title: "Customer Trust",
      description: "60% of customers leave after a breach",
      color: "text-purple-600",
    },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center py-32">
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

      <div className="container mx-auto px-5 sm:px-7 lg:px-10 relative z-10 max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {!showResults && !isAnalyzing && (
            /* Step 2: Domain Input */
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-slate-900 dark:text-white">Analyze your </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    cyber risk
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                  Enter your domain to get a comprehensive cyber risk assessment powered by RiskRecon's industry-leading
                  threat intelligence platform.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-md mx-auto"
              >
                <Card className="p-8 bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700">
                  <form onSubmit={handleDomainSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="domain" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Domain Name
                      </label>
                      <Input
                        id="domain"
                        type="text"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="h-12 text-lg border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={!domain}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg border-0 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2">
                          <span>Analyze Risk</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center space-x-8 text-sm text-slate-500 dark:text-slate-400"
              >
                <span>✓ Powered by RiskRecon</span>
                <span>✓ Real-time analysis</span>
                <span>✓ Enterprise-grade security</span>
              </motion.div>
            </motion.div>
          )}

          {isAnalyzing && (
            /* Assessment Animation */
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  <span className="text-slate-900 dark:text-white">Scanning </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {domain}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-slate-600 dark:text-slate-300"
                >
                  Our AI-powered security engine is analyzing your digital footprint
                </motion.p>
              </div>

              {/* Scanning Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-lg mx-auto"
              >
                <Card className="p-8 bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>Assessment Progress</span>
                        <span>{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Scanning Steps */}
                    <div className="space-y-4">
                      {scanSteps.map((step, index) => {
                        const IconComponent = step.icon
                        const isActive = index === currentScanStep
                        const isCompleted = index < currentScanStep

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0.3, x: -20 }}
                            animate={{
                              opacity: isActive ? 1 : isCompleted ? 0.7 : 0.3,
                              x: isActive || isCompleted ? 0 : -20,
                              scale: isActive ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                              isActive
                                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                : isCompleted
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-slate-50 dark:bg-slate-800"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-full transition-all duration-300 ${
                                isActive
                                  ? "bg-blue-500 text-white"
                                  : isCompleted
                                    ? "bg-green-500 text-white"
                                    : "bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              <motion.div
                                animate={isActive ? { rotate: 360 } : {}}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <IconComponent className="w-4 h-4" />
                              </motion.div>
                            </div>
                            <div className="flex-1 text-left">
                              <span
                                className={`text-sm font-medium transition-colors duration-300 ${
                                  isActive
                                    ? "text-blue-700 dark:text-blue-300"
                                    : isCompleted
                                      ? "text-green-700 dark:text-green-300"
                                      : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </motion.div>
                            )}
                            {isActive && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                className="w-3 h-3 bg-blue-500 rounded-full"
                              />
                            )}
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Scanning Visualization */}
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-16 h-16 mx-auto border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Search className="w-6 h-6 text-blue-500" />
                      </motion.div>
                    </div>

                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-sm text-slate-500 dark:text-slate-400 text-center"
                    >
                      This may take a few moments...
                    </motion.p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {showResults && (
            /* Step 3: Risk Analysis Display */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Risk Score Header */}
              <div className="text-center space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  <span className="text-slate-900 dark:text-white">Risk Analysis for </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {domain}
                  </span>
                </motion.h1>
              </div>

              {/* Risk Score Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="p-8 bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                          className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center"
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1.0 }}
                            className="text-3xl font-bold text-white"
                          >
                            {riskData.score}
                          </motion.span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.2 }}
                          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full"
                        >
                          <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                            Grade {riskData.grade}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="space-y-2"
                    >
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Moderate Risk Exposure</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Your domain shows several areas that require immediate attention to prevent potential cyber
                        threats.
                      </p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Vulnerabilities Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {riskData.vulnerabilities.map((vuln, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  >
                    <Card className="p-6 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle
                          className={`w-5 h-5 mt-1 ${
                            vuln.severity === "High"
                              ? "text-red-500"
                              : vuln.severity === "Medium"
                                ? "text-orange-500"
                                : "text-yellow-500"
                          }`}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-slate-900 dark:text-white">{vuln.type}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                vuln.severity === "High"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                  : vuln.severity === "Medium"
                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              {vuln.severity}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{vuln.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Business Impact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="text-center space-y-2"
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Potential Business Impact</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        These vulnerabilities could significantly impact your business operations
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {riskImpacts.map((impact, index) => {
                        const IconComponent = impact.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                            className="text-center space-y-3"
                          >
                            <div className="flex justify-center">
                              <div className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg">
                                <IconComponent className={`w-6 h-6 ${impact.color}`} />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-semibold text-slate-900 dark:text-white">{impact.title}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{impact.description}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Parametric Protection CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.6 }}
                >
                  <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="space-y-4">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 3.0 }}
                      >
                        <Shield className="w-12 h-12 mx-auto" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">Parametric Cyber Insurance</h3>
                      <p className="text-blue-100 max-w-2xl mx-auto">
                        Don't wait for a breach to happen. Our parametric insurance provides instant payouts when cyber
                        incidents are detected, ensuring your business can recover quickly without lengthy claim
                        processes.
                      </p>
                      <div className="flex items-center justify-center space-x-8 text-sm text-blue-100">
                        <span>✓ Instant payouts</span>
                        <span>✓ No claim disputes</span>
                        <span>✓ 24/7 monitoring</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    size="lg"
                    className="h-14 px-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-semibold rounded-xl shadow-2xl border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6" />
                      <span>Keep your environment secure</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
