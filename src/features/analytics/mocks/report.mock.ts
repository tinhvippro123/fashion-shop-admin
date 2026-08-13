export const timeOptions = [
  { key: "today", label: "Hôm nay" },
  { key: "this_week", label: "Tuần này" },
  { key: "this_month", label: "Tháng này" },
  { key: "this_year", label: "Năm nay" },
  { key: "custom", label: "Tùy chỉnh..." },
];

export const mockBestSellers = [
  {
    id: "PROD-001",
    name: "Áo thun form rộng basic",
    category: "Áo thun",
    sold: 1245,
    revenue: "249,000,000 đ",
    trend: "+12%",
  },
  {
    id: "PROD-002",
    name: "Quần jean ống rộng phong cách Hàn Quốc",
    category: "Quần",
    sold: 890,
    revenue: "400,500,000 đ",
    trend: "+8%",
  },
  {
    id: "PROD-003",
    name: "Váy hoa cúc mùa hè",
    category: "Váy",
    sold: 650,
    revenue: "130,000,000 đ",
    trend: "-5%",
  },
  {
    id: "PROD-004",
    name: "Áo khoác gió thể thao",
    category: "Áo khoác",
    sold: 430,
    revenue: "150,500,000 đ",
    trend: "+15%",
  },
  {
    id: "PROD-005",
    name: "Túi xách nữ đeo chéo",
    category: "Phụ kiện",
    sold: 320,
    revenue: "80,000,000 đ",
    trend: "+2%",
  },
];

export const mockConversionFunnel = [
  { step: "Lượt truy cập web", value: 12450, percentage: null, trend: 15 },
  { step: "Thêm vào giỏ", value: 3240, percentage: 26, trend: 8 },
  { step: "Đến trang thanh toán", value: 1850, percentage: 14.8, trend: -2 },
  { step: "Thanh toán thành công", value: 1245, percentage: 10, trend: 5 },
];
