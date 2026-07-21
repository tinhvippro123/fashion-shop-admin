import { Notification } from '../types/notification.admin';
export const mockNotifications: Notification[] = [
  { id: 1, title: "Đơn hàng mới", message: "Khách hàng Nguyễn Văn A vừa đặt đơn #ORD-123 trị giá 500,000đ", type: "ORDER", isRead: false, time: "5 phút trước" },
  { id: 2, title: "Khách hàng mới", message: "Trần Thị B vừa đăng ký tài khoản", type: "USER", isRead: false, time: "1 giờ trước" },
  { id: 3, title: "Đơn hàng hoàn tất", message: "Đơn hàng #ORD-099 đã giao thành công", type: "ORDER", isRead: false, time: "2 giờ trước" },
  { id: 4, title: "Cảnh báo hệ thống", message: "Sản phẩm 'Áo sơ mi trắng' sắp hết hàng (còn 2 sản phẩm)", type: "SYSTEM", isRead: true, time: "1 ngày trước" },
  { id: 5, title: "Yêu cầu hoàn tiền", message: "Khách hàng Lê Văn C yêu cầu hoàn tiền cho đơn #ORD-088", type: "ORDER", isRead: true, time: "2 ngày trước" },
  { id: 6, title: "Đánh giá mới", message: "Sản phẩm 'Quần Âu đen' vừa nhận được 1 đánh giá 5 sao", type: "USER", isRead: true, time: "3 ngày trước" },
];
