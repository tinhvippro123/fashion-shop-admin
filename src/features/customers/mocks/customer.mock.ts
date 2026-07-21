import { Customer } from "@/features/customers/types/customer.admin";

export const mockCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987 654 321",
    orders: 12,
    totalSpent: "15,500,000 đ",
    status: "VIP",
  },
  {
    id: "CUS-002",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0912 345 678",
    orders: 3,
    totalSpent: "2,850,000 đ",
    status: "Thành viên",
  },
  {
    id: "CUS-003",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0933 444 555",
    orders: 1,
    totalSpent: "950,000 đ",
    status: "Mới",
  },
  {
    id: "CUS-004",
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    phone: "0966 777 888",
    orders: 5,
    totalSpent: "6,200,000 đ",
    status: "Thành viên",
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
  }
};
