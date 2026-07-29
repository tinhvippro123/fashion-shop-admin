"use client";

import { ReviewTable } from "@/features/reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đánh giá sản phẩm</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý phản hồi và đánh giá từ khách hàng.</p>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Đang hoạt động (1)</TabsTrigger>
          <TabsTrigger value="trash">Thùng rác (2)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="m-0">
          <ReviewTable />
        </TabsContent>
        <TabsContent value="trash" className="m-0">
          <ReviewTable isTrashView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
