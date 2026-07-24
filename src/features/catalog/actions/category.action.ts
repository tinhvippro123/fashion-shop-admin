"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { CategorySchema, TCategoryPayload } from "../schemas/category.schema";
import { categoryService } from "../services/category.service";

export async function createCategoryAction(data: TCategoryPayload) {
  const validated = CategorySchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await categoryService.createCategory(validated.data);
    revalidatePath('/categories');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o category" };
  }
}

export async function updateCategoryAction(id: string | number, data: TCategoryPayload) {
  const validated = CategorySchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await categoryService.updateCategory(id as string, validated.data);
    revalidatePath('/categories');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t category" };
  }
}


