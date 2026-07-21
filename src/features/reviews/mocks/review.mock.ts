import { Review } from '../types/review.admin';
export const mockReviews: Review[] = [
  { id: "REV-001", user: { name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", initial: "N" }, product: { id: "PROD-001", name: "Áo Thun Nam Cổ Tròn" }, rating: 5, comment: "Chất vải mát, mặc rất thích. Sẽ ủng hộ shop thêm!", date: "15/07/2026", status: "Hiển thị" },
  { id: "REV-002", user: { name: "Trần Thị B", avatar: "/avatars/2.jpg", initial: "T" }, product: { id: "PROD-005", name: "Quần Jean Nữ Ống Rộng" }, rating: 4, comment: "Form quần đẹp nhưng màu hơi nhạt hơn so với hình một xíu.", date: "12/07/2026", status: "Hiển thị" },
  { id: "REV-003", user: { name: "Lê Hoàng C", avatar: "", initial: "L" }, product: { id: "PROD-012", name: "Áo Khoác Bomber Nam" }, rating: 1, comment: "Giao hàng quá chậm, shop hỗ trợ kém.", date: "10/07/2026", status: "Bị ẩn" }
];
