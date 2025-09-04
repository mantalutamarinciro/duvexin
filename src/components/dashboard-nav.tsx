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
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const links = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Réservations", icon: Package },
  { href: "/dashboard/quotes", label: "Devis", icon: ClipboardList },
  { href: "/dashboard/teams", label: "Équipes", icon: Users },
  { href: "/dashboard/inventory", label: "Inventaire IA", icon: FileText },
  { href: "/dashboard/quote", label: "Éditeur de devis", icon: Truck },
  { href: "/dashboard/diagnostic", label: "Diagnostic", icon: Activity },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(link.href) && (link.href !== "/dashboard" || pathname === "/dashboard")}
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
  )
}
