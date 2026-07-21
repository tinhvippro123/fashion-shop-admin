import { Staff } from "@/features/staffs/types/staff.admin";

export const mockStaffs: Staff[] = [
  {
    id: "STF-001",
    name: "Lê Thanh Quản",
    email: "admin@fashionshop.com",
    phone: "0901 234 567",
    role: "Quản trị viên",
    status: "Hoạt động",
    avatar: "/avatars/admin.jpg",
    initial: "Q"
  },
  {
    id: "STF-002",
    name: "Phạm Thị Bán Hàng",
    email: "sale@fashionshop.com",
    phone: "0902 345 678",
    role: "Nhân viên Sale",
    status: "Hoạt động",
    avatar: "",
    initial: "S"
  },
  {
    id: "STF-003",
    name: "Nguyễn Văn Content",
    email: "content@fashionshop.com",
    phone: "0903 456 789",
    role: "Nhân viên Content",
    status: "Đã khóa",
    avatar: "",
    initial: "C"
  }
];
