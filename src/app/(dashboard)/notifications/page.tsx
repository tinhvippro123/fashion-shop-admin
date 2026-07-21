"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Search, Filter, ShoppingBag, UserPlus, Info, Check, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Đơn hàng mới", message: "Khách hàng Nguyễn Văn A vừa đặt đơn #ORD-123 trị giá 500,000đ", type: "ORDER", isRead: false, time: "5 phút trước" },
  { id: 2, title: "Khách hàng mới", message: "Trần Thị B vừa đăng ký tài khoản", type: "USER", isRead: false, time: "1 giờ trước" },
  { id: 3, title: "Đơn hàng hoàn tất", message: "Đơn hàng #ORD-099 đã giao thành công", type: "ORDER", isRead: false, time: "2 giờ trước" },
  { id: 4, title: "Cảnh báo hệ thống", message: "Sản phẩm 'Áo sơ mi trắng' sắp hết hàng (còn 2 sản phẩm)", type: "SYSTEM", isRead: true, time: "1 ngày trước" },
  { id: 5, title: "Yêu cầu hoàn tiền", message: "Khách hàng Lê Văn C yêu cầu hoàn tiền cho đơn #ORD-088", type: "ORDER", isRead: true, time: "2 ngày trước" },
  { id: 6, title: "Đánh giá mới", message: "Sản phẩm 'Quần Âu đen' vừa nhận được 1 đánh giá 5 sao", type: "USER", isRead: true, time: "3 ngày trước" },
];

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const getIcon = (type: string) => {
    switch(type) {
      case 'ORDER': return <ShoppingBag className="h-5 w-5 text-blue-600" />;
      case 'USER': return <UserPlus className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-zinc-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'ORDER': return "Đơn hàng";
      case 'USER': return "Khách hàng";
      case 'SYSTEM': return "Hệ thống";
      default: return "Khác";
    }
  };

  // Lọc thông báo
  const filteredNotifs = MOCK_NOTIFICATIONS.filter(notif => {
    if (filterType !== "ALL" && notif.type !== filterType) return false;
    if (filterStatus === "UNREAD" && notif.isRead) return false;
    if (filterStatus === "READ" && !notif.isRead) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
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

      <div className="rounded-md border bg-white overflow-hidden shadow-sm">
        {/* Thanh công cụ (Toolbar) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b bg-zinc-50/50">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm nội dung thông báo..."
              className="pl-8 bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-white hover:bg-zinc-100 h-9 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900">
                <Filter className="mr-2 h-4 w-4" /> Loại: {getTypeLabel(filterType)}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterType("ALL")}>Tất cả</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("ORDER")}>Đơn hàng</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("USER")}>Khách hàng</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("SYSTEM")}>Hệ thống</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-white hover:bg-zinc-100 h-9 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900">
                Trạng thái: {filterStatus === "ALL" ? "Tất cả" : filterStatus === "UNREAD" ? "Chưa đọc" : "Đã đọc"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus("ALL")}>Tất cả</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("UNREAD")}>Chưa đọc</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("READ")}>Đã đọc</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Danh sách thông báo */}
        <div className="flex flex-col">
          {filteredNotifs.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">
              Không tìm thấy thông báo nào phù hợp.
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div key={notif.id} className={`flex items-start gap-4 p-5 border-b last:border-0 hover:bg-zinc-50 transition-colors ${!notif.isRead ? 'bg-blue-50/30' : ''}`}>
                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!notif.isRead ? 'bg-white shadow-sm ring-1 ring-zinc-200' : 'bg-zinc-100'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className={`text-base ${!notif.isRead ? 'font-bold text-zinc-900' : 'font-medium text-zinc-700'}`}>
                      {notif.title}
                    </p>
                    <span className="text-xs font-medium text-zinc-500 flex items-center shrink-0">
                      {notif.time}
                    </span>
                  </div>
                  <p className={`text-sm ${!notif.isRead ? 'text-zinc-700' : 'text-zinc-500'}`}>
                    {notif.message}
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-normal text-zinc-500 uppercase tracking-wider">
                      {getTypeLabel(notif.type)}
                    </Badge>
                  </div>
                </div>
                {!notif.isRead && (
                  <div className="h-2.5 w-2.5 mt-2 rounded-full bg-blue-600 shadow-sm shrink-0"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
