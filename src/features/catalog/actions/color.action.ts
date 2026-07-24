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

  try {
    const res = await colorService.createColor(validated.data);
    revalidatePath('/colors');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o color" };
  }
}

export async function updateColorAction(id: string | number, data: TColorPayload) {
  const validated = ColorSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await colorService.updateColor(id as string, validated.data);
    revalidatePath('/colors');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t color" };
  }
}


