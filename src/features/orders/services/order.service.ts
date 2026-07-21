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
    
    const details = mockOrderDetails[id] || {};
    return { ...orderBase, ...details };
  },
};
