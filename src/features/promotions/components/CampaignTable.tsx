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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { toast } from "sonner";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

import { useCampaigns } from "@/features/promotions/hooks/useCampaigns";

export function CampaignTable() {
  const { campaigns, isLoading } = useCampaigns();
  const [discountType, setDiscountType] = useState("percent");
  const [audienceType, setAudienceType] = useState("all");
  const [targetType, setTargetType] = useState("all");

  

  return (
    <>      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm chương trình..."
              className="pl-8"
            />
          </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
          </div>
        </div>
        
        {(!isLoading && campaigns.length === 0) ? (
          <EmptyState
            icon={Megaphone}
            title="Chưa có chiến dịch nào"
            description="Hãy tạo chiến dịch khuyến mãi đầu tiên để thu hút khách hàng."
            actionLabel="Tạo chiến dịch mới"
            onAction={() => {}}
          />
        ) : (
          <>
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
              {isLoading ? <TableSkeleton columns={7} /> : (
campaigns.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                        <Megaphone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{camp.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">ID: {camp.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-red-600">-{camp.discount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground">{camp.duration}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="bg-muted text-foreground px-2 py-1 rounded w-fit">{camp.target}</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded w-fit">{camp.audience}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        camp.status === "Đang diễn ra" ? "bg-green-100 text-green-700 border-green-200" :
                        camp.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        "bg-muted text-muted-foreground border-border"
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
                        <DropdownMenuItem render={<Link href={`/promotions/${camp.id}/edit`} className="w-full cursor-pointer" />}>
                          Sửa chiến dịch
                        </DropdownMenuItem>
                        <DropdownMenuItem>Tạm dừng</DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false} className="text-red-600">Xóa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Xác nhận xóa</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-muted-foreground">Bạn có chắc chắn muốn xóa chiến dịch này không? Hành động này không thể hoàn tác.</p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button variant="destructive" onClick={() => toast.success("Đã xóa chiến dịch thành công!")}>Xóa</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
)}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col">
          {campaigns.map((camp) => (
            <div key={camp.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-start justify-between pr-8">
                <div>
                  <h4 className="font-bold text-foreground leading-tight">{camp.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">ID: {camp.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Mức giảm:</span>
                  <span className="font-bold text-red-600">-{camp.discount}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Thời gian:</span>
                  <span className="font-medium text-foreground text-xs">{camp.duration}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1 text-xs">
                 <span className="text-muted-foreground">• Áp dụng: <strong>{camp.target}</strong></span>
                 <span className="text-muted-foreground">• Đối tượng: <strong>{camp.audience}</strong></span>
              </div>
              <div className="mt-1">
                <Badge 
                      variant="outline" 
                      className={
                        camp.status === "Đang diễn ra" ? "bg-green-100 text-green-700 border-green-200 text-[10px]" :
                        camp.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 border-blue-200 text-[10px]" :
                        "bg-muted text-muted-foreground border-border text-[10px]"
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
                    <DropdownMenuItem render={<Link href={`/promotions/${camp.id}/edit`} className="w-full cursor-pointer" />}>
                      Sửa chiến dịch
                    </DropdownMenuItem>
                    <DropdownMenuItem>Tạm dừng</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        </>
        )}
      </div>
    </>
  );
}
