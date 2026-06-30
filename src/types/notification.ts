export type NotificationType = 'info' | 'warning' | 'success' | 'alert';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  type: NotificationType;
  link?: string;
  createdAt: string;
}
