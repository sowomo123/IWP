import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  )
}
