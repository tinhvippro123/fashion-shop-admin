"use client";

import { use } from "react";
import { ReturnDetailView } from "@/features/orders";

export default function ReturnDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <ReturnDetailView returnId={resolvedParams.id} />;
}
