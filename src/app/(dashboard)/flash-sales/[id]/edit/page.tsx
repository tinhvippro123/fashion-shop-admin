"use client";

import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Zap } from "lucide-react";
import { FlashSaleForm } from "@/features/marketing";

export default function EditFlashSalePage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
        <div className="flex items-start sm:items-center gap-2 sm:gap-4">
          <div className="mt-1 sm:mt-0"><BackButton /></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chỉnh sửa Flash Sale</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Cập nhật thông tin và sản phẩm tham gia.</p>
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <Button variant="ghost" className="flex-1 sm:flex-none">Hủy</Button>
          <Button variant="outline" className="flex-1 sm:flex-none">Lưu nháp</Button>
          <Button className="gap-2 w-full sm:w-auto">
            <Zap className="h-4 w-4" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <FlashSaleForm isEdit={true} />
    </div>
  );
}
