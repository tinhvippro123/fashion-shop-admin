import { useState, useEffect } from 'react';
import { Contact } from '../types/contact.admin';
import { contactService } from '../services/contact.service';
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
