import { useState } from "react"
import { Outlet, useLocation } from "react-router"
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { NotificationsSheet } from "@/components/dialogs/notifications/notifications-sheet"
import { WindowControls } from "./window-controls"

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/social-inbox": "Social Inbox",
  "/content-calendar": "Content Calendar",
  "/feeds": "Feeds",
  "/crm": "CRM",
  "/listening": "Listening",
  "/analytics": "Analytics",
  "/automations": "Automations",
  "/compose": "Compose",
  "/crisis-management": "Crisis Management",
  "/integrations": "Integrations",
  "/settings": "Workspace Settings",
  "/user/settings": "User Settings",
  "/screen-capture": "Screen Capture",
}

function getPageTitle(pathname: string): string {
  if (routeTitles[pathname]) return routeTitles[pathname]
  // Check prefix matches for dynamic routes
  if (pathname.startsWith("/feeds/")) return "Feed Detail"
  if (pathname.startsWith("/crm/")) return "Contact Detail"
  if (pathname.startsWith("/integrations/")) return "Integration Detail"
  return "Dashboard"
}

export function AppLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { pathname } = useLocation()
  const pageTitle = getPageTitle(pathname)

  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "280px",
      } as React.CSSProperties
    }>
      <AppSidebar onOpenNotifications={() => setIsNotificationsOpen(true)} />
      <SidebarInset>
        <header
          className="bg-background sticky top-0 z-50 flex shrink-0 items-center gap-2 border-b p-4"
          data-tauri-drag-region
        >
          <WindowControls />
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Workspace
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
      <NotificationsSheet
        open={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
      />
    </SidebarProvider>
  )
}
