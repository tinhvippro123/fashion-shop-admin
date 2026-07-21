"use client";

import { OrderDetailView } from "@/features/orders";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetailView orderId={params.id} />;
}
