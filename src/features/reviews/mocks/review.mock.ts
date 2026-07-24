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
];
