import { Review } from "@/features/reviews/types/review.admin";
import { mockReviews } from "@/features/reviews/mocks/review.mock";
export const reviewService = {
  async getReviews(): Promise<Review[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockReviews), 200));
  }
};





