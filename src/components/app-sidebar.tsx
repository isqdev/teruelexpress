import { House, Package, Truck, Cube, Star, FolderSimpleStar, ClipboardText, GearSix } from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import React from "react"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

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
    title: "Minhas solicitações",
    url: "/app/minhas-solicitacoes",
    icon: ClipboardText,
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
  {
    title: "Minhas avaliações",
    url: "/app/minhas-avaliacoes",
    icon: FolderSimpleStar,
  },
  {
    title: "Configurações",
    url: "/app/configuracoes",
    icon: GearSix,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  function handleSidebarToggle() {
    if (isMobile) {
      toggleSidebar()
    }
  }

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
                  <SidebarMenuItem key={item.title} onClick={handleSidebarToggle}>
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
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. LIMPAR O TOKEN DO COOKIE
    // O método 'remove' da biblioteca JS-Cookie é usado para deletar o cookie.
    // É crucial passar a mesma chave ('token') e o mesmo 'path' ('/').
    Cookies.remove('token', { path: '/' }); 
    
    // 2. Limpar o Estado Global (Opcional, mas recomendado)
    // Se você usa Context API/Redux, chame sua função para limpar o estado do usuário.
    // ex: clearUserState();
    
    // 3. Redirecionar
    navigate('/login');
  };
