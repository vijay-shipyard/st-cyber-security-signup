"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Check, Shield, Star, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { BusinessData, PricingPlan } from "@/lib/types"
import { calculateRiskScore } from "@/lib/risk-calculator"

interface PlanAndProtectionProps {
  businessData: BusinessData
  onSubmit: (plan: PricingPlan, includeCyberInsurance: boolean) => void
  onBack: () => void
}

export default function PlanAndProtection({ businessData, onSubmit, onBack }: PlanAndProtectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [includeCyberInsurance, setIncludeCyberInsurance] = useState(false)
  const [showCyberDetails, setShowCyberDetails] = useState(false)
  const [focusedPlan, setFocusedPlan] = useState<string | null>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [])

  const plans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small businesses and startups",
      price: "2.9% + 30¢",
      monthlyFee: 0,
      features: [
        "Accept all major cards",
        "Online payments",
        "Basic dashboard",
        "Email support",
        "Standard fraud protection",
      ],
      recommended: false,
    },
    {
      id: "professional",
      name: "Professional",
      description: "For growing businesses with higher volume",
      price: "2.7% + 30¢",
      monthlyFee: 25,
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Priority support",
        "Custom checkout",
        "Advanced fraud protection",
        "Multi-currency support",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large businesses with custom needs",
      price: "Custom pricing",
      monthlyFee: 0,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Volume discounts",
        "24/7 phone support",
        "Advanced reporting",
        "White-label solutions",
      ],
      recommended: false,
    },
  ]

  // Calculate risk score based on business type and volume
  const riskScore = calculateRiskScore(businessData)
  const shouldRecommendCyber = riskScore > 60

  const handleSubmit = () => {
    if (selectedPlan) {
      onSubmit(selectedPlan, includeCyberInsurance)
    }
  }

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    // Auto-recommend cyber insurance for higher risk businesses
    if (shouldRecommendCyber && !includeCyberInsurance) {
      setIncludeCyberInsurance(true)
    }
  }

  return (
    <div className="relative">
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full backdrop-blur-sm"
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
          Choose Your Plan & Protection
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Select the perfect plan for {businessData.businessName} and add cyber protection to safeguard your business
          from digital threats.
        </p>
      </motion.div>

      {/* Plan Selection */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">Payment Plans</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={`relative bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer flex flex-col ${
                selectedPlan?.id === plan.id
                  ? "border-blue-500 dark:border-blue-400 shadow-xl scale-105"
                  : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl"
              }`}
              onClick={() => handlePlanSelect(plan)}
              onMouseEnter={() => setFocusedPlan(plan.id)}
              onMouseLeave={() => setFocusedPlan(null)}
              whileHover={{ y: -5 }}
            >
              {plan.recommended && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 300 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                    <Star className="h-4 w-4 mr-1" />
                    Recommended
                  </div>
                </motion.div>
              )}

              <div className="p-6 flex flex-col flex-grow h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{plan.description}</p>
                  <motion.div
                    animate={{ scale: focusedPlan === plan.id ? 1.05 : 1 }}
                    className="text-3xl font-bold text-slate-800 dark:text-white"
                  >
                    {plan.price}
                  </motion.div>
                  {plan.monthlyFee > 0 && (
                    <div className="text-slate-600 dark:text-slate-300 text-sm">+ ${plan.monthlyFee}/month</div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 + featureIndex * 0.05, duration: 0.3 }}
                      className="flex items-start space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full py-2 rounded-full transition-all duration-300 ${
                    selectedPlan?.id === plan.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cyber Protection Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">Cyber Protection</h3>

        {/* Cyber Insurance Option with Red Pulsing Animation */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="relative bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl shadow-lg border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300 cursor-pointer"
          onClick={() => setIncludeCyberInsurance(!includeCyberInsurance)}
          whileHover={{ y: -2 }}
        >
          {/* Red Pulsing Border for Urgency */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-red-500"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Recommended Badge with Pulsing */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                  "0 0 0 10px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center justify-center shadow-lg"
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              RECOMMENDED
            </motion.div>
          </motion.div>

          <div className="p-6 relative z-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{
                    scale: includeCyberInsurance ? 1.1 : [1, 1.05, 1],
                    boxShadow: includeCyberInsurance
                      ? "0 0 20px rgba(59, 130, 246, 0.3)"
                      : [
                          "0 0 0 rgba(239, 68, 68, 0.5)",
                          "0 0 15px rgba(239, 68, 68, 0.3)",
                          "0 0 0 rgba(239, 68, 68, 0.5)",
                        ],
                  }}
                  transition={{
                    duration: includeCyberInsurance ? 0.3 : 2,
                    repeat: includeCyberInsurance ? 0 : Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className={`p-3 rounded-full ${
                    includeCyberInsurance ? "bg-blue-100 dark:bg-blue-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  <Shield
                    className={`h-6 w-6 ${
                      includeCyberInsurance ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"
                    }`}
                  />
                </motion.div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">Cyber Parametric Protection</h3>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      color: ["#ef4444", "#dc2626", "#ef4444"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="text-lg font-bold"
                  >
                    $99/month
                  </motion.div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Immediate financial protection and expert support in case of cyber breaches
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {[
                    "Immediate payout upon verified breach",
                    "5 days of expert remediation support",
                    "Real-time risk monitoring",
                    "24/7 incident response hotline",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate={{
                    backgroundColor: ["rgba(239, 68, 68, 0.1)", "rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.1)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="p-3 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <div className="text-sm font-medium text-red-800 dark:text-red-300">
                    Coverage: $50,000 breach compensation
                  </div>
                  <div className="text-xs text-red-700 dark:text-red-400 mt-1">
                    Your risk score: {riskScore}/100 - High Priority Protection Needed
                  </div>
                </motion.div>
              </div>

              <div className="flex-shrink-0 ml-4">
                <motion.div
                  animate={{
                    scale: includeCyberInsurance ? 1.1 : 1,
                  }}
                  transition={{
                    duration: includeCyberInsurance ? 0.3 : 0.2,
                  }}
                >
                  <Checkbox
                    checked={includeCyberInsurance}
                    onCheckedChange={(checked) => setIncludeCyberInsurance(checked as boolean)}
                    className="h-5 w-5 border-2"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-6 justify-between"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="px-10 py-6 text-lg rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-3 h-6 w-6" />
            Back
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={!selectedPlan}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center justify-center">
              Continue to Review
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Summary Box */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mt-8 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto"
        >
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-2">
            <span>Selected Plan:</span>
            <span>{selectedPlan.name}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-2">
            <span>Processing Rate:</span>
            <span>{selectedPlan.price}</span>
          </div>
          {selectedPlan.monthlyFee > 0 && (
            <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-2">
              <span>Monthly Fee:</span>
              <span>${selectedPlan.monthlyFee}/month</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-4">
            <span>Cyber Protection:</span>
            <span className={includeCyberInsurance ? "text-red-600 dark:text-red-400 font-bold" : ""}>
              {includeCyberInsurance ? "$99/month" : "Not included"}
            </span>
          </div>
          <div className="flex justify-between font-bold text-slate-800 dark:text-white border-t pt-2">
            <span>Total Monthly Cost:</span>
            <span>${selectedPlan.monthlyFee + (includeCyberInsurance ? 99 : 0)}/month</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
