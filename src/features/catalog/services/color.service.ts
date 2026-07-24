import { Color } from "@/features/catalog/types/color.admin";
import { mockColors } from "@/features/catalog/mocks/color.mock";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const colorService = {
  async getColors(): Promise<Color[]> {
    await delay(200);
    return mockColors;
  }
};
