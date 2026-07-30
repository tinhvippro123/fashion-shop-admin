import { Order } from "@/features/orders/types/order.admin";
import { initialOrders, mockOrderDetails } from "@/features/orders/mocks/order.mock";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  /**
   * Lấy danh sách toàn bộ đơn hàng
   */
  async getOrders(): Promise<Order[]> {
    await delay(500); // Giả lập network latency
    return initialOrders;
  },

  /**
   * Lấy chi tiết một đơn hàng theo ID
   */
  async getOrderById(id: string): Promise<Order | undefined> {
    await delay(300);
    const orderBase = initialOrders.find(o => o.id === id);
    if (!orderBase) return undefined;
    
    let details = mockOrderDetails[id];
    if (!details) {
      const numericTotal = parseInt(orderBase.total.replace(/\D/g, '')) || 0;
      details = {
        items: [
          {
            id: `ITEM-MOCK-${id}`,
            name: "Sản phẩm mẫu (Tạo tự động)",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
            variantInfo: "Size L, Màu Basic",
            price: numericTotal,
            quantity: 1
          }
        ],
        subtotal: numericTotal,
        shippingFee: 0,
        discount: 0,
        customer: {
          name: orderBase.customerName || "Khách hàng",
          type: "Thành viên",
          email: orderBase.customerEmail || "email@example.com",
          phone: "0987654321"
        },
        shipping: {
          address: "123 Đường Số 1, Quận 1, TP.HCM",
          method: "Giao Hàng Tiết Kiệm",
          code: `GHTK${id.replace('-', '')}`
        }
      };
    }
    return { ...orderBase, ...details };
  },
};





