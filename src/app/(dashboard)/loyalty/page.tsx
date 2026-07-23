"use client";

import { LoyaltySettings } from "@/features/marketing";
import { Button } from "@/shared/ui/button";
import { Save } from "lucide-react";

export default function LoyaltyPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Điểm Thưởng</h2>
          <p className="text-muted-foreground">Cấu hình hệ thống tích điểm và tiêu điểm cho khách hàng trung thành.</p>
        </div>
        <Button className="gap-2 ">
          <Save className="h-4 w-4" /> Lưu cấu hình
        </Button>
      </div>

      <LoyaltySettings />
    </div>
  );
}
