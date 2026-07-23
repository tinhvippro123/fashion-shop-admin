"use client";

﻿import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import { BlogTable } from "@/features/blogs";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Bài viết</h2>
          <p className="text-muted-foreground">Quản lý các bài viết trên Blog và tin tức của cửa hàng.</p>
        </div>
        <Link href="/blogs/create">
          <Button className="gap-2 ">
            <PlusCircle className="h-4 w-4" /> Thêm Bài Viết Mới
          </Button>
        </Link>
      </div>

      <BlogTable />
    </div>
  );
}
