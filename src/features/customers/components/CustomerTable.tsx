"use client";

import Link from "next/link";
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
import { Search, MoreHorizontal, Filter, Download, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";
import { ArchiveRestore, Trash2, X } from "lucide-react";
import { Customer } from "@/features/customers/types/customer.admin";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function CustomerTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const { customers, isLoading } = useCustomers();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCustomers = customers.filter(c => isTrashView ? c.deletedAt : !c.deletedAt);

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
    if (isTrashView) {
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
      if (removableCount > 0) {
        toast.success(`Đã xóa vĩnh viễn ${removableCount} khách hàng thành công!`);
        setSelectedIds([]);
      }
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} khách hàng vào thùng rác!`);
      setSelectedIds([]);
    }
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} khách hàng thành công!`);
    setSelectedIds([]);
  };

  const handlePermanentDelete = (c: Customer) => {
    if (c.orders > 0) {
      toast.error(`Không thể xóa vĩnh viễn khách hàng "${c.name}" vì đã có ${c.orders} đơn hàng!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn khách hàng "${c.name}"!`);
  };

  const handleEmptyTrash = () => {
    const unremovable = filteredCustomers.filter(c => c.orders > 0);
    
    if (unremovable.length === filteredCustomers.length && filteredCustomers.length > 0) {
      toast.error("Không có khách hàng nào có thể xóa vĩnh viễn!");
      return;
    }
    
    const removableCount = filteredCustomers.length - unremovable.length;
    if (removableCount > 0) {
      toast.success(`Đã dọn sạch ${removableCount} khách hàng khỏi thùng rác!`);
    }
    
    if (unremovable.length > 0) {
      toast.warning(`Giữ lại ${unremovable.length} khách hàng có lịch sử giao dịch.`);
    }
    setSelectedIds([]);
  };

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
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
          {isTrashView && (
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={filteredCustomers.length > 0 && selectedIds.length === filteredCustomers.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Phân hạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
                filteredCustomers.map((cus) => (
                  <TableRow key={cus.id} className={selectedIds.includes(cus.id) ? "bg-muted/50" : ""}>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={selectedIds.includes(cus.id)}
                        onCheckedChange={() => toggleSelect(cus.id)}
                        aria-label={`Select ${cus.name}`}
                      />
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
                      <Badge variant={cus.status === "VIP" ? "default" : "secondary"} className={cus.status === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none" : ""}>
                        {cus.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem render={<Link href={`/customers/${cus.id}`} className="w-full cursor-pointer" />}>
                            Xem chi tiết
                          </DropdownMenuItem>

                          {isTrashView ? (
                            <>
                              <DropdownMenuItem onClick={() => { toast.success(`Khôi phục khách hàng ${cus.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePermanentDelete(cus)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem className="whitespace-nowrap">Khóa tài khoản</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển ${cus.name} vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
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
            <div key={cus.id} className="flex flex-col p-4 border rounded-lg bg-card shadow-sm relative">
              <div className="absolute top-4 left-4 z-10">
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
                  <Badge variant={cus.status === "VIP" ? "default" : "secondary"} className={cus.status === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none text-[10px] px-2 py-0 h-5" : "text-[10px] px-2 py-0 h-5"}>
                    {cus.status}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">{cus.orders} đơn hàng</span>
                </div>
              </div>

              <div className="absolute top-4 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem render={<Link href={`/customers/${cus.id}`} className="w-full cursor-pointer" />}>
                      Xem chi tiết
                    </DropdownMenuItem>

                    {isTrashView ? (
                      <>
                        <DropdownMenuItem onClick={() => { toast.success(`Khôi phục khách hàng ${cus.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePermanentDelete(cus)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem className="whitespace-nowrap">Khóa tài khoản</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển ${cus.name} vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
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
    </>
  );
}
