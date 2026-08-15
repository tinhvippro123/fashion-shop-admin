"use client";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
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
import { Search, MoreHorizontal, Filter, Megaphone, Trash2, ArchiveRestore, X, Ban, Rocket, Eye, Copy, Edit } from "lucide-react";
import { getCampaignActions } from "../utils/action-resolvers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { toast } from "sonner";
import { Campaign } from "@/features/promotions/types/promotion.admin";
import Link from "next/link";
import { EmptyState } from "@/shared/ui/empty-state";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

import { useCampaigns } from "@/features/promotions/hooks/useCampaigns";

interface CampaignTableActionsProps {
  campaign: Campaign;
  isTrashView: boolean;
  onPermanentDelete: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onEndEarly: (campaign: Campaign) => void;
  onStartNow: (campaign: Campaign) => void;
}

function CampaignTableActions({ campaign, isTrashView, onPermanentDelete, onDelete, onEndEarly, onStartNow }: CampaignTableActionsProps) {
  const actions = getCampaignActions(campaign, isTrashView);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      } />
      <DropdownMenuContent align="end" className="w-48">
        {actions.includes('RESTORE') && (
          <DropdownMenuItem onClick={() => { toast.success(`Khôi phục ${campaign.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
        )}
        
        {actions.includes('PERMANENT_DELETE') && (
          <DropdownMenuItem onClick={() => onPermanentDelete(campaign)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
        )}

        {actions.includes('VIEW') && (
          <DropdownMenuItem render={<Link href={`/promotions/${campaign.id}`} className="w-full cursor-pointer whitespace-nowrap" />}>
            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
        )}

        {actions.includes('DUPLICATE') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.success(`Đã sao chép chiến dịch ${campaign.name}`); }} className="cursor-pointer whitespace-nowrap">
            <Copy className="mr-2 h-4 w-4" /> Sao chép chương trình
          </DropdownMenuItem>
        )}

        {actions.includes('EDIT') && (
          <DropdownMenuItem render={<Link href={`/promotions/${campaign.id}/edit`} className="w-full cursor-pointer whitespace-nowrap" />}>
            <Edit className="mr-2 h-4 w-4" /> Sửa chiến dịch
          </DropdownMenuItem>
        )}

        {actions.includes('END_EARLY') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEndEarly(campaign); }} className="text-amber-600 font-medium whitespace-nowrap">
            <Ban className="mr-2 h-4 w-4" /> Kết thúc sớm
          </DropdownMenuItem>
        )}

        {actions.includes('START_NOW') && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onStartNow(campaign); }} className="text-blue-600 font-medium whitespace-nowrap">
            <Rocket className="mr-2 h-4 w-4" /> Bắt đầu ngay
          </DropdownMenuItem>
        )}

        {actions.includes('DELETE') && (
          <DropdownMenuItem onClick={() => onDelete(campaign)} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface CampaignTableProps {
  isTrashView?: boolean;
  viewStatus?: "Tất cả" | "Đang diễn ra" | "Sắp diễn ra" | "Đã kết thúc";
}

export function CampaignTable({ isTrashView = false, viewStatus = "Tất cả" }: CampaignTableProps) {
  const { campaigns, isLoading, setCampaigns } = useCampaigns();

  const handleEndEarly = (campaign: Campaign) => {
    if (window.confirm(`Bạn có chắc muốn kết thúc sớm chiến dịch "${campaign.name}" ngay bây giờ không? Hành động này sẽ khóa chiến dịch và không thể hoàn tác!`)) {
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, status: "Đã kết thúc", endedReason: "early" } : c
      ));
      toast.success(`Đã kết thúc sớm chiến dịch ${campaign.name}`);
    }
  };

  const handleStartNow = (campaign: Campaign) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaign.id ? { ...c, status: "Đang diễn ra" } : c
    ));
    toast.success(`Đã kích hoạt ngay chiến dịch ${campaign.name}`);
  };

  const handleDelete = (campaign: Campaign) => {
    toast.success(`Đã chuyển chiến dịch ${campaign.name} vào thùng rác!`);
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (isTrashView) return c.deletedAt;
    if (c.deletedAt) return false;
    if (viewStatus === "Tất cả") return true;
    return c.status === viewStatus;
  });

  const handlePermanentDelete = (c: Campaign) => {
    if ((c.usageCount && c.usageCount > 0) || c.status === "Đang diễn ra" || c.status === "Đã kết thúc") {
      toast.error(`Không thể xóa vĩnh viễn "${c.name}" vì đã có dữ liệu sử dụng hoặc đã diễn ra!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn chiến dịch "${c.name}"!`);
  };

  const handleEmptyTrash = () => {
    const unremovable = filteredCampaigns.filter(
      c => c.usageCount && c.usageCount > 0
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
  };

  const renderStatusBadge = (camp: Campaign) => {
    if (camp.status === "Đang diễn ra") {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Đang diễn ra</Badge>;
    }
    if (camp.status === "Sắp diễn ra") {
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Sắp diễn ra</Badge>;
    }
    
    // Status is "Đã kết thúc"
    if (camp.endedReason === "early") {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Kết thúc sớm</Badge>;
    }
    
    // For campaigns, we only check usageCount
    // A mock usage limit could be considered if we want to show 'Hết lượt sử dụng'
    // but without total limit, we just show 'Đã quá hạn' by default.
    return <Badge className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-none">Đã quá hạn</Badge>;
  };

  return (
    <>      <div className={cn("rounded-md border bg-card overflow-hidden transition-all duration-300")}>
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
                <TableHead className="min-w-[250px] pl-4">Tên chiến dịch</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead className="min-w-[200px]">Khung thời gian</TableHead>
                <TableHead>Sản phẩm / Đối tượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
filteredCampaigns.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell className="pl-4">
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
                    <div className="flex flex-col gap-1 text-sm whitespace-nowrap">
                      <span className="text-foreground font-medium">Từ: {camp.duration.split(" - ")[0]}</span>
                      {camp.duration.split(" - ")[1] && (
                        <span className="text-red-600 font-medium">Đến: {camp.duration.split(" - ")[1]}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="bg-muted text-foreground px-2 py-1 rounded w-fit">{camp.target}</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded w-fit">{camp.audience}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(camp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <CampaignTableActions 
                      campaign={camp} 
                      isTrashView={isTrashView} 
                      onPermanentDelete={handlePermanentDelete} 
                      onDelete={handleDelete}
                      onEndEarly={handleEndEarly} 
                      onStartNow={handleStartNow}
                    />
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
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-muted-foreground text-xs">Khung thời gian:</span>
                  <span className="font-medium text-foreground">Từ: {camp.duration.split(" - ")[0]}</span>
                  {camp.duration.split(" - ")[1] && (
                    <span className="font-medium text-red-600">Đến: {camp.duration.split(" - ")[1]}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1 text-xs">
                 <span className="text-muted-foreground">• Áp dụng: <strong>{camp.target}</strong></span>
                 <span className="text-muted-foreground">• Đối tượng: <strong>{camp.audience}</strong></span>
              </div>
              <div className="mt-1">
                {renderStatusBadge(camp)}
              </div>
              <div className="absolute top-3 right-2">
                  <CampaignTableActions 
                    campaign={camp} 
                    isTrashView={isTrashView} 
                    onPermanentDelete={handlePermanentDelete} 
                    onDelete={handleDelete}
                    onEndEarly={handleEndEarly} 
                    onStartNow={handleStartNow}
                  />
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
