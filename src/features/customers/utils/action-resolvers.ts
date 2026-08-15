export type CustomerAction = 'VIEW' | 'RESTORE' | 'BAN' | 'PERMANENT_DELETE' | 'UNBAN' | 'CANNOT_DELETE_BANNED';

import { Customer } from "../types/customer.admin";

export function getCustomerActions(customer: Partial<Customer>, viewState: { isPendingView: boolean, isUnverifiedView: boolean, isBannedView: boolean }): CustomerAction[] {
  const actions: CustomerAction[] = ['VIEW'];

  if (viewState.isPendingView) {
    actions.push('RESTORE', 'BAN');
  } else if (viewState.isUnverifiedView) {
    actions.push('PERMANENT_DELETE');
  } else if (viewState.isBannedView) {
    actions.push('UNBAN', 'CANNOT_DELETE_BANNED');
  } else {
    actions.push('BAN');
  }

  return actions;
}
