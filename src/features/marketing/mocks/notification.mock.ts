import { Notification } from "../types/notification.admin";
export const mockNotifications: Notification[] = [
  { id: 1, title: "Đơn hàng mới", message: "Khách hàng Nguyễn Văn A vừa đặt đơn #ORD-123", type: "ORDER", isRead: false, time: "5 phút trước" },
  { id: 2, title: "Khách hàng mới", message: "Trần Thị B vừa đăng ký tài khoản", type: "USER", isRead: false, time: "1 giờ trước" },
  { id: 3, title: "Đơn hàng hoàn tất", message: "Đơn hàng #ORD-099 đã giao thành công", type: "ORDER", isRead: false, time: "2 giờ trước" },
  { id: 4, title: "Cảnh báo hệ thống", message: "Sản phẩm Áo thun trắng sắp hết hàng", type: "SYSTEM", isRead: true, time: "1 ngày trước" },
];
