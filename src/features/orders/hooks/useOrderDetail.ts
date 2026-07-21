import { useState, useEffect } from 'react';
import { Order } from "@/features/orders/types/order.admin";
import { orderService } from "@/features/orders/services/order.service";

export function useOrderDetail(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true);
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data || null);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchOrder();
    }
  }, [id]);

  return { order, isLoading, setOrder };
}
