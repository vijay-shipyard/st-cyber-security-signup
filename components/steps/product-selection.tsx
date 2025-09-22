"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Lock, Database, Cloud, Server, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CyberProduct } from "@/lib/types"

interface ProductSelectionProps {
  onSubmit: (products: CyberProduct[]) => void
}

export default function ProductSelection({ onSubmit }: ProductSelectionProps) {
  const [selectedProducts, setSelectedProducts] = useState<CyberProduct[]>([])

  const products: CyberProduct[] = [
    {
      id: 1,
      name: "Endpoint Protection",
      description: "Advanced threat protection for all your devices with real-time monitoring and response.",
      icon: Shield,
      price: 299,
      recommended: true,
    },
    {
      id: 2,
      name: "Data Encryption Suite",
      description: "Enterprise-grade encryption for sensitive data at rest and in transit.",
      icon: Lock,
      price: 199,
      recommended: true,
    },
    {
      id: 3,
      name: "Database Security",
      description: "Protect your databases from SQL injection, unauthorized access, and data exfiltration.",
      icon: Database,
      price: 249,
      recommended: false,
    },
    {
      id: 4,
      name: "Cloud Security Posture",
      description: "Continuous monitoring and remediation of cloud infrastructure security issues.",
      icon: Cloud,
      price: 349,
      recommended: true,
    },
    {
      id: 5,
      name: "Network Firewall",
      description: "Next-generation firewall with intrusion prevention and advanced threat detection.",
      icon: Server,
      price: 399,
      recommended: false,
    },
  ]

  const toggleProduct = (product: CyberProduct) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const handleSubmit = () => {
    onSubmit(selectedProducts)
  }

  const isSelected = (product: CyberProduct) => {
    return selectedProducts.some((p) => p.id === product.id)
  }

  return (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Choose Your Cybersecurity Tools
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Select from our curated portfolio of Mastercard Cybersecurity Solutions to enhance your protection. We
          recommend tools based on your risk assessment.
        </p>
      </motion.div>

      <div className="space-y-4 mb-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`relative bg-white dark:bg-slate-700 rounded-xl shadow-sm border-2 transition-all duration-300 ${
              isSelected(product)
                ? "border-blue-500 dark:border-blue-400 shadow-md"
                : "border-transparent hover:border-slate-200 dark:hover:border-slate-600"
            }`}
          >
            <div className="p-6 cursor-pointer" onClick={() => toggleProduct(product)}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`p-3 rounded-full ${
                      isSelected(product) ? "bg-blue-100 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-600"
                    }`}
                  >
                    <product.icon
                      className={`h-6 w-6 ${
                        isSelected(product) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-slate-800 dark:text-white">{product.name}</h3>
                      {product.recommended && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-slate-800 dark:text-white">${product.price}/year</div>
                  </div>

                  <p className="mt-1 text-slate-600 dark:text-slate-300">{product.description}</p>
                </div>

                <div className="flex-shrink-0 ml-4">
                  <Checkbox
                    checked={isSelected(product)}
                    onCheckedChange={() => toggleProduct(product)}
                    className="h-5 w-5 border-2"
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isSelected(product) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-600">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-white">Implementation Details</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Easy deployment with our guided setup process. Compatible with your existing infrastructure.
                          Our team will help with configuration and optimization.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6 w-full max-w-md">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-2">
            <span>Selected Products:</span>
            <span>{selectedProducts.length}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-4">
            <span>Total Annual Cost:</span>
            <span>${selectedProducts.reduce((sum, product) => sum + product.price, 0)}/year</span>
          </div>
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            disabled={selectedProducts.length === 0}
          >
            Continue to Summary
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
          All products include 24/7 technical support and regular updates to protect against emerging threats.
        </p>
      </motion.div>
    </div>
  )
}
