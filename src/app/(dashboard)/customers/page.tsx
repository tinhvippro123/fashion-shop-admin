"use client";

﻿import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
import { CustomerTable } from "@/features/customers";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khách hàng</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý thông tin và lịch sử mua hàng của khách hàng.</p>
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

      <CustomerTable />
    </div>
  );
}
