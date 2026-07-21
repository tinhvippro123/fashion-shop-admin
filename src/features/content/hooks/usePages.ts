import { useState, useEffect } from 'react';
import { Page } from '../types/page.admin';
import { pageService } from '../services/page.service';
export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchPages() {
      try {
        const data = await pageService.getPages();
        setPages(data);
      } finally { setIsLoading(false); }
    }
    fetchPages();
  }, []);
  return { pages, isLoading };
}
