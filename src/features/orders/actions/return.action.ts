"use server";

import { revalidatePath } from "next/cache";
// z import removed since it's not used here
import { FraudReportSchema, RejectReturnSchema, TFraudReportPayload, TRejectReturnPayload } from "../schemas/return.schema";

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: Record<string, string[]>;
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function approveReturnAction(id: string): Promise<ActionResponse> {
  await delay(800);
  
  // Here we would normally update the DB: 
  // UPDATE returns SET status = 'RETURNING' WHERE id = id
  
  revalidatePath('/orders');
  revalidatePath(`/orders/returns/${id}`);
  
  return { success: true };
}

export async function rejectReturnAction(id: string, payload: TRejectReturnPayload): Promise<ActionResponse> {
  await delay(800);
  
  const validated = RejectReturnSchema.safeParse(payload);
  if (!validated.success) {
    return {
      success: false,
      error: "Dữ liệu không hợp lệ.",
      details: validated.error.flatten().fieldErrors,
    };
  }
  
  // Here we would normally update the DB: 
  // UPDATE returns SET status = 'REJECTED', rejectReason = payload.reason WHERE id = id
  
  revalidatePath('/orders');
  revalidatePath(`/orders/returns/${id}`);
  
  return { success: true };
}

export async function receiveReturnAction(id: string): Promise<ActionResponse> {
  await delay(1200); // Simulate inventory update delay
  
  // Here we would normally update the DB: 
  // UPDATE returns SET status = 'COMPLETED' WHERE id = id
  // and trigger inventory adjustments
  
  revalidatePath('/orders');
  revalidatePath(`/orders/returns/${id}`);
  
  return { success: true };
}

export async function reportFraudAction(id: string, payload: TFraudReportPayload): Promise<ActionResponse> {
  await delay(1000);
  
  const validated = FraudReportSchema.safeParse(payload);
  if (!validated.success) {
    return {
      success: false,
      error: "Dữ liệu không hợp lệ.",
      details: validated.error.flatten().fieldErrors,
    };
  }
  
  // Here we would normally update the DB: 
  // UPDATE returns SET status = 'REJECTED', fraudReason = payload.reason, fraudEvidence = payload.evidenceUrl WHERE id = id
  
  revalidatePath('/orders');
  revalidatePath(`/orders/returns/${id}`);
  
  return { success: true };
}
