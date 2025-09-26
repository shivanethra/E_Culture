"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Zap, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { supabase } from "@/lib/supabaseClient"

const translations = {
  en: {
    title: "Smart Poultry Control",
    description: "Sign in to monitor and control your poultry farming robot",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    forgotPassword: "Forgot your password?",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    language: "Language",
    loginError: "Invalid email or password",
  },
  ta: {
    title: "ஸ்மார்ட் கோழி கட்டுப்பாடு",
    description: "உங்கள் கோழி வளர்ப்பு ரோபோவை கண்காணிக்க மற்றும் கட்டுப்படுத்த உள்நுழையவும்",
    email: "மின்னஞ்சல்",
    emailPlaceholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    password: "கடவுச்சொல்",
    passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    signIn: "உள்நுழைய",
    signingIn: "உள்நுழைகிறது...",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    noAccount: "கணக்கு இல்லையா?",
    signUp: "பதிவு செய்யவும்",
    language: "மொழி",
    loginError: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்",
  },
  hi: {
    title: "स्मार्ट पोल्ट्री कंट्रोल",
    description: "अपने पोल्ट्री फार्मिंग रोबोट की निगरानी और नियंत्रण के लिए साइन इन करें",
    email: "ईमेल",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    signIn: "साइन इन",
    signingIn: "साइन इन हो रहा है...",
    forgotPassword: "अपना पासवर्ड भूल गए?",
    noAccount: "खाता नहीं है?",
    signUp: "साइन अप",
    language: "भाषा",
    loginError: "गलत ईमेल या पासवर्ड",
  },
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { language, setLanguage } = useLanguage()
  const router = useRouter()

  const t = translations[language]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setIsLoading(false)
      setErrorMessage(t.loginError)
    } else if (data.user) {
      setIsLoading(false)
      router.push("/dashboard") // authorized users go here
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={language === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="flex items-center gap-1"
            >
              <Languages className="w-3 h-3" />
              English
            </Button>
            <Button
              variant={language === "ta" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("ta")}
              className="flex items-center gap-1"
            >
              <Languages className="w-3 h-3" />
              தமிழ்
            </Button>
            <Button
              variant={language === "hi" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("hi")}
              className="flex items-center gap-1"
            >
              <Languages className="w-3 h-3" />
              हिंदी
            </Button>
          </div>

          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-balance">{t.title}</CardTitle>
          <CardDescription className="text-pretty">{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  {t.signingIn}
                </div>
              ) : (
                t.signIn
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
              {t.forgotPassword}
            </Link>
            <p className="text-sm text-muted-foreground">
              {t.noAccount}{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                {t.signUp}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
