import { DashboardStats, RecentOrder, ChartData } from "../types/analytics.admin";
import { mockDashboardStats, mockRecentOrders, mockChartData } from "../mocks/dashboard.mock";

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    return new Promise(resolve => setTimeout(() => resolve(mockDashboardStats), 300));
  },
  async getRecentOrders(): Promise<RecentOrder[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockRecentOrders), 400));
  },
  async getChartData(): Promise<ChartData[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockChartData), 500));
  }
};
