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

  // Pass to service
  // await productService.createProduct(validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving product via service:", validated.data);
  revalidatePath('/products');
  return { success: true, data: validated.data };
}

export async function updateProductAction(id: string | number, data: TProductPayload) {
  const validated = ProductSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await productService.updateProduct(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating product ${id} via service:`, validated.data);
  revalidatePath('/products');
  return { success: true, data: validated.data };
}
