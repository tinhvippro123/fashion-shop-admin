"use client";

import { BlogForm } from "@/features/blogs";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the blog by id and pass it to BlogForm
  // const { blog } = useBlog(params.id);
  
  return (
    <BlogForm initialData={{ title: "Đang tải...", category: "tips" }} mode="edit" />
  );
}
