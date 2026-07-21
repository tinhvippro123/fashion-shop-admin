import { useState, useEffect } from 'react';
import { Voucher } from "@/features/promotions/types/promotion.admin";
import { promotionService } from "@/features/promotions/services/promotion.service";

export function useVouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVouchers() {
      setIsLoading(true);
      try {
        const data = await promotionService.getVouchers();
        setVouchers(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách voucher:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVouchers();
  }, []);

  return { vouchers, isLoading, setVouchers };
}
