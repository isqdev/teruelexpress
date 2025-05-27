import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import React from "react"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}