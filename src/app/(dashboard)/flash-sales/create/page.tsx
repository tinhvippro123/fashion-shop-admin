import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Zap } from "lucide-react";
import { FlashSaleForm } from "@/features/marketing";

export default function CreateFlashSalePage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tạo Flash Sale Mới</h2>
            <p className="text-zinc-500">Thiết lập khung giờ và chọn sản phẩm chạy giá sốc.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Hủy</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Zap className="h-4 w-4" /> Kích hoạt chiến dịch
          </Button>
        </div>
      </div>

      <FlashSaleForm />
    </div>
  );
}
