import { TPagePayload } from "../schemas/page.schema";
import { Page } from "@/features/content/types/page.admin";
import { mockPages } from "@/features/content/mocks/page.mock";
export const pageService = {
  async getPages(): Promise<Page[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPages), 200));
  },
  async createPage(data: TPagePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updatePage(id: number, data: TPagePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





