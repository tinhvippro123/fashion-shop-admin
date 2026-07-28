"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ProductSchema, TProductPayload } from "../schemas/product.schema";
import { productService } from "../services/product.service";

export async function createProductAction(data: TProductPayload) {
  const validated = ProductSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await productService.createProduct(validated.data);
    revalidatePath('/products');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o product" };
  }
}

export async function updateProductAction(id: string | number, data: TProductPayload) {
  const validated = ProductSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await productService.updateProduct(id as string, validated.data);
    revalidatePath('/products');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "Lỗi hệ thống khi cập nhật product" };
  }
}

export async function getOptionSuggestionsAction() {
  try {
    const suggestions = await productService.getOptionSuggestions();
    return { success: true, data: suggestions };
  } catch (error) {
    return { success: false, error: "Lỗi khi lấy gợi ý thuộc tính" };
  }
}


