import { z } from "zod";

export const CampaignSchema = z.object({
  name: z.string().min(1, "Tên chương trình không được để trống").max(150),
  code: z.string().min(3, "Mã khuyến mãi phải có ít nhất 3 ký tự").max(50).regex(/^[A-Z0-9_]+$/, "Mã khuyến mãi chỉ chứa chữ in hoa, số và dấu gạch dưới"),
  scope: z.enum(["PLATFORM", "SHOP", "FREESHIP"]),
  rewardType: z.enum(["DISCOUNT_MONEY", "FREE_SHIPPING", "FREE_GIFT"]),
  discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
  discountValue: z.number().min(0, "Mức giảm không hợp lệ"),
  maxDiscountAmount: z.number().min(0, "Mức giảm tối đa không hợp lệ").optional(),
  minOrderValue: z.number().min(0, "Đơn tối thiểu không hợp lệ"),
  isCollectible: z.boolean().default(true),
  startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
  status: z.enum(["draft", "active", "scheduled", "ended"]),
  usageLimit: z.number().min(0).optional(),
}).refine((data) => {
  // Bắt buộc nhập maxDiscountAmount nếu giảm theo phần trăm
  if (data.discountType === "PERCENTAGE" && !data.maxDiscountAmount) {
    return false;
  }
  return true;
}, {
  message: "Vui lòng nhập mức giảm tối đa",
  path: ["maxDiscountAmount"]
});

export type TCampaignPayload = z.infer<typeof CampaignSchema>;
