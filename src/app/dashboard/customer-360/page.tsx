import Link from "next/link";
import type { ElementType } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Inbox,
  Mail,
  Phone,
  Receipt,
  Route,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCustomer360ByEmail, type Customer360TimelineItem } from "@/services/customer360Service";

export const dynamic = "force-dynamic";

type Customer360PageProps = {
  searchParams: Promise<{
    email?: string;
  }>;
};

const typeConfig: Record<
  Customer360TimelineItem["type"],
  { label: string; icon: ElementType; color: string }
> = {
  request: { label: "Demande", icon: Inbox, color: "bg-red-50 text-red-700 border-red-100" },
  visit: { label: "Visite", icon: CalendarDays, color: "bg-blue-50 text-blue-700 border-blue-100" },
  quote: { label: "Devis", icon: ClipboardList, color: "bg-amber-50 text-amber-700 border-amber-100" },
  booking: { label: "Operation", icon: Route, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  invoice: { label: "Facture", icon: Receipt, color: "bg-slate-50 text-slate-700 border-slate-100" },
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatMoney(value?: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function priorityClass(priority: "low" | "medium" | "high") {
  if (priority === "high") return "bg-red-50 text-red-700 border-red-100";
  if (priority === "medium") return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-emerald-50 text-emerald-700 border-emerald-100";
}

function normalizeStatus(value?: string) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function statusIncludes(status: string | undefined, keywords: string[]) {
  const normalized = normalizeStatus(status);
  return keywords.some((keyword) => normalized.includes(keyword));
}

function EmptyState() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UserRound className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Dossier 360
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Selectionnez un client, une demande ou un devis pour ouvrir une vue complete du dossier :
        historique, workflow commercial, documents, operations et facturation.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full">
          <Link href="/dashboard/customers">Voir les clients</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/dashboard/requests">Voir les leads</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function Customer360Page({ searchParams }: Customer360PageProps) {
  const params = await searchParams;
  const email = params.email?.trim();

  if (!email) {
    return <EmptyState />;
  }

  const dossier = await getCustomer360ByEmail(email);

  if (!dossier) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-black tracking-tight">Dossier introuvable</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Aucun dossier n'a ete trouve pour l'adresse {email}.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/dashboard/customers">Retour aux clients</Link>
        </Button>
      </div>
    );
  }

  const { identity, stage, timeline, requests, visits, quotes, bookings, invoices } = dossier;
  const openQuotes = quotes.filter((quote) =>
    statusIncludes(quote.status, ["chiffre", "envoye", "attente", "priced", "sent", "pending"])
  ).length;
  const remainingToCollect = invoices.reduce(
    (sum, invoice) => sum + Math.max(invoice.amountTTC - invoice.amountPaid, 0),
    0
  );

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-3 rounded-full text-slate-500">
            <Link href="/dashboard/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Clients
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {identity.name}
            </h1>
            <Badge className={`rounded-full border px-3 py-1 ${priorityClass(stage.priority)}`}>
              {stage.label}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {identity.email}
            </span>
            {identity.phone && (
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {identity.phone}
              </span>
            )}
            {identity.lastActivityAt && (
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Derniere activite : {formatDate(identity.lastActivityAt)}
              </span>
            )}
          </div>
        </div>
        <Button asChild className="rounded-full bg-primary px-6 font-bold">
          <Link href={stage.nextActionHref}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {stage.nextActionLabel}
          </Link>
        </Button>
      </div>

      <Card className="rounded-[2rem] border-none bg-gradient-to-br from-slate-950 to-slate-800 text-white shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary">Workflow commercial</p>
            <h2 className="mt-2 text-2xl font-black">{stage.label}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{stage.description}</p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="font-semibold">Prochaine action :</span>
              <Link href={stage.nextActionHref} className="font-black text-white underline-offset-4 hover:underline">
                {stage.nextActionLabel}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Devis ouverts</p>
              <p className="mt-1 text-2xl font-black">{openQuotes}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">A encaisser</p>
              <p className="mt-1 text-2xl font-black">{formatMoney(remainingToCollect)}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Demenagements</p>
              <p className="mt-1 text-2xl font-black">{identity.bookingsCount}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">CA client</p>
              <p className="mt-1 text-2xl font-black">{formatMoney(identity.totalSpent)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Timeline du dossier</CardTitle>
            <CardDescription>
              Toutes les interactions commerciales et operationnelles connues pour ce client.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                Aucune activite rattachee a ce dossier.
              </div>
            ) : (
              <div className="space-y-4">
                {timeline.map((item) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;
                  return (
                    <div key={`${item.type}-${item.id}`} className="flex gap-4">
                      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${config.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                            {item.status && (
                              <Badge variant="outline" className="rounded-full text-[10px] font-black uppercase">
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs font-medium text-slate-400">{formatDate(item.date)}</p>
                        </div>
                        {item.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          {item.amount ? (
                            <p className="text-sm font-black text-slate-900 dark:text-white">
                              {formatMoney(item.amount)}
                            </p>
                          ) : (
                            <span />
                          )}
                          {item.href && (
                            <Link href={item.href} className="text-xs font-black text-primary hover:underline">
                              Ouvrir
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Synthese commerciale</CardTitle>
              <CardDescription>Vue courte pour savoir quoi faire sans chercher.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <SummaryRow icon={Inbox} label="Demandes" value={requests.length} href="/dashboard/requests" />
              <SummaryRow icon={CalendarDays} label="Visites" value={visits.length} href="/dashboard/visits" />
              <SummaryRow icon={ClipboardList} label="Devis" value={quotes.length} href="/dashboard/quotes" />
              <SummaryRow icon={Route} label="Operations" value={bookings.length} href="/dashboard/planning" />
              <SummaryRow icon={Receipt} label="Factures" value={invoices.length} href="/dashboard/invoices" />
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Derniers devis</CardTitle>
              <CardDescription>Acces rapide aux propositions commerciales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quotes.slice(0, 4).map((quote) => (
                <Link
                  href={`/dashboard/quote/${quote.id}`}
                  key={quote.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{formatMoney(quote.quote)}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(quote.createdAt)}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] font-black uppercase">
                    {quote.status}
                  </Badge>
                </Link>
              ))}
              {quotes.length === 0 && (
                <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                  Aucun devis rattache.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ElementType;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white">{label}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-black">{value}</span>
          <Link href={href} className="text-xs font-black text-primary hover:underline">
            Voir
          </Link>
        </div>
      </div>
      <Separator className="mt-5" />
    </div>
  );
}
