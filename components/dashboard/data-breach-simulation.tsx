"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Clock, CheckCircle, Play, Pause, Zap, TrendingUp, Award } from "lucide-react"

interface DataBreachSimulationProps {
  isOpen: boolean
  onClose: () => void
}

export function DataBreachSimulation({ isOpen, onClose }: DataBreachSimulationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const steps = [
    {
      title: "Breach Detected",
      time: "T+0 minutes",
      description: "Ransomware attack detected via phishing email",
      status: "critical",
      details: [
        "Customer database compromised",
        "Payment systems affected",
        "Internal networks encrypted",
        "2,500 customer records at risk",
      ],
    },
    {
      title: "Insurance Activated",
      time: "T+15 minutes",
      description: "Parametric insurance automatically triggered",
      status: "active",
      details: [
        "Breach parameters verified",
        "Coverage limits confirmed",
        "Incident response team notified",
        "Initial payout authorized: $32,000",
      ],
    },
    {
      title: "Response Deployed",
      time: "T+2 hours",
      description: "Professional incident response team engaged",
      status: "progress",
      details: [
        "Forensic investigation started",
        "Systems isolated and secured",
        "Customer notification prepared",
        "Legal team activated",
      ],
    },
    {
      title: "Recovery Complete",
      time: "T+72 hours",
      description: "Systems restored, operations resumed",
      status: "resolved",
      details: [
        "All systems fully restored",
        "Customers notified and protected",
        "Compliance requirements met",
        "Business operations normalized",
      ],
    },
  ]

  const financialImpact = {
    businessInterruption: 23000,
    dataRecovery: 8500,
    legalCompliance: 12000,
    customerNotification: 4500,
    totalLoss: 48000,
    insurancePayout: 32000,
    netLoss: 16000,
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentStep < steps.length) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((curr) => curr + 1)
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentStep, steps.length])

  const startSimulation = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setProgress(0)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "active":
        return "bg-blue-500"
      case "progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Data Breach Simulation
            <Shield className="w-6 h-6 text-blue-500" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Parametric Insurance Highlight - First Priority */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <Card className="border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="p-2 bg-blue-500 rounded-full"
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Parametric Insurance Protection
                  </span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <Zap className="w-6 h-6 text-green-600" />
                    </motion.div>
                    <div className="text-2xl font-bold text-green-600 mb-1">15 min</div>
                    <div className="text-sm text-gray-600">Instant Activation</div>
                  </motion.div>

                  <motion.div
                    className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">67%</div>
                    <div className="text-sm text-gray-600">Loss Coverage</div>
                  </motion.div>

                  <motion.div
                    className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center"
                    >
                      <Award className="w-6 h-6 text-purple-600" />
                    </motion.div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {formatCurrency(financialImpact.insurancePayout)}
                    </div>
                    <div className="text-sm text-gray-600">Immediate Payout</div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Shield className="w-5 h-5 text-green-600" />
                    </motion.div>
                    <span className="font-semibold text-green-800">Automatic Protection Active</span>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-green-700">
                    Your parametric insurance automatically detects breach parameters and triggers immediate financial
                    protection, providing <strong>instant liquidity</strong> when you need it most.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Simulation Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Simulation Controls</span>
                <div className="flex gap-2">
                  {!isRunning && currentStep === 0 && (
                    <Button onClick={startSimulation} className="bg-red-500 hover:bg-red-600">
                      <Play className="w-4 h-4 mr-2" />
                      Start Simulation
                    </Button>
                  )}
                  {isRunning && (
                    <Button onClick={() => setIsRunning(false)} variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetSimulation} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Simulation Progress</span>
                    <span>
                      {currentStep}/{steps.length} steps completed
                    </span>
                  </div>
                  <Progress value={(currentStep / steps.length) * 100} className="h-2" />
                </div>
                {currentStep < steps.length && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Step Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Incident Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.3,
                        scale: index === currentStep ? 1.02 : 1,
                      }}
                      className={`p-4 rounded-lg border-2 ${
                        index <= currentStep ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)}`} />
                        <Badge variant={index <= currentStep ? "default" : "secondary"}>{step.time}</Badge>
                        {index <= currentStep && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <ul className="text-xs space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          {currentStep >= steps.length && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-6 h-6" />
                    Simulation Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-800">72 hours</div>
                      <div className="text-sm text-green-600">Total Recovery Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">67%</div>
                      <div className="text-sm text-green-600">Loss Coverage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">
                        {formatCurrency(financialImpact.insurancePayout)}
                      </div>
                      <div className="text-sm text-green-600">Insurance Payout</div>
                    </div>
                  </div>
                  <p className="text-center text-green-700 mt-4">
                    This simulation demonstrates how parametric cyber insurance provides immediate, automated response
                    to security incidents, minimizing business impact and accelerating recovery.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
