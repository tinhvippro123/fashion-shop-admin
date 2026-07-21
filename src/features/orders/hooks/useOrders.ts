import { useState, useEffect } from 'react';
import { Order } from '../types/order.admin';
import { orderService } from '../services/order.service';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchOrders();
  }, []);

  return { orders, isLoading, setOrders };
}
