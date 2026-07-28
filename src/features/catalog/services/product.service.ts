import { TProductPayload } from "../schemas/product.schema";
import { Product, IOptionSuggestions } from "@/features/catalog/types/product.admin";
import { initialProducts } from "@/features/catalog/mocks/product.mock";
import { mockOptionSuggestions } from "@/features/catalog/mocks/option.mock";

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

  /**
   * Lấy lịch sử các thuộc tính đã từng nhập (Smart Aggregation)
   */
  async getOptionSuggestions(): Promise<IOptionSuggestions> {
    await delay(200); // Simulate DB query latency
    
    // In a real implementation with Prisma, this would be:
    // const names = await prisma.productOption.findMany({ distinct: ['name'], select: { name: true } });
    // const values = ... (group by option name)
    
    return mockOptionSuggestions;
  },

  // Các hàm tương lai: createProduct, updateProduct, deleteProduct...

  async createProduct(data: TProductPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    await delay(800);
    return { id: Date.now().toString(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  
  async updateProduct(id: string, data: TProductPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};
