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
  },
  "ORD-002": {
    items: [
      {
        id: "ITEM-6",
        name: "Áo Polo Ralph Lauren Fake",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
        variantInfo: "Màu: Đỏ đô, Size: M",
        price: 350000,
        quantity: 1
      },
      {
        id: "ITEM-7",
        name: "Quần Short Kaki Nam",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
        variantInfo: "Màu: Be, Size: 30",
        price: 280000,
        quantity: 1
      },
      {
        id: "ITEM-8",
        name: "Nón Bucket Unisex",
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80",
        variantInfo: "Màu: Đen, Free Size",
        price: 120000,
        quantity: 1
      }
    ],
    subtotal: 750000,
    shippingFee: 30000,
    discount: 0,
    appliedPromotions: [
      { id: "PROMO-2", name: "Khách mới giảm 10%", code: "NEWMEMBER", discountAmount: 75000 }
    ],
    customer: {
      name: "Trần Thị B",
      type: "Thành viên",
      email: "tranthib@gmail.com",
      phone: "0912345678"
    },
    shipping: {
      address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
      method: "Giao hàng tiêu chuẩn (GHN)",
      code: "GHN002456789"
    }
  },
  "ORD-006": {
    items: [
      {
        id: "ITEM-9",
        name: "Áo Sơ Mi Oxford Dài Tay",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        variantInfo: "Màu: Xanh nhạt, Size: L",
        price: 420000,
        quantity: 1
      },
      {
        id: "ITEM-10",
        name: "Quần Âu Slim Fit",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
        variantInfo: "Màu: Đen, Size: 31",
        price: 550000,
        quantity: 1
      },
      {
        id: "ITEM-11",
        name: "Thắt Lưng Da Bò Thật",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        variantInfo: "Màu: Nâu, Free Size",
        price: 280000,
        quantity: 1
      }
    ],
    subtotal: 1250000,
    shippingFee: 0,
    discount: 0,
    appliedPromotions: [
      { id: "PROMO-3", name: "Freeship toàn quốc", code: "FREESHIP", discountAmount: 30000 }
    ],
    customer: {
      name: "Lê Minh Tuấn",
      type: "Thành viên",
      email: "tuanle@gmail.com",
      phone: "0987654321"
    },
    shipping: {
      address: "123 Đường Số 1, Quận 1, TP.HCM",
      method: "Giao Hàng Tiết Kiệm (GHTK)",
      code: "GHTK123456789"
    }
  },
  "ORD-007": {
    items: [
      {
        id: "ITEM-12",
        name: "Áo Thun Oversize In Hình",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
        variantInfo: "Màu: Trắng, Size: XL",
        price: 180000,
        quantity: 1
      },
      {
        id: "ITEM-13",
        name: "Tất Cổ Cao (Set 3 đôi)",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
        variantInfo: "Màu: Mix, Free Size",
        price: 85000,
        quantity: 2
      }
    ],
    subtotal: 350000,
    shippingFee: 15000,
    discount: 15000,
    appliedPromotions: [
      { id: "PROMO-4", name: "Freeship Momo", code: "MOMOFREE", discountAmount: 15000 }
    ],
    customer: {
      name: "Hoàng Kim Ngọc",
      type: "Thành viên Silver",
      email: "ngoc_hk@gmail.com",
      phone: "0933221100"
    },
    shipping: {
      address: "28 Trần Hưng Đạo, Phường 6, Quận 5, TP.HCM",
      method: "Giao hàng nhanh (GHN)",
      code: "GHN007998877"
    }
  },
  "ORD-008": {
    items: [
      {
        id: "ITEM-14",
        name: "Áo Hoodie Nỉ Bông Dày",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
        variantInfo: "Màu: Xám đậm, Size: XL",
        price: 650000,
        quantity: 2
      },
      {
        id: "ITEM-15",
        name: "Quần Jogger Thể Thao",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
        variantInfo: "Màu: Đen, Size: L",
        price: 380000,
        quantity: 2
      },
      {
        id: "ITEM-16",
        name: "Balo Laptop Chống Nước",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        variantInfo: "Màu: Đen, 15.6 inch",
        price: 890000,
        quantity: 1
      },
      {
        id: "ITEM-17",
        name: "Mũ Lưỡi Trai NY",
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80",
        variantInfo: "Màu: Đen, Free Size",
        price: 220000,
        quantity: 1
      }
    ],
    subtotal: 4170000,
    shippingFee: 0,
    discount: 70000,
    appliedPromotions: [
      { id: "PROMO-5", name: "Freeship đơn 1 triệu", code: "FREESHIP1M", discountAmount: 40000 },
      { id: "PROMO-6", name: "Flash Sale 30k", code: "FLASH30", discountAmount: 30000 }
    ],
    customer: {
      name: "Phạm Hải Đăng",
      type: "Khách hàng VIP",
      email: "dangpham@gmail.com",
      phone: "0965432100"
    },
    shipping: {
      address: "567 Cách Mạng Tháng Tám, Phường 15, Quận 10, TP.HCM",
      method: "Giao hàng tiêu chuẩn (GHN)",
      code: "GHN008112233"
    }
  },
  "ORD-009": {
    items: [
      {
        id: "ITEM-18",
        name: "Đầm Maxi Hoa Nhí",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
        variantInfo: "Màu: Hồng pastel, Size: S",
        price: 520000,
        quantity: 1
      },
      {
        id: "ITEM-19",
        name: "Túi Xách Tote Nữ",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        variantInfo: "Màu: Kem, Free Size",
        price: 450000,
        quantity: 1
      },
      {
        id: "ITEM-20",
        name: "Sandal Quai Ngang",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        variantInfo: "Màu: Nâu, Size: 37",
        price: 280000,
        quantity: 1
      },
      {
        id: "ITEM-21",
        name: "Kính Mát Thời Trang",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
        variantInfo: "Màu: Đen, Free Size",
        price: 300000,
        quantity: 1
      }
    ],
    subtotal: 1550000,
    shippingFee: 25000,
    discount: 25000,
    appliedPromotions: [
      { id: "PROMO-7", name: "Freeship ZaloPay", code: "ZALOFREE", discountAmount: 25000 }
    ],
    customer: {
      name: "Đinh Bảo Yến",
      type: "Thành viên Gold",
      email: "yendinh@gmail.com",
      phone: "0944556677"
    },
    shipping: {
      address: "12 Nguyễn Văn Linh, Quận 7, TP.HCM",
      method: "Giao hàng nhanh (J&T Express)",
      code: "JT009445566"
    }
  },
  "ORD-003": {
    items: [
      {
        id: "ITEM-22",
        name: "Áo Blazer Nam Cao Cấp",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
        variantInfo: "Màu: Xanh navy, Size: L",
        price: 1200000,
        quantity: 1
      },
      {
        id: "ITEM-23",
        name: "Sơ Mi Trắng Công Sở",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        variantInfo: "Màu: Trắng, Size: L",
        price: 380000,
        quantity: 2
      },
      {
        id: "ITEM-24",
        name: "Cà Vạt Lụa Hoa Văn",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
        variantInfo: "Màu: Đỏ rượu, Free Size",
        price: 250000,
        quantity: 1
      },
      {
        id: "ITEM-25",
        name: "Giày Tây Da Bò",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        variantInfo: "Màu: Đen bóng, Size: 42",
        price: 990000,
        quantity: 1
      }
    ],
    subtotal: 3200000,
    shippingFee: 0,
    discount: 0,
    appliedPromotions: [
      { id: "PROMO-8", name: "Freeship VIP", code: "VIPSHIP", discountAmount: 40000 }
    ],
    customer: {
      name: "Lê Văn C",
      type: "Khách hàng VIP",
      email: "levanc@gmail.com",
      phone: "0922334455"
    },
    shipping: {
      address: "88 Pasteur, Phường Bến Nghé, Quận 1, TP.HCM",
      method: "Giao hàng nhanh (GHN)",
      code: "GHN003887766"
    }
  },
  "ORD-047": {
    items: [
      {
        id: "ITEM-26",
        name: "Áo Thun Cổ Tròn Trơn",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        variantInfo: "Màu: Đen, Size: M",
        price: 150000,
        quantity: 1
      },
      {
        id: "ITEM-27",
        name: "Quần Short Jean Nữ",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
        variantInfo: "Màu: Xanh đậm, Size: 27",
        price: 200000,
        quantity: 1
      }
    ],
    subtotal: 350000,
    shippingFee: 30000,
    discount: 30000,
    appliedPromotions: [
      { id: "PROMO-9", name: "Freeship COD", code: "CODFREE", discountAmount: 30000 }
    ],
    customer: {
      name: "Lê Văn C",
      type: "Khách hàng VIP",
      email: "levanc@gmail.com",
      phone: "0922334455"
    },
    shipping: {
      address: "88 Pasteur, Phường Bến Nghé, Quận 1, TP.HCM",
      method: "Giao hàng tiết kiệm (GHTK)",
      code: "GHTK047223344"
    }
  },
  "ORD-015": {
    items: [
      {
        id: "ITEM-28",
        name: "Áo Khoác Jean Nữ Vintage",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
        variantInfo: "Màu: Xanh wash, Size: M",
        price: 520000,
        quantity: 1
      },
      {
        id: "ITEM-29",
        name: "Chân Váy Xếp Ly Tennis",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
        variantInfo: "Màu: Trắng, Size: S",
        price: 280000,
        quantity: 1
      },
      {
        id: "ITEM-30",
        name: "Áo Croptop Thun Co Giãn",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        variantInfo: "Màu: Đen, Size: S",
        price: 150000,
        quantity: 1
      },
      {
        id: "ITEM-31",
        name: "Bông Tai Ngọc Trai",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
        variantInfo: "Màu: Trắng, Free Size",
        price: 120000,
        quantity: 1
      },
      {
        id: "ITEM-32",
        name: "Ví Cầm Tay Mini",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        variantInfo: "Màu: Hồng, Free Size",
        price: 130000,
        quantity: 1
      }
    ],
    subtotal: 1200000,
    shippingFee: 25000,
    discount: 25000,
    appliedPromotions: [
      { id: "PROMO-10", name: "Freeship cho nữ", code: "GIRLSHIP", discountAmount: 25000 }
    ],
    customer: {
      name: "Khách hàng mẫu",
      type: "Thành viên",
      email: "sample@gmail.com",
      phone: "0955667788"
    },
    shipping: {
      address: "234 Điện Biên Phủ, Phường 7, Quận 3, TP.HCM",
      method: "Giao hàng nhanh (GHN)",
      code: "GHN015334455"
    }
  },
  "ORD-045": {
    items: [
      {
        id: "ITEM-33",
        name: "Áo Thun Polo Nam",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
        variantInfo: "Màu: Xanh lá, Size: L",
        price: 320000,
        quantity: 1
      },
      {
        id: "ITEM-34",
        name: "Quần Kaki Dài",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
        variantInfo: "Màu: Be, Size: 31",
        price: 130000,
        quantity: 1
      }
    ],
    subtotal: 450000,
    shippingFee: 30000,
    discount: 30000,
    appliedPromotions: [
      { id: "PROMO-11", name: "Freeship VNPay", code: "VNPFREE", discountAmount: 30000 }
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
      code: "GHN045112233"
    }
  }
};
