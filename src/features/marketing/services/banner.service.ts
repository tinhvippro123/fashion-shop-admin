import { Banner } from "@/features/marketing/types/banner.admin";
import { mockBanners } from "@/features/marketing/mocks/banner.mock";
export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockBanners), 200));
  }
};
