"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface SessionData extends User {
  loginTime: string
  lastActivity: string
  expiresAt: string
  rememberMe: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  sessionTimeRemaining: number
  extendSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session configuration
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds
const REMEMBER_ME_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before expiry

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0)
  const router = useRouter()

  const validateSession = useCallback((): SessionData | null => {
    const currentUser = localStorage.getItem("workplan_current_user")
    if (!currentUser) return null

    try {
      const sessionData: SessionData = JSON.parse(currentUser)
      const now = new Date().getTime()
      const expiresAt = new Date(sessionData.expiresAt).getTime()

      if (now > expiresAt) {
        // Session expired
        localStorage.removeItem("workplan_current_user")
        return null
      }

      return sessionData
    } catch (error) {
      localStorage.removeItem("workplan_current_user")
      return null
    }
  }, [])

  const updateLastActivity = useCallback(() => {
    const sessionData = validateSession()
    if (!sessionData) return

    const now = new Date()
    const updatedSession: SessionData = {
      ...sessionData,
      lastActivity: now.toISOString(),
      expiresAt: new Date(
        now.getTime() + (sessionData.rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION),
      ).toISOString(),
    }

    localStorage.setItem("workplan_current_user", JSON.stringify(updatedSession))
  }, [validateSession])

  const extendSession = useCallback(() => {
    updateLastActivity()
  }, [updateLastActivity])

  const logout = useCallback(() => {
    localStorage.removeItem("workplan_current_user")
    setUser(null)
    setSessionTimeRemaining(0)
    router.push("/")
  }, [router])

  useEffect(() => {
    const updateTimer = () => {
      const sessionData = validateSession()
      if (!sessionData) {
        setSessionTimeRemaining(0)
        return
      }

      const now = new Date().getTime()
      const expiresAt = new Date(sessionData.expiresAt).getTime()
      const remaining = Math.max(0, expiresAt - now)

      setSessionTimeRemaining(remaining)

      if (remaining === 0) {
        logout()
      }
    }

    const interval = setInterval(updateTimer, 1000) // Update every second
    updateTimer() // Initial update

    return () => clearInterval(interval)
  }, [validateSession, logout])

  useEffect(() => {
    const handleActivity = () => {
      if (user) {
        updateLastActivity()
      }
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    // Throttle activity updates to prevent excessive localStorage writes
    let lastUpdate = 0
    const throttledHandleActivity = () => {
      const now = Date.now()
      if (now - lastUpdate > 60000) {
        // Update at most once per minute
        lastUpdate = now
        handleActivity()
      }
    }

    events.forEach((event) => {
      document.addEventListener(event, throttledHandleActivity, true)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, throttledHandleActivity, true)
      })
    }
  }, [user, updateLastActivity])

  useEffect(() => {
    const sessionData = validateSession()
    if (sessionData) {
      setUser({
        id: sessionData.id,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
        email: sessionData.email,
        role: sessionData.role,
      })
      updateLastActivity() // Update activity on page load
    }
    setIsLoading(false)
  }, [validateSession, updateLastActivity])

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("workplan_users") || "[]")
      const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        return false
      }

      const now = new Date()
      const sessionDuration = rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION

      const sessionData: SessionData = {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
        loginTime: now.toISOString(),
        lastActivity: now.toISOString(),
        expiresAt: new Date(now.getTime() + sessionDuration).toISOString(),
        rememberMe,
      }

      localStorage.setItem("workplan_current_user", JSON.stringify(sessionData))
      setUser({
        id: sessionData.id,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
        email: sessionData.email,
        role: sessionData.role,
      })
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, sessionTimeRemaining, extendSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
