"use client"

import { useState, useEffect } from "react"
import { CheckCircle, CreditCard, Shield, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BusinessData, PricingPlan } from "@/lib/types"
import confetti from "canvas-confetti"

interface SignupSummaryProps {
  businessData: BusinessData
  selectedPlan: PricingPlan
  includeCyberInsurance: boolean
  onBack: () => void
}

export default function SignupSummary({
  businessData,
  selectedPlan,
  includeCyberInsurance,
  onBack,
}: SignupSummaryProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = () => {
    if (typeof window !== "undefined" && !showConfetti) {
      setShowConfetti(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  // Trigger confetti when component mounts
  useEffect(() => {
    setTimeout(triggerConfetti, 500)
  }, [])

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  const totalMonthlyCost = selectedPlan.monthlyFee + (includeCyberInsurance ? 99 : 0)

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Welcome to SecurePay, {businessData.businessName}!
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Your account is ready to go. Here's a summary of your SecurePay setup:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
            Account Details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Business Name:</span>
              <span className="font-medium">{businessData.businessName}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Email:</span>
              <span className="font-medium">{businessData.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Business Type:</span>
              <span className="font-medium capitalize">{businessData.businessType}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Plan:</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Processing Rate:</span>
              <span className="font-medium">{selectedPlan.price}</span>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Plan & Protection</h3>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Selected Plan:</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>

            {selectedPlan.monthlyFee > 0 && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 dark:text-slate-400">Monthly Plan Fee:</span>
                <span className="font-medium">${selectedPlan.monthlyFee}/month</span>
              </div>
            )}

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600 dark:text-slate-400">Cyber Protection:</span>
              <span className="font-medium">
                {includeCyberInsurance ? (
                  <span className="text-green-600 dark:text-green-400">Included ($99/month)</span>
                ) : (
                  <span className="text-slate-500">Not included</span>
                )}
              </span>
            </div>

            {totalMonthlyCost > 0 && (
              <div className="flex justify-between pt-2 border-t font-medium">
                <span>Total Monthly Cost:</span>
                <span>${totalMonthlyCost}/month</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {includeCyberInsurance && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">Cyber Protection Active</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Your business is now protected with $50,000 in cyber breach compensation and expert remediation support.
                Your protection is active immediately.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  24/7 incident response hotline
                </div>
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  Real-time risk monitoring
                </div>
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  Immediate payout on breach
                </div>
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  Expert remediation support
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-8">
        <h3 className="font-medium mb-3">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
            <span>Integration docs sent to your email</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
            <span>Account manager contact within 24h</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
            <span>Test transactions available now</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
            <span>Live payments after verification</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Setup Guide
          </Button>

          <Button onClick={goToDashboard}>
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
