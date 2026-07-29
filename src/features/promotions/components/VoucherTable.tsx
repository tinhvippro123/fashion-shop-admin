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
import { Plus, Search, MoreHorizontal, Filter, Gift, Trash2, ArchiveRestore, X } from "lucide-react";
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
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";

import { useVouchers } from "@/features/promotions/hooks/useVouchers";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function VoucherTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const { vouchers, isLoading } = useVouchers();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredVouchers = vouchers.filter(v => isTrashView ? v.deletedAt : !v.deletedAt);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredVouchers.length && filteredVouchers.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredVouchers.map((v) => v.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const checkDeletable = (ids: string[]) => {
    const undeletable = ids.filter(id => {
      const v = vouchers.find(x => x.id === id);
      if (!v) return false;
      const usageCount = parseInt(v.quantity.split(" / ")[0] || "0");
      return usageCount >= 1;
    });
    return undeletable;
  };

  const handleBulkDelete = () => {
    if (isTrashView) {
      const undeletable = checkDeletable(selectedIds);
      if (undeletable.length > 0) {
        toast.error(`Không thể xóa vĩnh viễn ${undeletable.length} mã giảm giá đã có người sử dụng!`);
        return;
      }
      toast.success(`Đã xóa vĩnh viễn ${selectedIds.length} mã giảm giá!`);
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} mã giảm giá vào thùng rác!`);
    }
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} mã giảm giá thành công!`);
    setSelectedIds([]);
  };

  const handlePermanentDelete = (voucher: any) => {
    const usageCount = parseInt(voucher.quantity.split(" / ")[0] || "0");
    if (usageCount >= 1) {
      toast.error(`Không thể xóa vĩnh viễn mã ${voucher.code} vì đã có người dùng!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn mã giảm giá "${voucher.code}"!`);
  };

  const handleEmptyTrash = () => {
    if (filteredVouchers.length === 0) return;
    const undeletable = checkDeletable(filteredVouchers.map(v => v.id));
    if (undeletable.length > 0) {
      toast.error(`Có ${undeletable.length} mã giảm giá đã sử dụng không thể dọn dẹp vĩnh viễn!`);
    } else {
      toast.success(`Đã dọn sạch ${filteredVouchers.length} mã giảm giá khỏi thùng rác!`);
    }
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col gap-6 pb-20 relative">
      <div className="rounded-md border bg-card overflow-hidden">
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
          {isTrashView && (
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0 self-end sm:self-auto w-full sm:w-auto mt-2 sm:mt-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={filteredVouchers.length > 0 && selectedIds.length === filteredVouchers.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Mã Code</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead>Đơn tối thiểu</TableHead>
                <TableHead>Đã dùng / Tổng</TableHead>
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
                <TableRow key={voucher.id} className={selectedIds.includes(voucher.id) ? "bg-muted/50" : ""}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedIds.includes(voucher.id)}
                      onCheckedChange={() => toggleSelect(voucher.id)}
                      aria-label={`Select ${voucher.code}`}
                    />
                  </TableCell>
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
                    <Badge variant={voucher.status === "Hoạt động" ? "default" : "secondary"} className={voucher.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-muted text-foreground hover:bg-muted border-none"}>
                      {voucher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                                        <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          {!isTrashView && (
                            <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} />
                          )}
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-code-${voucher.id}`}>Mã Code</Label>
                                <Input id={`edit-code-${voucher.id}`} defaultValue={voucher.code} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Loại giảm giá</Label>
                                <Select defaultValue="vnd">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn loại giảm giá" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="vnd" label="Giảm theo số tiền (VND)">Giảm theo số tiền (VND)</SelectItem>
                                    <SelectItem value="percent" label="Giảm theo phần trăm (%)">Giảm theo phần trăm (%)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-discount-${voucher.id}`}>Mức giảm</Label>
                                <Input id={`edit-discount-${voucher.id}`} defaultValue={voucher.discountAmount} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-max-${voucher.id}`}>Giảm tối đa (VND) - Nếu có</Label>
                                <Input id={`edit-max-${voucher.id}`} placeholder="Không giới hạn" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-expiry-${voucher.id}`}>Ngày hết hạn</Label>
                                <Input id={`edit-expiry-${voucher.id}`} defaultValue={voucher.expiry} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {isTrashView ? (
                          <>
                            <DropdownMenuItem onClick={() => { toast.success(`Khôi phục mã ${voucher.code}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePermanentDelete(voucher)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển mã ${voucher.code} vào thùng rác!`); }} className="text-red-600 cursor-pointer whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <div key={voucher.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative pl-12">
              <div className="absolute top-4 left-4 z-10">
                <Checkbox 
                  checked={selectedIds.includes(voucher.id)}
                  onCheckedChange={() => toggleSelect(voucher.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
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
                <Badge variant={voucher.status === "Hoạt động" ? "default" : "secondary"} className={voucher.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "bg-muted text-foreground hover:bg-muted border-none text-[10px] px-2 py-0"}>
                  {voucher.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-2">
                                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          {!isTrashView && (
                            <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} />
                          )}
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-code-${voucher.id}`}>Mã Code</Label>
                                <Input id={`m-edit-code-${voucher.id}`} defaultValue={voucher.code} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Loại giảm giá</Label>
                                <Select defaultValue="vnd">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn loại giảm giá" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="vnd" label="Giảm theo số tiền (VND)">Giảm theo số tiền (VND)</SelectItem>
                                    <SelectItem value="percent" label="Giảm theo phần trăm (%)">Giảm theo phần trăm (%)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-discount-${voucher.id}`}>Mức giảm</Label>
                                <Input id={`m-edit-discount-${voucher.id}`} defaultValue={voucher.discountAmount} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-max-${voucher.id}`}>Giảm tối đa (VND) - Nếu có</Label>
                                <Input id={`m-edit-max-${voucher.id}`} placeholder="Không giới hạn" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-expiry-${voucher.id}`}>Ngày hết hạn</Label>
                                <Input id={`m-edit-expiry-${voucher.id}`} defaultValue={voucher.expiry} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {isTrashView ? (
                          <>
                            <DropdownMenuItem onClick={() => { toast.success(`Khôi phục mã ${voucher.code}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePermanentDelete(voucher)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển mã ${voucher.code} vào thùng rác!`); }} className="text-red-600 cursor-pointer whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {mounted && selectedIds.length > 0 && createPortal(
        <div style={{ bottom: "24px" }} className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
          <div className="flex items-center gap-4 bg-foreground text-background px-4 py-3 rounded-full shadow-lg border border-border">
            <span className="text-sm font-medium px-2 border-r border-background/20">
              Đã chọn <strong className="text-blue-400">{selectedIds.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              {isTrashView ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleBulkRestore} className="text-emerald-400 hover:text-emerald-300 hover:bg-background/10">
                    <ArchiveRestore className="h-4 w-4 mr-2" /> Khôi phục
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa vĩnh viễn
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Chuyển vào thùng rác
                </Button>
              )}
            </div>
            <div className="pl-2 border-l border-background/20">
              <Button variant="ghost" size="icon" onClick={() => setSelectedIds([])} className="h-8 w-8 rounded-full hover:bg-background/10 text-background">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
