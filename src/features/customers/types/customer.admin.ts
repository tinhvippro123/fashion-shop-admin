export interface CustomerAddress {
  id: number;
  isDefault: boolean;
  address: string;
  phone: string;
}

export interface CustomerOrderHistory {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: string;
  status: string;
  deletedAt?: string;
  
  // Optional detail fields
  joinedDate?: string;
  totalOrders?: number; // Similar to orders, used in detail view
  addresses?: CustomerAddress[];
  orderHistory?: CustomerOrderHistory[];
}
