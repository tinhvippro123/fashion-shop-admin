import { useState, useEffect } from 'react';
import { Customer } from '../types/customer.admin';
import { customerService } from '../services/customer.service';

export function useCustomerDetail(id: string) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomer() {
      setIsLoading(true);
      try {
        const data = await customerService.getCustomerById(id);
        setCustomer(data || null);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết khách hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  return { customer, isLoading, setCustomer };
}
