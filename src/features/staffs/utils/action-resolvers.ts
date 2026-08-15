export type StaffAction = 'EDIT' | 'TOGGLE_STATUS' | 'DELETE';

import { Staff } from "../types/staff.admin";

export function getStaffActions(staff: Partial<Staff>): StaffAction[] {
  return ['EDIT', 'TOGGLE_STATUS', 'DELETE'];
}
