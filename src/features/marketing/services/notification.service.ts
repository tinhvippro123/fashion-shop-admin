import { Notification } from '../types/notification.admin';
import { mockNotifications } from '../mocks/notification.mock';
export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockNotifications), 200));
  }
};
