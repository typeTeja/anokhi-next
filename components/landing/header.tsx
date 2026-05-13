"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, ChevronDown, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LandingHeader() {
  const [navData, setNavData] = useState<{ locations: Record<string, string[]>, services: string[] }>({
    locations: {},
    services: ['Flats', 'Plots', 'Commercial']
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/navigation')
      .then(res => res.json())
      .then(data => {
        if (data.locations) setNavData(data);
      })
      .catch(err => console.error("Error fetching nav data:", err));
  }, []);

  return (
    <header className="w-full relative">
      {/* Top Bar */}
      <div className="bg-[#C08C4C] text-white py-2 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-2">

          <p>Welcome to Anokhi Homes.</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Mail className="size-3" />
              <span>info@anokhihomes.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="size-3" />
              <span>+91 99 59 59 2888</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-border py-4 px-4 md:px-10 sticky top-0 z-[100]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/home-page/logo.png"
              alt="Anokhi Homes Logo"
              width={120}
              height={80}
              className="h-18 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium  uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/our-vision" className="hover:text-primary transition-colors">Our Vision</Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors uppercase">
                Services <ChevronDown className="size-4" />
              </button>
              <div className={cn(
                "absolute top-full left-0 w-48 bg-white border border-border shadow-2xl rounded-xl py-2 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[110]"
              )}>
                {navData.services.map(service => (
                  <Link key={service} href={`/properties?type=${service}`} className="block px-6 py-3 hover:bg-primary/5 hover:text-primary text-xs font-medium transition-colors text-black">
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors uppercase">
                Locations <ChevronDown className="size-4" />
              </button>
              <div className={cn(
                "absolute top-full md:-left-180 w-max min-w-[600px] max-w-[90vw] bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-6 transition-all duration-500 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[110]"
              )}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {Object.entries(navData.locations).map(([city, areas]) => {
                    const columns = areas.length > 4 ? Math.ceil(areas.length / 6) : 1;
                    const chunks = [];
                    for (let i = 0; i < areas.length; i += 6) {
                      chunks.push(areas.slice(i, i + 6));
                    }

                    return (
                      <div key={city} className={cn("space-y-6", columns > 1 && "lg:col-span-2 xl:col-span-3")}>
                        <div className="space-y-1">
                          <h4 className="text-primary text-[18px] font-black uppercase tracking-[0.3em] border-b border-primary/10 pb-2 mb-4">{city}</h4>
                        </div>
                        <div className={cn("grid gap-x-12 gap-y-4",
                          columns === 2 ? "grid-cols-2" :
                            columns === 3 ? "grid-cols-3" :
                              columns >= 4 ? "grid-cols-4" : "grid-cols-1"
                        )}>
                          {chunks.map((chunk, colIdx) => (
                            <div key={colIdx} className="space-y-3">
                              {chunk.map(area => (
                                <Link
                                  key={area}
                                  href={`/properties?city=${city}&area=${area}`}
                                  className="block text-[14px] font-bold text-gray-600 hover:text-primary transition-all hover:translate-x-1 whitespace-nowrap"
                                >
                                  {area}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        {areas.length === 0 && (
                          <div className="text-[11px] text-gray-400 italic">No locations listed yet</div>
                        )}
                      </div>
                    );
                  })}
                  {Object.keys(navData.locations).length === 0 && (
                    <div className="p-4 text-sm text-gray-500 italic">Loading locations...</div>
                  )}
                </div>
              </div>
            </div>

            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden absolute inset-x-0 top-full h-[calc(100vh-70px)] bg-white z-[90] overflow-y-auto transition-all duration-500 ease-in-out border-t border-border shadow-xl",
          mobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible pointer-events-none"
        )}>
          <div className="flex flex-col p-8 space-y-6 font-bold uppercase tracking-widest text-sm text-black">
            <Link href="/" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/our-vision" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Our Vision</Link>

            <div className="space-y-4">
              <div className="text-primary text-xs font-black tracking-[0.2em] border-b border-primary/10 pb-2">Services</div>
              {navData.services.map(service => (
                <Link key={service} href={`/properties?type=${service}`} className="pl-4 py-2 block border-l-2 border-primary/10 hover:border-primary transition-all text-black" onClick={() => setMobileMenuOpen(false)}>
                  {service}
                </Link>
              ))}
            </div>

            {/* <div className="space-y-4">
              <div className="text-primary text-xs font-black tracking-[0.2em] border-b border-primary/10 pb-2">Locations</div>
              {Object.entries(navData.locations).map(([city, areas]) => (
                <div key={city} className="space-y-2">
                  <div className="pl-4 font-black text-black/40 py-1 text-xs">{city}</div>
                  {areas.map(area => (
                    <Link key={area} href={`/properties?city=${city}&area=${area}`} className="pl-8 py-2 block border-l-2 border-primary/10 hover:border-primary text-xs transition-all text-black" onClick={() => setMobileMenuOpen(false)}>
                      {area}
                    </Link>
                  ))}
                </div>
              ))}
            </div> */}
            <Link href="/properties" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>All Projects</Link>
            <Link href="/blog" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/contact" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
