"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ColorSchema, TColorPayload } from "../schemas/color.schema";
import { colorService } from "../services/color.service";

export async function createColorAction(data: TColorPayload) {
  const validated = ColorSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await colorService.createColor(validated.data);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Saving color via service:", validated.data);
  revalidatePath('/colors');
  return { success: true, data: validated.data };
}

export async function updateColorAction(id: string | number, data: TColorPayload) {
  const validated = ColorSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await colorService.updateColor(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updating color ${id} via service:`, validated.data);
  revalidatePath('/colors');
  return { success: true, data: validated.data };
}
