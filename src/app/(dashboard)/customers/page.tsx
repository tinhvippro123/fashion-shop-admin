"use client";

﻿import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
import { CustomerTable } from "@/features/customers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentTab = searchParams.get("tab") || "active";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    // Use router.push or router.replace based on preference. router.push creates a history stack so "Back" undoes the tab click.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khách hàng</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý thông tin và lịch sử mua hàng của khách hàng.</p>
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

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Đang hoạt động (3)</TabsTrigger>
          <TabsTrigger value="unverified">Chưa xác thực (1)</TabsTrigger>
          <TabsTrigger value="banned">Bị khóa (2)</TabsTrigger>
          <TabsTrigger value="pending">Chờ xóa (2)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="m-0">
          <CustomerTable />
        </TabsContent>
        <TabsContent value="unverified" className="m-0">
          <CustomerTable isUnverifiedView />
        </TabsContent>
        <TabsContent value="banned" className="m-0">
          <CustomerTable isBannedView />
        </TabsContent>
        <TabsContent value="pending" className="m-0">
          <CustomerTable isPendingView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
