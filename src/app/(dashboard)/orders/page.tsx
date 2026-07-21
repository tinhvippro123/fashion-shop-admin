"use client";

import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
import { OrderTable } from "@/features/orders";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đơn hàng</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý và theo dõi trạng thái đơn hàng của khách.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Xuất dữ liệu
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <OrderTable />
    </div>
  );
}
