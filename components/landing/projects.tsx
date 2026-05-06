"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"


export function LandingProjects() {
  return (
    <section id="projects" className="py-20 px-4 md:px-20 bg-gray-50 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-primary font-semibold uppercase tracking-widest text-sm italic">Best Advice</h3>
          <h2 className="text-4xl font-heading font-bold text-gray-900 uppercase">
            Our Projects
          </h2>
        </div>
        
        {/* Placeholder for projects grid if needed, but the image shows a button */}
        <div className="flex justify-center pt-4">
          <Link href="/properties">
            <Button className="bg-primary hover:bg-primary/90 text-accent px-10 py-6 rounded-2xl text-lg font-medium  transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
              View All
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
