"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()
  
  const getTitle = () => {
    if (pathname.startsWith('/dashboard/properties/new')) return 'Add New Project'
    if (pathname.startsWith('/dashboard/properties')) return 'Projects'
    if (pathname.startsWith('/dashboard/leads')) return 'Leads'
    if (pathname.startsWith('/dashboard/blog')) return 'Blog Management'
    if (pathname.startsWith('/dashboard/gallery')) return 'Gallery'
    if (pathname.startsWith('/dashboard/settings')) return 'Settings'
    if (pathname === '/dashboard') return 'Dashboard Overview'
    return 'Dashboard'
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getTitle()}</h1>
      </div>
    </header>
  )
}
