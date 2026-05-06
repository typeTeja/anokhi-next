"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Lock, User, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Login successful!")
        router.push("/dashboard")
        router.refresh()
      } else {
        toast.error(data.error || "Invalid credentials")
      }
    } catch (error) {
      toast.error("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl overflow-hidden">
        <div className="h-2 bg-[#C08C4C]"></div>
        <CardHeader className="space-y-4 pt-10 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-[#C08C4C]/10 rounded-2xl flex items-center justify-center text-[#C08C4C] mb-2">
            <Lock className="size-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-heading font-bold">Admin Login</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Enter your credentials to access the Anokhi Admin Dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12 h-14 rounded-xl border-gray-100 bg-gray-50 focus:ring-[#C08C4C]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 rounded-xl border-gray-100 bg-gray-50 focus:ring-[#C08C4C]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl bg-[#C08C4C] hover:bg-[#A6753B] text-white font-bold text-lg shadow-lg shadow-[#C08C4C]/20 transition-all active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" /> Logging in...
                </span>
              ) : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-10 pt-4 text-center">
          <p className="text-xs text-gray-400 w-full italic">
            Secure admin access for Anokhi Enterprises Pvt Ltd.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
