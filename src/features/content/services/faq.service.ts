import { Faq } from "@/features/content/types/faq.admin";
import { mockFaqs } from "@/features/content/mocks/faq.mock";
export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFaqs), 200));
  }
};
