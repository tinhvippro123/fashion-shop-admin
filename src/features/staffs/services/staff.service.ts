import { Staff } from '../types/staff.admin';
import { mockStaffs } from '../mocks/staff.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const staffService = {
  /**
   * Lấy danh sách nhân viên
   */
  async getStaffs(): Promise<Staff[]> {
    await delay(300); // Giả lập network latency
    return mockStaffs;
  },
};
