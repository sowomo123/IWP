"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
 
  return (
    <header className="bg-[#87CEEB] backdrop-blur-sm border-b border-slate-700 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned with larger size */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative w-24 h-24 bg-white rounded-full p-2 shadow-lg border-2 border-white">
                <Image 
                  src="/images/RUB.png" 
                  alt="RUB Logo" 
                  fill
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <span className="text-4xl font-serif font-bold text-black tracking-wide">
                Royal University of Bhutan
              </span>
            </Link>
          </div>
 
          {/* Desktop Navigation - now empty but keeping structure */}
          <nav className="hidden md:flex items-center space-x-8">{/* Navigation items removed */}</nav>
 
          {/* Desktop Auth Buttons - removed registration button */}
          <div className="hidden md:flex items-center space-x-4">{/* Get Started button removed */}</div>
 
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-white/20 hover:bg-white/30">
              {isMenuOpen ? <X className="h-7 w-7 text-black" /> : <Menu className="h-7 w-7 text-black" />}
            </Button>
          </div>
        </div>
 
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-300">
              {/* Mobile navigation items removed */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}