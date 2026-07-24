"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SizeSchema, TSizePayload } from "../schemas/size.schema";

export async function createSizeAction(data: TSizePayload) {
  const validated = SizeSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Saving size:", validated.data);
  revalidatePath('/sizes');
  return { success: true, data: validated.data };
}

export async function updateSizeAction(id: string | number, data: TSizePayload) {
  const validated = SizeSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updating size ${id}:`, validated.data);
  revalidatePath('/sizes');
  return { success: true, data: validated.data };
}
