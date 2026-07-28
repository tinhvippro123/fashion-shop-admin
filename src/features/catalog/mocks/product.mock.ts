import { Product } from "@/features/catalog/types/product.admin";

export const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Váy đầm dự tiệc cao cấp",
    category: "Váy đầm",
    price: "1,250,000 đ",
    stock: 45,
    status: "Đang bán",
    statusColor: "bg-green-600",
    sold: 1250,
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: "PROD-002",
    name: "Áo sơ mi lụa tơ tằm",
    category: "Áo nữ",
    price: "850,000 đ",
    stock: 120,
    status: "Đang bán",
    statusColor: "bg-green-600",
    sold: 840,
    rating: 4.5,
    reviewCount: 156,
  },
  {
    id: "PROD-003",
    name: "Quần âu ống loe",
    category: "Quần nữ",
    price: "950,000 đ",
    stock: 0,
    status: "Hết hàng",
    statusColor: "bg-red-600",
    sold: 450,
    rating: 4.2,
    reviewCount: 89,
  },
  {
    id: "PROD-004",
    name: "Túi xách da thật sang trọng",
    category: "Phụ kiện",
    price: "2,150,000 đ",
    stock: 12,
    status: "Sắp hết",
    statusColor: "bg-amber-500",
    sold: 56,
    rating: 5.0,
    reviewCount: 12,
  },
  {
    id: "PROD-005",
    name: "Áo len mùa đông phiên bản cũ",
    category: "Áo nữ",
    price: "550,000 đ",
    stock: 0,
    status: "Đã xóa",
    statusColor: "bg-muted text-muted-foreground",
    sold: 210,
    rating: 3.5,
    reviewCount: 45,
    deletedAt: "2026-07-26T10:00:00Z",
  },
  {
    id: "PROD-006",
    name: "Quần đùi dạo biển 2025",
    category: "Quần nữ",
    price: "250,000 đ",
    stock: 0,
    status: "Đã xóa",
    statusColor: "bg-muted text-muted-foreground",
    sold: 15,
    rating: 2.0,
    reviewCount: 4,
    deletedAt: "2026-07-25T14:30:00Z",
  }
];

export const MOCK_COLORS = [
  { name: "Đỏ đậm", hex: "#8B0000" },
  { name: "Xanh navy", hex: "#000080" },
  { name: "Đen tuyền", hex: "#000000" },
  { name: "Trắng", hex: "#FFFFFF" }
];

export const MOCK_SIZES = ["S", "M", "L", "XL", "Freesize"];

export const MOCK_VARIANTS = [
  { color: "Đỏ đậm", size: "S", stock: 10, price: "1,000,000" },
  { color: "Đỏ đậm", size: "M", stock: 15, price: "1,000,000" },
  { color: "Đen tuyền", size: "S", stock: 5, price: "1,000,000" },
];
