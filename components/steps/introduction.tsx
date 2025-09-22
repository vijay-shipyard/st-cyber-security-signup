"use client"

import { motion } from "framer-motion"
import { Globe, Shield, Zap, TrendingUp, Users, ArrowRight, Star, Building2, Award, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IntroductionProps {
  onContinue: () => void
}

export default function Introduction({ onContinue }: IntroductionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="text-center relative">
      {/* Professional Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-8">
            <Building2 className="w-4 h-4 mr-2" />
            Trusted by Fortune 500 Companies
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            <span className="text-slate-900">Enterprise Payment</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
            <span className="text-lg text-slate-600 font-medium">Rated #1 Enterprise Payment Platform</span>
            <div className="flex items-center space-x-2 ml-4">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-500">SOC 2 Type II Certified</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto mb-8"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed"
        >
          Deploy enterprise-grade payment processing with advanced security, compliance automation, and risk management.{" "}
          <span className="font-semibold text-slate-700">Process billions in transactions</span>,
          <span className="font-semibold text-slate-700"> scale globally</span>, and
          <span className="font-semibold text-slate-700"> protect your business</span> with our comprehensive platform.
        </motion.p>
      </motion.div>

      {/* Enterprise Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          >
            <Zap className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="font-bold text-xl mb-4 text-slate-900">High-Performance Processing</h3>
          <p className="text-slate-600 leading-relaxed">
            Process millions of transactions per second with our globally distributed infrastructure spanning 40+
            countries and 99.99% uptime SLA.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          >
            <Globe className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="font-bold text-xl mb-4 text-slate-900">Global Commerce Platform</h3>
          <p className="text-slate-600 leading-relaxed">
            Accept payments worldwide with support for 200+ currencies, local payment methods, and automated compliance
            across 50+ jurisdictions.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="font-bold text-xl mb-4 text-slate-900">Enterprise Security & Risk</h3>
          <p className="text-slate-600 leading-relaxed">
            Bank-grade security with PCI DSS Level 1 certification, advanced fraud protection, and parametric cyber
            insurance coverage up to $50M.
          </p>
        </motion.div>
      </motion.div>

      {/* Enterprise Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-xl p-8 rounded-2xl mb-16 border border-slate-200/50 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-600">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg mb-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-slate-900">2.4% + 30¢</div>
              <div className="text-sm">Enterprise rates</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-slate-900">500+</div>
              <div className="text-sm">Enterprise clients</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg mb-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-slate-900">99.99%</div>
              <div className="text-sm">Uptime SLA</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full shadow-lg mb-3">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-slate-900">50+</div>
              <div className="text-sm">Countries</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group border-0"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center">
              Begin Enterprise Setup
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-8 flex items-center space-x-6 text-sm text-slate-500"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Dedicated account manager</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>24-48 hour activation</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
