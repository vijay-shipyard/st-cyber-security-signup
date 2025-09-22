"use client"

import type React from "react"

import { useState } from "react"
import { Building, Mail, Globe, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BusinessInfoFormProps {
  onSubmit: (data: BusinessData) => void
}

export default function BusinessInfoForm({ onSubmit }: BusinessInfoFormProps) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "DemoCo Inc.",
    email: "contact@democorp.com",
    website: "https://democorp.com",
    businessType: "saas",
    monthlyVolume: "50k-250k",
    country: "us",
  })

  const [errors, setErrors] = useState<Partial<BusinessData>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: Partial<BusinessData> = {}
    if (!formData.businessName) newErrors.businessName = "Business name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.businessType) newErrors.businessType = "Business type is required"
    if (!formData.monthlyVolume) newErrors.monthlyVolume = "Monthly volume is required"
    if (!formData.country) newErrors.country = "Country is required"

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
    <div className="p-6 md:p-8">
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        Tell us about your business to get started with SecurePay.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b pb-2">Business Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="businessName"
                  placeholder="DemoCo Inc."
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className={`pl-10 ${errors.businessName ? "border-red-500" : ""}`}
                />
              </div>
              {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@democorp.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="website"
                placeholder="https://democorp.com"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => updateField("businessType", value)}>
                <SelectTrigger id="businessType" className={errors.businessType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select business type">{formData.businessType}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                  <SelectItem value="professional">Professional Services</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyVolume">Expected Monthly Volume *</Label>
              <Select value={formData.monthlyVolume} onValueChange={(value) => updateField("monthlyVolume", value)}>
                <SelectTrigger id="monthlyVolume" className={errors.monthlyVolume ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select volume range">
                    {formData.monthlyVolume === "0-1k"
                      ? "$0 - $1,000"
                      : formData.monthlyVolume === "1k-10k"
                        ? "$1,000 - $10,000"
                        : formData.monthlyVolume === "10k-50k"
                          ? "$10,000 - $50,000"
                          : formData.monthlyVolume === "50k-250k"
                            ? "$50,000 - $250,000"
                            : formData.monthlyVolume === "250k-1m"
                              ? "$250,000 - $1,000,000"
                              : formData.monthlyVolume === "1m+"
                                ? "$1,000,000+"
                                : "Select volume range"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1k">$0 - $1,000</SelectItem>
                  <SelectItem value="1k-10k">$1,000 - $10,000</SelectItem>
                  <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                  <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                  <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                  <SelectItem value="1m+">$1,000,000+</SelectItem>
                </SelectContent>
              </Select>
              {errors.monthlyVolume && <p className="text-red-500 text-sm">{errors.monthlyVolume}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Select value={formData.country} onValueChange={(value) => updateField("country", value)}>
                <SelectTrigger id="country" className={`pl-10 ${errors.country ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select your country">
                    {formData.country === "us"
                      ? "United States"
                      : formData.country === "ca"
                        ? "Canada"
                        : formData.country === "uk"
                          ? "United Kingdom"
                          : formData.country === "au"
                            ? "Australia"
                            : formData.country === "de"
                              ? "Germany"
                              : formData.country === "fr"
                                ? "France"
                                : "Select your country"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            Continue to Plan Selection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
