import { Review } from "@/features/reviews/types/review.types";
import { MOCK_REVIEWS } from "@/features/reviews/mocks/review.mock";
export const reviewService = {
  async getReviews(): Promise<Review[]> {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_REVIEWS), 200));
  }
};





