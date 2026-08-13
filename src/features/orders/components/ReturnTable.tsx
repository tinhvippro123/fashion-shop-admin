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
import { Search, MoreHorizontal, PackageX, Eye, CheckCircle, XCircle, Package, AlertTriangle, UploadCloud, Printer } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { ReturnStatus } from "../types/order.admin";
import { mockReturnRequests } from "../mocks/return.mock";

export type ViewStatus = ReturnStatus | 'ALL';

export function ReturnTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentTab = (searchParams.get("tab") as ViewStatus) || "ALL";

  const [returns, setReturns] = useState(mockReturnRequests);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectId, setRejectId] = useState<string | null>(null);

  const [fraudDialog, setFraudDialog] = useState(false);
  const [fraudReason, setFraudReason] = useState("");
  const [fraudId, setFraudId] = useState<string | null>(null);

  const filteredReturns = currentTab === 'ALL' ? returns : returns.filter(r => r.status === currentTab);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getStatusColor = (status: ReturnStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'RETURNING': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 hover:bg-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: ReturnStatus) => {
    switch (status) {
      case 'PENDING': return 'Chờ duyệt';
      case 'RETURNING': return 'Hoàn về kho';
      case 'COMPLETED': return 'Đã hoàn tiền';
      case 'REJECTED': return 'Đã từ chối';
      default: return status;
    }
  };

  const handleApprove = (id: string) => {
    toast.success(`Đã đồng ý hoàn trả cho yêu cầu ${id}. Trạng thái chuyển sang Đang hoàn về kho.`);
    setReturns(returns.map(r => r.id === id ? { ...r, status: 'RETURNING' } : r));
  };

  const handleReceive = (id: string) => {
    toast.success(`Đã xác nhận nhận lại hàng cho ${id}. Chờ kế toán hoàn tiền.`);
    setReturns(returns.map(r => r.id === id ? { ...r, status: 'COMPLETED' } : r));
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối!");
      return;
    }
    toast.error(`Đã từ chối yêu cầu ${rejectId}. Lý do: ${rejectReason}`);
    setReturns(returns.map(r => r.id === rejectId ? { ...r, status: 'REJECTED' } : r));
    setRejectDialog(false);
    setRejectReason("");
    setRejectId(null);
  };

  const openRejectDialog = (id: string) => {
    setRejectId(id);
    setRejectReason("");
    setRejectDialog(true);
  };

  const handleFraud = () => {
    if (!fraudReason.trim()) {
      toast.error("Vui lòng nhập chi tiết tình trạng gian lận!");
      return;
    }
    toast.error(`Đã báo cáo gian lận cho yêu cầu ${fraudId}. Hồ sơ chuyển sang Đã từ chối.`);
    setReturns(returns.map(r => r.id === fraudId ? { ...r, status: 'REJECTED' } : r));
    setFraudDialog(false);
    setFraudReason("");
    setFraudId(null);
  };

  const openFraudDialog = (id: string) => {
    setFraudId(id);
    setFraudReason("");
    setFraudDialog(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Yêu cầu đổi/trả</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý vòng đời yêu cầu đổi trả và hoàn tiền của khách hàng.</p>
        </div>
      </div>
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ALL">Tất cả ({returns.length})</TabsTrigger>
          <TabsTrigger value="PENDING">Chờ duyệt ({returns.filter(r => r.status === 'PENDING').length})</TabsTrigger>
          <TabsTrigger value="RETURNING">Hoàn về kho ({returns.filter(r => r.status === 'RETURNING').length})</TabsTrigger>
          <TabsTrigger value="COMPLETED">Đã hoàn tiền ({returns.filter(r => r.status === 'COMPLETED').length})</TabsTrigger>
          <TabsTrigger value="REJECTED">Đã từ chối ({returns.filter(r => r.status === 'REJECTED').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab} className="m-0">
          <div className="rounded-md border bg-card overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 p-4 border-b sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm mã yêu cầu, mã đơn..."
                  className="pl-8"
                />
              </div>
            </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Mã Y/C</TableHead>
                <TableHead>Mã Đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày yêu cầu</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Số tiền hoàn</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <PackageX className="h-10 w-10 mb-4 text-zinc-300" />
                      <p>Không tìm thấy yêu cầu đổi/trả phù hợp</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReturns.map((req) => (
                  <TableRow 
                    key={req.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/orders/returns/${req.id}`)}
                  >
                    <TableCell className="font-medium text-primary">
                      {req.id}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {req.orderId}
                    </TableCell>
                    <TableCell>{req.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{req.date}</TableCell>
                    <TableCell>
                      <span className="truncate max-w-[200px] block">{req.reason}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(req.status), "border-none")}>
                        {getStatusText(req.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {req.refundAmount}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/orders/returns/${req.id}`} className="w-full cursor-pointer flex items-center" />}>
                            <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                          </DropdownMenuItem>
                          
                          {req.status === 'PENDING' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-emerald-600 cursor-pointer flex items-center" onClick={() => handleApprove(req.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" /> Đồng ý hoàn trả
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer flex items-center" onClick={() => openRejectDialog(req.id)}>
                                <XCircle className="h-4 w-4 mr-2" /> Từ chối
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          {req.status === 'RETURNING' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-blue-600 cursor-pointer flex items-center" onClick={() => handleReceive(req.id)}>
                                <Package className="h-4 w-4 mr-2" /> Đã nhận lại hàng
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-amber-600 cursor-pointer flex items-center" onClick={() => openFraudDialog(req.id)}>
                                <AlertTriangle className="h-4 w-4 mr-2" /> Báo cáo gian lận
                              </DropdownMenuItem>
                            </>
                          )}

                          {req.status === 'COMPLETED' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-emerald-600 cursor-pointer flex items-center" 
                                onClick={() => {
                                  toast.info(`Đang tạo biên lai hoàn tiền cho ${req.id}...`);
                                  setTimeout(() => window.print(), 500);
                                }}
                              >
                                <Printer className="h-4 w-4 mr-2" /> In biên lai hoàn tiền
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
      </div>
    </TabsContent>
  </Tabs>

  <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Từ chối Yêu cầu {rejectId}</DialogTitle>
        <DialogDescription>Hành động này không thể hoàn tác. Khách hàng sẽ nhìn thấy lý do này.</DialogDescription>
      </DialogHeader>
      <div className="py-4 flex flex-col gap-3">
        <label className="text-sm font-medium">Nhập lý do từ chối *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge 
            variant={rejectReason === "Quá thời hạn đổi trả 7 ngày" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setRejectReason("Quá thời hạn đổi trả 7 ngày")}
          >Quá thời hạn 7 ngày</Badge>
          <Badge 
            variant={rejectReason === "Sản phẩm đã bị giặt máy/sử dụng" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setRejectReason("Sản phẩm đã bị giặt máy/sử dụng")}
          >Đã qua sử dụng</Badge>
          <Badge 
            variant={rejectReason === "Không phát hiện lỗi như báo cáo" ? "default" : "destructive"}
            className="cursor-pointer"
            onClick={() => setRejectReason("Không phát hiện lỗi như báo cáo")}
          >Không phát hiện lỗi</Badge>
        </div>
        <Input 
          placeholder="Hoặc nhập lý do khác chi tiết hơn..." 
          value={rejectReason} 
          onChange={(e) => setRejectReason(e.target.value)} 
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setRejectDialog(false)}>Hủy</Button>
        <Button variant="destructive" onClick={handleReject}>Xác nhận từ chối</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog open={fraudDialog} onOpenChange={setFraudDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-amber-600 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" /> Báo cáo gian lận {fraudId}
        </DialogTitle>
        <DialogDescription>Hành động này sẽ đóng băng hồ sơ hoàn tiền. Vui lòng ghi rõ tình trạng hàng hóa nhận được.</DialogDescription>
      </DialogHeader>
      <div className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Bằng chứng (Hình ảnh) *</label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
            <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground/70" />
            <p className="text-sm font-medium">Tải ảnh tình trạng thực tế lên</p>
            <p className="text-xs mt-1">(Bắt buộc tải ít nhất 1 ảnh làm bằng chứng)</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Lý do gian lận *</label>
          <div className="flex flex-wrap gap-2 mb-1">
            <Badge 
              variant={fraudReason === "Khách trả áo rách/hãng khác" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFraudReason("Khách trả áo rách/hãng khác")}
            >Khác sản phẩm gốc</Badge>
            <Badge 
              variant={fraudReason === "Hộp rỗng / Khách gửi cục gạch" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFraudReason("Hộp rỗng / Khách gửi cục gạch")}
            >Khách gửi gạch / rác</Badge>
          </div>
          <Input 
            placeholder="Mô tả chi tiết tình trạng hàng hóa..." 
            value={fraudReason} 
            onChange={(e) => setFraudReason(e.target.value)} 
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setFraudDialog(false)}>Hủy</Button>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleFraud}>Xác nhận báo cáo</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
  );
}
