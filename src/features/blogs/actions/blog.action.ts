"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { BlogSchema, TBlogPayload } from "../schemas/blog.schema";

export async function createBlogAction(data: TBlogPayload) {
  // Validate data
  const validated = BlogSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log("Saving blog:", validated.data);
  revalidatePath('/blogs');
  return { success: true, data: validated.data };
}

export async function updateBlogAction(id: string | number, data: TBlogPayload) {
  const validated = BlogSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log(`Updating blog ${id}:`, validated.data);
  revalidatePath('/blogs');
  return { success: true, data: validated.data };
}
