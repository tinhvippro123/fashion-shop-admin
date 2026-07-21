"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Plus, Search, MoreHorizontal, Filter, Megaphone, Calendar, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import Link from "next/link";

const campaigns = [
  {
    id: "PROMO-001",
    name: "Siêu Sale Giữa Năm - 30% All Items",
    discount: "30%",
    duration: "17/07/2026 - 02/08/2026",
    target: "Toàn bộ cửa hàng",
    audience: "Tất cả khách hàng",
    status: "Đang diễn ra",
  },
  {
    id: "PROMO-002",
    name: "Tri Ân Khách VIP - Giảm 50% Hàng Thu Đông",
    discount: "50%",
    duration: "01/09/2026 - 15/09/2026",
    target: "Danh mục: Áo khoác nữ",
    audience: "Hạng: Vàng, Kim Cương",
    status: "Sắp diễn ra",
  },
  {
    id: "PROMO-003",
    name: "Xả Hàng Hè Giá Sốc",
    discount: "VND 100,000",
    duration: "01/06/2026 - 30/06/2026",
    target: "Sản phẩm chọn lọc",
    audience: "Tất cả khách hàng",
    status: "Đã kết thúc",
  },
];

export default function PromotionsPage() {
  const [discountType, setDiscountType] = useState("percent");
  const [audienceType, setAudienceType] = useState("all");
  const [targetType, setTargetType] = useState("all");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Chương trình Khuyến mãi</h2>
          <p className="text-zinc-500 text-sm hidden sm:block">Quản lý các chiến dịch giảm giá hàng loạt (Promotion Campaigns).</p>
        </div>
        <Link href="/promotions/create">
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Plus className="mr-2 h-4 w-4" /> Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm chương trình..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="ml-auto sm:flex hidden">
            <Filter className="mr-2 h-4 w-4" /> Lọc
          </Button>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Tên chiến dịch</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead className="min-w-[200px]">Thời gian</TableHead>
                <TableHead>Sản phẩm / Đối tượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                        <Megaphone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">{camp.name}</p>
                        <p className="text-xs text-zinc-500 mt-1">ID: {camp.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-red-600">-{camp.discount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-zinc-700">{camp.duration}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="bg-zinc-100 text-zinc-700 px-2 py-1 rounded w-fit">{camp.target}</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded w-fit">{camp.audience}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        camp.status === "Đang diễn ra" ? "bg-green-100 text-green-700 border-green-200" :
                        camp.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        "bg-zinc-100 text-zinc-600 border-zinc-200"
                      }
                    >
                      {camp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Sửa chiến dịch</DropdownMenuItem>
                        <DropdownMenuItem>Tạm dừng</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col">
          {campaigns.map((camp) => (
            <div key={camp.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-start justify-between pr-8">
                <div>
                  <h4 className="font-bold text-zinc-900 leading-tight">{camp.name}</h4>
                  <p className="text-xs text-zinc-500 mt-1">ID: {camp.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-xs">Mức giảm:</span>
                  <span className="font-bold text-red-600">-{camp.discount}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-xs">Thời gian:</span>
                  <span className="font-medium text-zinc-700 text-xs">{camp.duration}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1 text-xs">
                 <span className="text-zinc-600">• Áp dụng: <strong>{camp.target}</strong></span>
                 <span className="text-zinc-600">• Đối tượng: <strong>{camp.audience}</strong></span>
              </div>
              <div className="mt-1">
                <Badge 
                      variant="outline" 
                      className={
                        camp.status === "Đang diễn ra" ? "bg-green-100 text-green-700 border-green-200 text-[10px]" :
                        camp.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 border-blue-200 text-[10px]" :
                        "bg-zinc-100 text-zinc-600 border-zinc-200 text-[10px]"
                      }
                    >
                      {camp.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sửa chiến dịch</DropdownMenuItem>
                    <DropdownMenuItem>Tạm dừng</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
