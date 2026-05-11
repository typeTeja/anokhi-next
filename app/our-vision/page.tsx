import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { LandingAppointment } from "@/components/landing/appointment"
import Image from "next/image"
import { ShieldCheck, ArrowRightLeft, UserCheck, BarChart3, Headphones, Heart, Users, Handshake, Star, TrendingUp } from "lucide-react"

export const revalidate = 3600; // Revalidate every hour

export default function OurVisionPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white">
      <LandingHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/our-vision/imgi_23_night-view-sanya-city-with-bright-multi-colored-illumination-buildings-structures-roads-sidewalks-poles-bridges-sanya-hainan-china_524378-2174.jpg"
              alt="Our Vision Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-heading font-bold">Our Vision</h1>
            <p className="text-primary font-semibold tracking-widest text-sm uppercase italic">
              Home <span className="mx-2 text-white">/</span> Our Vision
            </p>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-24 px-4 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Our Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
              <div className="bg-primary p-12 rounded-lg text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
                <p className="text-white/90 leading-relaxed text-lg">
                  Our mission is to provide an efficient and easy to use marketplace for real estate professionals and property seekers. We strive to provide the best service possible to our clients and help them find the property they are looking for.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-72 h-72">
                  <Image 
                    src="/our-vision/imgi_3_mission.png" 
                    alt="Mission Icon" 
                    fill 
                    className="object-contain animate-bounce-slow"
                  />
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:flex-row-reverse">
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative w-72 h-72">
                  <Image 
                    src="/our-vision/imgi_4_vision-01.jpg" 
                    alt="Vision Icon" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="bg-[#BE2F31] p-12 rounded-lg text-white shadow-2xl relative overflow-hidden group order-1 md:order-2">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-full -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                <h2 className="text-3xl font-heading font-bold mb-6">Our Vision</h2>
                <p className="text-white/90 leading-relaxed text-lg">
                  Our vision is to become the leading real estate marketplace in India and to provide the best service possible to our clients. We strive to provide the best service possible to our clients and help them find the property they are looking for.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Reusable Appointment Section */}
        <LandingAppointment />

        {/* Our Promises / The Anokhi Advantage */}
        <section className="py-24 px-4 md:px-10 bg-gray-50 text-center">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-2">
              <h3 className="text-primary font-semibold uppercase tracking-widest text-sm ">Our Promises</h3>
              <h2 className="text-4xl font-heading font-bold text-gray-900 leading-tight">
                The Anokhi Advantage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Trusted Advisory", icon: <ShieldCheck className="size-8" />, desc: "Expert guidance on every real estate decision." },
                { title: "Direct Comparison", icon: <ArrowRightLeft className="size-8" />, desc: "Clear side-by-side analysis of your top choices." },
                { title: "Trusted Developer", icon: <UserCheck className="size-8" />, desc: "Collaborating only with the most reliable names." },
                { title: "Market Dynamics", icon: <BarChart3 className="size-8" />, desc: "Deep insights into current market trends and growth." },
                { title: "End-to-End Support", icon: <Headphones className="size-8" />, desc: "Comprehensive service from search to possession." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="py-24 px-4 md:px-10 bg-black text-white text-center">
          <div className="max-w-7xl mx-auto space-y-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">Our Core Values</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Integrity", icon: <Heart className="size-10" /> },
                { title: "Client Centric Service", icon: <Users className="size-10" /> },
                { title: "Development Agreement", icon: <Handshake className="size-10" /> },
                { title: "Excellence and Trust", icon: <Star className="size-10" /> },
                { title: "Innovation and Growth", icon: <TrendingUp className="size-10" /> }
              ].map((val, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-2xl space-y-6 hover:bg-primary transition-all group">
                  <div className="text-primary group-hover:text-white transition-colors flex justify-center">
                    {val.icon}
                  </div>
                  <h4 className="font-bold text-sm tracking-widest uppercase">{val.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Section */}
        <section className="py-24 px-4 md:px-10 bg-white text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900">Enquiry Now</h2>
            <div className="bg-gray-50 p-10 rounded-[2.5rem] shadow-inner border border-gray-100">
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white border border-gray-200 h-14 rounded-xl px-6 focus:ring-2 focus:ring-primary outline-none" />
                <input type="email" placeholder="Your Email" className="w-full bg-white border border-gray-200 h-14 rounded-xl px-6 focus:ring-2 focus:ring-primary outline-none" />
                <textarea placeholder="Your Message" className="w-full bg-white border border-gray-200 min-h-[150px] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none" />
                <button className="w-full bg-primary hover:bg-[#A6753B] text-white h-14 rounded-xl font-bold uppercase tracking-widest transition-all">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
