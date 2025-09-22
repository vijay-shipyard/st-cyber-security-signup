"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PricingPlan } from "@/lib/types"

interface PricingPlansProps {
  onSubmit: (plan: PricingPlan) => void
  onBack: () => void
}

export default function PricingPlans({ onSubmit, onBack }: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)

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

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    if (selectedPlan) {
      onSubmit(selectedPlan)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Choose Your Plan</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Select the plan that best fits your business needs. You can always upgrade or downgrade later.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className={`relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
              selectedPlan?.id === plan.id
                ? "border-blue-500 dark:border-blue-400 shadow-xl scale-105"
                : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl"
            }`}
            onClick={() => handlePlanSelect(plan)}
            whileHover={{ y: -5 }}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  Recommended
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-slate-800 dark:text-white">{plan.price}</div>
                {plan.monthlyFee > 0 && (
                  <div className="text-slate-600 dark:text-slate-300 text-sm">+ ${plan.monthlyFee}/month</div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full py-3 rounded-full transition-all duration-300 ${
                  selectedPlan?.id === plan.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-between"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleContinue}
            size="lg"
            disabled={!selectedPlan}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Add-ons
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
