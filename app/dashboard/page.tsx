"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, LogOut, Bug, Home } from "lucide-react"

interface UserSession {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  loginTime: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("workplan_current_user")
    if (!currentUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(currentUser)
      setUser(userData)
    } catch (error) {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("workplan_current_user")
    router.push("/")
  }

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-700 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between">
            {/* Left side: Title */}
            <div className="text-xl font-semibold tracking-wide">Individual Work Plan</div>
            {/* Right side: Logout button */}
            <div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-gray-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <div className="mb-4">

            <p className="text-lg text-gray-700 text-center font-semibold">
              Welcome back,{" "}
              <span className="text-blue-600">
                {user.firstName} {user.lastName}
              </span>
              !
            </p>
          </div>

          {/* Employee Information Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Employee ID:</span>
                  <span className="text-gray-900">{user.id}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Name:</span>
                  <span className="text-gray-900 font-semibold">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Position:</span>
                  <span className="text-gray-900">{user.role === "admin" ? "Administrator" : "Employee"}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Working Agency:</span>
                  <span className="text-gray-900">Management System</span>
                </div>
              </div>
            </div>
          </div>

          {/* As an Employee Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-3xl font-semibold text-black mb-8 text-center border-b-2 border-indigo-200 pb-4">
              As an Employee
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              {/* Planning & Continuous Monitoring */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300 rounded-xl p-8 shadow-md">
                <h4 className="text-xl font-mono font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Planning & Continuous Monitoring
                </h4>
                <p className="text-sm font-sans text-gray-500 mb-6 italic">
                  Deadline Date: 03 Mar 2025 - 31 Mar 2025 (2025)
                </p>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg rounded-lg shadow-md">
                  My Performance Dashboard
                </Button>
              </div>

              {/* Evaluation */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300 rounded-xl p-8 shadow-md">
                <h4 className="text-xl font-mono font-semibold text-gray-700 mb-3 uppercase tracking-wide">Evaluation</h4>
                <p className="text-sm font-sans text-gray-500 mb-6 italic">
                  Deadline Date: 01 May 2024 - 31 May 2024 (2024)
                </p>
                <Button
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 text-lg rounded-lg"
                  disabled
                >
                  Evaluate My Performance Dashboard
                </Button>
              </div>
            </div>

            {/* View Past IWPs */}
            <div className="border-t-2 border-indigo-200 pt-8">
              <h4 className="text-xl font-semibold tracking-wide text-black mb-6 text-center">View Past IWPs</h4>
              <div className="flex justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-12 py-3 text-lg font-semibold rounded-lg shadow-lg">
                  View My Past Evaluation
                </Button>
              </div>
            </div>
            {/* </CHANGE> */}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">© 2025 - Management System</p>
        </div>
      </footer>
    </div>
  )
}
