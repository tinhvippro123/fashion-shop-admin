"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ReviewTable, useReviews } from "@/features/reviews";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { reviews, setReviews, isLoading } = useReviews();

  const allReviews = reviews.filter(r => !r.deletedAt);
  const visibleReviews = reviews.filter((r) => !r.isHidden && !r.deletedAt);
  const hiddenReviews = reviews.filter((r) => r.isHidden && !r.deletedAt);
  const trashReviews = reviews.filter(r => r.deletedAt);

  let displayedReviews = allReviews;
  if (activeTab === "visible") displayedReviews = visibleReviews;
  if (activeTab === "hidden") displayedReviews = hiddenReviews;
  if (activeTab === "trash") displayedReviews = trashReviews;

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đánh giá sản phẩm</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý và kiểm duyệt đánh giá từ khách hàng.</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50 border">
            <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Tất cả ({allReviews.length})
            </TabsTrigger>
            <TabsTrigger value="visible" className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-emerald-700">
              Đang hiển thị ({visibleReviews.length})
            </TabsTrigger>
            <TabsTrigger value="hidden" className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-muted-foreground">
              Đã ẩn ({hiddenReviews.length})
            </TabsTrigger>
            <TabsTrigger value="trash" className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-red-700">
              Thùng rác ({trashReviews.length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* We use a single table and just filter the data, similar to the products page */}
        <ReviewTable 
          reviews={displayedReviews} 
          setReviews={setReviews} 
          isLoading={isLoading} 
          isTrashView={activeTab === 'trash'}
        />
      </Tabs>
    </div>
  );
}
