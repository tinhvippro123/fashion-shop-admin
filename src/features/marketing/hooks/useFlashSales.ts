import { useState, useEffect } from 'react';
import { FlashSale } from "@/features/marketing/types/flash-sale.admin";
import { flashSaleService } from "@/features/marketing/services/flash-sale.service";
export function useFlashSales() {
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchFlashSales() {
      try {
        const data = await flashSaleService.getFlashSales();
        setFlashSales(data);
      } finally { setIsLoading(false); }
    }
    fetchFlashSales();
  }, []);
  return { flashSales, isLoading };
}
