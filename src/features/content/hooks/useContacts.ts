import { useState, useEffect } from 'react';
import { Contact } from "@/features/content/types/contact.admin";
import { contactService } from "@/features/content/services/contact.service";
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } finally { setIsLoading(false); }
    }
    fetchContacts();
  }, []);
  return { contacts, isLoading };
}
