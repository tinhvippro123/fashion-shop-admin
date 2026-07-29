import { Review } from "../types/review.admin";
export const mockReviews: Review[] = [
  { 
    id: "R-001", 
    user: { name: "Trần B", avatar: "", initial: "TB" }, 
    product: { id: "P-001", name: "Áo thun T-Shirt" }, 
    rating: 5, 
    comment: "Sản phẩm rất tốt", 
    date: "2024-03-20", 
    status: "Hiển thị" 
  },
  { 
    id: "R-002", 
    user: { name: "Lê Văn C", avatar: "", initial: "LC" }, 
    product: { id: "P-002", name: "Quần Jeans" }, 
    rating: 2, 
    comment: "Giao hàng hơi chậm, vải bình thường", 
    date: "2024-03-22", 
    status: "Ẩn",
    deletedAt: "2026-07-29T10:00:00Z"
  },
  { 
    id: "R-003", 
    user: { name: "Spam Bot", avatar: "", initial: "SB" }, 
    product: { id: "P-003", name: "Áo Khoác" }, 
    rating: 1, 
    comment: "Link lừa đảo bla bla", 
    date: "2024-03-25", 
    status: "Ẩn",
    deletedAt: "2026-07-28T09:00:00Z"
  },
];
