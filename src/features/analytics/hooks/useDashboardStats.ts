import { useState, useEffect } from 'react';
import { DashboardStats, RecentOrder, ChartData } from "../types/analytics.admin";
import { analyticsService } from "../services/analytics.service";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, ordersData, chartRes] = await Promise.all([
          analyticsService.getDashboardStats(),
          analyticsService.getRecentOrders(),
          analyticsService.getChartData()
        ]);
        setStats(statsData);
        setRecentOrders(ordersData);
        setChartData(chartRes);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { stats, recentOrders, chartData, isLoading };
}
