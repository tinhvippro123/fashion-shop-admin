"use client";

import { Button, buttonVariants } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PageTable } from "@/features/content";

export default function StaticPagesPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trang tĩnh</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý nội dung các trang thông tin (Về chúng tôi, Chính sách...).</p>
        </div>
        <Link href="/pages/create" className={buttonVariants({ variant: "default", className: "" })}>
          <Plus className="mr-2 h-4 w-4" /> Tạo trang
        </Link>
      </div>

      <PageTable />
    </div>
  );
}
