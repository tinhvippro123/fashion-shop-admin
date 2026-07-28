"use client";

﻿import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CampaignTable } from "@/features/promotions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Chương trình Khuyến mãi</h2>
          <p className="text-muted-foreground text-sm hidden sm:block">Quản lý các chiến dịch giảm giá hàng loạt (Promotion Campaigns).</p>
        </div>
        <Link href="/promotions/create">
          <Button className="">
            <Plus className="mr-2 h-4 w-4" /> Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Đang hoạt động (3)</TabsTrigger>
          <TabsTrigger value="trash">Thùng rác (2)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="m-0">
          <CampaignTable />
        </TabsContent>
        <TabsContent value="trash" className="m-0">
          <CampaignTable isTrashView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
