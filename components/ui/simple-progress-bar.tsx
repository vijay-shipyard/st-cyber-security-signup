"use client"

import { motion } from "framer-motion"

interface SimpleProgressBarProps {
  progress: number
  currentStep: number
  totalSteps: number
}

export default function SimpleProgressBar({ progress, currentStep, totalSteps }: SimpleProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
