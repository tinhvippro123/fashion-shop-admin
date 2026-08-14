export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  rating: number; // 1 to 5
  comment: string;
  reply?: string; // Admin's reply
  imageUrl?: string; // Optional image attached by customer
  isHidden: boolean;
  createdAt: string;
  deletedAt?: string;
}
