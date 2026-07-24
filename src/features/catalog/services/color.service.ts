import { TColorPayload } from "../schemas/color.schema";
import { Color } from "@/features/catalog/types/color.admin";
import { mockColors } from "@/features/catalog/mocks/color.mock";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const colorService = {
  async getColors(): Promise<Color[]> {
    await delay(200);
    return mockColors;
  },
  async createColor(data: TColorPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateColor(id: string, data: TColorPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





