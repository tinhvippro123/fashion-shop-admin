import { Campaign, Voucher } from '../types/promotion.admin';
import { mockCampaigns, mockVouchers } from '../mocks/promotion.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const promotionService = {
  /**
   * Lấy danh sách các chiến dịch khuyến mãi (Campaigns)
   */
  async getCampaigns(): Promise<Campaign[]> {
    await delay(500); // Giả lập network latency
    return mockCampaigns;
  },

  /**
   * Lấy danh sách các mã giảm giá (Vouchers)
   */
  async getVouchers(): Promise<Voucher[]> {
    await delay(400); // Giả lập network latency
    return mockVouchers;
  },
};
