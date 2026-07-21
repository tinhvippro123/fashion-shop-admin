import { Size } from "@/features/catalog/types/size.admin";
import { mockSizes } from "@/features/catalog/mocks/size.mock";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const sizeService = {
  async getSizes(): Promise<Size[]> {
    await delay(200);
    return mockSizes;
  }
};
