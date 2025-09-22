"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, ArrowLeft, Building2, Users, Globe2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessData } from "@/lib/types"

interface BusinessInfoProps {
  onSubmit: (data: BusinessData) => void
  onBack: () => void
}

export default function BusinessInfo({ onSubmit, onBack }: BusinessInfoProps) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "DemoCo Technologies Inc.",
    email: "admin@democorp.com",
    website: "https://www.democorp.com",
    businessType: "saas",
    monthlyVolume: "250k-1m",
    country: "us",
  })

  const [errors, setErrors] = useState<Partial<BusinessData>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: Partial<BusinessData> = {}
    if (!formData.businessName) newErrors.businessName = "Organization name is required"
    if (!formData.email) newErrors.email = "Business email is required"
    if (!formData.businessType) newErrors.businessType = "Business type is required"
    if (!formData.monthlyVolume) newErrors.monthlyVolume = "Transaction volume is required"
    if (!formData.country) newErrors.country = "Operating jurisdiction is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const updateField = (field: keyof BusinessData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
          <Building2 className="w-4 h-4 mr-2" />
          Organization Configuration
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Enterprise Account Setup</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Please provide your organization details to configure your enterprise payment infrastructure and compliance
          requirements.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Organization Information */}
          <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center mb-6">
              <Building2 className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Organization Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-3"
              >
                <Label htmlFor="businessName" className="text-sm font-semibold text-slate-700 flex items-center">
                  Organization Name *
                </Label>
                <div className="relative group">
                  <motion.div
                    animate={{
                      scale: focusedField === "businessName" ? 1.02 : 1,
                      boxShadow:
                        focusedField === "businessName" ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "0 0 0 0px transparent",
                    }}
                    className="relative"
                  >
                    <Input
                      id="businessName"
                      placeholder="Acme Corporation Inc."
                      value={formData.businessName}
                      onChange={(e) => updateField("businessName", e.target.value)}
                      onFocus={() => setFocusedField("businessName")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-12 text-base bg-white border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
                        errors.businessName
                          ? "border-red-500 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      }`}
                    />
                    {formData.businessName && !errors.businessName && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                {errors.businessName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-medium"
                  >
                    {errors.businessName}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-3"
              >
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Business Email Address *
                </Label>
                <div className="relative group">
                  <motion.div
                    animate={{
                      scale: focusedField === "email" ? 1.02 : 1,
                      boxShadow:
                        focusedField === "email" ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "0 0 0 0px transparent",
                    }}
                    className="relative"
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@acme.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-12 text-base bg-white border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"
                      }`}
                    />
                    {formData.email && !errors.email && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-medium"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-3 mt-6"
            >
              <Label htmlFor="website" className="text-sm font-semibold text-slate-700 flex items-center">
                <Globe2 className="w-4 h-4 mr-1" />
                Corporate Website (Optional)
              </Label>
              <div className="relative group">
                <motion.div
                  animate={{
                    scale: focusedField === "website" ? 1.02 : 1,
                    boxShadow:
                      focusedField === "website" ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "0 0 0 0px transparent",
                  }}
                  className="relative"
                >
                  <Input
                    id="website"
                    placeholder="https://www.acme.com"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    onFocus={() => setFocusedField("website")}
                    onBlur={() => setFocusedField(null)}
                    className="h-12 text-base bg-white border-2 border-slate-300 focus:border-blue-500 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                  {formData.website && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Business Classification */}
          <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center mb-6">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Business Classification</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold text-slate-700">Industry Sector *</Label>
                <Select value={formData.businessType} onValueChange={(value) => updateField("businessType", value)}>
                  <SelectTrigger
                    className={`h-12 text-base bg-white border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
                      errors.businessType ? "border-red-500" : "border-slate-300 focus:border-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select industry sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                    <SelectItem value="saas">Software as a Service (SaaS)</SelectItem>
                    <SelectItem value="marketplace">Digital Marketplace</SelectItem>
                    <SelectItem value="nonprofit">Non-profit Organization</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="retail">Traditional Retail</SelectItem>
                    <SelectItem value="financial">Financial Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-medium"
                  >
                    {errors.businessType}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold text-slate-700 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Monthly Transaction Volume *
                </Label>
                <Select value={formData.monthlyVolume} onValueChange={(value) => updateField("monthlyVolume", value)}>
                  <SelectTrigger
                    className={`h-12 text-base bg-white border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
                      errors.monthlyVolume ? "border-red-500" : "border-slate-300 focus:border-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select transaction volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1k">$0 - $1,000</SelectItem>
                    <SelectItem value="1k-10k">$1,000 - $10,000</SelectItem>
                    <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                    <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                    <SelectItem value="1m-10m">$1,000,000 - $10,000,000</SelectItem>
                    <SelectItem value="10m+">$10,000,000+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.monthlyVolume && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-medium"
                  >
                    {errors.monthlyVolume}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Regulatory Information */}
          <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center mb-6">
              <Globe2 className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Regulatory Jurisdiction</h3>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="space-y-3"
            >
              <Label className="text-sm font-semibold text-slate-700">Primary Operating Jurisdiction *</Label>
              <div className="relative">
                <Select value={formData.country} onValueChange={(value) => updateField("country", value)}>
                  <SelectTrigger
                    className={`h-12 text-base bg-white border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
                      errors.country ? "border-red-500" : "border-slate-300 focus:border-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select operating jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.country && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm font-medium"
                >
                  {errors.country}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row gap-4 justify-between"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-base rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md bg-white"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous Step
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border-0"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  Continue to Service Configuration
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
