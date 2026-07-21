import { useState } from 'react';
import { Category } from '../types/category';

const initialCategories: Category[] = [
  { id: 'CAT-001', name: 'Váy đầm', slug: 'vay-dam', productCount: 145, status: 'Hoạt động' },
  { id: 'CAT-002', name: 'Áo nữ', slug: 'ao-nu', productCount: 89, status: 'Hoạt động' },
  { id: 'CAT-003', name: 'Quần nữ', slug: 'quan-nu', productCount: 64, status: 'Hoạt động' },
  { id: 'CAT-004', name: 'Phụ kiện', slug: 'phu-kien', productCount: 12, status: 'Đang ẩn' },
];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  return { categories, setCategories };
}
