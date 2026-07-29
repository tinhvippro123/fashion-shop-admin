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
}

export interface Voucher {
  id: string;
  code: string;
  discountAmount: string;
  minOrderValue: string;
  quantity: string;
  status: string;
  expiry: string;
  deletedAt?: string;
}
