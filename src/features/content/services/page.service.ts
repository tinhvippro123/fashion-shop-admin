import { Page } from '../types/page.admin';
import { mockPages } from '../mocks/page.mock';
export const pageService = {
  async getPages(): Promise<Page[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPages), 200));
  }
};
