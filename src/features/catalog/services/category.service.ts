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
};
