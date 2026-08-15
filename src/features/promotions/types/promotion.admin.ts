export interface Campaign {
  id: string;
  name: string;
  discount: string;
  duration: string;
  target: string;
  audience: string;
  status: string;
  usageCount?: number;
  deletedAt?: string;
  endedReason?: "expired" | "out_of_stock" | "early";
}

export interface Voucher {
  id: string;
  code: string;
  discountAmount: string;
  minOrderValue: string;
  quantity: string; // e.g., "100 / 1000"
  status: "Đang diễn ra" | "Sắp diễn ra" | "Đã kết thúc";
  duration: string; // e.g., "17/07/2026 - 30/08/2026"
  deletedAt?: string;
  endedReason?: "expired" | "out_of_stock" | "early";
}
