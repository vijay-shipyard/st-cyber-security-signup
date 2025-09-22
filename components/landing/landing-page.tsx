"use client"
import LandingHeader from "@/components/landing/landing-header"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import TrustedBySection from "@/components/landing/trusted-by-section"
import StatsSection from "@/components/landing/stats-section"
import CTASection from "@/components/landing/cta-section"
import Footer from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <LandingHeader />

      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
