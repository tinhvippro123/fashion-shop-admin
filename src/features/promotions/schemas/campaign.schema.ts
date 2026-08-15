import { z } from "zod";

export const CampaignProductSchema = z.object({
  productId: z.string().or(z.number()),
  productName: z.string(),
  originalPrice: z.number(),
  discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
  discountValue: z.number().min(0),
  salePrice: z.number().min(0),
});

export const CampaignSchema = z.object({
  name: z.string().min(1, "Tên chương trình không được để trống").max(150),
  scope: z.enum(["STORE_WIDE", "CATEGORY", "SPECIFIC_PRODUCTS"]),
  categoryIds: z.array(z.string().or(z.number())).optional(),
  globalDiscountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]).optional(),
  globalDiscountValue: z.number().min(0).optional(),
  products: z.array(CampaignProductSchema).optional(),
  startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
  status: z.enum(["draft", "active", "scheduled", "ended", "canceled"]),
}).refine((data) => {
  if (data.scope === 'STORE_WIDE' || data.scope === 'CATEGORY') {
    if (data.globalDiscountValue === undefined || data.globalDiscountValue <= 0) {
      return false; // Must provide global discount for store wide / category
    }
  }
  return true;
}, {
  message: "Vui lòng nhập mức giảm giá hợp lệ",
  path: ["globalDiscountValue"]
});

export type TCampaignPayload = z.infer<typeof CampaignSchema>;
export type TCampaignProduct = z.infer<typeof CampaignProductSchema>;
