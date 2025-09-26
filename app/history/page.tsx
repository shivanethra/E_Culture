"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Bell,
  History,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Calendar,
  Timer,
  MapPin,
  Activity,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface Mission {
  id: string
  startTime: Date
  endTime: Date
  duration: number // in minutes
  status: "completed" | "failed" | "interrupted"
  result: string
  issuesFound: number
  areasScanned: number
  robotBattery: number
  weatherConditions: string
  notes?: string
}

// Mock mission history data
const mockMissions: Mission[] = [
  {
    id: "M001",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    duration: 30,
    status: "completed",
    result: "Water leakage detected in sector B-3",
    issuesFound: 1,
    areasScanned: 8,
    robotBattery: 85,
    weatherConditions: "Clear",
    notes: "Immediate maintenance required for water system",
  },
  {
    id: "M002",
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    endTime: new Date(Date.now() - 5.5 * 60 * 60 * 1000), // 5.5 hours ago
    duration: 30,
    status: "completed",
    result: "No issues found",
    issuesFound: 0,
    areasScanned: 8,
    robotBattery: 92,
    weatherConditions: "Clear",
  },
  {
    id: "M003",
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    endTime: new Date(Date.now() - 11.5 * 60 * 60 * 1000), // 11.5 hours ago
    duration: 30,
    status: "completed",
    result: "Feed wastage detected in area 2",
    issuesFound: 1,
    areasScanned: 8,
    robotBattery: 78,
    weatherConditions: "Light rain",
    notes: "Adjusted feeding mechanism",
  },
  {
    id: "M004",
    startTime: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    endTime: new Date(Date.now() - 17.8 * 60 * 60 * 1000), // 17.8 hours ago
    duration: 12,
    status: "interrupted",
    result: "Mission interrupted due to low battery",
    issuesFound: 0,
    areasScanned: 3,
    robotBattery: 15,
    weatherConditions: "Clear",
    notes: "Robot returned to charging station",
  },
  {
    id: "M005",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(Date.now() - 23.5 * 60 * 60 * 1000), // 23.5 hours ago
    duration: 30,
    status: "completed",
    result: "1 hen found deceased in coop area 7",
    issuesFound: 1,
    areasScanned: 8,
    robotBattery: 88,
    weatherConditions: "Cloudy",
    notes: "Health inspection completed",
  },
  {
    id: "M006",
    startTime: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 hours ago
    endTime: new Date(Date.now() - 29.5 * 60 * 60 * 1000), // 29.5 hours ago
    duration: 30,
    status: "completed",
    result: "No issues found",
    issuesFound: 0,
    areasScanned: 8,
    robotBattery: 95,
    weatherConditions: "Clear",
  },
  {
    id: "M007",
    startTime: new Date(Date.now() - 36 * 60 * 60 * 1000), // 36 hours ago
    endTime: new Date(Date.now() - 35.2 * 60 * 60 * 1000), // 35.2 hours ago
    duration: 48,
    status: "failed",
    result: "System malfunction detected",
    issuesFound: 0,
    areasScanned: 2,
    robotBattery: 65,
    weatherConditions: "Heavy rain",
    notes: "Robot maintenance performed after mission",
  },
  {
    id: "M008",
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() - 47.5 * 60 * 60 * 1000), // 47.5 hours ago
    duration: 30,
    status: "completed",
    result: "Temperature alert resolved",
    issuesFound: 1,
    areasScanned: 8,
    robotBattery: 82,
    weatherConditions: "Clear",
    notes: "Ventilation system adjusted",
  },
]

export default function HistoryPage() {
  const [missions, setMissions] = useState<Mission[]>(mockMissions)
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(mockMissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPeriod, setFilterPeriod] = useState<string>("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  // Filter missions based on search and filters
  React.useEffect(() => {
    let filtered = missions

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (mission) =>
          mission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mission.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mission.notes?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((mission) => mission.status === filterStatus)
    }

    // Period filter
    if (filterPeriod !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (filterPeriod) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      if (filterPeriod !== "all") {
        filtered = filtered.filter((mission) => mission.startTime >= filterDate)
      }
    }

    setFilteredMissions(filtered)
  }, [missions, searchTerm, filterStatus, filterPeriod])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "interrupted":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "failed":
        return "destructive"
      case "interrupted":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const exportData = () => {
    const csvContent = [
      "Mission ID,Start Time,End Time,Duration,Status,Result,Issues Found,Areas Scanned,Battery Level,Weather,Notes",
      ...filteredMissions.map((mission) =>
        [
          mission.id,
          mission.startTime.toISOString(),
          mission.endTime.toISOString(),
          mission.duration,
          mission.status,
          `"${mission.result}"`,
          mission.issuesFound,
          mission.areasScanned,
          mission.robotBattery,
          mission.weatherConditions,
          `"${mission.notes || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mission-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totalMissions = missions.length
  const completedMissions = missions.filter((m) => m.status === "completed").length
  const failedMissions = missions.filter((m) => m.status === "failed").length
  const totalIssues = missions.reduce((sum, m) => sum + m.issuesFound, 0)
  const avgDuration = missions.reduce((sum, m) => sum + m.duration, 0) / missions.length

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold text-primary">{t("dashboard.title")}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=djcj6" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Farm Manager</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed left-0 top-0 h-full w-64 bg-card border-r p-4">
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-4 w-4" />
                  {t("nav.dashboard")}
                </Link>
                <Link
                  href="/alerts"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Bell className="h-4 w-4" />
                  {t("nav.alerts")}
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-4 w-4" />
                  {t("nav.profile")}
                </Link>
                <Link
                  href="/history"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary"
                >
                  <History className="h-4 w-4" />
                  {t("nav.history")}
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  {t("nav.logout")}
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-card/50">
          <nav className="flex-1 space-y-2 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              {t("nav.dashboard")}
            </Link>
            <Link
              href="/alerts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Bell className="h-4 w-4" />
              {t("nav.alerts")}
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="h-4 w-4" />
              {t("nav.profile")}
            </Link>
            <Link href="/history" className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary">
              <History className="h-4 w-4" />
              {t("nav.history")}
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Link
              href="/auth/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              {t("nav.logout")}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-balance">{t("history.title")}</h1>
              <p className="text-muted-foreground text-pretty">View past robot missions and their results</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t("history.exportData")}
              </Button>
            </div>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("history.totalMissions")}</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMissions}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("history.successRate")}</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round((completedMissions / totalMissions) * 100)}%</div>
                <p className="text-xs text-muted-foreground">{completedMissions} completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("history.issuesFound")}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalIssues}</div>
                <p className="text-xs text-muted-foreground">Total detected</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("history.avgDuration")}</CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDuration(Math.round(avgDuration))}</div>
                <p className="text-xs text-muted-foreground">Per mission</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                {t("common.filter")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`${t("common.search")} missions...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="interrupted">Interrupted</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center">
                  Showing {filteredMissions.length} of {missions.length} missions
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission History List */}
          <div className="space-y-4">
            {filteredMissions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <History className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No missions found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchTerm || filterStatus !== "all" || filterPeriod !== "all"
                      ? "Try adjusting your filters or search terms."
                      : "No mission history available yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMissions.map((mission) => (
                <Card key={mission.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          {getStatusIcon(mission.status)}
                          <h3 className="font-semibold text-lg">Mission {mission.id}</h3>
                          <Badge variant={getStatusBadgeVariant(mission.status)} className="capitalize">
                            {mission.status}
                          </Badge>
                          {mission.issuesFound > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {mission.issuesFound} Issue{mission.issuesFound > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground">{mission.result}</p>

                        {mission.notes && <p className="text-sm text-muted-foreground italic">Note: {mission.notes}</p>}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Started</p>
                              <p className="text-muted-foreground">{formatDateTime(mission.startTime)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Duration</p>
                              <p className="text-muted-foreground">{formatDuration(mission.duration)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Areas Scanned</p>
                              <p className="text-muted-foreground">{mission.areasScanned}/8</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Battery</p>
                              <p className="text-muted-foreground">{mission.robotBattery}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Weather: {mission.weatherConditions}</span>
                          <span>•</span>
                          <span>Ended: {formatDateTime(mission.endTime)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
