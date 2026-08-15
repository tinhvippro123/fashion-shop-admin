import { Campaign, Voucher } from "../types/promotion.admin";

export type ActionType = 
  | 'VIEW' 
  | 'DUPLICATE' 
  | 'EDIT' 
  | 'DELETE' 
  | 'END_EARLY' 
  | 'START_NOW'
  | 'CANCEL'
  | 'RESTORE' 
  | 'PERMANENT_DELETE';

export function getVoucherActions(voucher: Pick<Voucher, 'status' | 'quantity'>, isTrashView: boolean): ActionType[] {
  if (isTrashView) {
    const actions: ActionType[] = ['RESTORE'];
    // Assuming quantity string is something like "0 / 100", parsing the first part
    const usedQuantity = parseInt(voucher.quantity.split(" / ")[0]);
    if (usedQuantity === 0) {
      actions.push('PERMANENT_DELETE');
    }
    return actions;
  }

  const actions: ActionType[] = ['VIEW', 'DUPLICATE'];

  switch (voucher.status) {
    case "Sắp diễn ra":
      actions.push('EDIT', 'DELETE', 'START_NOW');
      break;
    case "Đang diễn ra":
      actions.push('EDIT', 'END_EARLY');
      break;
    case "Đã kết thúc":
      // No extra actions needed
      break;
  }

  return actions;
}

export function getCampaignActions(campaign: Pick<Campaign, 'status' | 'usageCount'>, isTrashView: boolean): ActionType[] {
  if (isTrashView) {
    const actions: ActionType[] = ['RESTORE'];
    if (!campaign.usageCount || campaign.usageCount === 0) {
      actions.push('PERMANENT_DELETE');
    }
    return actions;
  }

  const actions: ActionType[] = ['VIEW', 'DUPLICATE'];

  switch (campaign.status) {
    case "Sắp diễn ra":
      actions.push('EDIT', 'START_NOW', 'CANCEL');
      break;
    case "Đang diễn ra":
      actions.push('EDIT', 'END_EARLY');
      break;
    case "Đã kết thúc":
    case "Tạm dừng":
    case "Đã hủy":
      // No extra actions needed for ended/paused/canceled campaigns
      break;
  }

  return actions;
}
