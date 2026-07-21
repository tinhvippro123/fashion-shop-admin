import { useState, useEffect } from 'react';
import { Staff } from "@/features/staffs/types/staff.admin";
import { staffService } from "@/features/staffs/services/staff.service";

export function useStaffs() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStaffs() {
      setIsLoading(true);
      try {
        const data = await staffService.getStaffs();
        setStaffs(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStaffs();
  }, []);

  return { staffs, isLoading, setStaffs };
}
