import { z } from "zod";

export const FlashSaleSchema = z.object({
  name: z.string().min(1, "Tên chương trình không được để trống").max(255),
  description: z.string().optional(),
  startTime: z.string().min(1, "Vui lòng chọn thời gian bắt đầu"),
  endTime: z.string().min(1, "Vui lòng chọn thời gian kết thúc"),
  status: z.enum(["draft", "active", "scheduled", "ended"]),
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
