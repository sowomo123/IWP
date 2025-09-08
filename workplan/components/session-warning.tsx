"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, AlertTriangle } from "lucide-react"

const WARNING_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

export function SessionWarning() {
  const { sessionTimeRemaining, extendSession, logout } = useAuth()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Show warning when session is about to expire
    if (sessionTimeRemaining > 0 && sessionTimeRemaining <= WARNING_TIME) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [sessionTimeRemaining])

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!showWarning || sessionTimeRemaining <= 0) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Session Expiring Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your session will expire in <strong>{formatTime(sessionTimeRemaining)}</strong>. You will be automatically
              logged out unless you extend your session.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button onClick={extendSession} className="flex-1">
              Extend Session
            </Button>
            <Button variant="outline" onClick={logout} className="flex-1 bg-transparent">
              Logout Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
