"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export function LandingHero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{ backgroundImage: "url('/home-page/hero_banner-1.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-20 text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black leading-[1.1] tracking-tight">
          Beyond properties. <br className="hidden sm:block" />
          Built for the <br className="hidden sm:block" />
          life you want.
        </h1>
        <p className="text-base md:text-xl text-gray-200 max-w-xl leading-relaxed">
          Everything you need to find the perfect home or investment. We build with quality, integrity, and your lifestyle in mind.
        </p>
        <Link href="/contact">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-black/30 hover:scale-[1.05] active:scale-95 h-auto">
            Get In Touch
          </Button>
        </Link>
      </div>
    </section>
  )
}
