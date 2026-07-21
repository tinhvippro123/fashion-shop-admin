import { useState } from 'react';
import { Category } from '../types/category';
import { initialCategories } from '../mocks/category.mock';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  return { categories, setCategories };
}
