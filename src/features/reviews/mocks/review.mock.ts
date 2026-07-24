import { Review } from "@/features/reviews/types/review.admin";
export const mockReviews: Review[] = [
  { id: "REV-001", user: { name: "Nguy?n Van A", avatar: "/avatars/1.jpg", initial: "N" }, product: { id: "PROD-001", name: "Áo Thun Nam C? Tròn" }, rating: 5, comment: "Ch?t v?i mát, m?c r?t thích. S? ?ng h? shop thêm!", date: "15/07/2026", status: "Hi?n th?" },
  { id: "REV-002", user: { name: "Tr?n Th? B", avatar: "/avatars/2.jpg", initial: "T" }, product: { id: "PROD-005", name: "Qu?n Jean N? ?ng R?ng" }, rating: 4, comment: "Form qu?n d?p nhung màu hoi nh?t hon so v?i hình m?t xíu.", date: "12/07/2026", status: "Hi?n th?" },
  { id: "REV-003", user: { name: "Lê Hoàng C", avatar: "", initial: "L" }, product: { id: "PROD-012", name: "Áo Khoác Bomber Nam" }, rating: 1, comment: "Giao hàng quá ch?m, shop h? tr? kém.", date: "10/07/2026", status: "B? ?n" }
];
