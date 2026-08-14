import { useState, useEffect } from 'react';

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}

export function useColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchColors() {
      try {
        setColors([{ id: '1', name: 'Đỏ', hexCode: '#FF0000' }]);
      } finally { setIsLoading(false); }
    }
    fetchColors();
  }, []);
  
  return { colors, isLoading };
}
