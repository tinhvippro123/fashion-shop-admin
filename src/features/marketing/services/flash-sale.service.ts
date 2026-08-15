import { TFlashSalePayload } from "../schemas/flashsale.schema";
import { FlashSale } from "@/features/marketing/types/flash-sale.admin";
import { mockFlashSales } from "@/features/marketing/mocks/flash-sale.mock";
export const flashSaleService = {
  async getFlashSales(): Promise<FlashSale[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFlashSales), 200));
  },
  async createFlashSale(data: TFlashSalePayload): Promise<FlashSale> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id: Date.now().toString(),
      name: data.name,
      startTime: data.startTime.toString(),
      endTime: data.endTime.toString(),
      productsCount: 0,
      status: "Sắp diễn ra",
      revenue: "0 ₫"
    };
  },
  async updateFlashSale(id: string, data: TFlashSalePayload): Promise<FlashSale> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id,
      name: data.name,
      startTime: data.startTime.toString(),
      endTime: data.endTime.toString(),
      productsCount: 0,
      status: "Sắp diễn ra",
      revenue: "0 ₫"
    };
  },
};





