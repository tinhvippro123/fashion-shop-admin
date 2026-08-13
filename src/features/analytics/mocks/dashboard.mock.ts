import { RecentOrder, DashboardStats, ChartData } from "../types/analytics.admin";

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 45231000,
  revenueChange: 20.1,
  newCustomers: 2350,
  customerChange: 180.1,
  totalOrders: 12234,
  orderChange: 19,
  onlineSales: 573,
  onlineSalesChange: 201,
  pendingOrders: 23
};

export const mockRecentOrders: RecentOrder[] = [
  { id: "#ORD-001", customerName: "Nguyễn Văn A", date: "16/07/2026", amount: 1250000, status: "pending", avatarFallback: "N" },
  { id: "#ORD-002", customerName: "Trần Thị B", date: "15/07/2026", amount: 850000, status: "completed", avatarFallback: "T" },
  { id: "#ORD-003", customerName: "Lê Văn C", date: "14/07/2026", amount: 2100000, status: "shipping", avatarFallback: "L" },
  { id: "#ORD-004", customerName: "Phạm Thị D", date: "12/07/2026", amount: 500000, status: "cancelled", avatarFallback: "P" },
  { id: "#ORD-005", customerName: "Hoàng Văn E", date: "11/07/2026", amount: 5600000, status: "completed", avatarFallback: "H" },
];

export const mockChartData: ChartData[] = [
  { name: "Tháng 1", total: 1200 },
  { name: "Tháng 2", total: 2100 },
  { name: "Tháng 3", total: 1800 },
  { name: "Tháng 4", total: 3200 },
  { name: "Tháng 5", total: 2500 },
  { name: "Tháng 6", total: 4100 },
  { name: "Tháng 7", total: 4800 },
];
