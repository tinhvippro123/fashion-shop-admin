export type OrderAction = 'VIEW' | 'APPROVE' | 'CANCEL' | 'PRINT' | 'HANDOVER' | 'COMPLETE' | 'REFUND' | 'CREATE_RETURN';

import { Order } from "../types/order.admin";
import { ReturnRequest } from "../mocks/return.mock";

export function getOrderActions(order: Order): OrderAction[] {
  const actions: OrderAction[] = ['VIEW'];

  switch (order.status) {
    case 'PENDING':
      actions.push('APPROVE', 'CANCEL');
      break;
    case 'PROCESSING':
      actions.push('PRINT', 'HANDOVER', 'CANCEL');
      break;
    case 'SHIPPING':
      actions.push('COMPLETE');
      break;
    case 'COMPLETED':
      actions.push('PRINT', 'CREATE_RETURN');
      break;
    case 'CANCELLED':
      if (order.payment !== 'COD') {
        actions.push('REFUND');
      }
      break;
  }

  return actions;
}

export type ReturnAction = 'VIEW' | 'APPROVE' | 'REJECT' | 'RECEIVE' | 'FRAUD' | 'PRINT';

export function getReturnActions(returnRequest: ReturnRequest): ReturnAction[] {
  const actions: ReturnAction[] = ['VIEW'];

  switch (returnRequest.status) {
    case 'PENDING':
      actions.push('APPROVE', 'REJECT');
      break;
    case 'RETURNING':
      actions.push('RECEIVE', 'FRAUD');
      break;
    case 'COMPLETED':
      actions.push('PRINT');
      break;
  }

  return actions;
}
