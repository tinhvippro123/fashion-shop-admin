import { useState, useEffect } from 'react';
import { Campaign } from '../types/promotion.admin';
import { promotionService } from '../services/promotion.service';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      setIsLoading(true);
      try {
        const data = await promotionService.getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chiến dịch:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCampaigns();
  }, []);

  return { campaigns, isLoading, setCampaigns };
}
