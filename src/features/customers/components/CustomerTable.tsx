"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Search, MoreHorizontal, Filter, Download, User, Eye, Lock, Unlock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";
import { ArchiveRestore, Trash2, X } from "lucide-react";
import { Customer } from "@/features/customers/types/customer.admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/dialog";
import { cn } from "@/shared/utils/utils";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function CustomerTable({ isPendingView = false, isBannedView = false, isUnverifiedView = false }: { isPendingView?: boolean, isBannedView?: boolean, isUnverifiedView?: boolean }) {
  const router = useRouter();
  const { customers, isLoading } = useCustomers();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Ban Modal state
  const [banCustomer, setBanCustomer] = useState<Customer | null>(null);
  const [banReason, setBanReason] = useState<string>('Boom hàng nhiều lần');


  const filteredCustomers = customers.filter(c => {
    // Ưu tiên 1: Kẻ gian bị khóa (Blacklist) thì luôn nằm ở Tab Bị Khóa, bất kể có yêu cầu xóa hay không
    if (c.accountStatus === 'BANNED') return isBannedView;
    // Ưu tiên 2: Khách hàng đang trong 30 ngày ân hạn
    if (c.deletedAt) return isPendingView;
    // Ưu tiên 3: Tài khoản rác chưa xác thực
    if (c.accountStatus === 'UNVERIFIED') return isUnverifiedView;
    // Còn lại: Đang hoạt động
    return !isPendingView && !isBannedView && !isUnverifiedView;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (isPendingView) {
      const unremovable = filteredCustomers.filter(
        c => selectedIds.includes(c.id) && c.orders > 0
      );
      
      if (unremovable.length > 0) {
        if (unremovable.length === selectedIds.length) {
          toast.error("Không thể xóa vĩnh viễn các khách hàng đã chọn vì đã có lịch sử đơn hàng!");
          return;
        } else {
          toast.warning(`Đã bỏ qua ${unremovable.length} khách hàng không thể xóa vĩnh viễn.`);
        }
      }
      
      const removableCount = selectedIds.length - unremovable.length;
      if (isPendingView || isUnverifiedView) {
      toast.success(`Đã xóa vĩnh viễn ${selectedIds.length} khách hàng thành công!`);
      setSelectedIds([]);
      }
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} khách hàng vào trạng thái Chờ xóa!`);
      setSelectedIds([]);
    }
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} khách hàng thành công!`);
    setSelectedIds([]);
  };

  const handlePermanentDelete = (customer: Customer) => {
    if (isPendingView || isUnverifiedView) {
      toast.success(`Đã xóa vĩnh viễn khách hàng ${customer.name}`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn khách hàng "${customer.name}"!`);
  };

  const handleToggleBan = (c: Customer) => {
    if (c.accountStatus === 'BANNED') {
      toast.success(`Đã mở khóa tài khoản cho khách hàng "${c.name}"!`);
    } else {
      setBanReason('Boom hàng nhiều lần');
      setBanCustomer(c);
    }
  };

  const confirmBan = () => {
    if (banCustomer) {
      toast.success(`Đã khóa tài khoản "${banCustomer.name}" với lý do: ${banReason}`);
      setBanCustomer(null);
    }
  };

  const handleEmptyTrash = () => {
    const unremovable = filteredCustomers.filter(c => c.orders > 0);
    
    if (unremovable.length === filteredCustomers.length && filteredCustomers.length > 0) {
      toast.error("Không có khách hàng nào có thể xóa vĩnh viễn!");
      return;
    }
    
    const removableCount = filteredCustomers.length - unremovable.length;
    if (removableCount > 0) {
      toast.success(`Đã xóa vĩnh viễn ${removableCount} khách hàng đang chờ xóa!`);
    }
    
    if (unremovable.length > 0) {
      toast.warning(`Giữ lại ${unremovable.length} khách hàng có lịch sử giao dịch.`);
    }
    setSelectedIds([]);
  };

  return (
    <>
      <div className={cn("rounded-md border bg-card overflow-hidden transition-all duration-300", selectedIds.length > 0 ? "mb-24" : "")}>
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm tên, email, sđt..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="hidden sm:flex shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                    <div className="flex items-center justify-center">
                      <Checkbox 
                    checked={filteredCustomers.length > 0 && selectedIds.length === filteredCustomers.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                    </div>
                  </TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Phân hạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
                filteredCustomers.map((cus) => (
                  <TableRow 
                    key={cus.id} 
                    className={cn(selectedIds.includes(cus.id) ? "bg-muted/50" : "", "cursor-pointer hover:bg-muted/50 transition-colors")}
                    onClick={() => router.push(`/customers/${cus.id}`)}
                  >
                    <TableCell 
                      className="text-center" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(cus.id);
                      }}
                    >
                      <div className="flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedIds.includes(cus.id)}
                          onCheckedChange={() => toggleSelect(cus.id)}
                          aria-label={`Select ${cus.name}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" alt={cus.name} />
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {cus.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{cus.name}</span>
                          <span className="text-xs text-muted-foreground">{cus.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{cus.phone}</TableCell>
                    <TableCell>{cus.orders}</TableCell>
                    <TableCell className="font-medium">{cus.totalSpent}</TableCell>
                    <TableCell>
                      {isPendingView ? (
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-medium">
                          ⏳ Sẽ bị xóa sau: 29 ngày
                        </Badge>
                      ) : (
                        <>
                          {cus.accountStatus === 'ACTIVE' && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Hoạt động</Badge>}
                          {cus.accountStatus === 'BANNED' && <Badge variant="destructive" className="border-none">Bị khóa</Badge>}
                          {cus.accountStatus === 'UNVERIFIED' && <Badge variant="secondary">Chưa xác thực</Badge>}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={cus.tier === "VIP" ? "default" : "secondary"} className={cus.tier === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none" : ""}>
                        {cus.tier}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => router.push(`/customers/${cus.id}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                          </DropdownMenuItem>

                          {isPendingView ? (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => { toast.success(`Khôi phục khách hàng ${cus.name}`); }} className="text-emerald-600 font-medium cursor-pointer flex items-center">
                                <Unlock className="mr-2 h-4 w-4" /> Khôi phục
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-red-600 font-medium cursor-pointer flex items-center">
                                <Lock className="mr-2 h-4 w-4" /> Khóa tài khoản
                              </DropdownMenuItem>
                            </>
                          ) : isUnverifiedView ? (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handlePermanentDelete(cus)} className="text-red-600 font-medium cursor-pointer flex items-center">
                                <Trash2 className="mr-2 h-4 w-4" /> Xóa vĩnh viễn
                              </DropdownMenuItem>
                            </>
                          ) : isBannedView ? (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-emerald-600 font-medium cursor-pointer flex items-center">
                                <Unlock className="mr-2 h-4 w-4" /> Mở khóa
                              </DropdownMenuItem>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger render={<div className="w-full" />}>
                                    <DropdownMenuItem disabled className="text-muted-foreground flex items-center">
                                      <Trash2 className="mr-2 h-4 w-4" /> Xóa vĩnh viễn
                                    </DropdownMenuItem>
                                  </TooltipTrigger>
                                  <TooltipContent side="left" className="max-w-62.5 text-xs">
                                    🚫 Không thể xóa: Tài khoản đang vi phạm. Cần giữ lại Số điện thoại/Email để ngăn chặn đối tượng đăng ký lại.
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          ) : (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-red-600 cursor-pointer flex items-center">
                                <Lock className="mr-2 h-4 w-4" /> Khóa tài khoản
                              </DropdownMenuItem>
                            </>
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

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col gap-3 p-4">
          {filteredCustomers.map((cus) => (
            <div 
              key={cus.id} 
              className="flex flex-col gap-4 p-4 border rounded-lg relative cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => router.push(`/customers/${cus.id}`)}
            >
              <div className="absolute top-4 left-4 z-10" onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={selectedIds.includes(cus.id)}
                  onCheckedChange={() => toggleSelect(cus.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
              <div className="flex items-center gap-3 pl-8 pr-8 pb-3">
                <Avatar className="h-10 w-10 shrink-0 border">
                  <AvatarImage src="" alt={cus.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                    {cus.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-foreground text-base leading-tight mb-0.5">{cus.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-45">{cus.email}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Điện thoại</span>
                  <span className="font-medium text-sm">{cus.phone}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Tổng chi tiêu</span>
                  <span className="font-bold text-foreground text-sm">{cus.totalSpent}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-2">
                  <Badge variant={cus.tier === "VIP" ? "default" : "secondary"} className={cus.tier === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none text-[10px] px-2 py-0 h-5" : "text-[10px] px-2 py-0 h-5"}>
                    {cus.tier}
                  </Badge>
                  {isPendingView ? (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-[10px] px-2 py-0 h-5 font-medium">
                      ⏳ Xóa sau: 29 ngày
                    </Badge>
                  ) : (
                    <>
                      {cus.accountStatus === 'ACTIVE' && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none text-[10px] px-2 py-0 h-5">Hoạt động</Badge>}
                      {cus.accountStatus === 'BANNED' && <Badge variant="destructive" className="border-none text-[10px] px-2 py-0 h-5">Bị khóa</Badge>}
                    </>
                  )}
                  <span className="text-xs font-medium text-muted-foreground ml-1">{cus.orders} đơn hàng</span>
                </div>
              </div>

              <div className="absolute top-3 right-2" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push(`/customers/${cus.id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                    </DropdownMenuItem>

                    {isPendingView ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { toast.success(`Khôi phục khách hàng ${cus.name}`); }} className="text-emerald-600 font-medium cursor-pointer flex items-center">
                          <Unlock className="mr-2 h-4 w-4" /> Khôi phục
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-red-600 font-medium cursor-pointer flex items-center">
                          <Lock className="mr-2 h-4 w-4" /> Khóa tài khoản
                        </DropdownMenuItem>
                      </>
                    ) : isUnverifiedView ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handlePermanentDelete(cus)} className="text-red-600 font-medium cursor-pointer flex items-center">
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa vĩnh viễn
                        </DropdownMenuItem>
                      </>
                    ) : isBannedView ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-emerald-600 font-medium cursor-pointer flex items-center">
                          <Unlock className="mr-2 h-4 w-4" /> Mở khóa
                        </DropdownMenuItem>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger render={<div className="w-full" />}>
                              <DropdownMenuItem disabled className="text-muted-foreground flex items-center">
                                <Trash2 className="mr-2 h-4 w-4" /> Xóa vĩnh viễn
                              </DropdownMenuItem>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-62.5 text-xs">
                              🚫 Không thể xóa: Tài khoản đang vi phạm. Cần giữ lại Số điện thoại/Email để ngăn chặn đối tượng đăng ký lại.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    ) : (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleBan(cus)} className="text-red-600 cursor-pointer flex items-center">
                          <Lock className="mr-2 h-4 w-4" /> Khóa tài khoản
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div style={{ bottom: "24px" }} className="fixed left-1/2 -translate-x-1/2 lg:ml-32 z-50 transition-all duration-300">
          <div className="flex items-center gap-4 bg-foreground text-background px-4 py-3 rounded-full shadow-lg border border-border">
            <span className="text-sm font-medium px-2 border-r border-background/20">
              Đã chọn <strong className="text-blue-400">{selectedIds.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              {isPendingView ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleBulkRestore} className="text-emerald-400 hover:text-emerald-300 hover:bg-background/10">
                    <ArchiveRestore className="h-4 w-4 mr-2" /> Khôi phục
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { toast.success(`Đã khóa ${selectedIds.length} khách hàng!`); setSelectedIds([]); }} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                    <Trash2 className="h-4 w-4 mr-2" /> Khóa tất cả
                  </Button>
                </>
              ) : isBannedView ? (
                <Button variant="ghost" size="sm" onClick={() => { toast.success(`Đã mở khóa ${selectedIds.length} khách hàng!`); setSelectedIds([]); }} className="text-emerald-400 hover:text-emerald-300 hover:bg-background/10">
                  Mở khóa tất cả
                </Button>
              ) : isUnverifiedView ? (
                <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-500 hover:text-red-600 hover:bg-background/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Xóa vĩnh viễn tất cả
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => { toast.success(`Đã khóa ${selectedIds.length} khách hàng!`); setSelectedIds([]); }} className="text-red-500 hover:text-red-600 hover:bg-background/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Khóa tất cả
                </Button>
              )}
            </div>
            <div className="pl-2 border-l border-background/20">
              <Button variant="ghost" size="icon" onClick={() => setSelectedIds([])} className="h-8 w-8 rounded-full hover:bg-background/10 text-background">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Ban Customer Dialog */}
      <Dialog open={!!banCustomer} onOpenChange={(open) => !open && setBanCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận khóa tài khoản</DialogTitle>
            <DialogDescription>
              Bạn đang thao tác khóa tài khoản của <strong>{banCustomer?.name}</strong>. Khách hàng sẽ bị đăng xuất ngay lập tức và đưa vào danh sách đen.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium mb-3">Vui lòng chọn lý do khóa:</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="banReason" value="Boom hàng nhiều lần" checked={banReason === 'Boom hàng nhiều lần'} onChange={(e) => setBanReason(e.target.value)} />
                <span className="text-sm">Boom hàng nhiều lần</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="banReason" value="Gian lận Voucher / Khuyến mãi" checked={banReason === 'Gian lận Voucher / Khuyến mãi'} onChange={(e) => setBanReason(e.target.value)} />
                <span className="text-sm">Gian lận Voucher / Khuyến mãi</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="banReason" value="Ngôn từ đả kích / Spam đánh giá" checked={banReason === 'Ngôn từ đả kích / Spam đánh giá'} onChange={(e) => setBanReason(e.target.value)} />
                <span className="text-sm">Ngôn từ đả kích / Spam đánh giá</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="banReason" value="Khác" checked={banReason === 'Khác'} onChange={(e) => setBanReason(e.target.value)} />
                <span className="text-sm">Khác...</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanCustomer(null)}>Hủy</Button>
            <Button variant="destructive" onClick={confirmBan}>Khóa ngay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
