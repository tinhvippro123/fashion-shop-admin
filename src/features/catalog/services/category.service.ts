import { TCategoryPayload } from "../schemas/category.schema";
import { Category } from "@/features/catalog/types/category";
import { initialCategories } from "@/features/catalog/mocks/category.mock";

// Giả lập API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const categoryService = {
  /**
   * Lấy danh sách toàn bộ danh mục
   */
  async getCategories(): Promise<Category[]> {
    await delay(500); // Giả lập network latency
    return initialCategories;
  },

  /**
   * Lấy chi tiết một danh mục theo ID
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    await delay(300);
    return initialCategories.find(c => c.id === id);
  },

  // Các hàm tương lai: createCategory, updateCategory, deleteCategory...

  async createCategory(data: TCategoryPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now().toString(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateCategory(id: string, data: TCategoryPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





