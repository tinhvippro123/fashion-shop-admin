"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PageSchema, TPagePayload } from "../schemas/page.schema";
import { pageService } from "../services/page.service";

export async function createPageAction(data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await pageService.createPage(validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving page via service:", validated.data);
  revalidatePath('/pages');
  return { success: true, data: validated.data };
}

export async function updatePageAction(id: string | number, data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await pageService.updatePage(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating page ${id} via service:`, validated.data);
  revalidatePath('/pages');
  return { success: true, data: validated.data };
}
