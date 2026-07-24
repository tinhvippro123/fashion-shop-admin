import { Notification } from "@/features/marketing/types/notification.admin";
export const mockNotifications: Notification[] = [
  { id: 1, title: "Ðon hàng m?i", message: "Khách hàng Nguy?n Van A v?a d?t don #ORD-123 tr? giá 500,000d", type: "ORDER", isRead: false, time: "5 phút tru?c" },
  { id: 2, title: "Khách hàng m?i", message: "Tr?n Th? B v?a dang ký tài kho?n", type: "USER", isRead: false, time: "1 gi? tru?c" },
  { id: 3, title: "Ðon hàng hoàn t?t", message: "Ðon hàng #ORD-099 dã giao thành công", type: "ORDER", isRead: false, time: "2 gi? tru?c" },
  { id: 4, title: "C?nh báo h? th?ng", message: "S?n ph?m 'Áo so mi tr?ng' s?p h?t hàng (còn 2 s?n ph?m)", type: "SYSTEM", isRead: true, time: "1 ngày tru?c" },
  { id: 5, title: "Yêu c?u hoàn ti?n", message: "Khách hàng Lê Van C yêu c?u hoàn ti?n cho don #ORD-088", type: "ORDER", isRead: true, time: "2 ngày tru?c" },
  { id: 6, title: "Ðánh giá m?i", message: "S?n ph?m 'Qu?n Âu den' v?a nh?n du?c 1 dánh giá 5 sao", type: "USER", isRead: true, time: "3 ngày tru?c" },
];
