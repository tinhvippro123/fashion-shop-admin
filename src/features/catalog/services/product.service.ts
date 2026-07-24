import { TProductPayload } from "../schemas/product.schema";
import { Product } from "@/features/catalog/types/product.admin";
import { initialProducts } from "@/features/catalog/mocks/product.mock";

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

  async createProduct(data: TProductPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now().toString(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateProduct(id: string, data: TProductPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





