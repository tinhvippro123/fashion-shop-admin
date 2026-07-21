"use client";

import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Save } from "lucide-react";
import { BlogForm } from "@/features/blogs";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the blog by id and pass it to BlogForm
  // const { blog } = useBlog(params.id);
  
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sửa bài viết</h2>
            <p className="text-zinc-500">Cập nhật nội dung bài viết.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Hủy</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Save className="h-4 w-4" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <BlogForm initialData={{ title: "Đang tải...", category: "tips" }} />
    </div>
  );
}
