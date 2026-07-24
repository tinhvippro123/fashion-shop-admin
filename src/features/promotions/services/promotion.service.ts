import { TCampaignPayload } from "../schemas/campaign.schema";
import { Campaign, Voucher } from "@/features/promotions/types/promotion.admin";
import { mockCampaigns, mockVouchers } from "@/features/promotions/mocks/promotion.mock";

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

  async createCampaign(data: TCampaignPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateCampaign(id: number, data: TCampaignPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};






