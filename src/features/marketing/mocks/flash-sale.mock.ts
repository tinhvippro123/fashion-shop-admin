import { FlashSale } from "@/features/marketing/types/flash-sale.admin";
export const mockFlashSales: FlashSale[] = [
  { id: "FS-1001", name: "Flash Sale Đón Thu", startTime: "20:00 - 20/11/2026", endTime: "23:59 - 20/11/2026", productsCount: 15, status: "Đang diễn ra", revenue: "45,000,000 đ" },
  { id: "FS-1002", name: "Siêu Sale Nửa Đêm", startTime: "00:00 - 25/11/2026", endTime: "02:00 - 25/11/2026", productsCount: 30, status: "Sắp diễn ra", revenue: "-" },
  { id: "FS-1003", name: "Xả Kho Cuối Tuần", startTime: "12:00 - 15/10/2026", endTime: "14:00 - 15/10/2026", productsCount: 50, status: "Đã kết thúc", revenue: "120,500,000 đ" }
];
