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

  try {
    const res = await flashSaleService.createFlashSale(validated.data);
    revalidatePath('/flash-sales');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "Lỗi hệ thống khi tạo flashsale" };
  }
}

export async function updateFlashSaleAction(id: string | number, data: TFlashSalePayload) {
  const validated = FlashSaleSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await flashSaleService.updateFlashSale(String(id), validated.data);
    revalidatePath('/flash-sales');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "Lỗi hệ thống khi cập nhật flashsale" };
  }
}


