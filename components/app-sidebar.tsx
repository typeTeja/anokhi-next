"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  FolderIcon, 
  UsersIcon, 
  FileTextIcon, 
  Settings2Icon, 
  CircleHelpIcon,
  ImageIcon,
  PlusIcon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "Anokhi Admin",
    email: "teja@gmail.com",
    avatar: "/home-page/logo.png",
  },
  teams: [
    {
      name: "Anokhi Homes",
      logo: (
        <ImageIcon className="size-4" />
      ),
      plan: "Real Estate",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },
    {
      title: "Projects",
      url: "/dashboard/properties",
      icon: (
        <FolderIcon />
      ),
    },
    {
      title: "Add Project",
      url: "/dashboard/properties/new",
      icon: (
        <PlusIcon />
      ),
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "Content Management",
      url: "#",
      icon: (
        <FileTextIcon />
      ),
      items: [
        {
          title: "Blog",
          url: "/dashboard/blog",
        },
        {
          title: "Gallery",
          url: "/dashboard/gallery",
        },
        {
          title: "Our Vision",
          url: "/dashboard/our-vision",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: (
        <Settings2Icon />
      ),
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: (
        <CircleHelpIcon />
      ),
    },
  ],
  projects: [],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
