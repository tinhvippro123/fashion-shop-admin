import { useState, useEffect } from 'react';
import { Review } from '../types/review.admin';
import { reviewService } from '../services/review.service';
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await reviewService.getReviews();
        setReviews(data);
      } finally { setIsLoading(false); }
    }
    fetchReviews();
  }, []);
  return { reviews, isLoading };
}
