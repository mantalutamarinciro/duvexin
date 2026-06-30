"use client"

import { useEffect, useState } from "react"
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/services/notificationService"
import type { AppNotification } from "@/types/notification"
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const loadData = async () => {
    setLoading(true);
    const data = await getNotifications(100);
    setNotifications(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    toast({
        title: "Notifications lues",
        description: "Toutes vos notifications ont été marquées comme lues."
    });
    loadData();
  }

  const handleNotificationClick = async (notif: AppNotification) => {
    if (!notif.isRead) {
      await markNotificationAsRead(notif.id);
      loadData();
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
        case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
        case 'alert': return <AlertCircle className="h-5 w-5 text-red-500" />;
        case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
        default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  }

  // Grouper les notifications
  const today: AppNotification[] = [];
  const yesterday: AppNotification[] = [];
  const older: AppNotification[] = [];

  notifications.forEach(n => {
      const date = new Date(n.createdAt);
      if (isToday(date)) today.push(n);
      else if (isYesterday(date)) yesterday.push(n);
      else older.push(n);
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderGroup = (title: string, items: AppNotification[]) => {
      if (items.length === 0) return null;

      return (
          <div className="mb-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  {title} <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full text-[10px]">{items.length}</span>
              </h3>
              <Card className="rounded-[2rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white dark:bg-slate-900 overflow-hidden">
                  <CardContent className="p-0">
                      {items.map((notif, i) => {
                          const isLast = i === items.length - 1;
                          const ContentWrapper = notif.link ? Link : 'div';
                          const wrapperProps = notif.link ? { href: notif.link, onClick: () => handleNotificationClick(notif) } : { onClick: () => handleNotificationClick(notif) };

                          return (
                              <ContentWrapper 
                                  key={notif.id}
                                  {...wrapperProps as any}
                                  className={cn(
                                      "flex items-start gap-4 p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative cursor-pointer",
                                      !notif.isRead && "bg-slate-50/50 dark:bg-slate-800/30",
                                      !isLast && "border-b border-slate-100 dark:border-slate-800"
                                  )}
                              >
                                  {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                                  <div className="mt-1 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
                                      {getIcon(notif.type)}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                                        <p className={cn("text-sm leading-tight", !notif.isRead ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-700 dark:text-slate-300")}>
                                            {notif.title}
                                        </p>
                                        <p className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                                            {formatDistanceToNow(new Date(notif.createdAt), { locale: fr, addSuffix: true })}
                                        </p>
                                      </div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">{notif.description}</p>
                                      
                                      {notif.link && (
                                          <div className="mt-3">
                                              <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full">Consulter le dossier</span>
                                          </div>
                                      )}
                                  </div>
                              </ContentWrapper>
                          )
                      })}
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" /> Notifications
          </h1>
          <p className="text-slate-500 mt-1">
            Gérez toutes vos alertes et notifications système.
          </p>
        </div>
        
        {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline" className="rounded-full shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                <Check className="mr-2 h-4 w-4 text-emerald-500" /> Tout marquer comme lu
            </Button>
        )}
      </div>

      {loading ? (
          <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-[2rem]" />
              <Skeleton className="h-24 w-full rounded-[2rem]" />
              <Skeleton className="h-24 w-full rounded-[2rem]" />
          </div>
      ) : notifications.length > 0 ? (
          <div>
              {renderGroup("Aujourd'hui", today)}
              {renderGroup("Hier", yesterday)}
              {renderGroup("Plus ancien", older)}
          </div>
      ) : (
          <div className="py-20 text-center flex flex-col items-center bg-white dark:bg-slate-900 rounded-[2rem] border-none shadow-sm">
            <Bell className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Aucune notification</h3>
            <p className="text-slate-500 mt-1">Vous n'avez aucune nouvelle alerte.</p>
          </div>
      )}

    </div>
  )
}
