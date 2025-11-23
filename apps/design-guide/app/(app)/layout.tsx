"use client"

import { useState } from "react"
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <SidebarProvider style={
        {
          "--sidebar-width": "280px",
        } as React.CSSProperties
      }>
      <AppSidebar onOpenNotifications={() => setIsNotificationsOpen(true)} />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-50 flex shrink-0 items-center gap-2 border-b p-4">
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
      <NotificationsSheet
        open={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
      />
    </SidebarProvider>
  )
}
