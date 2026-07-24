import { z } from "zod";

export const PageSchema = z.object({
  title: z.string().min(1, "Tiêu đề trang không được để trống").max(255, "Tiêu đề quá dài"),
  slug: z.string().optional(),
  content: z.string().min(1, "Nội dung không được để trống"),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  isActive: z.boolean(),
  status: z.enum(["draft", "published"])
});

export type TPagePayload = z.infer<typeof PageSchema>;
