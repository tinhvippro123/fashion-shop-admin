import { Banner } from '../types/banner.admin';
import { mockBanners } from '../mocks/banner.mock';
export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockBanners), 200));
  }
};
