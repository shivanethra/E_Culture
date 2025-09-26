"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Thermometer,
  Droplets,
  Heart,
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
  Trash2,
  Award as MarkAsRead,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface Alert {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: "temperature" | "water" | "feed" | "health" | "system"
}

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Water Leakage Detected",
    message: "Water leakage detected in sector B-3. Immediate attention required.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    category: "water",
  },
  {
    id: "2",
    type: "critical",
    title: "Hen Death Detected",
    message: "1 hen found deceased in coop area 7. Health inspection recommended.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    category: "health",
  },
  {
    id: "3",
    type: "warning",
    title: "Temperature Alert",
    message: "Temperature has risen to 32°C, above optimal range (20-28°C).",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: true,
    category: "temperature",
  },
  {
    id: "4",
    type: "warning",
    title: "Feed Wastage Detected",
    message: "Excessive feed wastage detected in feeding area 2.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    category: "feed",
  },
  {
    id: "5",
    type: "info",
    title: "Mission Completed",
    message: "Robot patrol mission completed successfully. No issues found.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    category: "system",
  },
  {
    id: "6",
    type: "success",
    title: "System Update",
    message: "Robot firmware updated to version 2.1.3 successfully.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    category: "system",
  },
  {
    id: "7",
    type: "warning",
    title: "Humidity Alert",
    message: "Humidity level dropped to 45%, below optimal range (50-80%).",
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
    isRead: true,
    category: "temperature",
  },
  {
    id: "8",
    type: "info",
    title: "Scheduled Maintenance",
    message: "Robot maintenance scheduled for tomorrow at 6:00 AM.",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    category: "system",
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  // Filter alerts based on search and filters
  useEffect(() => {
    let filtered = alerts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Type filter
    if (filterType !== "all") {
      if (filterType === "unread") {
        filtered = filtered.filter((alert) => !alert.isRead)
      } else {
        filtered = filtered.filter((alert) => alert.type === filterType)
      }
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((alert) => alert.category === filterCategory)
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, filterType, filterCategory])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive"
      case "warning":
        return "secondary"
      case "success":
        return "default"
      default:
        return "outline"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "temperature":
        return <Thermometer className="h-4 w-4" />
      case "water":
        return <Droplets className="h-4 w-4" />
      case "health":
        return <Heart className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const markAsRead = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })))
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const unreadCount = alerts.filter((alert) => !alert.isRead).length

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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary"
                >
                  <Bell className="h-4 w-4" />
                  {t("nav.alerts")}
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {unreadCount}
                    </Badge>
                  )}
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
            <Link href="/alerts" className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
              {t("nav.alerts")}
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs">
                  {unreadCount}
                </Badge>
              )}
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
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
              <h1 className="text-3xl font-bold text-balance">{t("alerts.title")}</h1>
              <p className="text-muted-foreground text-pretty">Monitor system alerts and notifications in real-time</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <MarkAsRead className="h-4 w-4 mr-2" />
                {t("alerts.markAllRead")}
              </Button>
            </div>
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
                    placeholder={`${t("common.search")} alerts...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("alerts.all")}</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="critical">{t("alerts.critical")}</SelectItem>
                    <SelectItem value="warning">{t("alerts.warning")}</SelectItem>
                    <SelectItem value="info">{t("alerts.info")}</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="feed">Feed</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center">
                  Showing {filteredAlerts.length} of {alerts.length} alerts
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchTerm || filterType !== "all" || filterCategory !== "all"
                      ? "Try adjusting your filters or search terms."
                      : "All systems are running smoothly."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`transition-all hover:shadow-md ${!alert.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className={`font-semibold ${!alert.isRead ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {alert.title}
                            </h3>
                            <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                              {alert.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getCategoryIcon(alert.category)}
                              <span className="capitalize">{alert.category}</span>
                            </div>
                            {!alert.isRead && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!alert.isRead && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                            <MarkAsRead className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteAlert(alert.id)}>
                          <Trash2 className="h-4 w-4" />
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
