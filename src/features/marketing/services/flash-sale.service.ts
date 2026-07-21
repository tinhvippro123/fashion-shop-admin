import { FlashSale } from '../types/flash-sale.admin';
import { mockFlashSales } from '../mocks/flash-sale.mock';
export const flashSaleService = {
  async getFlashSales(): Promise<FlashSale[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFlashSales), 200));
  }
};
