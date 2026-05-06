"use client"

import { Button } from "@/components/ui/button"

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
        <Button className="bg-primary hover:bg-primary/90 text-accent px-10 py-6 rounded-2xl text-lg font-medium  transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
          Get In Touch
        </Button>
      </div>
    </section>
  )
}
