import { useState, useEffect } from 'react';
import { Customer } from "@/features/customers/types/customer.admin";
import { customerService } from "@/features/customers/services/customer.service";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      try {
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khách hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCustomers();
  }, []);

  return { customers, isLoading, setCustomers };
}
