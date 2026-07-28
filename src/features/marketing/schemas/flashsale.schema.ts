import { z } from "zod";

export const FlashSaleItemSchema = z.object({
  variantId: z.string().or(z.number()),
  name: z.string(), // Phục vụ hiển thị UI
  variant: z.string(), // Phục vụ hiển thị UI
  originalPrice: z.number(), // Phục vụ hiển thị UI
  stock: z.number(), // Phục vụ hiển thị UI
  flashSalePrice: z.number().min(1, "Giá Flash Sale phải lớn hơn 0"),
  quantityLimit: z.number().min(1, "Số lượng giới hạn phải lớn hơn 0"),
});

export const FlashSaleSchema = z.object({
  name: z.string().min(1, "Tên chương trình không được để trống").max(255),
  description: z.string().optional(),
  startTime: z.string().min(1, "Vui lòng chọn thời gian bắt đầu"),
  endTime: z.string().min(1, "Vui lòng chọn thời gian kết thúc"),
  status: z.enum(["draft", "active", "scheduled", "ended"]),
  items: z.array(FlashSaleItemSchema).min(1, "Phải chọn ít nhất 1 sản phẩm tham gia Flash Sale"),
}).refine(data => {
  if (data.startTime && data.endTime) {
    return new Date(data.startTime) < new Date(data.endTime);
  }
  return true;
}, {
  message: "Thời gian kết thúc phải sau thời gian bắt đầu",
  path: ["endTime"]
});

export type TFlashSalePayload = z.infer<typeof FlashSaleSchema>;
export type TFlashSaleItem = z.infer<typeof FlashSaleItemSchema>;
