"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, CreditCard, Shield, Download, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BusinessData, PricingPlan } from "@/lib/types"
import confetti from "canvas-confetti"
import Link from "next/link"

interface SummaryProps {
  businessData: BusinessData
  selectedPlan: PricingPlan
  includeCyberInsurance: boolean
  onBack: () => void
}

export default function Summary({ businessData, selectedPlan, includeCyberInsurance, onBack }: SummaryProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = () => {
    if (typeof window !== "undefined" && !showConfetti) {
      setShowConfetti(true)

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
      }, 250)

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 400)
    }
  }

  // Trigger confetti when component mounts
  useEffect(() => {
    setTimeout(triggerConfetti, 500)
  }, [])

  const totalMonthlyCost = selectedPlan.monthlyFee + (includeCyberInsurance ? 99 : 0)

  return (
    <div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Welcome to SecurePay, {businessData.businessName}!
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Your account is ready to go. Here's a summary of your SecurePay setup:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4 flex items-center">
            <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
            Account Details
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Business Name:</span>
              <span className="font-medium text-slate-800 dark:text-white">{businessData.businessName}</span>
            </div>

            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Email:</span>
              <span className="font-medium text-slate-800 dark:text-white">{businessData.email}</span>
            </div>

            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Business Type:</span>
              <span className="font-medium text-slate-800 dark:text-white capitalize">{businessData.businessType}</span>
            </div>

            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Plan:</span>
              <span className="font-medium text-slate-800 dark:text-white">{selectedPlan.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Processing Rate:</span>
              <span className="font-medium text-slate-800 dark:text-white">{selectedPlan.price}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">Plan & Protection</h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Selected Plan:</span>
              <span className="font-medium text-slate-800 dark:text-white">{selectedPlan.name}</span>
            </div>

            {selectedPlan.monthlyFee > 0 && (
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
                <span className="text-slate-600 dark:text-slate-300">Monthly Plan Fee:</span>
                <span className="font-medium text-slate-800 dark:text-white">${selectedPlan.monthlyFee}/month</span>
              </div>
            )}

            <div className="flex justify-between border-b border-slate-100 dark:border-slate-600 pb-2">
              <span className="text-slate-600 dark:text-slate-300">Cyber Protection:</span>
              <span className="font-medium text-slate-800 dark:text-white">
                {includeCyberInsurance ? "$99/month" : "Not included"}
              </span>
            </div>

            {totalMonthlyCost > 0 && (
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600 font-medium text-slate-800 dark:text-white">
                <span>Total Monthly Cost:</span>
                <span>${totalMonthlyCost}/month</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {includeCyberInsurance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
                Cyber Protection Active
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                Your business is now protected with $50,000 in cyber breach compensation and 5 days of expert
                remediation support. Your protection is active immediately.
              </p>
              <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 incident response hotline available</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Real-time risk monitoring dashboard access</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Immediate payout upon verified breach</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto px-6 py-6 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                onClick={triggerConfetti}
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-6 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Setup Guide
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mt-8"
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Integration documentation and API keys will be sent to your email</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Your account manager will contact you within 24 hours</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Test transactions can be processed immediately</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Live payments will be enabled after verification</span>
            </div>
          </div>
        </motion.div>

        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-6">
          Thank you for choosing SecurePay. We're excited to help you grow your business with our secure, reliable
          payment processing platform.
        </p>
      </motion.div>
    </div>
  )
}
