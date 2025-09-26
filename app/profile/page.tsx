"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient" 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  Bell,
  History,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Thermometer,
  Droplets,
  AlertTriangle,
  Smartphone,
  Monitor,
  Volume2,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface UserProfile {
  name: string
  email: string
  phone: string
  farmName: string
  farmLocation: string
  farmSize: string
  description: string
}

interface AlertSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  soundAlerts: boolean
  temperatureAlerts: boolean
  humidityAlerts: boolean
  waterLeakageAlerts: boolean
  feedWastageAlerts: boolean
  healthAlerts: boolean
  systemAlerts: boolean
  temperatureMin: number
  temperatureMax: number
  humidityMin: number
  humidityMax: number
}

export default function ProfilePage() {
    // ✅ User profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    farmName: "",
    farmLocation: "",
    farmSize: "",
    description: "",
  })

  // ✅ Fetch profile from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error("No user found", userError)
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Profile fetch error:", error)
        return
      }

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          farmName: data.farmName || "",
          farmLocation: data.farmLocation || "",
          farmSize: data.farmSize || "",
          description: data.description || "",
        })
      }
    }

    fetchProfile()
  }, [])


  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundAlerts: true,
    temperatureAlerts: true,
    humidityAlerts: true,
    waterLeakageAlerts: true,
    feedWastageAlerts: true,
    healthAlerts: true,
    systemAlerts: true,
    temperatureMin: 20,
    temperatureMax: 28,
    humidityMin: 50,
    humidityMax: 80,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleAlertSettingChange = (field: keyof AlertSettings, value: boolean | number) => {
    setAlertSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1500)
  }

  const handleLogout = () => {
    // Simulate logout
    window.location.href = "/auth/login"
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary"
                >
                  <User className="h-4 w-4" />
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
            <Link
              href="/alerts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Bell className="h-4 w-4" />
              {t("nav.alerts")}
            </Link>
            <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 text-primary">
              <User className="h-4 w-4" />
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
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4 mr-3" />
              {t("nav.logout")}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-balance">{t("profile.title")}</h1>
              <p className="text-muted-foreground text-pretty">Manage your account and system preferences</p>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    {t("common.cancel")}
                  </Button>
                  <Button onClick={handleSave} size="sm" disabled={isSaving}>
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {t("profile.saveChanges")}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  {t("common.edit")} Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("profile.personalInfo")}
              </CardTitle>
              <CardDescription>Update your personal and farm information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?key=djcj6" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                )}
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("profile.fullName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("profile.email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("profile.phone")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    value={profile.farmName}
                    onChange={(e) => handleProfileChange("farmName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmLocation">{t("profile.location")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farmLocation"
                      value={profile.farmLocation}
                      onChange={(e) => handleProfileChange("farmLocation", e.target.value)}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size</Label>
                  <Input
                    id="farmSize"
                    value={profile.farmSize}
                    onChange={(e) => handleProfileChange("farmSize", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("profile.bio")}</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => handleProfileChange("description", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t("profile.systemSettings")}
              </CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Methods */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("profile.notifications")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{t("profile.emailNotifications")}</p>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.emailNotifications}
                      onCheckedChange={(checked) => handleAlertSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{t("profile.pushNotifications")}</p>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.pushNotifications}
                      onCheckedChange={(checked) => handleAlertSettingChange("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{t("profile.smsAlerts")}</p>
                        <p className="text-sm text-muted-foreground">Text message alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.smsNotifications}
                      onCheckedChange={(checked) => handleAlertSettingChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-muted-foreground">Audio notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.soundAlerts}
                      onCheckedChange={(checked) => handleAlertSettingChange("soundAlerts", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alert Types */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Alert Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Temperature Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify when temperature is out of range</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.temperatureAlerts}
                      onCheckedChange={(checked) => handleAlertSettingChange("temperatureAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Humidity Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify when humidity is out of range</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.humidityAlerts}
                      onCheckedChange={(checked) => handleAlertSettingChange("humidityAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Water Leakage Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify when water leakage is detected</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.waterLeakageAlerts}
                      onCheckedChange={(checked) => handleAlertSettingChange("waterLeakageAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Feed Wastage Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify when feed wastage is detected</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.feedWastageAlerts}
                      onCheckedChange={(checked) => handleAlertSettingChange("feedWastageAlerts", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alert Thresholds */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("profile.alertThresholds")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tempMin">{t("profile.temperatureThreshold")} Min (°C)</Label>
                    <Input
                      id="tempMin"
                      type="number"
                      value={alertSettings.temperatureMin}
                      onChange={(e) => handleAlertSettingChange("temperatureMin", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tempMax">{t("profile.temperatureThreshold")} Max (°C)</Label>
                    <Input
                      id="tempMax"
                      type="number"
                      value={alertSettings.temperatureMax}
                      onChange={(e) => handleAlertSettingChange("temperatureMax", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidityMin">{t("profile.humidityThreshold")} Min (%)</Label>
                    <Input
                      id="humidityMin"
                      type="number"
                      value={alertSettings.humidityMin}
                      onChange={(e) => handleAlertSettingChange("humidityMin", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidityMax">{t("profile.humidityThreshold")} Max (%)</Label>
                    <Input
                      id="humidityMax"
                      type="number"
                      value={alertSettings.humidityMax}
                      onChange={(e) => handleAlertSettingChange("humidityMax", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  {t("profile.changePassword")}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Download Data
                </Button>
                <Button variant="destructive" onClick={handleLogout} className="flex-1">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
