"use client"

import Image from "next/image"

export function LandingAbout() {
  return (
    <section id="about" className="py-20 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Image Side */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div className="relative z-10 overflow-hidden">
            <Image 
              src="/home-page/imgi_4_about-us.webp" 
              alt="About Anokhi Homes" 
              width={600} 
              height={400} 
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-2">
            <h3 className="text-primary font-semibold uppercase tracking-widest text-sm">About Us</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
              Who we are
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded with a vision to redefine the real estate experience, Anokhi Homes is committed to delivering excellence through innovation and integrity. We specialize in creating high-quality residential and commercial spaces that harmonize with your lifestyle.
            </p>
            <p>
              With years of expertise in the industry, we have successfully completed numerous projects, earning the trust of thousands of happy homeowners. Our approach is centered on understanding our clients' needs and exceeding their expectations at every step of the journey.
            </p>
            <p>
              From meticulously planned layouts to premium finishes, every Anokhi project is a masterpiece of design and craftsmanship. We invite you to explore our world and find your perfect space with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
