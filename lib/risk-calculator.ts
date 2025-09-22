import type { BusinessData } from "./types"

export interface RiskFactors {
  volumeRisk: number
  typeRisk: number
  baseRisk: number
}

export function calculateRiskScore(businessData?: Partial<BusinessData>): number {
  if (!businessData) {
    // Default risk score for demo purposes (7.2 out of 10)
    return 7.2
  }

  const baseRisk = 4.0

  // Volume-based risk calculation (0-2.5 scale)
  const volumeRisk = (() => {
    switch (businessData.monthlyVolume) {
      case "1m+":
        return 2.5
      case "250k-1m":
        return 2.0
      case "100k-250k":
        return 1.5
      case "50k-100k":
        return 1.0
      default:
        return 0.5
    }
  })()

  // Business type risk calculation (0-2.5 scale)
  const typeRisk = (() => {
    switch (businessData.businessType) {
      case "ecommerce":
        return 2.0
      case "saas":
        return 1.5
      case "fintech":
        return 2.5
      case "healthcare":
        return 2.2
      case "education":
        return 1.2
      case "nonprofit":
        return 0.8
      default:
        return 1.0
    }
  })()

  // Calculate final score (capped at 8.5 for realism)
  const totalRisk = baseRisk + volumeRisk + typeRisk
  return Math.min(8.5, Math.round(totalRisk * 10) / 10)
}

export function getRiskLevel(score: number): {
  level: string
  color: string
  description: string
} {
  if (score >= 8.0) {
    return {
      level: "Low",
      color: "text-green-500",
      description: "Your security posture is strong with minimal vulnerabilities.",
    }
  }
  if (score >= 6.0) {
    return {
      level: "Moderate",
      color: "text-yellow-500",
      description: "Some security concerns that should be addressed promptly.",
    }
  }
  return {
    level: "High",
    color: "text-red-500",
    description: "Significant security vulnerabilities requiring immediate attention.",
  }
}

export function getRiskInsights(
  score: number,
  domain?: string,
): Array<{
  title: string
  description: string
}> {
  const insights = []

  if (score < 7.0) {
    insights.push({
      title: "Outdated SSL Certificates",
      description:
        "Your domain has SSL certificates that are approaching expiration or using outdated encryption standards.",
    })
  }

  if (score < 7.5) {
    insights.push({
      title: "Open Ports Detected",
      description:
        "Several unnecessary ports are open on your network, potentially exposing services to unauthorized access.",
    })
  }

  if (score < 8.0) {
    insights.push({
      title: "Email Security Vulnerabilities",
      description:
        "Missing or improperly configured SPF, DKIM, or DMARC records make your domain vulnerable to email spoofing.",
    })
  }

  if (score < 6.5) {
    insights.push({
      title: "Outdated CMS Version",
      description: "Your content management system is running an outdated version with known security vulnerabilities.",
    })
  }

  if (score < 6.0) {
    insights.push({
      title: "Weak Authentication Protocols",
      description: "Multi-factor authentication is not enabled for administrative accounts.",
    })
  }

  // Always return at least one insight
  if (insights.length === 0) {
    insights.push({
      title: "Minor Configuration Issues",
      description: "Some security headers are missing or improperly configured on your web servers.",
    })
  }

  return insights.slice(0, 3) // Return up to 3 insights
}

export function getVulnerabilities(score: number): Array<{
  type: string
  severity: "High" | "Medium" | "Low"
  description: string
}> {
  const vulnerabilities = []

  if (score < 6.5) {
    vulnerabilities.push({
      type: "SSL Certificate",
      severity: "High" as const,
      description: "Certificate expires in 30 days",
    })
  } else if (score < 7.5) {
    vulnerabilities.push({
      type: "SSL Certificate",
      severity: "Medium" as const,
      description: "Certificate expires in 30 days",
    })
  }

  if (score < 7.0) {
    vulnerabilities.push({
      type: "Open Ports",
      severity: "High" as const,
      description: "3 unnecessary ports exposed",
    })
  } else if (score < 8.0) {
    vulnerabilities.push({
      type: "Open Ports",
      severity: "Medium" as const,
      description: "2 unnecessary ports exposed",
    })
  }

  if (score < 7.5) {
    vulnerabilities.push({
      type: "Software Updates",
      severity: "Medium" as const,
      description: "2 critical updates pending",
    })
  }

  if (score < 8.5) {
    vulnerabilities.push({
      type: "DNS Configuration",
      severity: "Low" as const,
      description: "Suboptimal DNS security settings",
    })
  }

  return vulnerabilities.slice(0, 4) // Return up to 4 vulnerabilities
}
