"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { CampaignSchema, TCampaignPayload } from "../schemas/campaign.schema";

export async function createCampaignAction(data: TCampaignPayload) {
  const validated = CampaignSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Saving campaign:", validated.data);
  revalidatePath('/promotions');
  return { success: true, data: validated.data };
}

export async function updateCampaignAction(id: string | number, data: TCampaignPayload) {
  const validated = CampaignSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", details: validated.error.flatten().fieldErrors };
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`Updating campaign ${id}:`, validated.data);
  revalidatePath('/promotions');
  return { success: true, data: validated.data };
}
