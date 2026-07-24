"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { BlogSchema, TBlogPayload } from "../schemas/blog.schema";
import { blogService } from "../services/blog.service";

export async function createBlogAction(data: TBlogPayload) {
  // Validate data
  const validated = BlogSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await blogService.createBlog(validated.data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log("Saving blog via service:", validated.data);
  revalidatePath('/blogs');
  return { success: true, data: validated.data };
}

export async function updateBlogAction(id: string | number, data: TBlogPayload) {
  const validated = BlogSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await blogService.updateBlog(id as string, validated.data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log(`Updating blog ${id} via service:`, validated.data);
  revalidatePath('/blogs');
  return { success: true, data: validated.data };
}
