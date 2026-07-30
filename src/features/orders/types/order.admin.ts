export interface OrderItem {
  id: string;
  name: string;
  image: string;
  variantInfo: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  type: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address: string;
  method: string;
  code: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  payment: string;
  paymentBg: string; // Tạm giữ lại phần payment UI (hoặc nếu muốn có thể bỏ luôn)
  total: string; 
  
  // Trạng thái hủy đơn
  cancelReason?: string;
  cancelBy?: string;
  
  // Optional detailed fields when fetching specific order
  items?: OrderItem[];
  subtotal?: number;
  shippingFee?: number;
  discount?: number;
  appliedPromotions?: { id: string; name: string; code: string; discountAmount: number }[];
  customer?: CustomerInfo;
  shipping?: ShippingInfo;
}
