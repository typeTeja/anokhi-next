"use client"

import { 
  User, 
  Home, 
  FileSearch, 
  Headphones, 
  Presentation, 
  Handshake, 
  Users 
} from "lucide-react"

export function LandingProcess() {
  const steps = [
    { 
      icon: <User className="size-8" />, 
      title: "Understand Client Needs and budget.",
      highlight: false
    },
    { 
      icon: <Home className="size-8" />, 
      title: "Shortlist properties and matching requirements.",
      highlight: false
    },
    { 
      icon: <FileSearch className="size-8" />, 
      title: "Assist in negotiations and paperwork.",
      highlight: false
    },
    { 
      icon: <Headphones className="size-8" />, 
      title: "Provides after sales Support for Complete Reliable Experience.",
      highlight: true
    },
    { 
      icon: <Presentation className="size-8" />, 
      title: "Present options with details on project, amenities & location.",
      highlight: false
    },
    { 
      icon: <Handshake className="size-8" />, 
      title: "Coordinate site visits and builder interactions.",
      highlight: false
    },
    { 
      icon: <Users className="size-8" />, 
      title: "Guide through booking to possession and handover.",
      highlight: false
    }
  ]

  return (
    <section id="process" className="py-24 px-4 md:px-20 bg-white text-center">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-2">
          <h3 className="text-primary font-semibold uppercase tracking- text-md ">Our Process</h3>
          <h2 className="text-4xl font-heading font-bold text-gray-900 leading-tight">
            What We Do?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`group p-10 border border-gray-100 rounded-xl transition-all duration-500 flex flex-col items-center gap-8 ${
                step.highlight 
                ? 'bg-primary/5 border-primary/20 shadow-md' 
                : 'bg-gray-50 hover:bg-primary/5 hover:border-primary/20 hover:shadow-xl'
              }`}
            >
              <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                step.highlight 
                ? 'bg-primary text-white' 
                : 'bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-white'
              }`}>
                {step.icon}
              </div>
              <h4 className={`font-semibold text-base leading-relaxed px-2 transition-colors duration-500 ${
                step.highlight ? 'text-primary' : 'text-gray-800 group-hover:text-primary'
              }`}>
                {step.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
