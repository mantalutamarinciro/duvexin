"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  HardHat,
  Wallet,
  Mail,
  Route,
  Warehouse,
  Calendar,
  Contact,
  Calculator,
  UserRound,
  Inbox,
  Receipt,
  Settings,
  BriefcaseBusiness,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const commercialLinks = [
  { href: "/dashboard/requests", label: "Leads & Demandes", icon: Inbox },
  { href: "/dashboard/customers", label: "Clients", icon: UserRound },
  { href: "/dashboard/visits", label: "Visites Techniques", icon: Contact },
  { href: "/dashboard/quotes", label: "Devis", icon: ClipboardList },
  { href: "/dashboard/invoices", label: "Facturation", icon: Receipt },
]

const operationnelLinks = [
  { href: "/dashboard/planning", label: "Planification", icon: Calendar },
  { href: "/dashboard/teams", label: "Équipes", icon: HardHat },
  { href: "/dashboard/vehicles", label: "Flotte", icon: Truck },
  { href: "/dashboard/storage", label: "Garde-Meuble", icon: Warehouse },
]

const outilsLinks = [
  { href: "/dashboard/calculator", label: "Calculateur Volume", icon: Calculator },
  { href: "/dashboard/communication", label: "Communication", icon: Mail },
  { href: "/dashboard/expenses", label: "Dépenses & Frais", icon: Wallet },
]

// Admin links removed for client demo

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  }

  const renderNavGroup = (label: string, links: any[], icon?: any) => (
      <SidebarGroup className="mb-2">
        <SidebarGroupLabel className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-2">
            {icon && icon} {label}
        </SidebarGroupLabel>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={link.label}
                className="rounded-xl transition-all font-medium"
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
  )

  return (
    <div className="py-2">
      <SidebarMenu className="mb-4">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/dashboard")}
            tooltip="Tableau de bord"
            className="rounded-xl transition-all font-medium"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span>Tableau de bord</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {renderNavGroup("Commercial", commercialLinks, <BriefcaseBusiness className="h-3 w-3" />)}
      {renderNavGroup("Opérationnel", operationnelLinks, <Truck className="h-3 w-3" />)}
      {renderNavGroup("Outils & Finances", outilsLinks, <Wallet className="h-3 w-3" />)}
    </div>
  )
}
