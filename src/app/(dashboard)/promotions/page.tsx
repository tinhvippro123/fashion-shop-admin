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

      <Tabs defaultValue="ALL" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ALL">Tất cả</TabsTrigger>
          <TabsTrigger value="ACTIVE">Đang diễn ra</TabsTrigger>
          <TabsTrigger value="UPCOMING">Sắp diễn ra</TabsTrigger>
          <TabsTrigger value="ENDED">Đã kết thúc</TabsTrigger>
          <TabsTrigger value="TRASH">Thùng rác</TabsTrigger>
        </TabsList>
        <TabsContent value="ALL" className="m-0">
          <CampaignTable viewStatus="Tất cả" />
        </TabsContent>
        <TabsContent value="ACTIVE" className="m-0">
          <CampaignTable viewStatus="Đang diễn ra" />
        </TabsContent>
        <TabsContent value="UPCOMING" className="m-0">
          <CampaignTable viewStatus="Sắp diễn ra" />
        </TabsContent>
        <TabsContent value="ENDED" className="m-0">
          <CampaignTable viewStatus="Đã kết thúc" />
        </TabsContent>
        <TabsContent value="TRASH" className="m-0">
          <CampaignTable isTrashView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
