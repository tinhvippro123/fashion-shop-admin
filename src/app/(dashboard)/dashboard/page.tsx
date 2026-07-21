import { DashboardOverview } from "@/features/analytics";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-10 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tổng quan</h2>
        <p className="text-zinc-500">Xem nhanh tình hình kinh doanh của cửa hàng.</p>
      </div>
      
      <DashboardOverview />
    </div>
  );
}
