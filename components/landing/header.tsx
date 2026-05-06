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
              width={150} 
              height={50} 
              className="h-10 w-auto object-contain"
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

            {/* Locations Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors uppercase">
                Locations <ChevronDown className="size-4" />
              </button>
              <div className={cn(
                "absolute top-full left-0 w-56 bg-white border border-border shadow-2xl rounded-xl py-2 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[110]"
              )}>
                {Object.entries(navData.locations).map(([city, areas]) => (
                  <div key={city} className="relative group/sub">
                    <div className="px-6 py-3 hover:bg-primary/5 hover:text-primary text-xs font-medium transition-colors flex justify-between items-center cursor-default text-black">
                      {city} <ChevronDown className="size-3 -rotate-90" />
                    </div>
                    {/* Submenu for areas */}
                    <div className="absolute top-0 left-full w-56 bg-white border border-border shadow-2xl rounded-xl py-2 opacity-0 invisible translate-x-2 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 transition-all">
                      {areas.map(area => (
                        <Link key={area} href={`/properties?city=${city}&area=${area}`} className="block px-6 py-3 hover:bg-primary/5 hover:text-primary text-[10px] font-bold transition-colors text-black">
                          {area}
                        </Link>
                      ))}
                      {areas.length === 0 && <div className="px-6 py-3 text-[10px] text-muted-foreground">All Locations</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 rounded-lg bg-primary/5 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden fixed inset-0 top-[116px] bg-white z-[90] overflow-y-auto transition-all duration-500",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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

            <div className="space-y-4">
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
            </div>

            <Link href="/blog" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/contact" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
