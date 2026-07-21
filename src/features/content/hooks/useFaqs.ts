import { useState, useEffect } from 'react';
import { Faq } from '../types/faq.admin';
import { faqService } from '../services/faq.service';
export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await faqService.getFaqs();
        setFaqs(data);
      } finally { setIsLoading(false); }
    }
    fetchFaqs();
  }, []);
  return { faqs, isLoading };
}
