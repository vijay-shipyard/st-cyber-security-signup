"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  TrendingUp,
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
  Building,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

export default function SecurityDashboardRevamped() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data (0-10 scale)
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {companyInfo.logo}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{companyInfo.name}</h1>
              <p className="text-slate-600 dark:text-slate-400">Security Risk Assessment Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="infrastructure">IT Profile</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
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

              {/* Risk Trend Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Security Score Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                        <YAxis stroke="#888888" fontSize={12} domain={[7, 10]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Domains Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Domains Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {riskDomains.map((domain, index) => (
                    <motion.div
                      key={domain.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <domain.icon className={`h-5 w-5 text-${domain.color}-500`} />
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{domain.score}</span>
                      </div>
                      <h3 className="font-medium text-slate-900 dark:text-white mb-1">{domain.name}</h3>
                      <Progress value={domain.score * 10} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
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
                </div>
              </CardContent>
            </Card>

            {/* Security Issues List */}
            <Card>
              <CardHeader>
                <CardTitle>Security Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                            {issue.resolved && <span>Resolved: {new Date(issue.resolved).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                        <div className={`text-3xl font-bold text-${domain.color}-600 mb-1`}>{domain.score}</div>
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

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Score Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} domain={[7, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
      </motion.div>
    </div>
  )
}
