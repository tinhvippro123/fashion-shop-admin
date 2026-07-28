export interface FlashSale {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  productsCount: number;
  status: string;
  revenue: string;
  usageCount?: number;
  deletedAt?: string;
}
