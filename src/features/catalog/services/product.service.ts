import { Product } from '../types/product.admin';
import { initialProducts } from '../mocks/product.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  /**
   * Lấy danh sách sản phẩm
   */
  async getProducts(): Promise<Product[]> {
    await delay(500); // Giả lập network latency
    return initialProducts;
  },

  /**
   * Lấy chi tiết một sản phẩm theo ID
   */
  async getProductById(id: string): Promise<Product | undefined> {
    await delay(300);
    return initialProducts.find(p => p.id === id);
  },

  // Các hàm tương lai: createProduct, updateProduct, deleteProduct...
};
