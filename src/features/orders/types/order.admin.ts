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

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: string;
  statusBg: string;
  statusText: string;
  statusHover: string;
  payment: string;
  paymentBg: string;
  total: string; 
  
  // Optional detailed fields when fetching specific order
  items?: OrderItem[];
  subtotal?: number;
  shippingFee?: number;
  discount?: number;
  customer?: CustomerInfo;
  shipping?: ShippingInfo;
}
