import type { LucideIcon } from "lucide-react"

export interface BusinessData {
  businessName: string
  email: string
  website: string
  businessType: string
  monthlyVolume: string
  country: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  monthlyFee: number
  features: string[]
  recommended: boolean
}

export interface AddOn {
  id: string
  name: string
  description: string
  icon: LucideIcon
  price: number
  recommended: boolean
  details?: {
    coverage?: string
    features: string[]
    riskScore?: number
  }
}

export interface CyberProduct {
  id: number
  name: string
  description: string
  icon: LucideIcon
  price: number
  recommended: boolean
}
