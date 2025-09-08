"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

interface UserSession {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  loginTime: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and is admin
    const currentUser = localStorage.getItem("workplan_current_user")
    if (!currentUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(currentUser)
      if (userData.role !== "admin") {
        router.push("/dashboard") // Redirect non-admin users
        return
      }
      setUser(userData)
    } catch (error) {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AdminDashboard user={user} />
}
