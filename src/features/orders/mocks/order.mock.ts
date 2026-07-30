import { Order } from "@/features/orders/types/order.admin";

export const initialOrders: Order[] = [
  // 1. PENDING (Chờ xác nhận)
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@gmail.com",
    date: "17/07/2026",
    status: "PENDING",
    payment: "Chờ thanh toán (COD)",
    paymentBg: "bg-amber-100 text-amber-700",
    total: "850,000đ"
  },
  {
    id: "ORD-006",
    customerName: "Lê Minh Tuấn",
    customerEmail: "tuanle@gmail.com",
    date: "18/07/2026",
    status: "PENDING",
    payment: "Chờ thanh toán (COD)",
    paymentBg: "bg-amber-100 text-amber-700",
    total: "1,250,000đ"
  },
  {
    id: "ORD-007",
    customerName: "Hoàng Kim Ngọc",
    customerEmail: "ngoc_hk@gmail.com",
    date: "18/07/2026",
    status: "PENDING",
    payment: "Đã thanh toán (Momo)",
    paymentBg: "bg-green-100 text-green-700",
    total: "350,000đ"
  },

  // 2. PROCESSING (Đang chuẩn bị)
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@gmail.com",
    date: "16/07/2026",
    status: "PROCESSING",
    payment: "Đã thanh toán (VNPay)",
    paymentBg: "bg-green-100 text-green-700",
    total: "2,500,000đ"
  },
  {
    id: "ORD-008",
    customerName: "Phạm Hải Đăng",
    customerEmail: "dangpham@gmail.com",
    date: "16/07/2026",
    status: "PROCESSING",
    payment: "Chờ thanh toán (COD)",
    paymentBg: "bg-amber-100 text-amber-700",
    total: "4,100,000đ"
  },

  // 3. SHIPPING (Đang giao hàng)
  {
    id: "ORD-009",
    customerName: "Đinh Bảo Yến",
    customerEmail: "yendinh@gmail.com",
    date: "15/07/2026",
    status: "SHIPPING",
    payment: "Đã thanh toán (ZaloPay)",
    paymentBg: "bg-green-100 text-green-700",
    total: "1,550,000đ"
  },

  // 4. COMPLETED (Hoàn thành)
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@gmail.com",
    date: "14/07/2026",
    status: "COMPLETED",
    payment: "Đã thanh toán (Momo)",
    paymentBg: "bg-green-100 text-green-700",
    total: "3,200,000đ"
  },
  {
    id: "ORD-047",
    customerName: "Lê Văn C",
    customerEmail: "levanc@gmail.com",
    date: "12/07/2026",
    status: "COMPLETED",
    payment: "Đã thanh toán (COD)",
    paymentBg: "bg-green-100 text-green-700",
    total: "350,000đ"
  },
  {
    id: "ORD-015",
    customerName: "Khách hàng mẫu",
    customerEmail: "sample@gmail.com",
    date: "10/07/2026",
    status: "COMPLETED",
    payment: "Đã thanh toán",
    paymentBg: "bg-green-100 text-green-700",
    total: "1,200,000đ"
  },

  // 5. CANCELLED (Đã hủy)
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@gmail.com",
    date: "12/07/2026",
    status: "CANCELLED",
    cancelReason: "Khách hàng boom hàng, gọi không nghe máy",
    cancelBy: "Admin",
    payment: "Đã hoàn tiền",
    paymentBg: "bg-muted text-foreground",
    total: "450,000đ"
  },
  {
    id: "ORD-045",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@gmail.com",
    date: "10/07/2026",
    status: "CANCELLED",
    cancelReason: "Hết hàng trong kho",
    cancelBy: "Hệ thống",
    payment: "Đã hoàn tiền (VNPay)",
    paymentBg: "bg-muted text-foreground",
    total: "450,000đ"
  },
  {
    id: "ORD-046",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@gmail.com",
    date: "09/07/2026",
    status: "CANCELLED",
    cancelReason: "Phát hiện đơn hàng ảo (Spam)",
    cancelBy: "Admin",
    payment: "Chưa thanh toán",
    paymentBg: "bg-muted text-foreground",
    total: "1,250,000đ"
  }
];

export const mockOrderDetails: Record<string, Partial<Order>> = {
  "ORD-001": {
    items: [
      {
        id: "ITEM-1",
        name: "Áo Thun Cổ Tròn Basic",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        variantInfo: "Màu: Trắng, Size: L",
        price: 250000,
        quantity: 2
      },
      {
        id: "ITEM-2",
        name: "Quần Jeans Ống Rộng",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
        variantInfo: "Màu: Xanh nhạt, Size: 32",
        price: 450000,
        quantity: 1
      },
      {
        id: "ITEM-3",
        name: "Giày Sneaker Thể Thao",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        variantInfo: "Màu: Đen/Trắng, Size: 42",
        price: 1550000,
        quantity: 1
      }
    ],
    subtotal: 2500000,
    shippingFee: 30000,
    discount: 30000,
    appliedPromotions: [
      { id: "PROMO-1", name: "Freeship Đơn 500k", code: "FREESHIP500", discountAmount: 30000 }
    ],
    customer: {
      name: "Nguyễn Văn A",
      type: "Khách hàng VIP",
      email: "nguyenvana@gmail.com",
      phone: "0901234567"
    },
    shipping: {
      address: "123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM",
      method: "Giao hàng tiêu chuẩn (GHN)",
      code: "GHN123456789"
    }
  },
  "ORD-004": {
    items: [
      {
        id: "ITEM-4",
        name: "Áo Khoác Bomber Gió",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
        variantInfo: "Màu: Xanh rêu, Size: XL",
        price: 450000,
        quantity: 1
      }
    ],
    subtotal: 450000,
    shippingFee: 40000,
    discount: 0,
    customer: {
      name: "Phạm Thị D",
      type: "Thành viên mới",
      email: "phamthid@gmail.com",
      phone: "0988776655"
    },
    shipping: {
      address: "456 Nguyễn Trãi, Phường 8, Quận 5, TP.HCM",
      method: "Giao hàng nhanh (GHTK)",
      code: "GHTK987654321"
    }
  },
  "ORD-046": {
    items: [
      {
        id: "ITEM-5",
        name: "Giày Sneaker Thể Thao",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        variantInfo: "Màu: Đen/Trắng, Size: 42",
        price: 1250000,
        quantity: 1
      }
    ],
    subtotal: 1250000,
    shippingFee: 30000,
    discount: 0,
    customer: {
      name: "Trần Thị B",
      type: "Bị Khóa (Banned)",
      email: "tranthib@gmail.com",
      phone: "0977665544"
    },
    shipping: {
      address: "789 Lý Tự Trọng, Quận 1, TP.HCM",
      method: "Giao hàng hỏa tốc",
      code: ""
    }
  }
};
