"use client"

import { Button } from "@/components/ui/button"

export function LandingAppointment() {
  return (
    <section className="relative py-24 w-full text-white text-center overflow-hidden">
      {/* Background Image with Tint */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/home-page/bg-image.webp')" }}
      >
        <div className="absolute inset-0 bg-primary/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em]">We Are Here For Build Better To You</h3>
        <h2 className="text-4xl md:text-4xl font-heading font-extrabold uppercase">
          Make An Appointment Now
        </h2>
        <div className="text-4xl md:text-5xl font-bold tracking-tighter pt-4">
          +91 99 59 59 2888
        </div>
        <div className="pt-8">
          <Button className="bg-white hover:bg-white/90 text-black px-10 py-4 rounded-2xl text-sm font-medium transition-all shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 h-auto">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  )
}
