"use client"

import * as React from "react"
import {
  MessageSquare,
  Send,
  BarChart3,
  Users,
  Bot,
  Settings,
  LayoutGrid,
  Command,
  Briefcase,
  Home,
  Shield,
  Bell,
  History,
  FolderOpen,
  FileText,
  Hash,
  Link2,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavUser } from "@/components/nav-user"
import { WorkspaceSwitcher } from "@/components/workspace/workspace-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    isActive: false,
  },
  {
    title: "Social Inbox",
    url: "/social-inbox",
    icon: MessageSquare,
    isActive: false,
  },
  {
    title: "Feeds",
    url: "/feeds",
    icon: LayoutGrid,
    isActive: false,
  },
  {
    title: "Content Calendar",
    url: "/content-calendar",
    icon: Send,
    isActive: false,
  },
  {
    title: "Content Library",
    url: "/content-library",
    icon: FolderOpen,
    isActive: false,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
    isActive: false,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Insights",
    url: "/insights",
    icon: TrendingUp,
    isActive: false,
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    isActive: false,
  },
  {
    title: "Automations",
    url: "/automations",
    icon: Bot,
    isActive: false,
  },
  {
    title: "Crisis Management",
    url: "/crisis-management",
    icon: Shield,
    isActive: false,
  },
  {
    title: "Listening",
    url: "/listening",
    icon: LayoutGrid,
    isActive: false,
  },
  {
    title: "Hashtags",
    url: "/hashtags",
    icon: Hash,
    isActive: false,
  },
  {
    title: "Links",
    url: "/links",
    icon: Link2,
    isActive: false,
  },
  {
    title: "AI Studio",
    url: "/ai-studio",
    icon: Sparkles,
    isActive: false,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    isActive: false,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: History,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
    isActive: false,
  },
]

// Sample user data
const userData = {
  name: "User",
  email: "user@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  return (
    <Sidebar      
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
         {/* This is the main sidebar */}
         <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <WorkspaceSwitcher />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = pathname?.startsWith(item.url)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setOpen(true)
                        }}
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        asChild
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
