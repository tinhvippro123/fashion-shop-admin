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
    statusBg: "bg-zinc-100",
    statusText: "text-zinc-900",
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
    paymentBg: "bg-zinc-100 text-zinc-700",
    total: "450,000đ"
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
  }
};
