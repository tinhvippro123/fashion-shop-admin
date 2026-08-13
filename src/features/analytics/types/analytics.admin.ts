export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  newCustomers: number;
  customerChange: number;
  totalOrders: number;
  orderChange: number;
  onlineSales: number;
  onlineSalesChange: number;
  pendingOrders: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "shipping" | "cancelled";
  avatarFallback: string;
}

export interface ChartData {
  name: string;
  total: number;
}
