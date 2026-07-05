"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";

import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";

const fallbackSuperAdmins = ["mantalutamarinciro@gmail.com"];

function getAllowedSuperAdminEmails() {
  const configured = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAILS;
  const emails = configured
    ? configured.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)
    : fallbackSuperAdmins;

  return new Set(emails);
}

function isLegacyCabinetRoute(pathname: string) {
  return pathname === "/dashboard/cabinets/new" || pathname.startsWith("/dashboard/cabinets/new/");
}

function buildLoginUrl(pathname: string) {
  return `/login?next=${encodeURIComponent(pathname || "/dashboard")}`;
}

export function DashboardAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "/dashboard";
  const { user, isUserLoading } = useUser();

  const allowedEmails = useMemo(() => getAllowedSuperAdminEmails(), []);
  const userEmail = user?.email?.toLowerCase() || "";
  const isSuperAdmin = Boolean(userEmail && allowedEmails.has(userEmail));
  const shouldRedirectLegacyRoute = isLegacyCabinetRoute(pathname);

  useEffect(() => {
    if (shouldRedirectLegacyRoute) {
      router.replace("/dashboard");
      return;
    }

    if (!isUserLoading && !user) {
      router.replace(buildLoginUrl(pathname));
    }
  }, [isUserLoading, pathname, router, shouldRedirectLegacyRoute, user]);

  if (shouldRedirectLegacyRoute || isUserLoading || !user) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Acces super admin requis
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Ce backoffice est reserve aux comptes super administrateurs autorises.
        </p>
        <Button className="mt-6 rounded-full" onClick={() => router.replace("/")}>Retour au site</Button>
      </div>
    );
  }

  return <>{children}</>;
}