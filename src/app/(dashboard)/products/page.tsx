"use client";

import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ProductTable, useProducts } from "@/features/catalog";

export default function ProductsPage() {
  const { products } = useProducts();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sản phẩm</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý kho hàng và các mặt hàng thời trang.</p>
        </div>
        <Link 
          href="/products/create"
          className={cn(buttonVariants({ variant: "default" }), "bg-zinc-900 hover:bg-zinc-800")}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
