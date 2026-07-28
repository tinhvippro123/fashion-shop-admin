"use client";

import Link from "next/link";
import { buttonVariants, Button } from "@/shared/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ProductTable, useProducts } from "@/features/catalog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();
  
  const activeProducts = products.filter(p => !p.deletedAt);
  const deletedProducts = products.filter(p => p.deletedAt);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sản phẩm</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý kho hàng và các mặt hàng thời trang.</p>
        </div>
        <Link 
          href="/products/create"
          className={cn(buttonVariants({ variant: "default" }), "")}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Link>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="active">Đang hoạt động ({activeProducts.length})</TabsTrigger>
            <TabsTrigger value="trash">Thùng rác ({deletedProducts.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-0">
          <ProductTable products={activeProducts} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="trash" className="mt-0">
          <ProductTable products={deletedProducts} isLoading={isLoading} isTrashView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
