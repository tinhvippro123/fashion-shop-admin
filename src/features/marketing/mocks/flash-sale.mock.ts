import { FlashSale } from "../types/flash-sale.admin";
export const mockFlashSales: FlashSale[] = [
  { id: "FS-001", name: "Siêu Sale 4.4", startTime: "04-04-2024", endTime: "04-04-2024", productsCount: 10, status: "Đã kết thúc", revenue: "150,000,000 đ", usageCount: 2450 },
  { id: "FS-002", name: "Lương Về 25.5", startTime: "25-05-2024", endTime: "26-05-2024", productsCount: 15, status: "Đang diễn ra", revenue: "85,000,000 đ", usageCount: 840 },
  { id: "FS-003", name: "Flash Sale Cuối Tuần", startTime: "01-08-2024", endTime: "02-08-2024", productsCount: 5, status: "Sắp diễn ra", revenue: "", usageCount: 0 },
  { id: "FS-004", name: "Xả Hàng Hè", startTime: "15-08-2024", endTime: "16-08-2024", productsCount: 20, status: "Sắp diễn ra", revenue: "", usageCount: 0 },
  { id: "FS-005", name: "Sale Chớp Nhoáng Tối", startTime: "01-01-2024", endTime: "01-01-2024", productsCount: 2, status: "Đã kết thúc", revenue: "", usageCount: 0, deletedAt: "2024-06-01T10:00:00Z" },
  { id: "FS-006", name: "Sale Sinh Nhật (Bị lỗi)", startTime: "10-10-2024", endTime: "11-10-2024", productsCount: 50, status: "Đã kết thúc", revenue: "12,000,000 đ", usageCount: 15, deletedAt: "2024-07-15T08:30:00Z" }
];
