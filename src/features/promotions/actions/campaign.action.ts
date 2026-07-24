"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { CampaignSchema, TCampaignPayload } from "../schemas/campaign.schema";
import { promotionService } from "../services/promotion.service";

export async function createCampaignAction(data: TCampaignPayload) {
  const validated = CampaignSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await promotionService.createCampaign(validated.data);
    revalidatePath('/promotions');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi t?o campaign" };
  }
}

export async function updateCampaignAction(id: string | number, data: TCampaignPayload) {
  const validated = CampaignSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  try {
    const res = await promotionService.updateCampaign(Number(id), validated.data);
    revalidatePath('/promotions');
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "L?i h? th?ng khi c?p nh?t campaign" };
  }
}



