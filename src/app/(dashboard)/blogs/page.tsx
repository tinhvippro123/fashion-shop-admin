"use client";

﻿import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import { BlogTable } from "@/features/blogs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Bài viết</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý các bài viết trên Blog và tin tức của cửa hàng.</p>
        </div>
        <Link href="/blogs/create">
          <Button className="gap-2 ">
            <PlusCircle className="h-4 w-4" /> Thêm Bài Viết Mới
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50 border">
            <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Tất cả bài viết
            </TabsTrigger>
            <TabsTrigger value="trash" className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-red-700">
              Thùng rác
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <BlogTable />
        </TabsContent>

        <TabsContent value="trash" className="mt-0">
          <BlogTable isTrashView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
