import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống").max(255, "Tiêu đề quá dài"),
  slug: z.string().optional(),
  content: z.string().min(1, "Nội dung bài viết không được để trống"),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  category: z.string().min(1, "Vui lòng chọn chuyên mục"),
  tags: z.string().optional(),
  allowComment: z.boolean(),
  isPinned: z.boolean(),
  status: z.enum(["draft", "published"])
});

export type TBlogPayload = z.infer<typeof BlogSchema>;
