"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SizeSchema, TSizePayload } from "../schemas/size.schema";
import { sizeService } from "../services/size.service";

export async function createSizeAction(data: TSizePayload) {
  const validated = SizeSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await sizeService.createSize(validated.data);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Saving size via service:", validated.data);
  revalidatePath('/sizes');
  return { success: true, data: validated.data };
}

export async function updateSizeAction(id: string | number, data: TSizePayload) {
  const validated = SizeSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await sizeService.updateSize(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updating size ${id} via service:`, validated.data);
  revalidatePath('/sizes');
  return { success: true, data: validated.data };
}
