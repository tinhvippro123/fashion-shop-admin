import { ReturnStatus } from "../types/order.admin";

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  reason: string;
  status: ReturnStatus;
  refundAmount: string;
}

export const mockReturnRequests: ReturnRequest[] = [
  {
    id: "RET-001",
    orderId: "ORD-045",
    customerName: "Nguyễn Văn A",
    date: "18/07/2026",
    reason: "Sản phẩm không vừa size",
    status: "PENDING",
    refundAmount: "450,000đ"
  },
  {
    id: "RET-002",
    orderId: "ORD-021",
    customerName: "Trần Thị B",
    date: "17/07/2026",
    reason: "Giao sai màu",
    status: "RETURNING",
    refundAmount: "1,200,000đ"
  },
  {
    id: "RET-003",
    orderId: "ORD-089",
    customerName: "Lê Văn C",
    date: "15/07/2026",
    reason: "Hàng bị lỗi đường chỉ",
    status: "COMPLETED",
    refundAmount: "350,000đ"
  },
  {
    id: "RET-004",
    orderId: "ORD-102",
    customerName: "Phạm D",
    date: "12/07/2026",
    reason: "Cố tình cắt rách áo",
    status: "REJECTED",
    refundAmount: "0đ"
  }
];
