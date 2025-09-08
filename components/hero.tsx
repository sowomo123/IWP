"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section 
      className="relative py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/images/RUB bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide uppercase">
          INDIVIDUAL WORK PLAN
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="bg-[#87CEEB] hover:bg-[#1E90D2] text-white px-8 py-3 text-lg" asChild>
            <Link href="/register">Start Planning Today</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-[#27B0F5] px-8 py-3 text-lg" 
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}