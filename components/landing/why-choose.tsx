"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LandingWhyChoose() {
  const points = [
    "Competitive pricing",
    "Expertise and experience",
    "Tailored approach",
    "Personalized approach",
    "Quality and reliability",
    "24/7 Customer support"
  ]

  return (
    <section className="py-24 px-4 md:px-20 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Text Side */}
        <div className="w-full md:w-1/2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              Why choose Anokhi?
            </h2>
            <p className="text-gray-400 text-lg max-w-lg">
              We provide the best real estate solutions tailored to your unique requirements. Our commitment to excellence and customer satisfaction sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <CheckCircle2 className="size-5 text-primary transition-transform group-hover:scale-125" />
                <span className="text-gray-300 font-medium">{point}</span>
              </div>
            ))}
          </div>

          <Link href="/our-vision" >
          <Button className="bg-primary hover:bg-primary/90 text-accent px-10 py-6 rounded-2xl text-sm font-medium transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
            Know More
          </Button>
          </Link>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            {/* Using the lightbulb image from the folder */}
            <Image 
              src="/home-page/imgi_36_Untitled-design-7.png" 
              alt="Why Choose Us" 
              fill
              className="object-contain animate-pulse duration-[3000ms]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
