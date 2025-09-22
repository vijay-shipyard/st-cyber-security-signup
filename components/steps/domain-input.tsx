"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DomainInputProps {
  onSubmit: (domain: string) => void
}

export default function DomainInput({ onSubmit }: DomainInputProps) {
  const [domain, setDomain] = useState("democorp.com")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!domain) {
      setError("Please enter a domain name")
      return
    }

    // Simple domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    if (!domainRegex.test(domain)) {
      setError("Please enter a valid domain name (e.g., example.com)")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      onSubmit(domain)
      setIsLoading(false)
    }, 1500)
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
          Let's Assess Your Security Posture
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Enter your domain name below to begin your comprehensive security assessment. We'll analyze your digital
          footprint and identify potential vulnerabilities.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="domain" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Domain Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Globe className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="domain"
                  type="text"
                  placeholder="democorp.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className={`pl-10 ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 flex items-center justify-center space-x-2 py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Domain...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Analyze My Domain</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          <p>Your domain will be analyzed using RiskRecon's advanced security assessment technology.</p>
          <p className="mt-2">
            We respect your privacy. Your domain information is only used for security assessment purposes.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
