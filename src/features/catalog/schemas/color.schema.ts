import { z } from "zod";

export const ColorSchema = z.object({
  name: z.string().min(1, "Tên màu không được để trống"),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Mã hex không hợp lệ (VD: #FFFFFF)"),
});

export type TColorPayload = z.infer<typeof ColorSchema>;
