import { Contact } from '../types/contact.admin';
import { mockContacts } from '../mocks/contact.mock';
export const contactService = {
  async getContacts(): Promise<Contact[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockContacts), 200));
  }
};
