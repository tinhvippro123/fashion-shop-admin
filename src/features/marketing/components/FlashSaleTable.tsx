"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Search, PlusCircle, Filter, MoreHorizontal, Clock } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { ArchiveRestore, Trash2, X } from "lucide-react";
import { FlashSale } from "@/features/marketing/types/flash-sale.admin";
import { Checkbox } from "@/shared/ui/checkbox";

import { useFlashSales } from "@/features/marketing/hooks/useFlashSales";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function FlashSaleTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const { flashSales, isLoading, setFlashSales } = useFlashSales();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  const handleEndEarly = (fs: FlashSale) => {
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    
    setFlashSales(prev => prev.map(item => 
      item.id === fs.id ? { ...item, status: "Đã kết thúc", endTime: formattedToday } : item
    ));
    
    toast.success(`Đã kết thúc sớm chiến dịch ${fs.name}`);
  };

  const filteredSales = flashSales.filter(fs => isTrashView ? fs.deletedAt : !fs.deletedAt);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSales.length && filteredSales.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSales.map((fs) => fs.id));
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
      const unremovable = filteredSales.filter(
        fs => selectedIds.includes(fs.id) && fs.usageCount && fs.usageCount > 0
      );
      
      if (unremovable.length > 0) {
        if (unremovable.length === selectedIds.length) {
          toast.error("Không thể xóa vĩnh viễn các chiến dịch đã chọn vì đã có lượt sử dụng!");
          return;
        } else {
          toast.warning(`Đã bỏ qua ${unremovable.length} chiến dịch không thể xóa vĩnh viễn.`);
        }
      }
      
      const removableCount = selectedIds.length - unremovable.length;
      if (removableCount > 0) {
        toast.success(`Đã xóa vĩnh viễn ${removableCount} chiến dịch thành công!`);
        setSelectedIds([]);
      }
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} chiến dịch vào thùng rác!`);
      setSelectedIds([]);
    }
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} chiến dịch thành công!`);
    setSelectedIds([]);
  };

  const handlePermanentDelete = (fs: FlashSale) => {
    if ((fs.usageCount && fs.usageCount > 0) || fs.status === "Đang diễn ra" || fs.status === "Đã kết thúc") {
      toast.error(`Không thể xóa vĩnh viễn "${fs.name}" vì đã có dữ liệu sử dụng hoặc đã diễn ra!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn chiến dịch "${fs.name}"!`);
  };

  const handleEmptyTrash = () => {
    const unremovable = filteredSales.filter(
      fs => fs.usageCount && fs.usageCount > 0
    );
    
    if (unremovable.length === filteredSales.length && filteredSales.length > 0) {
      toast.error("Không có chiến dịch nào có thể xóa vĩnh viễn!");
      return;
    }
    
    const removableCount = filteredSales.length - unremovable.length;
    if (removableCount > 0) {
      toast.success(`Đã dọn sạch ${removableCount} chiến dịch khỏi thùng rác!`);
    }
    
    if (unremovable.length > 0) {
      toast.warning(`Giữ lại ${unremovable.length} chiến dịch có dữ liệu quan trọng.`);
    }
    setSelectedIds([]);
  };

  return (
    <>
      {/* Overview Cards (Hide in Trash View) */}
      {!isTrashView && (
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Đang diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-primary-foreground/80 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Kết thúc sau 03:45:12
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sắp diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Sẵn sàng kích hoạt</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng doanh thu Flash Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">850,000,000 đ</div>
            <p className="text-xs text-muted-foreground mt-1">Trong tháng này</p>
          </CardContent>
        </Card>
      </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Lịch sử Flash Sale</CardTitle>
              <CardDescription>
                Danh sách tất cả các khung giờ Flash Sale.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="flex items-center justify-between gap-4 px-6 pb-4">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên hoặc mã..."
                className="pl-8 bg-muted/50"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
          </div>
          {isTrashView && (
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        <CardContent>
        {/* Desktop View: Table */}
        <div className="hidden md:block border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Checkbox 
                      checked={filteredSales.length > 0 && selectedIds.length === filteredSales.length} 
                      onCheckedChange={toggleSelectAll} 
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">Mã FS</TableHead>
                  <TableHead>Tên khung giờ</TableHead>
                  <TableHead>Khung thời gian</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-card">
                {isLoading ? <TableSkeleton columns={8} /> : (
                  filteredSales.map((fs) => (
                  <TableRow key={fs.id} className={selectedIds.includes(fs.id) ? "bg-muted/50" : ""}>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={selectedIds.includes(fs.id)}
                        onCheckedChange={() => toggleSelect(fs.id)}
                        aria-label={`Select ${fs.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{fs.id}</TableCell>
                    <TableCell className="font-semibold">{fs.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-foreground font-medium">Từ: {fs.startTime}</span>
                        <span className="text-red-600 font-medium">Đến: {fs.endTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>{fs.productsCount} mặt hàng</TableCell>
                    <TableCell>
                      <Badge 
                        variant={fs.status === "Đang diễn ra" ? "default" : fs.status === "Sắp diễn ra" ? "secondary" : "outline"}
                        className={
                          fs.status === "Đang diễn ra" ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 animate-pulse" : 
                          fs.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-transparent" : ""
                        }
                      >
                        {fs.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{fs.revenue || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {isTrashView ? (
                            <>
                              <DropdownMenuItem className="text-emerald-600 font-medium whitespace-nowrap" onClick={() => { toast.success(`Khôi phục ${fs.name}`); }}>Khôi phục</DropdownMenuItem>
                              {(!fs.usageCount || fs.usageCount === 0) && (
                                <DropdownMenuItem className="text-red-600 font-medium whitespace-nowrap" onClick={() => handlePermanentDelete(fs)}>Xóa vĩnh viễn</DropdownMenuItem>
                              )}
                            </>
                          ) : (
                            <>
                              {fs.status === "Đang diễn ra" && (
                                <DropdownMenuItem onClick={() => handleEndEarly(fs)} className="text-amber-600 font-medium whitespace-nowrap">Kết thúc ngay</DropdownMenuItem>
                              )}

                              {fs.status === "Sắp diễn ra" && (
                                <>
                                  <DropdownMenuItem render={<Link href={`/flash-sales/${fs.id}/edit`} className="w-full cursor-pointer whitespace-nowrap" />}>
                                    Sửa chương trình
                                  </DropdownMenuItem>
                                  {(!fs.usageCount || fs.usageCount === 0) && (
                                    <DropdownMenuItem className="text-red-600 font-medium whitespace-nowrap" onClick={() => handlePermanentDelete(fs)}>Xóa vĩnh viễn</DropdownMenuItem>
                                  )}
                                </>
                              )}

                              {fs.status === "Đã kết thúc" && (
                                <DropdownMenuItem className="text-red-600 whitespace-nowrap" onClick={() => { toast.success(`Đã chuyển ${fs.name} vào thùng rác`); }}>Chuyển vào thùng rác</DropdownMenuItem>
                              )}
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

        {/* Mobile View: List */}
        <div className="md:hidden flex flex-col gap-3 mt-4">
          {filteredSales.map((fs) => (
            <div key={fs.id} className="flex flex-col p-4 border rounded-lg bg-card shadow-sm relative">
              <div className="absolute top-4 left-4 z-10">
                <Checkbox 
                  checked={selectedIds.includes(fs.id)}
                  onCheckedChange={() => toggleSelect(fs.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
              <div className="flex justify-between items-start mb-3 pl-8 pr-8">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-0.5">{fs.id}</div>
                  <div className="font-bold text-foreground text-base leading-tight">{fs.name}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 text-sm bg-muted/30 p-2.5 rounded-md mb-3 border border-border/50">
                <div className="flex items-center gap-2 text-foreground font-medium"><span className="text-muted-foreground text-xs uppercase w-8">Từ:</span> {fs.startTime}</div>
                <div className="flex items-center gap-2 text-red-600 font-medium"><span className="text-muted-foreground text-xs uppercase w-8">Đến:</span> {fs.endTime}</div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={fs.status === "Đang diễn ra" ? "default" : fs.status === "Sắp diễn ra" ? "secondary" : "outline"}
                    className={
                      fs.status === "Đang diễn ra" ? "bg-red-100 text-red-700 hover:bg-red-200 border-none animate-pulse text-[10px] px-2 py-0 h-5" : 
                      fs.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 text-[10px] px-2 py-0 h-5 border-none" : "text-[10px] px-2 py-0 h-5"
                    }
                  >
                    {fs.status}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">{fs.productsCount} sp</span>
                </div>
                <div className="font-bold text-foreground text-sm">{fs.revenue || "-"}</div>
              </div>

              <div className="absolute top-4 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {isTrashView ? (
                      <>
                        <DropdownMenuItem className="text-emerald-600 font-medium whitespace-nowrap" onClick={() => { toast.success(`Khôi phục ${fs.name}`); }}>Khôi phục</DropdownMenuItem>
                        {(!fs.usageCount || fs.usageCount === 0) && (
                          <DropdownMenuItem className="text-red-600 font-medium whitespace-nowrap" onClick={() => handlePermanentDelete(fs)}>Xóa vĩnh viễn</DropdownMenuItem>
                        )}
                      </>
                    ) : (
                      <>
                        {fs.status === "Đang diễn ra" && (
                          <DropdownMenuItem onClick={() => handleEndEarly(fs)} className="text-amber-600 font-medium whitespace-nowrap">Kết thúc ngay</DropdownMenuItem>
                        )}

                        {fs.status === "Sắp diễn ra" && (
                          <>
                            <DropdownMenuItem render={<Link href={`/flash-sales/${fs.id}/edit`} className="w-full cursor-pointer whitespace-nowrap" />}>
                              Sửa chương trình
                            </DropdownMenuItem>
                            {(!fs.usageCount || fs.usageCount === 0) && (
                              <DropdownMenuItem className="text-red-600 font-medium whitespace-nowrap" onClick={() => handlePermanentDelete(fs)}>Xóa vĩnh viễn</DropdownMenuItem>
                            )}
                          </>
                        )}

                        {fs.status === "Đã kết thúc" && (
                          <DropdownMenuItem className="text-red-600 whitespace-nowrap" onClick={() => { toast.success(`Đã chuyển ${fs.name} vào thùng rác`); }}>Chuyển vào thùng rác</DropdownMenuItem>
                        )}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        </CardContent>
      </Card>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div style={{ bottom: "24px" }} className="fixed left-1/2 -translate-x-1/2 lg:ml-32 z-50 transition-all duration-300">
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
                  <Trash2 className="h-4 w-4 mr-2" /> Xóa
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
    </>
  );
}
