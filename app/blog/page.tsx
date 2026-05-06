"use client"

import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const blogs = [
    {
      title: "The Future of Real Estate in Hyderabad",
      excerpt: "Exploring the growth patterns and upcoming investment hotspots in the city of pearls.",
      date: "May 5, 2026",
      author: "Anokhi Team",
      category: "Market Trends"
    },
    {
      title: "Why Investing in Plots is Better Than Flats?",
      excerpt: "A comprehensive guide on land value appreciation and long-term benefits of plot investment.",
      date: "April 28, 2026",
      author: "Real Estate Expert",
      category: "Investment Tips"
    },
    {
      title: "Home Buying Guide for First-Time Owners",
      excerpt: "Everything you need to know from legal documentation to choosing the right neighborhood.",
      date: "April 15, 2026",
      author: "Admin",
      category: "Guides"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <LandingHeader />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl font-heading font-bold">Our Blog</h1>
            <p className="text-gray-400 text-lg">Stay updated with the latest news and trends in real estate.</p>
          </div>
        </section>

        <section className="py-24 px-4 md:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50 flex flex-col group">
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-[#C08C4C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {blog.category}
                  </span>
                </div>
                <div className="p-8 flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1"><Calendar className="size-3" /> {blog.date}</div>
                    <div className="flex items-center gap-1"><User className="size-3" /> {blog.author}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C08C4C] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-[#C08C4C] font-bold text-xs uppercase tracking-widest pt-4 group/btn">
                    Read More <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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
