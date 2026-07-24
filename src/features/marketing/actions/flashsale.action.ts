"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { FlashSaleSchema, TFlashSalePayload } from "../schemas/flashsale.schema";
import { flashSaleService } from "../services/flash-sale.service";

export async function createFlashSaleAction(data: TFlashSalePayload) {
  const validated = FlashSaleSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await flashSaleService.createFlashSale(validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving flash sale via service:", validated.data);
  revalidatePath('/flash-sales');
  return { success: true, data: validated.data };
}

export async function updateFlashSaleAction(id: string | number, data: TFlashSalePayload) {
  const validated = FlashSaleSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await flashSaleService.updateFlashSale(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating flash sale ${id} via service:`, validated.data);
  revalidatePath('/flash-sales');
  return { success: true, data: validated.data };
}
