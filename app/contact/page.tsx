"use client"
import { useState } from "react"

import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      router.push('/thank-you');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white">
      <LandingHeader />

      <main className="flex-grow">
        {/* Contact Hero */}
        <section className="bg-gray-900 text-white py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/home-page/imgi_49_bg-counter.png')] bg-cover bg-center bg-fixed"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h3 className="text-primary font-semibold uppercase tracking-widest text-sm ">Get In Touch</h3>
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">Contact Us</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions about our projects or want to schedule a site visit?
              Our team is here to help you find your dream home.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 px-4 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Contact Details */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold text-gray-900">Let&apos;s Talk Business</h2>
                <p className="text-gray-500">Reach out to us through any of the following channels. We&apos;re available 6 days a week.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="p-8 bg-gray-50 rounded-2xl space-y-4 border border-gray-100 transition-all hover:border-primary/30 hover:shadow-lg group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="size-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Our Hyderabad Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Anokhi Enterprises Pvt Ltd, No.14, 701, 7th Floor, DHFLVC Silicon Towers, Kondapur, Hyderabad 500032.
                  </p>
                </div>


                <div className="p-8 bg-gray-50 rounded-2xl space-y-4 border border-gray-100 transition-all hover:border-primary/30 hover:shadow-lg group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="size-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Email Us</h4>
                  <div className="space-y-1 text-gray-600 text-sm">

                    <p>info@anokhihomes.com</p>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="size-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Call Us</h4>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p>+91 99 59 59 2888</p>
                    <p>+91 7625 037 048</p>

                  </div>
                </div>



                <div className="p-8 bg-gray-50 rounded-2xl space-y-4 border border-gray-100 transition-all hover:border-primary/30 hover:shadow-lg group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="size-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Our Bengaluru Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    MSR North City 144, 6th floor near Manayata Tech Park, Nagavara, Bengaluru, Karnataka 560045.
                  </p>
                </div>

                <div className="p-8 bg-gray-50 rounded-2xl space-y-4 border border-gray-100 transition-all hover:border-primary/30 hover:shadow-lg group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="size-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Working Hours</h4>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <MessageSquare className="size-4" />
                  <span>Send a message</span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-gray-900">Contact Form</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                    <Input required placeholder="John Doe" className="bg-gray-50 border-none h-14 rounded-xl px-6 focus-visible:ring-2 focus-visible:ring-primary" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                    <Input required type="email" placeholder="john@example.com" className="bg-gray-50 border-none h-14 rounded-xl px-6 focus-visible:ring-2 focus-visible:ring-primary" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <Input required type="tel" placeholder="+91 00000 00000" className="bg-gray-50 border-none h-14 rounded-xl px-6 focus-visible:ring-2 focus-visible:ring-primary" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Inquiry Type</label>
                    <Input required placeholder="Property Booking" className="bg-gray-50 border-none h-14 rounded-xl px-6 focus-visible:ring-2 focus-visible:ring-primary" value={formData.inquiryType} onChange={(e) => setFormData({...formData, inquiryType: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Message</label>
                  <Textarea required placeholder="How can we help you?" className="bg-gray-50 border-none min-h-[150px] rounded-xl px-6 py-4 focus-visible:ring-2 focus-visible:ring-primary" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-[#A6753B] text-white h-16 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 gap-3 group">
                  {loading ? 'Sending...' : 'Send Message'} <Send className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </div>

          </div>
        </section>

        {/* Google Map Section */}
        <section className="w-full h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.023007189138!2d78.36822807654916!3d17.458612883440768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81feded60aeb699%3A0x2e7af373fecface9!2sAnokhi%20Enterprises%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1778056953590!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
