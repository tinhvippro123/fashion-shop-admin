import { Review } from '../types/review.admin';
import { mockReviews } from '../mocks/review.mock';
export const reviewService = {
  async getReviews(): Promise<Review[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockReviews), 200));
  }
};
