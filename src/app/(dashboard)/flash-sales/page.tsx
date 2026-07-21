import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import { FlashSaleTable } from "@/features/marketing";

export default function FlashSalesPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Flash Sale</h2>
          <p className="text-zinc-500">Quản lý các khung giờ bán hàng chớp nhoáng.</p>
        </div>
        <Link href="/flash-sales/create">
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <PlusCircle className="h-4 w-4" /> Tạo Khung Giờ Mới
          </Button>
        </Link>
      </div>

      <FlashSaleTable />
    </div>
  );
}
