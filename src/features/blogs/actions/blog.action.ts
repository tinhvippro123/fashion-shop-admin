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

  try {
    const res = await blogService.createBlog(validated.data);
    revalidatePath('/blogs');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o blog" };
  }
}

export async function updateBlogAction(id: string | number, data: TBlogPayload) {
  const validated = BlogSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await blogService.updateBlog(Number(id), validated.data);
    revalidatePath('/blogs');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t blog" };
  }
}


