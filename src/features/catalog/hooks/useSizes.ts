import { useState, useEffect } from 'react';
import { Size } from "@/features/catalog/types/size.admin";
import { sizeService } from "@/features/catalog/services/size.service";
export function useSizes() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchSizes() {
      try {
        const data = await sizeService.getSizes();
        setSizes(data);
      } finally { setIsLoading(false); }
    }
    fetchSizes();
  }, []);
  return { sizes, isLoading };
}
