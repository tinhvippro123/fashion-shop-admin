import { Customer } from '../types/customer.admin';
import { mockCustomers, mockCustomerDetails } from '../mocks/customer.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const customerService = {
  /**
   * Lấy danh sách toàn bộ khách hàng
   */
  async getCustomers(): Promise<Customer[]> {
    await delay(500); // Giả lập network latency
    return mockCustomers;
  },

  /**
   * Lấy chi tiết một khách hàng theo ID
   */
  async getCustomerById(id: string): Promise<Customer | undefined> {
    await delay(300);
    const customerBase = mockCustomers.find(c => c.id === id);
    if (!customerBase) return undefined;
    
    const details = mockCustomerDetails[id] || {};
    return { ...customerBase, ...details };
  },
};
