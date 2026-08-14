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
import { Search, MoreHorizontal, Filter, Gift, Trash2, ArchiveRestore, X, Eye, Copy, Edit, Ban } from "lucide-react";
import { getVoucherActions } from "../utils/action-resolvers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";
import { cn } from "@/shared/utils/utils";

import { useVouchers } from "@/features/promotions/hooks/useVouchers";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { Voucher } from "@/features/promotions/types/promotion.admin";

interface VoucherTableActionsProps {
  voucher: Voucher;
  isTrashView: boolean;
  onAction?: (action: "view" | "edit" | "duplicate", id: string) => void;
  onPermanentDelete: (voucher: Voucher) => void;
  onDelete: (voucher: Voucher) => void;
  onEndEarly: (voucher: Voucher) => void;
}

function VoucherTableActions({ voucher, isTrashView, onAction, onPermanentDelete, onDelete, onEndEarly }: VoucherTableActionsProps) {
  const actions = getVoucherActions(voucher, isTrashView);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.includes('RESTORE') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.success(`Khôi phục mã ${voucher.code}`); }} className="text-emerald-600 font-medium whitespace-nowrap">
            <ArchiveRestore className="mr-2 h-4 w-4" /> Khôi phục
          </DropdownMenuItem>
        )}
        {actions.includes('PERMANENT_DELETE') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPermanentDelete(voucher); }} className="text-red-600 font-medium whitespace-nowrap">
            <Trash2 className="mr-2 h-4 w-4" /> Xóa vĩnh viễn
          </DropdownMenuItem>
        )}
        {actions.includes('VIEW') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAction?.("view", voucher.id); }}>
            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
        )}
        {actions.includes('DUPLICATE') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAction?.("duplicate", voucher.id); }}>
            <Copy className="mr-2 h-4 w-4" /> Sao chép mã
          </DropdownMenuItem>
        )}
        {actions.includes('EDIT') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAction?.("edit", voucher.id); }}>
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
        )}
        {actions.includes('DELETE') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(voucher); }} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Xóa / Hủy
          </DropdownMenuItem>
        )}
        {actions.includes('END_EARLY') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEndEarly(voucher); }} className="text-amber-600">
            <Ban className="mr-2 h-4 w-4" /> Kết thúc sớm
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface VoucherTableProps {
  isTrashView?: boolean;
  viewStatus?: "Tất cả" | "Đang diễn ra" | "Sắp diễn ra" | "Đã kết thúc";
  onAction?: (action: "view" | "edit" | "duplicate", id: string) => void;
}

export function VoucherTable({ isTrashView = false, viewStatus = "Tất cả", onAction }: VoucherTableProps) {
  const { vouchers, isLoading, setVouchers } = useVouchers();


  const handleEndEarly = (voucher: Voucher) => {
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    setVouchers(prev => prev.map(v => 
      v.id === voucher.id ? { ...v, status: "Đã kết thúc", expiry: formattedToday } : v
    ));
    
    toast.success(`Đã kết thúc sớm mã ${voucher.code}`);
  };

  const filteredVouchers = vouchers.filter(v => {
    if (isTrashView) return v.deletedAt;
    if (v.deletedAt) return false;
    if (viewStatus === "Tất cả") return true;
    return v.status === viewStatus;
  });

  const handleDelete = (voucher: Voucher) => {
    toast.success(`Đã chuyển mã ${voucher.code} vào thùng rác!`);
    setVouchers(prev => prev.map(v => 
      v.id === voucher.id ? { ...v, deletedAt: new Date().toISOString() } : v
    ));
  };

  const handlePermanentDelete = (voucher: Voucher) => {
    const usageCount = parseInt(voucher.quantity.split(" / ")[0] || "0");
    if (usageCount >= 1) {
      toast.error(`Không thể xóa vĩnh viễn mã ${voucher.code} vì đã có người dùng!`);
      return;
    }
    setVouchers(prev => prev.filter(v => v.id !== voucher.id));
    toast.success(`Đã xóa vĩnh viễn mã giảm giá "${voucher.code}"!`);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className={cn("rounded-md border bg-card overflow-hidden transition-all duration-300")}>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b sm:justify-between">
          <div className="flex items-center gap-2 w-full max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm mã code..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">Lọc</span>
              <Filter className="h-4 w-4 sm:hidden" />
            </Button>
          </div>

        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>

                <TableHead>Mã Code</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead>Đơn tối thiểu</TableHead>
                <TableHead>Đã dùng / Tổng</TableHead>
                <TableHead>Khung thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : filteredVouchers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Gift className="h-10 w-10 mb-4 text-zinc-300" />
                      <p>Không tìm thấy mã giảm giá nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
filteredVouchers.map((voucher) => (
                <TableRow 
                  key={voucher.id} 
                  className={cn("hover:bg-muted/50 transition-colors cursor-pointer")}
                  onClick={() => onAction && onAction("view", voucher.id)}
                >
                  <TableCell>
                    <div className="flex items-center font-bold text-foreground bg-muted w-fit px-3 py-1 rounded-md border border-dashed border-zinc-300">
                      <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
                      {voucher.code}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-red-600">-{voucher.discountAmount}</TableCell>
                  <TableCell className="text-muted-foreground">{voucher.minOrderValue}</TableCell>
                  <TableCell>{voucher.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm whitespace-nowrap">
                      <span className="text-foreground font-medium">Từ: {voucher.duration.split(" - ")[0]}</span>
                      {voucher.duration.split(" - ")[1] && (
                        <span className="text-red-600 font-medium">Đến: {voucher.duration.split(" - ")[1]}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={voucher.status === "Đang diễn ra" ? "default" : "secondary"} className={voucher.status === "Đang diễn ra" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-muted text-foreground hover:bg-muted border-none"}>
                      {voucher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <VoucherTableActions 
                      voucher={voucher} 
                      isTrashView={isTrashView} 
                      onAction={onAction} 
                      onPermanentDelete={handlePermanentDelete} 
                      onDelete={handleDelete} 
                      onEndEarly={handleEndEarly} 
                    />
                  </TableCell>
                </TableRow>
              ))
)}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {filteredVouchers.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground py-10 border-b">
              <Gift className="h-10 w-10 mb-4 text-zinc-300" />
              <p>Không tìm thấy mã giảm giá nào</p>
            </div>
          ) : filteredVouchers.map((voucher) => (
            <div 
              key={voucher.id} 
              className="flex flex-col gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors relative cursor-pointer"
              onClick={() => onAction && onAction("view", voucher.id)}
            >
              <div className="flex items-center justify-between pr-8">
                <span className="font-bold text-foreground text-lg flex items-center bg-muted px-3 py-1 rounded-md border border-dashed border-zinc-300 w-fit">
                  <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
                  {voucher.code}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
                <span>Mức giảm: <strong className="text-red-600">-{voucher.discountAmount}</strong></span>
                <span>Đơn tối thiểu: <strong>{voucher.minOrderValue}</strong></span>
                <span>Đã dùng: <strong>{voucher.quantity}</strong></span>
              </div>
              <div className="mt-2">
                <Badge variant={voucher.status === "Đang diễn ra" ? "default" : "secondary"} className={voucher.status === "Đang diễn ra" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "bg-muted text-foreground hover:bg-muted border-none text-[10px] px-2 py-0"}>
                  {voucher.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                  <VoucherTableActions 
                    voucher={voucher} 
                    isTrashView={isTrashView} 
                    onAction={onAction} 
                    onPermanentDelete={handlePermanentDelete} 
                    onDelete={handleDelete} 
                    onEndEarly={handleEndEarly} 
                  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
