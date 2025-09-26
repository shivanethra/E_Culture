"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Zap } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-balance">Check Your Email</CardTitle>
            <CardDescription className="text-pretty">We've sent a password reset link to {email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-balance">Reset Password</CardTitle>
          <CardDescription className="text-pretty">
            Enter your email address and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Sending reset link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
