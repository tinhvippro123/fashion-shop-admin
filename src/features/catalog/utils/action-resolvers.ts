export type CategoryAction = 'EDIT' | 'DELETE' | 'RESTORE' | 'PERMANENT_DELETE';

import { Category } from "../types/category";
import { Product } from "../types/product.admin";

export function getCategoryActions(category: Category, isTrashView: boolean = false): CategoryAction[] {
  if (isTrashView) {
    return ['RESTORE', 'PERMANENT_DELETE'];
  }
  return ['EDIT', 'DELETE'];
}

export type ProductAction = 'EDIT' | 'DELETE' | 'RESTORE' | 'PERMANENT_DELETE' | 'TOGGLE_ACTIVE' | 'RESTOCK';

export function getProductActions(product: Product, isTrashView: boolean = false): ProductAction[] {
  if (isTrashView) {
    return ['RESTORE', 'PERMANENT_DELETE'];
  }
  const actions: ProductAction[] = ['EDIT', 'TOGGLE_ACTIVE'];
  
  if (product.isActive && product.stock === 0) {
    actions.push('RESTOCK');
  }
  
  actions.push('DELETE');
  return actions;
}
