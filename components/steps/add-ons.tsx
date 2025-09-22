"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, BarChart3, Headphones, Globe, CheckCircle, ArrowRight, AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { BusinessData, PricingPlan, AddOn } from "@/lib/types"
import { calculateRiskScore } from "@/lib/risk-calculator"

interface AddOnsProps {
  businessData: BusinessData
  selectedPlan: PricingPlan
  onSubmit: (addOns: AddOn[]) => void
  onBack: () => void
}

export default function AddOns({ businessData, selectedPlan, onSubmit, onBack }: AddOnsProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])
  const [showCyberDetails, setShowCyberDetails] = useState(false)

  // Mock risk score based on business type and volume
  const riskScore = calculateRiskScore(businessData)

  const addOns: AddOn[] = [
    {
      id: "cyber-protection",
      name: "Cyber Parametric Protection",
      description: "Immediate financial protection and expert support in case of cyber breaches",
      icon: Shield,
      price: 99,
      recommended: riskScore > 60,
      details: {
        coverage: "$50,000 breach compensation",
        features: [
          "Immediate payout upon verified breach",
          "5 days of expert remediation support",
          "Real-time risk monitoring",
          "24/7 incident response hotline",
        ],
        riskScore,
      },
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description: "Deep insights into your payment data and customer behavior",
      icon: BarChart3,
      price: 49,
      recommended: selectedPlan.id !== "enterprise",
      details: {
        features: [
          "Custom dashboards and reports",
          "Revenue forecasting",
          "Customer lifetime value analysis",
          "Churn prediction",
        ],
      },
    },
    {
      id: "priority-support",
      name: "Priority Support",
      description: "24/7 phone and chat support with dedicated account management",
      icon: Headphones,
      price: 29,
      recommended: selectedPlan.id === "starter",
      details: {
        features: [
          "24/7 phone support",
          "Dedicated account manager",
          "Priority ticket handling",
          "Implementation help",
        ],
      },
    },
    {
      id: "international-expansion",
      name: "International Expansion Kit",
      description: "Tools and support for accepting payments globally",
      icon: Globe,
      price: 79,
      recommended: businessData.businessType === "ecommerce",
      details: {
        features: [
          "Local payment methods in 40+ countries",
          "Multi-currency pricing",
          "Tax calculation and compliance",
          "Localized checkout experiences",
        ],
      },
    },
  ]

  const toggleAddOn = (addOn: AddOn) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id))
    } else {
      setSelectedAddOns([...selectedAddOns, addOn])
    }
  }

  const isSelected = (addOn: AddOn) => {
    return selectedAddOns.some((a) => a.id === addOn.id)
  }

  const handleSubmit = () => {
    onSubmit(selectedAddOns)
  }

  const cyberAddOn = addOns.find((a) => a.id === "cyber-protection")!

  return (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Enhance Your Account</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Add powerful features to your SecurePay account. These add-ons can be enabled or disabled at any time.
        </p>
      </motion.div>

      {/* Cyber Protection Highlight */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8"
      >
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
              Security Risk Assessment for {businessData.businessName}
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Based on your business profile, we've identified a <strong>{riskScore}/100 risk score</strong>. Businesses
              in your industry with similar transaction volumes face elevated cyber threats.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCyberDetails(!showCyberDetails)}
              className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
            >
              {showCyberDetails ? "Hide" : "View"} Risk Details
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showCyberDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 pt-4 border-t border-red-200 dark:border-red-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Risk Factors:</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• High transaction volume increases attack surface</li>
                    <li>• {businessData.businessType} businesses are frequent targets</li>
                    <li>• Payment data makes you attractive to cybercriminals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Potential Impact:</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Average breach cost: $4.45M</li>
                    <li>• 23% of businesses close within 2 years</li>
                    <li>• Regulatory fines and legal costs</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="space-y-4 mb-8">
        {addOns.map((addOn, index) => (
          <motion.div
            key={addOn.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer ${
              isSelected(addOn)
                ? "border-blue-500 dark:border-blue-400 shadow-md"
                : "border-transparent hover:border-slate-200 dark:hover:border-slate-600"
            } ${addOn.id === "cyber-protection" ? "ring-2 ring-red-200 dark:ring-red-800" : ""}`}
            onClick={() => toggleAddOn(addOn)}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`p-3 rounded-full ${
                      isSelected(addOn)
                        ? "bg-blue-100 dark:bg-blue-900"
                        : addOn.id === "cyber-protection"
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-slate-100 dark:bg-slate-600"
                    }`}
                  >
                    <addOn.icon
                      className={`h-6 w-6 ${
                        isSelected(addOn)
                          ? "text-blue-600 dark:text-blue-400"
                          : addOn.id === "cyber-protection"
                            ? "text-red-600 dark:text-red-400"
                            : "text-slate-600 dark:text-slate-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-slate-800 dark:text-white">{addOn.name}</h3>
                      {addOn.recommended && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-slate-800 dark:text-white">${addOn.price}/month</div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4">{addOn.description}</p>

                  {addOn.details && (
                    <div className="space-y-2">
                      {addOn.details.coverage && (
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Coverage: {addOn.details.coverage}
                        </div>
                      )}
                      {addOn.details.riskScore && (
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Your risk score: {addOn.details.riskScore}/100
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {addOn.details.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 ml-4">
                  <Checkbox
                    checked={isSelected(addOn)}
                    onCheckedChange={() => toggleAddOn(addOn)}
                    className="h-5 w-5 border-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 mb-6 w-full max-w-md">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-2">
            <span>Selected Add-ons:</span>
            <span>{selectedAddOns.length}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-4">
            <span>Monthly Add-on Cost:</span>
            <span>${selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)}/month</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>

            <Button
              onClick={handleSubmit}
              size="lg"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
          You can add, remove, or modify these add-ons at any time from your account dashboard.
        </p>
      </motion.div>
    </div>
  )
}
