"use client";

import { CategoryTable, CategoryFormModal, useCategories } from "@/features/catalog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function CategoriesPage() {
  const { categories, isLoading } = useCategories();
  
  const activeCategories = categories.filter(c => !c.deletedAt);
  const deletedCategories = categories.filter(c => c.deletedAt);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh mục</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý các danh mục sản phẩm thời trang.</p>
        </div>
        <CategoryFormModal />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="active">Đang hoạt động ({activeCategories.length})</TabsTrigger>
            <TabsTrigger value="trash">Thùng rác ({deletedCategories.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-0">
          <CategoryTable categories={activeCategories} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="trash" className="mt-0">
          <CategoryTable categories={deletedCategories} isLoading={isLoading} isTrashView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
