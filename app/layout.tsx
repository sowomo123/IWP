import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { SessionWarning } from "@/components/session-warning"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Individual Work - Individual Work Management",
  description: "Organize your work and achieve your goals with our individual work management platform",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            {children}
            <SessionWarning />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
