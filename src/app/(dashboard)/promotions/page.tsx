import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CampaignTable } from "@/features/promotions";

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Chương trình Khuyến mãi</h2>
          <p className="text-zinc-500 text-sm hidden sm:block">Quản lý các chiến dịch giảm giá hàng loạt (Promotion Campaigns).</p>
        </div>
        <Link href="/promotions/create">
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Plus className="mr-2 h-4 w-4" /> Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <CampaignTable />
    </div>
  );
}
