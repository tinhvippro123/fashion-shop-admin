"use client";

import { BackButton } from "@/shared/ui/back-button";
import { toast } from "sonner";
import Link from "next/link";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
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
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <Link href="/flash-sales" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
            Hủy
          </Link>
          <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => toast.success("Đã lưu nháp chương trình Flash Sale!")}>Lưu nháp</Button>
          <Button className="flex-1 sm:flex-none gap-2" onClick={() => toast.success("Đã cập nhật chương trình Flash Sale thành công!")}>
            <Zap className="h-4 w-4" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <FlashSaleForm isEdit={true} />
    </div>
  );
}
