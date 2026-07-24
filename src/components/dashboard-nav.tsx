"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  BarChart3,
  Package,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: "teal" | "indigo" | "amber" | "emerald";
}

interface NavSection {
  title: string;
  icon: any;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Ventes & Clients",
    icon: Inbox,
    items: [
      { href: "/dashboard/requests", label: "Leads & Demandes", icon: Inbox },
      { href: "/dashboard/customers", label: "Clients", icon: UserRound },
      { href: "/dashboard/visits", label: "Visites Techniques", icon: Contact },
      { href: "/dashboard/quotes", label: "Devis", icon: ClipboardList },
      { href: "/dashboard/invoices", label: "Facturation", icon: Receipt },
    ],
  },
  {
    title: "Finances & Bilan",
    icon: BarChart3,
    items: [
      { href: "/dashboard/finances", label: "Tableau Financier", icon: TrendingUp, badge: "KPI", badgeColor: "teal" },
      { href: "/dashboard/expenses", label: "Dépenses & Frais", icon: Wallet },
    ],
  },
  {
    title: "Opérations & Logistique",
    icon: Truck,
    items: [
      { href: "/dashboard/planning", label: "Planification", icon: Calendar },
      { href: "/dashboard/teams", label: "Équipes", icon: HardHat },
      { href: "/dashboard/vehicles", label: "Flotte Véhicules", icon: Truck },
      { href: "/dashboard/storage", label: "Garde-Meuble", icon: Warehouse },
      { href: "/dashboard/routing", label: "Optimiseur de Route", icon: Route, badge: "IA", badgeColor: "indigo" },
    ],
  },
  {
    title: "Intelligence & Outils",
    icon: Sparkles,
    items: [
      { href: "/dashboard/communication", label: "Communication Client", icon: Mail, badge: "IA", badgeColor: "indigo" },
      { href: "/dashboard/automations", label: "Automatisations", icon: Sparkles, badge: "IA", badgeColor: "amber" },
      { href: "/dashboard/calculator", label: "Calculateur Volume", icon: Calculator },
    ],
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case "teal":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
      case "indigo":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="py-3 px-2 space-y-5">
      {/* Overview Button */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/dashboard")}
            tooltip="Tableau de bord"
            className={cn(
              "rounded-2xl transition-all duration-200 h-11 px-3 font-semibold",
              isActive("/dashboard")
                ? "bg-[#00ad9f] text-white shadow-[0_4px_16px_rgba(0,173,159,0.3)] hover:bg-[#009b8e] hover:text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1"
            )}
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  isActive("/dashboard") ? "bg-white/20 text-white" : "bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="text-sm">Tour de contrôle</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Grouped Sections */}
      {navSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <SidebarGroup key={section.title} className="p-0">
            <SidebarGroupLabel className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <SectionIcon className="h-3 w-3 text-slate-400" />
                {section.title}
              </span>
            </SidebarGroupLabel>

            <SidebarMenu className="space-y-0.5">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className={cn(
                        "rounded-xl transition-all duration-200 h-10 px-3 font-medium text-xs group relative",
                        active
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 hover:translate-x-1"
                      )}
                    >
                      <Link href={item.href} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ItemIcon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              active
                                ? "text-[#00ad9f] dark:text-[#00ad9f]"
                                : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                            )}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={cn(
                              "px-1.5 py-0.5 text-[9px] font-black rounded-md border uppercase tracking-wider shrink-0 transition-all",
                              getBadgeStyle(item.badgeColor)
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </div>
  );
}
