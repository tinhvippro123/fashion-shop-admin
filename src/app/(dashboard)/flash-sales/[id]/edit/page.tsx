"use client";

import { FlashSaleForm } from "@/features/marketing";

export default function EditFlashSalePage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full">
      <FlashSaleForm 
        mode="edit" 
        initialData={{
          id: params.id,
          name: "Siêu Sale Nửa Đêm 9/9",
          status: "scheduled",
          startTime: "2026-09-09T00:00",
          endTime: "2026-09-09T04:00",
          items: [
            { variantId: "1", name: "Áo thun form rộng basic", variant: "Đen / Size S", originalPrice: 250000, flashSalePrice: 99000, quantityLimit: 50, stock: 100 },
          ]
        }}
      />
    </div>
  );
}
