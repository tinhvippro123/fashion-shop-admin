import { Category } from "@/features/catalog/types/category";

export const initialCategories: Category[] = [
  { id: 'CAT-001', name: 'Váy đầm', slug: 'vay-dam', productCount: 145, status: 'Hoạt động' },
  { id: 'CAT-002', name: 'Áo nữ', slug: 'ao-nu', productCount: 89, status: 'Hoạt động' },
  { id: 'CAT-003', name: 'Quần nữ', slug: 'quan-nu', productCount: 64, status: 'Hoạt động' },
  { id: 'CAT-004', name: 'Phụ kiện', slug: 'phu-kien', productCount: 12, status: 'Đang ẩn' },
  { id: 'CAT-005', name: 'Giày dép cũ', slug: 'giay-dep-cu', productCount: 0, status: 'Đã xóa', deletedAt: '2023-10-15T00:00:00Z' },
  { id: 'CAT-006', name: 'Hàng lỗi', slug: 'hang-loi', productCount: 0, status: 'Đã xóa', deletedAt: '2023-10-20T00:00:00Z' },
];
