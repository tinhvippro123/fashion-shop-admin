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
import { Plus, Search, MoreHorizontal, Filter, Megaphone, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";
import { ArchiveRestore, Trash2, X } from "lucide-react";
import { Campaign } from "@/features/promotions/types/promotion.admin";
import Link from "next/link";
import { EmptyState } from "@/shared/ui/empty-state";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

import { useCampaigns } from "@/features/promotions/hooks/useCampaigns";

export function CampaignTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const { campaigns, isLoading } = useCampaigns();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCampaigns = campaigns.filter(c => isTrashView ? c.deletedAt : !c.deletedAt);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCampaigns.length && filteredCampaigns.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCampaigns.map((c) => c.id));
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
      const unremovable = filteredCampaigns.filter(
        c => selectedIds.includes(c.id) && ((c.usageCount && c.usageCount > 0) || c.status === "Đang diễn ra" || c.status === "Đã kết thúc")
      );
      
      if (unremovable.length > 0) {
        if (unremovable.length === selectedIds.length) {
          toast.error("Không thể xóa vĩnh viễn các chiến dịch đã chọn vì đã có lượt sử dụng hoặc đã diễn ra!");
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

  const handlePermanentDelete = (c: Campaign) => {
    if ((c.usageCount && c.usageCount > 0) || c.status === "Đang diễn ra" || c.status === "Đã kết thúc") {
      toast.error(`Không thể xóa vĩnh viễn "${c.name}" vì đã có dữ liệu sử dụng hoặc đã diễn ra!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn chiến dịch "${c.name}"!`);
  };

  const handleEmptyTrash = () => {
    const unremovable = filteredCampaigns.filter(
      c => (c.usageCount && c.usageCount > 0) || c.status === "Đang diễn ra" || c.status === "Đã kết thúc"
    );
    
    if (unremovable.length === filteredCampaigns.length && filteredCampaigns.length > 0) {
      toast.error("Không có chiến dịch nào có thể xóa vĩnh viễn!");
      return;
    }
    
    const removableCount = filteredCampaigns.length - unremovable.length;
    if (removableCount > 0) {
      toast.success(`Đã dọn sạch ${removableCount} chiến dịch khỏi thùng rác!`);
    }
    
    if (unremovable.length > 0) {
      toast.warning(`Giữ lại ${unremovable.length} chiến dịch có dữ liệu quan trọng.`);
    }
    setSelectedIds([]);
  };
  const [discountType, setDiscountType] = useState("percent");
  const [audienceType, setAudienceType] = useState("all");
  const [targetType, setTargetType] = useState("all");

  

  return (
    <>      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b">
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
          {isTrashView && (
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        
        {(!isLoading && filteredCampaigns.length === 0) ? (
          <EmptyState
            icon={Megaphone}
            title={isTrashView ? "Thùng rác trống" : "Chưa có chiến dịch nào"}
            description={isTrashView ? "Không có chiến dịch nào trong thùng rác." : "Hãy tạo chiến dịch khuyến mãi đầu tiên để thu hút khách hàng."}
            actionLabel={isTrashView ? "" : "Tạo chiến dịch mới"}
            onAction={() => {}}
          />
        ) : (
          <>
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={filteredCampaigns.length > 0 && selectedIds.length === filteredCampaigns.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="min-w-[250px]">Tên chiến dịch</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead className="min-w-[200px]">Thời gian</TableHead>
                <TableHead>Sản phẩm / Đối tượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={8} /> : (
filteredCampaigns.map((camp) => (
                <TableRow key={camp.id} className={selectedIds.includes(camp.id) ? "bg-muted/50" : ""}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedIds.includes(camp.id)}
                      onCheckedChange={() => toggleSelect(camp.id)}
                      aria-label={`Select ${camp.name}`}
                    />
                  </TableCell>
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
                      <DropdownMenuContent align="end" className="w-48">
                        {isTrashView ? (
                          <>
                            <DropdownMenuItem onClick={() => { toast.success(`Khôi phục ${camp.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePermanentDelete(camp)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem render={<Link href={`/promotions/${camp.id}/edit`} className="w-full cursor-pointer whitespace-nowrap" />}>
                              Sửa chiến dịch
                            </DropdownMenuItem>
                            <DropdownMenuItem className="whitespace-nowrap">Tạm dừng</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển chiến dịch ${camp.name} vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
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

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col">
          {filteredCampaigns.map((camp) => (
            <div key={camp.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="absolute top-4 left-4 z-10">
                <Checkbox 
                  checked={selectedIds.includes(camp.id)}
                  onCheckedChange={() => toggleSelect(camp.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
              <div className="flex items-start justify-between pl-8 pr-8">
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
                  <DropdownMenuContent align="end" className="w-48">
                    {isTrashView ? (
                      <>
                        <DropdownMenuItem onClick={() => { toast.success(`Khôi phục ${camp.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePermanentDelete(camp)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem render={<Link href={`/promotions/${camp.id}/edit`} className="w-full cursor-pointer whitespace-nowrap" />}>
                          Sửa chiến dịch
                        </DropdownMenuItem>
                        <DropdownMenuItem className="whitespace-nowrap">Tạm dừng</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển chiến dịch ${camp.name} vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        </>
        )}
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
        </div>,
        document.body
      )}
    </>
  );
}
