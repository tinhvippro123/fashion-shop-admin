import { z } from "zod";

export const CampaignSchema = z.object({
  name: z.string().min(1, "Tên chiến dịch không được để trống").max(255),
  description: z.string().optional(),
  type: z.enum(["discount", "freeship", "bundle"]),
  discountValue: z.number().min(0, "Giá trị không hợp lệ"),
  discountType: z.enum(["percent", "amount"]),
  startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
  status: z.enum(["draft", "active", "scheduled", "ended"]),
  usageLimit: z.number().min(0).optional(),
});

export type TCampaignPayload = z.infer<typeof CampaignSchema>;
