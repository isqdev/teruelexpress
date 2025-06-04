import { House, Package, Truck, Cube, Star } from "phosphor-react"
import { useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Página inicial",
    url: "/app/home",
    icon: House,
  },
  {
    title: "Solicitar orçamento",
    url: "/app/orcamento",
    icon: Package,
  },
  {
    title: "Meus fretes",
    url: "/app/meus-fretes",
    icon: Cube,
  },
  {
    title: "Rotas atendidas",
    url: "/app/rotas-atendidas",
    icon: Truck,
  },
  {
    title: "Avalie nosso serviço",
    url: "/app/avaliar",
    icon: Star,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Teruel Express</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <Link to={item.url}>
                        <item.icon
                          className="size-10"
                          weight={isActive ? "fill" : "regular"} // Change weight here
                        />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
