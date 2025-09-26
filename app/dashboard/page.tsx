"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Thermometer,
  Droplets,
  AlertTriangle,
  Heart,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Settings,
  Bell,
  History,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

// Mock data for demonstration
const mockData = {
  temperature: 24.5,
  humidity: 65,
  waterLeakage: false,
  feedWastage: false,
  totalHens: 150,
  deadHens: 2,
  robotStatus: "idle" as "idle" | "moving" | "scanning",
  lastMissionTime: "2 hours ago",
}

export default function DashboardPage() {
  const [data, setData] = useState(mockData)
  const [missionProgress, setMissionProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        temperature: 22 + Math.random() * 6, // 22-28°C range
        humidity: 60 + Math.random() * 20, // 60-80% range
        waterLeakage: Math.random() < 0.1, // 10% chance
        feedWastage: Math.random() < 0.05, // 5% chance
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const startMission = () => {
    setData((prev) => ({ ...prev, robotStatus: "moving" }))
    setMissionProgress(0)

    const progressInterval = setInterval(() => {
      setMissionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setData((current) => ({ ...current, robotStatus: "idle" }))
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  const stopMission = () => {
    setData((prev) => ({ ...prev, robotStatus: "idle" }))
    setMissionProgress(0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving":
        return "bg-blue-500"
      case "scanning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAlertLevel = () => {
    const tempAlert = data.temperature < 20 || data.temperature > 30
    const humidityAlert = data.humidity < 50 || data.humidity > 80
    const criticalAlert = data.waterLeakage || data.feedWastage || data.deadHens > 0

    if (criticalAlert) return "critical"
    if (tempAlert || humidityAlert) return "warning"
    return "ok"
  }

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
              <AvatarImage src="/diverse-farmers-harvest.png" />
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary"
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
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary">
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
          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.temperature")}</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.temperature.toFixed(1)}°C</div>
                <Badge
                  variant={data.temperature < 20 || data.temperature > 30 ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {data.temperature < 20 || data.temperature > 30 ? t("dashboard.warning") : t("dashboard.normal")}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.humidity")}</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.humidity.toFixed(0)}%</div>
                <Badge
                  variant={data.humidity < 50 || data.humidity > 80 ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {data.humidity < 50 || data.humidity > 80 ? t("dashboard.warning") : t("dashboard.normal")}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.waterLeakage")}</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.waterLeakage ? "Leak" : "OK"}</div>
                <Badge variant={data.waterLeakage ? "destructive" : "secondary"} className="text-xs">
                  {data.waterLeakage ? t("dashboard.critical") : t("dashboard.normal")}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.feedWastage")}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.feedWastage ? "Waste" : "OK"}</div>
                <Badge variant={data.feedWastage ? "destructive" : "secondary"} className="text-xs">
                  {data.feedWastage ? t("dashboard.critical") : t("dashboard.normal")}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Poultry Health Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  {t("dashboard.poultryHealth")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hens</span>
                  <span className="text-2xl font-bold text-primary">{data.totalHens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Deceased</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-destructive">{data.deadHens}</span>
                    {data.deadHens > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Health Rate</span>
                  <span className="text-lg font-semibold text-green-600">
                    {(((data.totalHens - data.deadHens) / data.totalHens) * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Mission Control Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  {t("dashboard.missionControl")}
                </CardTitle>
                <CardDescription>
                  Robot Status:{" "}
                  <Badge className={getStatusColor(data.robotStatus)}>{data.robotStatus.toUpperCase()}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.robotStatus === "moving" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("dashboard.progress")}</span>
                      <span>{missionProgress}%</span>
                    </div>
                    <Progress value={missionProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  {data.robotStatus === "idle" ? (
                    <Button onClick={startMission} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      {t("dashboard.startMission")}
                    </Button>
                  ) : (
                    <Button onClick={stopMission} variant="destructive" className="flex-1">
                      <Pause className="h-4 w-4 mr-2" />
                      {t("dashboard.stopMission")}
                    </Button>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">Last mission: {data.lastMissionTime}</div>
              </CardContent>
            </Card>
          </div>

          {/* Live Streaming Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                {t("dashboard.liveStream")}
              </CardTitle>
              <CardDescription>{t("dashboard.cameraFeed")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
               {/* Live Streaming Section */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Camera className="h-5 w-5 text-primary" />
      {t("dashboard.liveStream")}
    </CardTitle>
    <CardDescription>{t("dashboard.cameraFeed")}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
      {/* 🔴 Replace your camera URL here */}
      <iframe
        src="http://10.235.255.230" // ✅ Example for IP Webcam
        className="w-full h-full border-0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <div className="absolute top-4 left-4">
        <Badge variant="destructive" className="animate-pulse">
          ● LIVE
        </Badge>
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  </CardContent>
</Card>

                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="animate-pulse">
                    ● LIVE
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.overview")}</CardTitle>
              <CardDescription>Current system status and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <div
                    className={`w-3 h-3 rounded-full ${getAlertLevel() === "critical" ? "bg-red-500" : getAlertLevel() === "warning" ? "bg-yellow-500" : "bg-green-500"}`}
                  ></div>
                  <div>
                    <p className="font-medium">System Status</p>
                    <p className="text-sm text-muted-foreground capitalize">{getAlertLevel()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium">Robot Connection</p>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">Data Sync</p>
                    <p className="text-sm text-muted-foreground">Real-time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}     