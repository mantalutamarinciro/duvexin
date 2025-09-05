
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  FileText,
  Truck,
  ClipboardList,
  Users,
  Activity,
  Wand2,
  HardHat,
  Wallet,
  Mail,
  Route,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const mainLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Réservations", icon: Package },
  { href: "/dashboard/quotes", label: "Devis", icon: ClipboardList },
  { href: "/dashboard/teams", label: "Équipes", icon: HardHat },
  { href: "/dashboard/vehicles", label: "Flotte", icon: Truck },
]

const toolsLinks = [
    { href: "/dashboard/quote", label: "Éditeur de devis", icon: FileText },
    { href: "/dashboard/inventory", label: "Inventaire IA", icon: Wand2 },
    { href: "/dashboard/communication", label: "Communication", icon: Mail },
    { href: "/dashboard/routing", label: "Optimisation", icon: Route },
]

const financeLinks = [
  { href: "/dashboard/expenses", label: "Dépenses", icon: Wallet },
]

const adminLinks = [
 { href: "/dashboard/diagnostic", label: "Diagnostic", icon: Activity },
]

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {mainLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>Outils</SidebarGroupLabel>
        <SidebarMenu>
          {toolsLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      
      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>Finances</SidebarGroupLabel>
        <SidebarMenu>
          {financeLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />
      
      <SidebarGroup>
         <SidebarMenu>
          {adminLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
