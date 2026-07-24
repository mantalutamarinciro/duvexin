import type { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeaderNotifications } from '@/components/header-notifications';
import { DashboardAuthGuard } from '@/components/dashboard-auth-guard';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[4px_0_24px_-12px_rgba(0,0,0,0.06)] z-20"
      >
        <SidebarHeader className="p-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center justify-between">
            <Logo />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-1 scrollbar-none">
          <DashboardNav />
        </SidebarContent>

        <SidebarFooter className="mt-auto p-3 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
          {/* Quick return button */}
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-3.5 w-3.5 text-primary" />
              <span>Retour au site</span>
            </Link>
          </Button>

          {/* Elegant status card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Vexin CRM v2.0</span>
              <span className="ml-auto text-[9px] font-black uppercase text-[#00ad9f] bg-[#00ad9f]/10 border border-[#00ad9f]/20 px-1.5 py-0.5 rounded-md">Pro</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">Système opérationnel & IA active</p>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-slate-200/80 dark:border-slate-800/80 bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <HeaderNotifications />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <DashboardAuthGuard>{children}</DashboardAuthGuard>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}