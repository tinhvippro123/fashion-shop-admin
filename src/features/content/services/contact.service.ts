import { Contact } from "@/features/content/types/contact.admin";
import { mockContacts } from "@/features/content/mocks/contact.mock";
export const contactService = {
  async getContacts(): Promise<Contact[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockContacts), 200));
  }
};
