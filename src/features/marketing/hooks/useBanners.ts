import { useState, useEffect } from 'react';
import { Banner } from "@/features/marketing/types/banner.admin";
import { bannerService } from "@/features/marketing/services/banner.service";
export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await bannerService.getBanners();
        setBanners(data);
      } finally { setIsLoading(false); }
    }
    fetchBanners();
  }, []);
  return { banners, isLoading };
}
