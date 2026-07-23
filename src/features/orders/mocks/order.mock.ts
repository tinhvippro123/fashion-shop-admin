import { Order } from "@/features/orders/types/order.admin";

export const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@gmail.com",
    date: "16/07/2026",
    status: "Đang xử lý",
    statusBg: "bg-blue-100",
    statusText: "text-blue-700",
    statusHover: "hover:bg-blue-200",
    payment: "Đã thanh toán (VNPay)",
    paymentBg: "bg-green-100 text-green-700",
    total: "2,500,000đ"
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@gmail.com",
    date: "15/07/2026",
    status: "Chờ thanh toán",
    statusBg: "bg-amber-100",
    statusText: "text-amber-700",
    statusHover: "hover:bg-amber-200",
    payment: "Chờ thanh toán (COD)",
    paymentBg: "bg-amber-100 text-amber-700",
    total: "850,000đ"
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@gmail.com",
    date: "14/07/2026",
    status: "Đã giao hàng",
    statusBg: "bg-muted",
    statusText: "text-foreground",
    statusHover: "hover:bg-emerald-200",
    payment: "Đã thanh toán (Momo)",
    paymentBg: "bg-green-100 text-green-700",
    total: "3,200,000đ"
  },
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@gmail.com",
    date: "12/07/2026",
    status: "Đã hủy",
    statusBg: "bg-red-100",
    statusText: "text-red-700",
    statusHover: "hover:bg-red-200",
    payment: "Đã hoàn tiền",
    paymentBg: "bg-muted text-foreground",
    total: "450,000đ"
  },
  {
    id: "ORD-045",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@gmail.com",
    date: "17/07/2026",
    status: "Trả hàng/Hoàn tiền",
    statusBg: "bg-amber-100",
    statusText: "text-amber-700",
    statusHover: "hover:bg-amber-200",
    payment: "Đã thanh toán (VNPay)",
    paymentBg: "bg-green-100 text-green-700",
    total: "450,000đ"
  },
  {
    id: "ORD-046",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@gmail.com",
    date: "16/07/2026",
    status: "Đã hoàn tiền",
    statusBg: "bg-emerald-100",
    statusText: "text-emerald-700",
    statusHover: "hover:bg-emerald-200",
    payment: "Đã hoàn tiền",
    paymentBg: "bg-muted text-foreground",
    total: "1,250,000đ"
  },
  {
    id: "ORD-047",
    customerName: "Lê Văn C",
    customerEmail: "levanc@gmail.com",
    date: "14/07/2026",
    status: "Đã giao hàng",
    statusBg: "bg-muted",
    statusText: "text-foreground",
    statusHover: "hover:bg-muted",
    payment: "Đã thanh toán (COD)",
    paymentBg: "bg-green-100 text-green-700",
    total: "350,000đ"
  },
  {
    id: "ORD-015",
    customerName: "Khách hàng mẫu",
    customerEmail: "sample@gmail.com",
    date: "15/07/2026",
    status: "Đã giao hàng",
    statusBg: "bg-muted",
    statusText: "text-foreground",
    statusHover: "hover:bg-muted",
    payment: "Đã thanh toán",
    paymentBg: "bg-green-100 text-green-700",
    total: "1,200,000đ"
  },
  {
    id: "ORD-008",
    customerName: "Khách hàng mẫu",
    customerEmail: "sample@gmail.com",
    date: "02/06/2026",
    status: "Đã giao hàng",
    statusBg: "bg-muted",
    statusText: "text-foreground",
    statusHover: "hover:bg-muted",
    payment: "Đã thanh toán",
    paymentBg: "bg-green-100 text-green-700",
    total: "850,000đ"
  }
];

export const mockOrderDetails: Record<string, Partial<Order>> = {
  "ORD-001": {
    items: [
      {
        id: "ITEM-1",
        name: "Váy đầm dạ hội nữ cao cấp",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Đỏ / Size M",
        price: 1500000,
        quantity: 1
      },
      {
        id: "ITEM-2",
        name: "Áo khoác blazer thanh lịch",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Đen / Size L",
        price: 950000,
        quantity: 1
      }
    ],
    subtotal: 2450000,
    shippingFee: 50000,
    discount: 0,
    customer: {
      name: "Nguyễn Văn A",
      type: "Khách hàng thành viên",
      email: "nguyenvana@gmail.com",
      phone: "0987 654 321"
    },
    shipping: {
      address: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      method: "Giao hàng hỏa tốc (GHTK)",
      code: "GH-87429183"
    }
  },
  "ORD-045": {
    items: [
      {
        id: "ITEM-3",
        name: "Quần jean ống rộng vintage",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Xanh nhạt / Size M",
        price: 450000,
        quantity: 1
      }
    ],
    subtotal: 450000,
    shippingFee: 0,
    discount: 0,
    customer: {
      name: "Nguyễn Văn A",
      type: "Khách hàng mới",
      email: "nguyenvana@gmail.com",
      phone: "0901 234 567"
    },
    shipping: {
      address: "45 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      method: "Giao hàng tiêu chuẩn",
      code: "JT-12345678"
    }
  },
  "ORD-046": {
    items: [
      {
        id: "ITEM-4",
        name: "Set bộ thể thao nữ",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Đen / Size L",
        price: 1250000,
        quantity: 1
      }
    ],
    subtotal: 1250000,
    shippingFee: 30000,
    discount: 30000,
    customer: {
      name: "Trần Thị B",
      type: "Khách hàng VIP",
      email: "tranthib@gmail.com",
      phone: "0933 111 222"
    },
    shipping: {
      address: "78 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP. Hồ Chí Minh",
      method: "Giao hàng nhanh",
      code: "SP-99887766"
    }
  },
  "ORD-047": {
    items: [
      {
        id: "ITEM-5",
        name: "Áo thun cotton basic",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Trắng / Size S",
        price: 350000,
        quantity: 1
      }
    ],
    subtotal: 350000,
    shippingFee: 20000,
    discount: 20000,
    customer: {
      name: "Lê Văn C",
      type: "Khách hàng thành viên",
      email: "levanc@gmail.com",
      phone: "0912 345 678"
    },
    shipping: {
      address: "12 Võ Văn Tần, Phường 6, Quận 3, TP. Hồ Chí Minh",
      method: "Giao hàng tiêu chuẩn",
      code: "GH-11223344"
    }
  },
  "ORD-015": {
    items: [
      {
        id: "ITEM-6",
        name: "Áo vest nam công sở",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Xanh đen / Size L",
        price: 1200000,
        quantity: 1
      }
    ],
    subtotal: 1200000,
    shippingFee: 0,
    discount: 0,
    customer: {
      name: "Khách hàng mẫu",
      type: "Khách hàng VIP",
      email: "sample@gmail.com",
      phone: "0900 123 456"
    },
    shipping: {
      address: "123 Đường Tạm, Quận Tạm, TP.HCM",
      method: "Giao hàng nhanh",
      code: "GH-99999999"
    }
  },
  "ORD-008": {
    items: [
      {
        id: "ITEM-7",
        name: "Giày da nam",
        image: "/login-bg.jpg",
        variantInfo: "Phân loại: Đen / Size 42",
        price: 850000,
        quantity: 1
      }
    ],
    subtotal: 850000,
    shippingFee: 0,
    discount: 0,
    customer: {
      name: "Khách hàng mẫu",
      type: "Khách hàng VIP",
      email: "sample@gmail.com",
      phone: "0900 123 456"
    },
    shipping: {
      address: "123 Đường Tạm, Quận Tạm, TP.HCM",
      method: "Giao hàng nhanh",
      code: "GH-88888888"
    }
  }
};
