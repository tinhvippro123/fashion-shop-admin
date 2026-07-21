"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Tag,
  Palette,
  Ruler,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  FileText,
  Gift,
  Star,
  Shield,
  Megaphone,
  BarChart3,
  Zap,
  Newspaper,
  Award,
  RefreshCcw,
  PackageOpen
} from "lucide-react";
import Image from "next/image";

const navGroups = [
  {
    title: "Quản lý chung",
    items: [
      { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
      { name: "Báo cáo", href: "/reports", icon: BarChart3 },
      { name: "Đơn hàng", href: "/orders", icon: ShoppingCart },
      { name: "Đổi trả hàng", href: "/orders/returns", icon: RefreshCcw },
      { name: "Sản phẩm", href: "/products", icon: Package },
      { name: "Khách hàng", href: "/customers", icon: Users },
      { name: "Đánh giá", href: "/reviews", icon: Star },
    ]
  },
  {
    title: "Khuyến mãi & Marketing",
    items: [
      { name: "Mã giảm giá", href: "/vouchers", icon: Gift },
      { name: "Khuyến mãi", href: "/promotions", icon: Megaphone },
      { name: "Flash Sale", href: "/flash-sales", icon: Zap },
    ]
  },
  {
    title: "Thuộc tính",
    items: [
      { name: "Danh mục", href: "/categories", icon: Tag },
      { name: "Màu sắc", href: "/colors", icon: Palette },
      { name: "Kích thước", href: "/sizes", icon: Ruler },
    ]
  },
  {
    title: "Nội dung",
    items: [
      { name: "Bài viết", href: "/blogs", icon: Newspaper },
      { name: "Banner", href: "/banners", icon: ImageIcon },
      { name: "Liên hệ", href: "/contacts", icon: MessageSquare },
      { name: "FAQ", href: "/faqs", icon: HelpCircle },
      { name: "Trang tĩnh", href: "/pages", icon: FileText },
    ]
  },
  {
    title: "Hệ thống",
    items: [
      { name: "Điểm thưởng", href: "/loyalty", icon: Award },
      { name: "Nhân viên", href: "/staffs", icon: Shield },
      { name: "Cài đặt", href: "/settings", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo Area */}
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Image src="/logo.png" alt="LUXE" width={100} height={30} className="object-contain" />
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-4 px-3">
          {navGroups.map((group, index) => (
            <div key={index}>
              <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {group.title}
              </h4>
              <div className="grid gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && !(item.href === '/orders' && pathname.startsWith('/orders/returns')));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-zinc-900 text-white" 
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-zinc-500")} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Area (Optional) */}
      <div className="border-t p-4">
        <div className="rounded-md bg-zinc-50 p-4 text-sm text-zinc-500">
          <p className="font-semibold text-zinc-900 mb-1">Cần hỗ trợ?</p>
          <p>Liên hệ bộ phận kỹ thuật để được trợ giúp.</p>
        </div>
      </div>
    </div>
  );
}
