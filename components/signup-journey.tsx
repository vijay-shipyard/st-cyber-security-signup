"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LandingHeader from "@/components/landing/landing-header"
import EnhancedProgressBar from "@/components/ui/enhanced-progress-bar"
import BusinessInfo from "@/components/steps/business-info"
import PlanAndProtection from "@/components/steps/plan-and-protection"
import Summary from "@/components/steps/summary"
import type { BusinessData, PricingPlan } from "@/lib/types"

export default function SignupJourney() {
  const [currentStep, setCurrentStep] = useState(1)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [includeCyberInsurance, setIncludeCyberInsurance] = useState(false)

  const steps = [
    { id: "business-info", title: "Organization Details", description: "Company information and requirements" },
    {
      id: "plan-and-protection",
      title: "Service Configuration",
      description: "Payment processing and security options",
    },
    { id: "summary", title: "Account Activation", description: "Review and finalize your enterprise account" },
  ]

  const totalSteps = steps.length
  const progress = (currentStep / totalSteps) * 100

  const handleBusinessInfoSubmit = (data: BusinessData) => {
    setBusinessData(data)
    setCurrentStep(2)
  }

  const handlePlanAndProtectionSubmit = (plan: PricingPlan, cyberInsurance: boolean) => {
    setSelectedPlan(plan)
    setIncludeCyberInsurance(cyberInsurance)
    setCurrentStep(3)
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessInfo onSubmit={handleBusinessInfoSubmit} onBack={goToPreviousStep} />
      case 2:
        return (
          <PlanAndProtection
            businessData={businessData!}
            onSubmit={handlePlanAndProtectionSubmit}
            onBack={goToPreviousStep}
          />
        )
      case 3:
        return (
          <Summary
            businessData={businessData!}
            selectedPlan={selectedPlan!}
            includeCyberInsurance={includeCyberInsurance}
            onBack={goToPreviousStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Landing Header */}
      <LandingHeader />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        {/* Professional Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Welcome to SecurePay
              <span className="block text-3xl md:text-4xl text-blue-600 font-semibold mt-2">
                Enterprise Payment Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Configure your enterprise payment infrastructure with advanced security, compliance, and risk management
              capabilities.
            </p>
          </motion.div>

          {/* Step Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 max-w-2xl mx-auto mb-8 shadow-sm"
          >
            <div className="flex items-center justify-between">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousStep}
                  className="flex items-center space-x-2 border-slate-300 hover:border-slate-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
              )}
              <div className={`${currentStep === 1 ? "mx-auto" : ""}`}>
                <h2 className="text-xl font-semibold text-slate-900">
                  Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-sm text-slate-600 mt-1">{steps[currentStep - 1]?.description}</p>
              </div>
              {currentStep === 1 && <div className="w-20"></div>}
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <EnhancedProgressBar progress={progress} currentStep={currentStep} totalSteps={totalSteps} />
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8 md:p-12"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Professional Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Bank-grade security (PCI DSS Level 1)</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>24/7 enterprise support</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>99.99% uptime SLA</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 border-t border-slate-200 pt-4">
              Your information is encrypted and protected. Setup typically completes within 24-48 hours pending
              verification.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
