import { useState, useEffect } from 'react';
import { Category } from "@/features/catalog/types/category";
import { categoryService } from "@/features/catalog/services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  return { categories, isLoading, setCategories };
}
