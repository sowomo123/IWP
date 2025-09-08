"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const colleges = [
    { name: "Jigme Namgyel Engineering College", logo: "/images/JNEC.png" },
    { name: "Paro College of Education", logo: "/images/PCE-logo-for-featured-image-3.jpg" },
    { name: "Samtse College of Education", logo: "/images/SCE.png" },
    { name: "Sherubtse College", logo: "/images/sherubtse.jpeg" },
    { name: "College of Language and Culture Studies", logo: "/images/rigzhung.jpg" },
    { name: "College of Natural Resources", logo: "/images/CNR.png" },
    { name: "College of Science and Technology", logo: "/images/cst.png" },
    { name: "Gedu College of Business Studies", logo: "/images/GCBS.png" },
    { name: "Gyelpozhing College of Information and Technology ", logo: "/images/GCIT.jpg" }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % colleges.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + colleges.length) % colleges.length)
  }

  return (
    <footer className="mt-0"> {/* Remove margin at the top */}
      {/* Colleges Section - Remove any top padding/margin */}
      <section className="bg-gray-100 py-12"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#27B0F5]"> {/* Reduced margin */}
            COLLEGES UNDER THE ROYAL UNIVERSITY OF BHUTAN
          </h2>
          
          {/* Navigation arrows and logos container */}
          <div className="relative flex items-center justify-center">
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="flex justify-center items-center gap-6 max-w-6xl mx-12 overflow-hidden"> {/* Reduced gap */}
              {colleges.slice(currentIndex, currentIndex + 5).map((college, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 relative mb-2"> {/* Reduced size */}
                    <Image
                      src={college.logo}
                      alt={college.name}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 mt-1 max-w-[100px]">{college.name}</p> {/* Reduced max width */}
                </div>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer Links Section - Reduced padding */}
      <section className="bg-[#87CEEB] py-8 relative"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Reduced gap */}
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">QUICK LINKS</h3> {/* Reduced size and margin */}
              <div className="space-y-2"> {/* Reduced space */}
                <Link href="https://ims.rub.edu.bt/public/auth/view-login" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  RUB IMS
                </Link>
                <Link href="/rub-mail" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  RUB MAIL
                </Link>
                <Link href="https://www.rub.edu.bt/index.php/sitemap.xml" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  Sitemap
                </Link>
                <Link href="https://www.rub.edu.bt/index.php/faq/" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  FAQ
                </Link>
              </div>
            </div>

            {/* Connect Us */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">CONNECT US</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 text-sm">
                  <span className="mr-2">📞</span>
                  <span>(+975) 2 336454</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <span className="mr-2">✉️</span>
                  <span>info.ovc@rub.edu.bt</span>
                </div>
                <div className="flex items-start text-gray-700 text-sm">
                  <span className="mr-2 mt-1">📍</span>
                  <div>
                    <div>Lower Motithang,</div>
                    <div>Thimphu Bhutan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloads & Publications */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">DOWNLOADS & PUBLICATION</h3>
              <div className="space-y-2">
                <Link href="/online-services" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  Online Services & Forms
                </Link>
                <Link href="/ebsco" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  EBSCO
                </Link>
                <Link href="/bhutan-journal" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  Bhutan Journal of Research and Development
                </Link>
                <Link href="/newsletter" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  RUB E-Newsletter
                </Link>
                <Link href="/calendar" className="block text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  RUB E-Calendar 2025
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 group"
        >
          <ArrowUp className="w-5 h-5 text-gray-600 group-hover:text-[#27B0F5] transition-colors" />
        </button>
      </section>
    </footer>
  )
}