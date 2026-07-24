"use server";

import { z } from "zod";
import { ProductSchema, TProductPayload } from "../schemas/product.schema";

export async function createProductAction(data: TProductPayload) {
  const validated = ProductSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving product:", validated.data);
  return { success: true, data: validated.data };
}

export async function updateProductAction(id: string | number, data: TProductPayload) {
  const validated = ProductSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating product ${id}:`, validated.data);
  return { success: true, data: validated.data };
}
