"use client"

import { Home, UserCheck, Star } from "lucide-react"

export function LandingStats() {
  const stats = [
    {
      icon: <Home className="size-10 text-primary" />,
      value: "500+",
      label: "Plots / Assets Sold"
    },
    {
      icon: <UserCheck className="size-10 text-primary" />,
      value: "13K+",
      label: "Trusted Customers"
    },
    {
      icon: <Star className="size-10 text-primary" />,
      value: "10K+",
      label: "Five Star Reviews / Feedback"
    }
  ]

  return (
    <section className="relative py-16 w-full overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/home-page/imgi_49_bg-counter.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20 transition-transform hover:scale-110 duration-300">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-white tabular-nums">{stat.value}</h3>
                <p className="text-gray-300 uppercase tracking-widest text-xs font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
