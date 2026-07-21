import { useState } from 'react';
import { Product } from '../types/product.admin';
import { initialProducts } from '../mocks/product.mock';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  return { products, setProducts };
}
