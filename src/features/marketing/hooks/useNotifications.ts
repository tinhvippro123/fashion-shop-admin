import { useState, useEffect } from 'react';
import { Notification } from "@/features/marketing/types/notification.admin";
import { notificationService } from "@/features/marketing/services/notification.service";
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } finally { setIsLoading(false); }
    }
    fetchNotifications();
  }, []);
  return { notifications, isLoading };
}
