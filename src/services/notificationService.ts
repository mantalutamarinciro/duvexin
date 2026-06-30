"use server"

import { db } from "@/lib/firebase";
import type { AppNotification, NotificationType } from "@/types/notification";

const COLLECTION_NAME = "notifications";

// Fetch all notifications (or limit)
export async function getNotifications(limitCount = 50): Promise<AppNotification[]> {
  try {
    if (!db) return [];
    
    const snapshot = await db.collection(COLLECTION_NAME)
        .orderBy('createdAt', 'desc')
        .limit(limitCount)
        .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AppNotification));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

// Mark a single notification as read
export async function markNotificationAsRead(id: string): Promise<void> {
  try {
    if (!db) return;
    
    await db.collection(COLLECTION_NAME).doc(id).update({
      isRead: true
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

// Mark all as read
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    if (!db) return;
    
    const snapshot = await db.collection(COLLECTION_NAME).where('isRead', '==', false).get();
    
    if (snapshot.empty) return;

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { isRead: true });
    });

    await batch.commit();
  } catch (error) {
    console.error("Error marking all as read:", error);
    throw error;
  }
}

// Internal tool to create a notification (e.g. from Cloud Functions or other services)
export async function createNotification(
  title: string, 
  description: string, 
  type: NotificationType = 'info', 
  link?: string
): Promise<string> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const newNotif = {
      title,
      description,
      type,
      isRead: false,
      link: link || null,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection(COLLECTION_NAME).add(newNotif);
    return docRef.id;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}
