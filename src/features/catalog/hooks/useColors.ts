import { useState, useEffect } from 'react';
import { Color } from "@/features/catalog/types/color.admin";
import { colorService } from "@/features/catalog/services/color.service";
export function useColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchColors() {
      try {
        const data = await colorService.getColors();
        setColors(data);
      } finally { setIsLoading(false); }
    }
    fetchColors();
  }, []);
  return { colors, isLoading };
}
