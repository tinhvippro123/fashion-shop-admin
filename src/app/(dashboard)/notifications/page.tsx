"use client";

import { Button } from "@/shared/ui/button";
import { CheckCircle2 } from "lucide-react";
import { NotificationList } from "@/features/marketing";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tất cả thông báo</h2>
          <p className="text-zinc-500">Quản lý và theo dõi các hoạt động trên hệ thống.</p>
        </div>
        <Button variant="outline" className="shrink-0">
          <CheckCircle2 className="mr-2 h-4 w-4 text-zinc-500" />
          Đánh dấu đã đọc tất cả
        </Button>
      </div>

      <NotificationList />
    </div>
  );
}
