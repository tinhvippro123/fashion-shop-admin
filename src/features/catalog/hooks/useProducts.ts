import { useState, useEffect } from 'react';
import { Product } from "@/features/catalog/types/product.admin";
import { productService } from "@/features/catalog/services/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return { products, isLoading, setProducts };
}
