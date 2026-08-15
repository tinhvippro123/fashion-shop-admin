export type ReviewAction = 'VIEW_DETAILS' | 'TOGGLE_HIDE' | 'SOFT_DELETE' | 'RESTORE' | 'PERMANENT_DELETE';

import { Review } from "../types/review.types";

export function getReviewActions(review: Partial<Review>, context: { isTrashView?: boolean }): ReviewAction[] {
  const actions: ReviewAction[] = ['VIEW_DETAILS'];
  
  if (context.isTrashView) {
    actions.push('RESTORE', 'PERMANENT_DELETE');
  } else {
    actions.push('TOGGLE_HIDE', 'SOFT_DELETE');
  }
  
  return actions;
}
