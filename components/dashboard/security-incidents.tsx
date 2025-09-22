"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, User, Calendar, MapPin } from "lucide-react"

const incidents = [
  {
    id: "INC-2024-001",
    title: "Suspicious Login Activity",
    severity: "Medium",
    status: "Resolved",
    description: "Multiple failed login attempts from unusual geographic location",
    timestamp: "2024-01-15T14:30:00Z",
    location: "Unknown (VPN)",
    assignee: "Security Team",
    resolutionTime: "2 hours",
  },
  {
    id: "INC-2024-002",
    title: "Malware Detection",
    severity: "High",
    status: "In Progress",
    description: "Potential malware detected on employee workstation",
    timestamp: "2024-01-14T09:15:00Z",
    location: "Office Network",
    assignee: "IT Security",
    resolutionTime: "Ongoing",
  },
  {
    id: "INC-2024-003",
    title: "Phishing Email Reported",
    severity: "Low",
    status: "Resolved",
    description: "Employee reported suspicious email with malicious attachment",
    timestamp: "2024-01-13T16:45:00Z",
    location: "Email System",
    assignee: "Security Analyst",
    resolutionTime: "30 minutes",
  },
  {
    id: "INC-2024-004",
    title: "Unauthorized API Access",
    severity: "Critical",
    status: "Resolved",
    description: "Attempted unauthorized access to payment processing API",
    timestamp: "2024-01-12T22:20:00Z",
    location: "External",
    assignee: "Lead Security Engineer",
    resolutionTime: "4 hours",
  },
  {
    id: "INC-2024-005",
    title: "Data Access Anomaly",
    severity: "Medium",
    status: "Under Review",
    description: "Unusual data access pattern detected in customer database",
    timestamp: "2024-01-11T11:30:00Z",
    location: "Database Server",
    assignee: "Data Protection Officer",
    resolutionTime: "Ongoing",
  },
]

export function SecurityIncidents() {
  const resolvedCount = incidents.filter((inc) => inc.status === "Resolved").length
  const activeCount = incidents.filter((inc) => inc.status !== "Resolved").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Recent Security Incidents</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">Last 30 days activity</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">{resolvedCount}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{activeCount}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Active</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <div
              key={incident.id}
              className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 border-l-slate-300 dark:border-l-slate-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-slate-900 dark:text-white">{incident.title}</h3>
                  <Badge
                    variant={
                      incident.severity === "Critical"
                        ? "destructive"
                        : incident.severity === "High"
                          ? "secondary"
                          : incident.severity === "Medium"
                            ? "outline"
                            : "default"
                    }
                  >
                    {incident.severity}
                  </Badge>
                  <Badge variant={incident.status === "Resolved" ? "default" : "secondary"}>
                    {incident.status === "Resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {incident.status !== "Resolved" && <Clock className="h-3 w-3 mr-1" />}
                    {incident.status}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{incident.id}</div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{incident.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {new Date(incident.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400">{incident.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400">{incident.assignee}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400">{incident.resolutionTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
