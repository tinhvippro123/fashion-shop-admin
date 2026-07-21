import { Product } from '../types/product.admin';

export const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Váy đầm dự tiệc cao cấp",
    category: "Váy đầm",
    price: "1,250,000 đ",
    stock: 45,
    status: "Đang bán",
    statusColor: "bg-green-600",
  },
  {
    id: "PROD-002",
    name: "Áo sơ mi lụa tơ tằm",
    category: "Áo nữ",
    price: "850,000 đ",
    stock: 120,
    status: "Đang bán",
    statusColor: "bg-green-600",
  },
  {
    id: "PROD-003",
    name: "Quần âu ống loe",
    category: "Quần nữ",
    price: "950,000 đ",
    stock: 0,
    status: "Hết hàng",
    statusColor: "bg-red-600",
  },
  {
    id: "PROD-004",
    name: "Túi xách da thật sang trọng",
    category: "Phụ kiện",
    price: "2,150,000 đ",
    stock: 12,
    status: "Sắp hết",
    statusColor: "bg-amber-500",
  },
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
