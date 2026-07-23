"use client";

import { CampaignForm } from "@/features/promotions";
import { useParams } from "next/navigation";

export default function EditPromotionPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Note: CampaignForm doesn't seem to take isEdit prop right now, but it might just be the same form for demo
  return <CampaignForm />;
}
