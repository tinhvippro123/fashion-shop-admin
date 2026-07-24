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

  // Pass to service
  // await promotionService.createCampaign(validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving campaign via service:", validated.data);
  revalidatePath('/promotions');
  return { success: true, data: validated.data };
}

export async function updateCampaignAction(id: string | number, data: TCampaignPayload) {
  const validated = CampaignSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  // Pass to service
  // await promotionService.updateCampaign(id as string, validated.data);
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating campaign ${id} via service:`, validated.data);
  revalidatePath('/promotions');
  return { success: true, data: validated.data };
}
