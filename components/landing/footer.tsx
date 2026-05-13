"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"



export function LandingFooter() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 md:px-20">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1 space-y-6">
          <Image src="/home-page/logo.png" alt="Anokhi Homes" width={180} height={60} className=" h-16 w-auto object-contain" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Anokhi Homes is a premier real estate developer committed to creating spaces that enhance your lifestyle and provide lasting value.
          </p>
          <div className="flex gap-4">
            {/* Social links skipped for now */}
          </div>


        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/our-vision" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/properties" className="hover:text-primary transition-colors">Our Projects</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Usefull Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Usefull Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Contact Info</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <p className="text-md font-bold ">Head Office</p>
            <li className="flex items-start gap-3">
              <MapPin className="size-5 text-primary shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </li>
            <li className="flex items-center gap-3 border-b border-white/50 pb-2">
              <Link href="tel:+919959592888" className="flex items-center gap-3">
                <Phone className="size-5 text-primary shrink-0" />
                <span>+91 99 59 59 2888</span>
              </Link>
            </li>
              
              <p className="text-md font-bold ">Branch Office</p>
            <li className="flex items-start gap-3">
              <MapPin className="size-5 text-primary shrink-0" />
              <span>Banglore, Karnataka, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Link href="tel:+919959592888" className="flex items-center gap-3">
                <Phone className="size-5 text-primary shrink-0" />
                <span>+91 7625 037 048</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Link href="mailto:info@anokhihomes.com" className="flex items-center gap-3 hover:underline">
                <Mail className="size-5 text-primary shrink-0" />
                <span>info@anokhihomes.com</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer & Fraud Warning */}
      <div className="max-w-6xl mx-auto py-10 border-b border-white/10">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
          <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed text-justify">
            <span className="text-primary font-bold uppercase tracking-wider block mb-1">Disclaimer:</span>
            This message is for informational purposes only and does not constitute an offer to purchase any property or avail of any service. Anokhi Homes (Anokhi Enterprises) acts solely as a facilitator between customers and builders. Anokhi Homes makes no warranties or representations regarding the accuracy of the information and accepts no liability for any actions taken based on it.
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed text-justify">
            <span className="text-primary font-bold uppercase tracking-wider block mb-1">Fraud Warning:</span>
            Anokhi Homes is a zero-brokerage company and does not charge any commission, and we do not offer any discounts, incentives, or coupons for real estate investments or loan services. You are solely responsible for any transactions you initiate. No employee of Anokhi Enterprises is authorised to make any commercial offers or provide discounts on behalf of the company. If anyone claims to represent Anokhi Homes, offers such benefits, or requests any fee or favour, please report it to <a href="mailto:info@anokhihomes.com" className="text-primary hover:underline">info@anokhihomes.com</a>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">

        <p>© 2026 Anokhi Homes. All Rights Reserved.</p>
        <p>Design and Developed by Vihaan Digital Marketings</p>
      </div>
    </footer>
  )
}
