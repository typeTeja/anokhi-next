"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function LandingTestimonials() {
  const reviews = [
    {
      name: "jeebitesh das",
      role: "Property Buyer",
      text: "I had a great experience purchasing my property at Prestige Claremont and a big part of that credit goes to Rohit. From day one, he was extremely professional, knowledgeable and transparent. He took the time to understand my requirements...",
      rating: 5,
      time: "4 months ago"
    },
    {
      name: "Sunil Swain",
      role: "Local Guide",
      text: "I'm incredibly pleased with the service I received from Anokhi for my home purchase. Their expert guidance made the process smooth, and they always kept me informed. The team especially Mr Rohit was friendly, knowledgeable...",
      rating: 5,
      time: "4 months ago"
    },
    {
      name: "divya devil",
      role: "Verified Client",
      text: "The team was patience and helped us understand the process and plans of each project. Really appreciated their honesty 🙂",
      rating: 5,
      time: "4 months ago"
    },
    {
      name: "Soniya Kummariguntla",
      role: "Home Owner",
      text: "I had a great experience with Anokhi homes, loved the designs of the projects and the locations also. The team was friendly and transparent throughout the process.",
      rating: 5,
      time: "6 months ago"
    },
    {
      name: "divyatejaswi Bandi",
      role: "Property Owner",
      text: "We felt very comfortable throughout the process. They guided us like a friend rather than just a sales agent.",
      rating: 5,
      time: "4 months ago"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const placeId = "ChIJmbauYO3tHwgR6azP_nPzei4"
  const viewReviewsUrl = `https://search.google.com/local/reviews?placeid=${placeId}`
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`

  return (
    <section id="testimonials" className="relative py-24 w-full overflow-hidden">
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/home-page/imgi_49_bg-counter.png')" }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-left">
          <div className="space-y-2">
            <h3 className="text-primary font-semibold uppercase tracking-widest text-sm ">Google Reviews</h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Testimonials
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-[#FABB05] text-[#FABB05]" />
                ))}
              </div>
              <span className="text-white font-bold text-xl">4.7 / 5</span>
              <span className="text-gray-400 text-sm">37 reviews</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href={writeReviewUrl} 
              target="_blank"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg"
            >
              Write a review
            </Link>
            <Link 
              href={viewReviewsUrl} 
              target="_blank"
              className="bg-primary hover:bg-[#A6753B] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg"
            >
              View all <ExternalLink className="size-4" />
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="relative group">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-2xl relative transition-all duration-300 hover:shadow-2xl h-full flex flex-col justify-between">
                    <div>
                      {/* Google G Logo Badge */}
                      <div className="absolute top-4 right-4">
                        <Image src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={40} height={13} className="opacity-30" />
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="size-4 fill-[#FABB05] text-[#FABB05]" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 italic leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-white uppercase shadow-inner">
                          {review.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{review.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{review.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-6 -translate-y-1/2 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all z-20 hidden md:block"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-6 -translate-y-1/2 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all z-20 hidden md:block"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 pt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i ? "bg-primary w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
