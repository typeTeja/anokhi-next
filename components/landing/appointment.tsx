"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


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
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
        <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/80">We Are Here For Build Better To You</h3>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black uppercase leading-tight">
          Make An Appointment Now
        </h2>
        <div className="text-3xl md:text-5xl font-black tracking-tighter pt-4 text-accent">
          +91 99 59 59 2888
        </div>
        <Link href="/contact">
          <Button className="bg-white hover:bg-white/90 text-black px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-2xl shadow-black/40 hover:scale-[1.05] active:scale-95 h-auto">
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
