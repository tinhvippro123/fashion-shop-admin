export interface ReviewUser {
  name: string;
  avatar: string;
  initial: string;
}
export interface ReviewProduct {
  id: string;
  name: string;
}
export interface Review {
  id: string;
  user: ReviewUser;
  product: ReviewProduct;
  rating: number;
  comment: string;
  date: string;
  status: string;
}
