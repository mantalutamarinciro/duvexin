
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
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeaderNotifications } from '@/components/header-notifications';
import { DashboardAuthGuard } from '@/components/dashboard-auth-guard';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-none shadow-[4px_0_24px_-12px_rgba(0,0,0,0.15)] z-20">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter className="mt-auto p-2">
           <Button asChild variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 mb-2">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Retour au site</span>
              </Link>
          </Button>
          <div className="text-center pb-2 text-[10px] text-slate-400 font-medium">
            DDV &copy; {new Date().getFullYear()} Tous droits réservés.
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <HeaderNotifications />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6"><DashboardAuthGuard>{children}</DashboardAuthGuard></main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    