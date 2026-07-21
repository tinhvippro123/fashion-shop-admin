import { Faq } from '../types/faq.admin';
import { mockFaqs } from '../mocks/faq.mock';
export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFaqs), 200));
  }
};
