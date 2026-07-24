"use server";

import { z } from "zod";
import { PageSchema, TPagePayload } from "../schemas/page.schema";

export async function createPageAction(data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving page:", validated.data);
  return { success: true, data: validated.data };
}

export async function updatePageAction(id: string | number, data: TPagePayload) {
  const validated = PageSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating page ${id}:`, validated.data);
  return { success: true, data: validated.data };
}
