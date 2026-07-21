"use client";

import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Save } from "lucide-react";
import { BlogForm } from "@/features/blogs";

export default function CreateBlogPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Viết bài mới</h2>
            <p className="text-zinc-500">Soạn thảo và xuất bản bài viết lên trang Blog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Lưu nháp</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Save className="h-4 w-4" /> Xuất bản
          </Button>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
