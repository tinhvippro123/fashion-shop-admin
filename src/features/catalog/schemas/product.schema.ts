import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống").max(255),
  description: z.string().optional(),
  price: z.number().min(0, "Giá không được âm"),
  sku: z.string().optional(),
  stock: z.number().min(0, "Số lượng không hợp lệ"),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  brand: z.string().optional(),
  status: z.enum(["draft", "published"])
});

export type TProductPayload = z.infer<typeof ProductSchema>;
