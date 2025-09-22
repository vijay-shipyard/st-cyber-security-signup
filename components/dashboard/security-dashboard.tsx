"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardHeader from "./dashboard-header"
import DashboardSidebar from "./dashboard-sidebar"
import { SecurityScoreChart } from "./security-score-chart"
import { VulnerabilityOverview } from "./vulnerability-overview"
import { SecurityMetricCard } from "./security-metric-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertTriangle,
  Shield,
  Phone,
  CheckCircle,
  Zap,
  Clock,
  Building,
  Download,
  Search,
  Filter,
  MapPin,
  Server,
  Globe,
  Cloud,
  Mail,
  Wifi,
  Eye,
  FileText,
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Wallet,
  Users,
  Link,
  Settings,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SecurityDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBreachAlert, setShowBreachAlert] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for revamped dashboard (0-10 scale)
  const companyInfo = {
    name: "DemoCo",
    logo: "DC",
    overallRating: "A-",
    overallScore: 8.7,
    industry: "Financial Technology",
    size: "Mid-Market (500-1000 employees)",
    lastAssessment: "2024-01-15",
    relationshipOwner: "Sarah Johnson",
    contactEmail: "sarah.johnson@democorp.com",
  }

  const trendData = [
    { date: "Dec 1", score: 7.8 },
    { date: "Dec 8", score: 8.2 },
    { date: "Dec 15", score: 8.5 },
    { date: "Dec 22", score: 8.7 },
    { date: "Dec 29", score: 8.7 },
  ]

  const riskDomains = [
    { name: "Software Patching", score: 9.2, status: "excellent", icon: Download, color: "emerald" },
    { name: "Application Security", score: 8.5, status: "good", icon: Shield, color: "emerald" },
    { name: "Web Encryption", score: 9.5, status: "excellent", icon: Globe, color: "emerald" },
    { name: "Network Filtering", score: 7.8, status: "fair", icon: Wifi, color: "amber" },
    { name: "Email Security", score: 8.8, status: "good", icon: Mail, color: "emerald" },
    { name: "DNS Security", score: 8.2, status: "good", icon: Server, color: "emerald" },
    { name: "System Reputation", score: 9.0, status: "excellent", icon: Eye, color: "emerald" },
    { name: "System Hosting", score: 8.6, status: "good", icon: Cloud, color: "emerald" },
  ]

  const securityIssues = [
    {
      id: "SEC-001",
      title: "Outdated SSL Certificate on subdomain",
      severity: "Medium",
      domain: "Web Encryption",
      assetValue: "High",
      status: "Open",
      detected: "2024-01-10",
      description: "SSL certificate for api.democorp.com expires in 15 days",
    },
    {
      id: "SEC-002",
      title: "Missing security headers",
      severity: "Low",
      domain: "Application Security",
      assetValue: "Medium",
      status: "In Progress",
      detected: "2024-01-08",
      description: "Content Security Policy headers not implemented",
    },
    {
      id: "SEC-003",
      title: "Unpatched WordPress plugin",
      severity: "High",
      domain: "Software Patching",
      assetValue: "High",
      status: "Resolved",
      detected: "2024-01-05",
      resolved: "2024-01-12",
      description: "Contact Form 7 plugin vulnerability (CVE-2024-1234)",
    },
  ]

  const infrastructureData = [
    { type: "Web Servers", count: 12, provider: "AWS", location: "US-East-1" },
    { type: "Databases", count: 4, provider: "AWS RDS", location: "US-East-1" },
    { type: "Load Balancers", count: 3, provider: "AWS ELB", location: "US-East-1" },
    { type: "CDN", count: 1, provider: "CloudFlare", location: "Global" },
    { type: "Email Service", count: 1, provider: "Microsoft 365", location: "Global" },
  ]

  const triggerBreachSimulation = () => {
    setIsProcessing(true)
    setAnimationStep(0)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setShowBreachAlert(true)

      // Auto-advance through animation steps
      const stepInterval = setInterval(() => {
        setAnimationStep((prev) => {
          if (prev >= 5) {
            clearInterval(stepInterval)
            return prev
          }
          return prev + 1
        })
      }, 800)
    }, 1500)
  }

  const closeAlert = () => {
    setShowBreachAlert(false)
    setAnimationStep(0)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Open":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getRatingColor = (rating: string) => {
    if (rating.startsWith("A")) return "text-emerald-600"
    if (rating.startsWith("B")) return "text-green-600"
    if (rating.startsWith("C")) return "text-amber-600"
    if (rating.startsWith("D")) return "text-orange-600"
    return "text-red-600"
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: activeTab === "overview" },
    { icon: CreditCard, label: "Payments", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Wallet, label: "Balances", active: false },
    { icon: Users, label: "Customers", active: false },
    { icon: Shield, label: "Security", active: activeTab === "security" },
    { icon: Link, label: "Integrations", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardSidebar open={sidebarOpen} menuItems={menuItems} setActiveTab={setActiveTab} activeTab={activeTab} />

      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"} pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header with Simulation Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Security Operations Center</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Enterprise security monitoring and incident response management
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  isProcessing
                    ? {
                        boxShadow: [
                          "0 4px 20px rgba(59, 130, 246, 0.3)",
                          "0 8px 30px rgba(59, 130, 246, 0.5)",
                          "0 4px 20px rgba(59, 130, 246, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0 }}
              >
                <Button
                  onClick={triggerBreachSimulation}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-semibold border border-blue-500/20"
                >
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.3,
                          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertTriangle className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isProcessing ? "Initiating Security Protocol..." : "Initiate Breach Simulation"}
                  <Shield className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="infrastructure">IT Profile</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab - Original Dashboard Content */}
            <TabsContent value="overview" className="space-y-6">
              {/* Vulnerability Overview with Overall Score */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                  <div className="flex items-center gap-8">
                    {/* Overall Security Score Circle */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-200 dark:text-slate-700"
                          />
                          <motion.circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={314}
                            strokeDashoffset={314 - (314 * (8.7 * 10)) / 100}
                            className="text-green-500"
                            initial={{ strokeDashoffset: 314 }}
                            animate={{ strokeDashoffset: 314 - (314 * (8.7 * 10)) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              className="text-2xl font-bold text-slate-900 dark:text-white"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, duration: 0.5 }}
                            >
                              8.7
                            </motion.div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Security Score</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">Excellent</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Above Industry Average</div>
                      </div>
                    </div>

                    {/* Existing Vulnerability Overview Content */}
                    <div className="flex-1">
                      <VulnerabilityOverview />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Security Score Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-2"
              >
                <SecurityScoreChart />
              </motion.div>

              {/* Security Metric Cards - Compact Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <SecurityMetricCard
                    title="Software Patching"
                    grade="A"
                    gradeColor="bg-blue-500"
                    chartColor="rgb(59, 130, 246)"
                    riskLevel="Low Risk (0.8/10)"
                    metrics={[
                      { label: "Last 30 days", value: "9.4", status: "good" },
                      { label: "Last 90 days", value: "8.9", status: "good" },
                      { label: "Critical Patches", value: "1.2", status: "warning" },
                      { label: "Security Updates", value: "4.5", status: "good" },
                      { label: "System Uptime", value: "9.8", status: "good" },
                      { label: "Patch Compliance", value: "8.7", status: "warning" },
                    ]}
                    chartData={[]}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <SecurityMetricCard
                    title="Regulatory Security"
                    grade="A+"
                    gradeColor="bg-green-500"
                    chartColor="rgb(34, 197, 94)"
                    riskLevel="Low Risk (0.2/10)"
                    metrics={[
                      { label: "GDPR Compliance", value: "9.8", status: "good" },
                      { label: "PCI DSS", value: "9.5", status: "good" },
                      { label: "SOC 2", value: "9.2", status: "good" },
                      { label: "Data Protection", value: "9.6", status: "good" },
                      { label: "Audit Readiness", value: "8.9", status: "warning" },
                      { label: "Policy Updates", value: "9.4", status: "good" },
                    ]}
                    chartData={[]}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <SecurityMetricCard
                    title="Web Encryption"
                    grade="B-"
                    gradeColor="bg-yellow-500"
                    chartColor="rgb(234, 179, 8)"
                    riskLevel="Medium Risk (1.4/10)"
                    metrics={[
                      { label: "SSL/TLS Coverage", value: "7.8", status: "warning" },
                      { label: "Certificate Health", value: "8.2", status: "warning" },
                      { label: "Encryption Strength", value: "7.1", status: "error" },
                      { label: "Key Management", value: "8.5", status: "good" },
                      { label: "Protocol Security", value: "7.6", status: "warning" },
                      { label: "Cipher Suites", value: "6.9", status: "error" },
                    ]}
                    chartData={[]}
                  />
                </motion.div>
              </div>
            </TabsContent>

            {/* Security Tab - Revamped Dashboard Content */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Company Info Card */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getRatingColor(companyInfo.overallRating)} mb-2`}>
                        {companyInfo.overallRating}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {companyInfo.overallScore}/10
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Overall Security Rating</p>
                    </div>
                    <div className="space-y-3 pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Industry</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{companyInfo.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Company Size</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{companyInfo.size}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Last Assessment</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(companyInfo.lastAssessment).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Relationship Owner</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{companyInfo.relationshipOwner}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">{companyInfo.contactEmail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search and Filters */}
                <Card className="lg:col-span-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search security issues..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Severity</DropdownMenuLabel>
                          <DropdownMenuCheckboxItem>Critical</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>High</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Medium</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Low</DropdownMenuCheckboxItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuCheckboxItem>Open</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Resolved</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>

                    {/* Security Issues List */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security Issues</h3>
                      {securityIssues.map((issue, index) => (
                        <motion.div
                          key={issue.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium text-slate-900 dark:text-white">{issue.title}</h3>
                                <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                                  {issue.severity}
                                </Badge>
                                <Badge variant="outline" className={getStatusColor(issue.status)}>
                                  {issue.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{issue.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span>ID: {issue.id}</span>
                                <span>Domain: {issue.domain}</span>
                                <span>Asset Value: {issue.assetValue}</span>
                                <span>Detected: {new Date(issue.detected).toLocaleDateString()}</span>
                                {issue.resolved && (
                                  <span>Resolved: {new Date(issue.resolved).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Infrastructure Tab */}
            <TabsContent value="infrastructure" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Infrastructure Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Server className="h-5 w-5 mr-2" />
                      Infrastructure Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {infrastructureData.map((item, index) => (
                        <div
                          key={item.type}
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium text-slate-900 dark:text-white">{item.type}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.provider}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-900 dark:text-white">{item.count}</div>
                            <div className="text-xs text-slate-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Hosting Providers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cloud className="h-5 w-5 mr-2" />
                      Hosting Providers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                            AWS
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900 dark:text-white">Amazon Web Services</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Primary hosting provider</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            CF
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900 dark:text-white">CloudFlare</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">CDN and security services</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Domains Tab */}
            <TabsContent value="domains" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {riskDomains.map((domain, index) => (
                  <motion.div
                    key={domain.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-lg">
                          <domain.icon className={`h-5 w-5 mr-2 text-${domain.color}-500`} />
                          {domain.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className={`text-6xl font-bold text-${domain.color}-600 mb-1`}>
                            {domain.score >= 9
                              ? "A"
                              : domain.score >= 8
                                ? "B"
                                : domain.score >= 7
                                  ? "C"
                                  : domain.score >= 6
                                    ? "D"
                                    : "F"}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{domain.score}/10</div>
                          <Progress value={domain.score * 10} className="h-2" />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Status:</span>
                            <span className="font-medium capitalize">{domain.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Last Check:</span>
                            <span className="font-medium">Today</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coverage Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Coverage Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-900 dark:text-green-100">Active Policy</h3>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Premium</Badge>
                        </div>
                        <div className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">$50K</div>
                        <p className="text-sm text-green-700 dark:text-green-300">Total Coverage Limit</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">$25K</div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">First Party Coverage</p>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">$25K</div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Third Party Coverage</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Policy Number</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            CYB-2024-{Date.now().toString().slice(-8)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Renewal Date</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">March 15, 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Annual Premium</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">$8,500</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Claims History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Claims History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">3</div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">Total Claims</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-900 dark:text-green-100">$42K</div>
                          <p className="text-sm text-green-700 dark:text-green-300">Total Paid</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">2hr</div>
                          <p className="text-sm text-orange-700 dark:text-orange-300">Average Time to Pay</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-slate-900 dark:text-white">Ransomware Incident</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                            <span>March 2024</span>
                            <span>$28,000</span>
                          </div>
                        </div>

                        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-slate-900 dark:text-white">Data Breach</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                            <span>November 2023</span>
                            <span>$12,000</span>
                          </div>
                        </div>

                        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-slate-900 dark:text-white">Business Interruption</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                            <span>August 2023</span>
                            <span>$2,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coverage Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">First Party Coverage</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Data Recovery</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$15K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Business Interruption</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$20K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Cyber Extortion</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$10K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Forensic Investigation</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$5K</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Third Party Coverage</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Privacy Liability</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$20K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Network Security</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$20K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Regulatory Fines</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$15K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Legal Defense</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">$10K</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Additional Benefits</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">24/7 Incident Response</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">Pre-breach Services</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">Risk Assessment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">Employee Training</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">Vendor Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Score Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Score Impact on Premiums</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">8.7</div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-1">Current Risk Score</p>
                      <p className="text-xs text-green-600">Excellent Rating</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">15%</div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Premium Discount</p>
                      <p className="text-xs text-blue-600">Due to High Score</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">$1,275</div>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Annual Savings</p>
                      <p className="text-xs text-purple-600">vs Standard Rate</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Your excellent security score of 8.7/10 qualifies you for our premium discount tier. Maintaining
                      scores above 8.0 ensures continued preferential pricing and enhanced coverage options.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Executive Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      High-level overview suitable for executives and stakeholders.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Technical Deep Dive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Detailed technical findings and remediation recommendations.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Compliance Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Compliance-focused report for regulatory requirements.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Professional Security Incident Alert */}
      <AlertDialog open={showBreachAlert} onOpenChange={setShowBreachAlert}>
        <AlertDialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
          {/* Official Header */}
          <AlertDialogHeader className="pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 bg-red-100 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </motion.div>
                <div>
                  <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                    SECURITY INCIDENT ALERT
                  </AlertDialogTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Incident ID: SEC-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>Priority: CRITICAL</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span>Status: ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Detected</div>
                <div className="font-mono text-lg font-bold text-gray-900">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogDescription asChild>
            <div className="space-y-6 py-6">
              {/* Executive Summary */}
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-red-900 mb-3">EXECUTIVE SUMMARY</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-red-800 mb-2">Incident Classification:</div>
                    <div className="text-red-700 space-y-1">
                      <div>
                        • <strong>Type:</strong> Advanced Persistent Threat (APT)
                      </div>
                      <div>
                        • <strong>Vector:</strong> Spear-phishing campaign
                      </div>
                      <div>
                        • <strong>Payload:</strong> Ransomware deployment
                      </div>
                      <div>
                        • <strong>Scope:</strong> Multi-system compromise
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-800 mb-2">Affected Assets:</div>
                    <div className="text-red-700 space-y-1">
                      <div>• Customer database (45,000 records)</div>
                      <div>• Payment processing systems</div>
                      <div>• Internal network infrastructure</div>
                      <div>• Backup systems (partial)</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Insurance Response */}
              <motion.div
                className="bg-green-50 border border-green-200 rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: animationStep >= 3 ? 1 : 0, scale: animationStep >= 3 ? 1 : 0.95 }}
                transition={{ delay: 1.5 }}
              >
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Shield className="w-5 h-5" />
                  </motion.div>
                  PARAMETRIC INSURANCE ACTIVATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                      <div className="text-sm font-semibold text-green-800 mb-2">Policy Status</div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-3 h-3 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-green-700 font-medium">AUTOMATICALLY TRIGGERED</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>• Policy Number: CYB-2024-{Date.now().toString().slice(-8)}</div>
                      <div>• Coverage Tier: Enterprise Premium</div>
                      <div>• Trigger Conditions: Met</div>
                      <div>• Response Time: &lt; 15 minutes</div>
                    </div>
                  </div>
                  <motion.div
                    className="bg-green-100 p-6 rounded-lg border-2 border-green-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: animationStep >= 4 ? 1 : 0, y: animationStep >= 4 ? 0 : 20 }}
                    transition={{ delay: 2.0 }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-800 mb-2">IMMEDIATE PAYOUT AUTHORIZED</div>
                      <motion.div
                        className="text-4xl font-bold text-green-900 mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        $32,000
                      </motion.div>
                      <div className="text-xs text-green-700">Wire transfer initiated</div>
                      <div className="text-xs text-green-700">ETA: 18-24 hours</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Incident Response Protocol */}
              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: animationStep >= 4 ? 1 : 0, scale: animationStep >= 4 ? 1 : 0.95 }}
                transition={{ delay: 2.3 }}
              >
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  INCIDENT RESPONSE PROTOCOL ACTIVATED
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-semibold text-blue-800 mb-3">Immediate Actions Deployed:</div>
                    <div className="space-y-2">
                      {[
                        "Elite security consultant assigned",
                        "24/7 incident response team mobilized",
                        "Digital forensics specialists engaged",
                        "Legal counsel activated",
                        "Crisis communication team standing by",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 text-sm text-blue-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: animationStep >= 4 ? 1 : 0, x: animationStep >= 4 ? 0 : -10 }}
                          transition={{ delay: 2.5 + index * 0.1 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ scale: [0, 1] }}
                            transition={{ delay: 2.5 + index * 0.1 + 0.2 }}
                          />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-3">Next Contact:</div>
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Phone className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      <div>
                        <div className="font-bold text-blue-900">Senior Security Consultant</div>
                        <div className="text-sm text-blue-700">Will contact within 60 minutes</div>
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 bg-white p-2 rounded border">
                      <strong>Contact Method:</strong> Direct phone call to registered emergency contact
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Items */}
              <motion.div
                className="bg-purple-50 border border-purple-200 rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: animationStep >= 5 ? 1 : 0, scale: animationStep >= 5 ? 1 : 0.95 }}
                transition={{ delay: 3.0 }}
              >
                <h3 className="text-lg font-bold text-purple-900 mb-4">IMMEDIATE ACTION ITEMS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { priority: "CRITICAL", action: "Await security consultant contact", time: "Next 60 minutes" },
                    { priority: "HIGH", action: "Preserve all system logs and evidence", time: "Immediate" },
                    { priority: "HIGH", action: "Do not restart affected systems", time: "Until advised" },
                    { priority: "MEDIUM", action: "Prepare affected systems inventory", time: "Within 2 hours" },
                    { priority: "MEDIUM", action: "Notify key stakeholders", time: "Use provided templates" },
                    { priority: "LOW", action: "Document timeline of events", time: "When possible" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-purple-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: animationStep >= 5 ? 1 : 0, y: animationStep >= 5 ? 0 : 10 }}
                      transition={{ delay: 3.2 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded ${
                            item.priority === "CRITICAL"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "HIGH"
                                ? "bg-orange-100 text-orange-800"
                                : item.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <div className="font-medium text-purple-900">{item.action}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStep >= 5 ? 1 : 0, y: animationStep >= 5 ? 0 : 20 }}
                transition={{ delay: 3.8 }}
              >
                <div className="text-lg font-bold text-gray-900 mb-2">COVERAGE SUMMARY</div>
                <div className="text-gray-700">
                  Your parametric cyber insurance is providing{" "}
                  <span className="font-bold text-green-600">67% coverage</span> of estimated losses, reducing net
                  exposure from <span className="font-bold text-red-600">$48K</span> to{" "}
                  <span className="font-bold text-blue-600">$16K</span>
                </div>
              </motion.div>
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="pt-6 border-t border-gray-200">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <AlertDialogAction
                onClick={closeAlert}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold rounded-lg shadow-lg"
              >
                Acknowledge & Begin Response Protocol
              </AlertDialogAction>
            </motion.div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
