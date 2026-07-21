import { useState, useEffect } from 'react';
import { Notification } from '../types/notification.admin';
import { notificationService } from '../services/notification.service';
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
