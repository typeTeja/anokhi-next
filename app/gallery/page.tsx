"use client"

import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import Image from "next/image";

export default function GalleryPage() {
  const images = [
    { src: "/home-page/imgi_41_5-2.png", title: "Project Site A" },
    { src: "/home-page/imgi_42_4-2.png", title: "Residential Villa" },
    { src: "/home-page/imgi_43_2-2.png", title: "Modern Apartment" },
    { src: "/home-page/imgi_45_24.png", title: "Landscape Design" },
    { src: "/home-page/imgi_46_22.png", title: "Interior View" },
    { src: "/home-page/imgi_47_21.png", title: "Office Complex" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <LandingHeader />
      <main className="flex-grow">
        <section className="bg-[#C08C4C] text-white py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl font-heading font-bold uppercase tracking-tight">Our Gallery</h1>
            <p className="text-white/80 text-lg">Visual glimpses of our premium projects and developments.</p>
          </div>
        </section>

        <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl bg-gray-100 break-inside-avoid">
                <Image src={img.src} alt={img.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <h4 className="text-white font-bold text-xl uppercase tracking-widest">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
