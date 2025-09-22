"use client"

import { motion } from "framer-motion"
import { Check, Building, Shield, CheckCircle } from "lucide-react"

interface EnhancedProgressBarProps {
  progress: number
  currentStep: number
  totalSteps: number
}

export default function EnhancedProgressBar({ progress, currentStep, totalSteps }: EnhancedProgressBarProps) {
  const steps = [
    { icon: Building, label: "Organization", description: "Company details" },
    { icon: Shield, label: "Configuration", description: "Service setup" },
    { icon: CheckCircle, label: "Activation", description: "Account ready" },
  ]

  return (
    <div className="w-full">
      {/* Step Indicators - Positioned ABOVE the progress bar */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <motion.div
              key={stepNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center space-y-3"
            >
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-200 dark:shadow-emerald-900"
                    : isCurrent
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200 dark:shadow-blue-900 scale-110"
                      : "bg-white text-slate-400 border-2 border-slate-300"
                }`}
                whileHover={{ scale: isCurrent ? 1.15 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <step.icon className="w-6 h-6" />
                )}

                {/* Pulse animation for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                {/* Completion checkmark overlay */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </motion.div>

              <div className="text-center">
                <motion.p
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isCompleted || isCurrent ? "text-slate-900" : "text-slate-500"
                  }`}
                  animate={{ scale: isCurrent ? 1.05 : 1 }}
                >
                  {step.label}
                </motion.p>
                <p className="text-xs text-slate-400 hidden sm:block mt-1">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Floating Progress Indicator */}
        <motion.div
          className="absolute top-0 h-2 w-6 bg-white rounded-full shadow-lg border-2 border-blue-500"
          initial={{ left: "0%" }}
          animate={{ left: `${Math.max(0, progress - 3)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-4"
      >
        <span className="text-sm font-medium text-slate-600">
          Step {currentStep} of {totalSteps} • {Math.round(progress)}% Complete
        </span>
      </motion.div>
    </div>
  )
}
