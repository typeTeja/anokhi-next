import { LandingHeader } from "@/components/landing/header"
import { LandingHero } from "@/components/landing/hero"
import { LandingAbout } from "@/components/landing/about"
import { LandingStats } from "@/components/landing/stats"
import { LandingProjects } from "@/components/landing/projects"
import { LandingWhyChoose } from "@/components/landing/why-choose"
import { LandingAppointment } from "@/components/landing/appointment"
import { LandingProcess } from "@/components/landing/process"
import { LandingTestimonials } from "@/components/landing/testimonials"
import { LandingPartners } from "@/components/landing/partners"
import { LandingFooter } from "@/components/landing/footer"

export const revalidate = 3600; // Revalidate every hour

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingAbout />
        <LandingStats />
        <LandingProjects />
        <LandingWhyChoose />
        <LandingAppointment />
        <LandingProcess />
        <LandingTestimonials />
        <LandingPartners />
      </main>
      <LandingFooter />
    </div>
  )
}
