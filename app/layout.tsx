import { Geist_Mono, Inter, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});
const inter = Inter({subsets:['latin'],variable:'--font-sans'})
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Anokhi Homes | Premium Real Estate & Property Management",
  description: "Discover premium properties and real estate opportunities with Anokhi Homes. We provide top-tier property management and sales services in Hyderabad and Bangalore.",
  keywords: ["Real Estate", "Properties", "Hyderabad", "Bangalore", "Anokhi Homes", "Property Management"],
  authors: [{ name: "Anokhi Homes" }],
  openGraph: {
    title: "Anokhi Homes | Premium Real Estate",
    description: "Premium properties and real estate services.",
    url: "https://anokhihomes.com",
    siteName: "Anokhi Homes",
    locale: "en_IN",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, playfairDisplayHeading.variable)}
    >
      <body suppressHydrationWarning>

     
          <TooltipProvider>{children}</TooltipProvider>
       
      </body>

    </html>
  )
}
