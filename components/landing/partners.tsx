"use client"

import Image from "next/image"

export function LandingPartners() {
  const partners = [
    "/home-page/imgi_41_5-2.png",
    "/home-page/imgi_42_4-2.png",
    "/home-page/imgi_43_2-2.png",
    "/home-page/imgi_45_24.png",
    "/home-page/imgi_46_22.png",
    "/home-page/imgi_47_21.png",
    "/home-page/imgi_48_20.png",
    "/home-page/imgi_49_19.png",
    "/home-page/imgi_51_13-1.png",
    "/home-page/imgi_52_12-1.png",
    "/home-page/imgi_53_11-1.png",
    "/home-page/imgi_54_9-1.png",
    "/home-page/imgi_55_7-1.png",
    "/home-page/imgi_56_6-2.png",
    "/home-page/imgi_50_18.png"
  ]

  // Duplicate for seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 space-y-12 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
          Our Partners
        </h2>
        
        <div className="relative w-full">
          {/* Slider Container */}
          <div className="flex overflow-hidden group">
            <div className="flex animate-scroll whitespace-nowrap py-4 items-center group-hover:[animation-play-state:paused]">
              {duplicatedPartners.map((partner, index) => (
                <div key={index} className="mx-8 relative w-40 h-20 flex-shrink-0">
                  <Image 
                    src={partner} 
                    alt={`Partner ${index}`} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Fade Gradients */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
