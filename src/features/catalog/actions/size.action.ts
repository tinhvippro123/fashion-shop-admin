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

  try {
    const res = await sizeService.createSize(validated.data);
    revalidatePath('/sizes');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o size" };
  }
}

export async function updateSizeAction(id: string | number, data: TSizePayload) {
  const validated = SizeSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await sizeService.updateSize(id as string, validated.data);
    revalidatePath('/sizes');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t size" };
  }
}


