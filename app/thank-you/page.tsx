
import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { CheckCircle2, Home, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <LandingHeader />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4">
        <div className="max-w-2xl w-full text-center space-y-10">
          {/* Success Icon */}
          <div className="relative inline-block">
            <div className="size-24 rounded-full bg-green-50 flex items-center justify-center mx-auto text-green-500 relative z-10">
              <CheckCircle2 className="size-12" />
            </div>
            <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight">
              Thank You for Reaching Out!
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto">
              Your inquiry has been received. Our team of experts will review your request and get back to you within 24 hours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#A6753B] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
            >
              <Home className="size-5" /> Back to Home
            </Link>
            <Link 
              href="/blog" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all border border-gray-100"
            >
              Read our Blog <ArrowRight className="size-5" />
            </Link>
          </div>

          {/* Bottom Badge */}
          <div className="pt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Anokhi Homes • Premium Real Estate
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
