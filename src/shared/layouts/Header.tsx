"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/shared/ui/sheet";
import { Sidebar } from "@/shared/layouts/Sidebar";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, UserPlus, Info } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(3);
  const notifications = [
    { id: 1, title: "Đơn hàng mới", message: "Khách hàng Nguyễn Văn A vừa đặt đơn #ORD-123", type: "ORDER", isRead: false, time: "5 phút trước" },
    { id: 2, title: "Khách hàng mới", message: "Trần Thị B vừa đăng ký tài khoản", type: "USER", isRead: false, time: "1 giờ trước" },
    { id: 3, title: "Đơn hàng hoàn tất", message: "Đơn hàng #ORD-099 đã giao thành công", type: "ORDER", isRead: false, time: "2 giờ trước" },
    { id: 4, title: "Cảnh báo hệ thống", message: "Sản phẩm Áo thun trắng sắp hết hàng", type: "SYSTEM", isRead: true, time: "1 ngày trước" },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'ORDER': return <ShoppingBag className="h-4 w-4 text-blue-600" />;
      case 'USER': return <UserPlus className="h-4 w-4 text-green-600" />;
      default: return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-card px-6">
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger className="flex h-10 w-10 -ml-2.5 items-center justify-center rounded-md hover:bg-muted outline-none">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 items-center gap-4">
        {/* Search Bar */}
        <form className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm mã đơn hàng, khách hàng..."
              className="w-full appearance-none bg-muted/50 pl-8 shadow-none md:w-[300px] lg:w-[400px]"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-zinc-900">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white border-2 border-card">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Toggle notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[380px] p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold text-sm">Thông báo mới</h3>
              <button className="text-xs text-blue-600 hover:underline">Đánh dấu đã đọc tất cả</button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className={`flex items-start gap-3 p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50/50' : ''}`}>
                  <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${!notif.isRead ? 'bg-card shadow-sm' : 'bg-muted'}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm ${!notif.isRead ? 'font-semibold text-foreground' : 'text-foreground'}`}>{notif.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  {!notif.isRead && (
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-600"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <Link href="/notifications" className="text-sm text-muted-foreground hover:text-foreground font-medium">Xem tất cả thông báo</Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-zinc-900">
            <Avatar className="h-8 w-8">
                <AvatarImage src="/logo.png" alt={session?.user?.name || "Admin"} />
                <AvatarFallback>{session?.user?.name ? session.user.name.charAt(0) : "AD"}</AvatarFallback>
              </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{session?.user?.name || "Admin LUXE"}</DropdownMenuLabel>
              <div className="px-2 pb-2 text-xs text-muted-foreground">{session?.user?.email}</div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
            <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <span className="w-full text-red-600 cursor-pointer">Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
