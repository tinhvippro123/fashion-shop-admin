import { Customer } from "@/features/customers/types/customer.admin";

export const mockCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987 654 321",
    orders: 12,
    totalSpent: "15,500,000 đ",
    tier: "VIP",
    accountStatus: "ACTIVE",
    ipAddress: "118.69.252.12",
    deviceId: "iPhone 14 Pro Max - iOS 16.5",
  },
  {
    id: "CUS-002",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0912 345 678",
    orders: 3,
    totalSpent: "2,850,000 đ",
    tier: "Thành viên",
    accountStatus: "ACTIVE",
    ipAddress: "14.161.45.10",
    deviceId: "MacBook Air M1 - Safari",
  },
  {
    id: "CUS-003",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0933 444 555",
    orders: 1,
    totalSpent: "950,000 đ",
    tier: "Mới",
    accountStatus: "UNVERIFIED",
    ipAddress: "118.69.252.12",
    deviceId: "iPhone 14 Pro Max - iOS 16.5"
  },
  {
    id: "CUS-004",
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    phone: "0966 777 888",
    orders: 5,
    totalSpent: "6,200,000 đ",
    tier: "Thành viên",
    accountStatus: "BANNED",
    ipAddress: "14.161.22.33",
    deviceId: "iPhone 15 Pro Max - Safari",
  },
  {
    id: "CUS-005",
    name: "Tài Khoản Rác 1",
    email: "spam123@gmail.com",
    phone: "0123 456 789",
    orders: 0,
    totalSpent: "0 đ",
    tier: "Mới",
    accountStatus: "BANNED",
    deletedAt: "2026-07-28T10:00:00Z",
    deletedBy: "ADMIN",
    ipAddress: "113.190.22.11",
    deviceId: "Xiaomi Redmi Note 12"
  },
  {
    id: "CUS-006",
    name: "Trương Văn E",
    email: "truongvane@gmail.com",
    phone: "0911 222 333",
    orders: 2,
    totalSpent: "1,500,000 đ",
    tier: "Thành viên",
    accountStatus: "ACTIVE",
    deletedAt: "2026-07-25T08:30:00Z", // Có đơn hàng nhưng bị xóa mềm
    deletedBy: "USER", // Khách tự yêu cầu xóa
    ipAddress: "118.69.252.12",
    deviceId: "MacBook Air M1 - macOS Sonoma"
  },
];

export const mockCustomerDetails: Record<string, Partial<Customer>> = {
  "CUS-001": {
    joinedDate: "12/05/2023",
    totalOrders: 12,
    totalSpent: "15,400,000 đ",
    addresses: [
      {
        id: 1,
        isDefault: true,
        address: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
        phone: "0912 345 678"
      },
      {
        id: 2,
        isDefault: false,
        address: "Tòa nhà Bitexco, Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP.HCM",
        phone: "0988 777 666"
      }
    ],
    orderHistory: [
      {
        id: "ORD-015",
        date: "15/07/2026",
        status: "Đã giao hàng",
        total: "1,200,000 đ",
        items: 2
      },
      {
        id: "ORD-008",
        date: "02/06/2026",
        status: "Đã giao hàng",
        total: "850,000 đ",
        items: 1
      }
    ]
  },
  "CUS-004": {
    joinedDate: "10/01/2026",
    totalOrders: 5,
    totalSpent: "6,200,000 đ",
    ipAddress: "14.161.22.33",
    deviceId: "iPhone 15 Pro Max - Safari",
    addresses: [
      {
        id: 3,
        isDefault: true,
        address: "456 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM",
        phone: "0966 777 888"
      }
    ],
    orderHistory: [
      {
        id: "ORD-020",
        date: "25/07/2026",
        status: "Đã hủy (Boom hàng)",
        total: "4,500,000 đ",
        items: 3
      },
      {
        id: "ORD-018",
        date: "22/07/2026",
        status: "Đã hủy (Boom hàng)",
        total: "1,700,000 đ",
        items: 1
      }
    ]
  }
};
