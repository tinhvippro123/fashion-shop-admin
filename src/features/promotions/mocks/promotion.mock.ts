import { Campaign, Voucher } from "@/features/promotions/types/promotion.admin";

export const mockCampaigns: Campaign[] = [
  {
    id: "PROMO-001",
    name: "Siêu Sale Giữa Năm - 30% All Items",
    discount: "30%",
    duration: "17/07/2026 - 02/08/2026",
    target: "Toàn bộ cửa hàng",
    audience: "Tất cả khách hàng",
    status: "Đang diễn ra",
  },
  {
    id: "PROMO-002",
    name: "Tri Ân Khách VIP - Giảm 50% Hàng Thu Đông",
    discount: "50%",
    duration: "01/09/2026 - 15/09/2026",
    target: "Danh mục: Áo khoác nữ",
    audience: "Hạng: Vàng, Kim Cương",
    status: "Sắp diễn ra",
  },
  {
    id: "PROMO-003",
    name: "Xả Hàng Hè Giá Sốc",
    discount: "VND 100,000",
    duration: "01/06/2026 - 30/06/2026",
    target: "Sản phẩm chọn lọc",
    audience: "Tất cả khách hàng",
    status: "Đã kết thúc",
  },
];

export const mockVouchers: Voucher[] = [
  {
    id: "VOU-001",
    code: "SUMMER50",
    discountAmount: "50,000đ",
    minOrderValue: "500,000đ",
    quantity: "100 / 1000",
    status: "Hoạt động",
    expiry: "30/08/2026",
  },
  {
    id: "VOU-002",
    code: "FREESHIP100",
    discountAmount: "30,000đ",
    minOrderValue: "1,000,000đ",
    quantity: "450 / 500",
    status: "Hoạt động",
    expiry: "15/09/2026",
  },
  {
    id: "VOU-003",
    code: "LUXE2026",
    discountAmount: "100,000đ",
    minOrderValue: "2,000,000đ",
    quantity: "50 / 50",
    status: "Hết lượt",
    expiry: "31/12/2026",
  },
];
