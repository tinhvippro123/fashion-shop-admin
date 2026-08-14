import { useState, useEffect } from 'react';

export interface Size {
  id: string;
  name: string;
  code: string;
}

export function useSizes() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSizes() {
      try {
        setSizes([{ id: '1', name: 'Size S', code: 'S' }]);
      } finally { setIsLoading(false); }
    }
    fetchSizes();
  }, []);
  
  return { sizes, isLoading };
}
