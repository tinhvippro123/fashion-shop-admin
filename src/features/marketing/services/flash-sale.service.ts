import { TFlashSalePayload } from "../schemas/flashsale.schema";
import { FlashSale } from "@/features/marketing/types/flash-sale.admin";
import { mockFlashSales } from "@/features/marketing/mocks/flash-sale.mock";
export const flashSaleService = {
  async getFlashSales(): Promise<FlashSale[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFlashSales), 200));
  },
  async createFlashSale(data: TFlashSalePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateFlashSale(id: number, data: TFlashSalePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





