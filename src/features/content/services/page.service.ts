import { TPagePayload } from "../schemas/page.schema";
import { Page } from "@/features/content/types/page.admin";
import { mockPages } from "@/features/content/mocks/page.mock";
export const pageService = {
  async getPages(): Promise<Page[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPages), 200));
  },
  async createPage(data: TPagePayload): Promise<Page> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id: Date.now().toString(),
      title: data.title,
      slug: data.slug || "new-page",
      status: data.status === "published" ? 'Đã xuất bản' : 'Bản nháp',
      updatedAt: new Date().toISOString().split("T")[0]
    };
  },
  async updatePage(id: number, data: TPagePayload): Promise<Page> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id: id.toString(),
      title: data.title,
      slug: data.slug || "updated-page",
      status: data.status === "published" ? 'Đã xuất bản' : 'Bản nháp',
      updatedAt: new Date().toISOString().split("T")[0]
    };
  },
};





