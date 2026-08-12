import { useState, useEffect } from "react";
import { Review } from "../types/review.types";
import { MOCK_REVIEWS } from "../mocks/review.mock";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setReviews(MOCK_REVIEWS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    reviews,
    setReviews,
    isLoading
  };
}
