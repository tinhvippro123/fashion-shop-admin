"use client";

import { CategoryTable, CategoryFormModal, useCategories } from "@/features/catalog";

export default function CategoriesPage() {
  const { categories } = useCategories();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh mục</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý các danh mục sản phẩm thời trang.</p>
        </div>
        <CategoryFormModal />
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
