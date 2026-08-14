import { FlashSale } from "../types/flash-sale.admin";

export type FlashSaleAction = 
  | 'VIEW' 
  | 'DUPLICATE' 
  | 'EDIT' 
  | 'DELETE' 
  | 'END_EARLY' 
  | 'RESTORE' 
  | 'PERMANENT_DELETE';

export function getFlashSaleActions(flashSale: FlashSale, isTrashView: boolean): FlashSaleAction[] {
  if (isTrashView) {
    const actions: FlashSaleAction[] = ['RESTORE'];
    if (!flashSale.usageCount || flashSale.usageCount === 0) {
      actions.push('PERMANENT_DELETE');
    }
    return actions;
  }

  const actions: FlashSaleAction[] = [];

  switch (flashSale.status) {
    case "Sắp diễn ra":
      actions.push('EDIT', 'DELETE');
      break;
    case "Đang diễn ra":
      actions.push('END_EARLY');
      break;
    case "Đã kết thúc":
      actions.push('DELETE'); // Move to trash
      break;
  }

  return actions;
}

export type BannerAction = 'EDIT' | 'DELETE';

import { Banner } from "../types/banner.admin";
import { Notification } from "../types/notification.admin";

export function getBannerActions(banner: Banner, isTrashView: boolean = false): BannerAction[] {
  return ['EDIT', 'DELETE'];
}

export type NotificationAction = 'EDIT' | 'DELETE' | 'MARK_READ';

export function getNotificationActions(notification: Notification, isTrashView: boolean = false): NotificationAction[] {
  return ['EDIT', 'DELETE'];
}
