"use client"

import { useEffect, useState } from "react"
import { Bell, Check, Info, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getNotifications, markNotificationAsRead } from "@/services/notificationService"
import type { AppNotification } from "@/types/notification"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function HeaderNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const loadData = async () => {
    const data = await getNotifications(5); // Load latest 5 for the dropdown
    setNotifications(data);
  }

  useEffect(() => {
    loadData();
    // In a real app we'd set up an onSnapshot listener here for real-time updates
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = async (notif: AppNotification) => {
    if (!notif.isRead) {
      await markNotificationAsRead(notif.id);
      loadData();
    }
    setIsOpen(false);
  }

  const getIcon = (type: string) => {
    switch (type) {
        case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
        case 'alert': return <AlertCircle className="h-4 w-4 text-red-500" />;
        case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
        default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent align="end" className="w-80 p-0 rounded-2xl shadow-xl border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white">Notifications</h4>
            {unreadCount > 0 && (
                <span className="bg-primary/10 text-primary text-xs font-black px-2 py-0.5 rounded-full">
                    {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                </span>
            )}
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
                <div className="flex flex-col">
                    {notifications.map(notif => (
                        <Link 
                            key={notif.id} 
                            href={notif.link || "/dashboard/notifications"}
                            onClick={() => handleNotificationClick(notif)}
                            className={cn(
                                "flex items-start gap-3 p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative",
                                !notif.isRead && "bg-slate-50/50 dark:bg-slate-800/30"
                            )}
                        >
                            {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full"></div>}
                            <div className="mt-0.5 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                                {getIcon(notif.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={cn("text-xs leading-tight mb-1", !notif.isRead ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-600 dark:text-slate-300")}>
                                    {notif.title}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-2">{notif.description}</p>
                                <p className="text-[9px] text-slate-400 mt-2 font-medium">
                                    il y a {formatDistanceToNow(new Date(notif.createdAt), { locale: fr })}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center text-slate-400">
                    <Bell className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm font-medium">Aucune notification</p>
                    <p className="text-xs mt-1">Vous êtes à jour !</p>
                </div>
            )}
        </div>
        
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-b-2xl">
            <Button variant="ghost" className="w-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800" asChild onClick={() => setIsOpen(false)}>
                <Link href="/dashboard/notifications">Voir toutes les notifications</Link>
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
