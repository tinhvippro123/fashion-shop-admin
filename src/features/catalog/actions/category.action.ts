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

  // Pass to service
  // await categoryService.createCategory(validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving category via service:", validated.data);
  revalidatePath('/categories');
  return { success: true, data: validated.data };
}

export async function updateCategoryAction(id: string | number, data: TCategoryPayload) {
  const validated = CategorySchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await categoryService.updateCategory(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating category ${id} via service:`, validated.data);
  revalidatePath('/categories');
  return { success: true, data: validated.data };
}
