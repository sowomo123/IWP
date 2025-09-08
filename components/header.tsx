"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Individual Work Plan
            </Link>
          </div>

          {/* Desktop Navigation - now empty but keeping structure */}
          <nav className="hidden md:flex items-center space-x-8">{/* Navigation items removed */}</nav>

          {/* Desktop Auth Buttons - removed registration button */}
          <div className="hidden md:flex items-center space-x-4">{/* Get Started button removed */}</div>
          {/* </CHANGE> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {/* Mobile navigation items removed */}
              {/* </CHANGE> */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
