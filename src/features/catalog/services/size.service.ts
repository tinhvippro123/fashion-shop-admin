import { TSizePayload } from "../schemas/size.schema";
import { Size } from "@/features/catalog/types/size.admin";
import { mockSizes } from "@/features/catalog/mocks/size.mock";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const sizeService = {
  async getSizes(): Promise<Size[]> {
    await delay(200);
    return mockSizes;
  },
  async createSize(data: TSizePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateSize(id: string, data: TSizePayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





