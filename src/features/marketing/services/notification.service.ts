import { Notification } from "@/features/marketing/types/notification.admin";
import { mockNotifications } from "@/features/marketing/mocks/notification.mock";
export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockNotifications), 200));
  }
};
