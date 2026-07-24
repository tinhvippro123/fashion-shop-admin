"use server";

import { revalidatePath } from "next/cache";
import { PageSchema, TPagePayload } from "../schemas/page.schema";
import { pageService } from "../services/page.service";

export async function createPageAction(data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await pageService.createPage(validated.data);
    revalidatePath('/pages');
    return { success: true, data: res };
  } catch {
    return { success: false, error: "L?i h? th?ng khi t?o page" };
  }
}

export async function updatePageAction(id: string | number, data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await pageService.updatePage(Number(id), validated.data);
    revalidatePath('/pages');
    return { success: true, data: res };
  } catch {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t page" };
  }
}


