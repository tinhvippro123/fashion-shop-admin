import { Page } from "@/features/content/types/page.admin";
import { mockPages } from "@/features/content/mocks/page.mock";
export const pageService = {
  async getPages(): Promise<Page[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPages), 200));
  }
};
