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
import { Search, Filter, ShoppingBag, CheckCircle, XCircle, Truck, Eye, MoreHorizontal, Printer, AlertTriangle, Banknote, RefreshCcw } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { EmptyState } from "@/shared/ui/empty-state";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderStatus } from "@/features/orders/types/order.admin";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/shared/ui/dialog";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/shared/ui/dropdown-menu";

export function OrderTable({ viewStatus }: { viewStatus?: OrderStatus }) {
  const { orders, isLoading } = useOrders();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [returnDialog, setReturnDialog] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);

  const filteredOrders = viewStatus && viewStatus !== 'ALL' as any ? orders.filter(o => o.status === viewStatus) : orders;

  // Luồng duyệt đơn: Chỉ có COD mới được duyệt tay. Online payment phải đợi Bot duyệt (Webhook)
  const isOnlinePayment = (payment: string) => !payment.includes("COD") && !payment.includes("Thanh toán khi nhận hàng");

  // Những đơn hàng HỢP LỆ để select (Không phải online payment nếu đang ở Tab PENDING)
  const selectableOrders = viewStatus === 'PENDING' 
    ? filteredOrders.filter(o => !isOnlinePayment(o.payment)) 
    : filteredOrders;

  const toggleSelectAll = () => {
    if (selectedIds.length === selectableOrders.length && selectableOrders.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectableOrders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'PROCESSING': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'SHIPPING': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      case 'COMPLETED': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 hover:bg-red-200';
      default: return 'bg-muted text-foreground';
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'PROCESSING': return 'Đang chuẩn bị';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'COMPLETED': return 'Đã hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const handleApprove = (ids = selectedIds) => {
    if (ids.length === 0) return;
    toast.success(`Đã xác nhận ${ids.length} đơn hàng! Đã chuyển sang Đang chuẩn bị.`);
    setSelectedIds([]);
  };

  const handleHandover = (ids = selectedIds) => {
    if (ids.length === 0) return;
    toast.success(`Đã bàn giao ${ids.length} đơn hàng cho Shipper! Đã chuyển sang Đang giao.`);
    setSelectedIds([]);
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) {
      toast.error("Vui lòng chọn hoặc nhập lý do hủy đơn!");
      return;
    }
    toast.success(`Đã hủy ${selectedIds.length} đơn hàng. Lý do: ${cancelReason}`);
    setCancelDialog(false);
    setSelectedIds([]);
    setCancelReason("");
  };

  const openCancelDialog = (ids: string[]) => {
    setSelectedIds(ids);
    setCancelReason("");
    setCancelDialog(true);
  };

  const handleReturn = () => {
    toast.success(`Đã tạo yêu cầu Đổi/Trả cho đơn hàng ${returnOrderId} thành công! Dữ liệu đã chuyển sang Module Đổi trả.`);
    setReturnDialog(false);
    setReturnOrderId(null);
  };

  const openReturnDialog = (id: string) => {
    setReturnOrderId(id);
    setReturnDialog(true);
  };

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm mã đơn, khách hàng..." className="pl-8" />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Lọc</Button>
          </div>
          
          <div className="flex items-center gap-2">
            {viewStatus === 'PENDING' && selectedIds.length > 0 && (
              <>
                <Button variant="destructive" onClick={() => openCancelDialog(selectedIds)}>
                  <XCircle className="mr-2 h-4 w-4" /> Hủy {selectedIds.length} đơn
                </Button>
                <Button onClick={() => handleApprove()}>
                  <CheckCircle className="mr-2 h-4 w-4" /> 🚀 Duyệt hàng loạt ({selectedIds.length})
                </Button>
              </>
            )}
            {viewStatus === 'PROCESSING' && selectedIds.length > 0 && (
              <Button onClick={() => handleHandover()}>
                <Truck className="mr-2 h-4 w-4" /> Giao Shipper {selectedIds.length} đơn
              </Button>
            )}
          </div>
        </div>
        
        {(!isLoading && filteredOrders.length === 0) ? (
          <EmptyState icon={ShoppingBag} title="Chưa có đơn hàng nào" description="Không tìm thấy đơn hàng phù hợp với trạng thái này." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {(viewStatus === 'PENDING' || viewStatus === 'PROCESSING') && (
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedIds.length === selectableOrders.length && selectableOrders.length > 0} 
                      onCheckedChange={toggleSelectAll} 
                    />
                  </TableHead>
                )}
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={8} /> : filteredOrders.map((order) => {
                const onlinePaymentDisabled = viewStatus === 'PENDING' && isOnlinePayment(order.payment);
                
                return (
                  <TableRow key={order.id}>
                    {(viewStatus === 'PENDING' || viewStatus === 'PROCESSING') && (
                      <TableCell>
                        <Checkbox 
                          checked={selectedIds.includes(order.id)} 
                          onCheckedChange={() => toggleSelect(order.id)} 
                          disabled={onlinePaymentDisabled}
                        />
                      </TableCell>
                    )}
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.customerName}</span>
                        <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant="default" className={cn(getStatusColor(order.status), "border-none")}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn(order.paymentBg, "border-none text-xs")}>
                        {order.payment}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem render={<Link href={`/orders/${order.id}`} className="w-full cursor-pointer flex items-center" />}>
                            <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                          </DropdownMenuItem>
                          
                          {order.status === 'PENDING' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                disabled={onlinePaymentDisabled}
                                onClick={() => handleApprove([order.id])}
                                className="cursor-pointer flex items-center"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Duyệt đơn
                                {onlinePaymentDisabled && <span className="ml-2 text-[10px] text-muted-foreground">(Chờ Webhook)</span>}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => openCancelDialog([order.id])}
                                variant="destructive"
                                className="cursor-pointer flex items-center"
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Hủy đơn
                              </DropdownMenuItem>
                            </>
                          )}

                          {order.status === 'PROCESSING' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => {
                                  toast.info(`Đang tạo phiếu in cho đơn hàng ${order.id}...`);
                                  setTimeout(() => window.print(), 500);
                                }}
                                className="cursor-pointer flex items-center text-blue-600"
                              >
                                <Printer className="h-4 w-4 mr-2" /> In phiếu giao hàng
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleHandover([order.id])}
                                className="cursor-pointer flex items-center"
                              >
                                <Truck className="h-4 w-4 mr-2" /> Giao Shipper
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => openCancelDialog([order.id])}
                                variant="destructive"
                                className="cursor-pointer flex items-center"
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Hủy đơn
                              </DropdownMenuItem>
                            </>
                          )}

                          {order.status === 'SHIPPING' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => toast.success(`Đã cập nhật trạng thái Hoàn Thành cho đơn ${order.id}`)}
                                className="cursor-pointer flex items-center text-emerald-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Xác nhận Đã giao
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => toast.error(`Đơn ${order.id} giao thất bại. Tiến hành hoàn kho!`)}
                                className="cursor-pointer flex items-center text-amber-600"
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" /> Giao thất bại
                              </DropdownMenuItem>
                            </>
                          )}

                          {order.status === 'CANCELLED' && order.payment !== 'COD' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => toast.success(`Đã xác nhận hoàn tiền cho đơn ${order.id}`)}
                                className="cursor-pointer flex items-center text-blue-600"
                              >
                                <Banknote className="h-4 w-4 mr-2" /> Xác nhận Hoàn tiền
                              </DropdownMenuItem>
                            </>
                          )}

                          {order.status === 'COMPLETED' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => {
                                  toast.info(`Đang tạo hóa đơn cho đơn hàng ${order.id}...`);
                                  setTimeout(() => window.print(), 500);
                                }}
                                className="cursor-pointer flex items-center text-blue-600"
                              >
                                <Printer className="h-4 w-4 mr-2" /> In hóa đơn
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => openReturnDialog(order.id)}
                                className="cursor-pointer flex items-center text-purple-600"
                              >
                                <RefreshCcw className="h-4 w-4 mr-2" /> Tạo Yêu cầu Đổi/Trả
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy {selectedIds.length} đơn hàng</DialogTitle>
            <DialogDescription>Hành động này không thể hoàn tác. Vui lòng ghi rõ lý do để lưu vào Audit Log.</DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-3">
            <label className="text-sm font-medium">Chọn lý do hủy đơn *</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge 
                variant={cancelReason === "Khách yêu cầu hủy" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCancelReason("Khách yêu cầu hủy")}
              >Khách yêu cầu hủy</Badge>
              <Badge 
                variant={cancelReason === "Hết hàng / Lỗi giá" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCancelReason("Hết hàng / Lỗi giá")}
              >Hết hàng / Lỗi giá</Badge>
              <Badge 
                variant={cancelReason === "Nghi ngờ gian lận / Spam" ? "default" : "destructive"}
                className="cursor-pointer"
                onClick={() => setCancelReason("Nghi ngờ gian lận / Spam")}
              >Nghi ngờ gian lận / Spam</Badge>
            </div>
            <Input 
              placeholder="Hoặc nhập lý do khác..." 
              value={cancelReason} 
              onChange={(e) => setCancelReason(e.target.value)} 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(false)}>Đóng</Button>
            <Button variant="destructive" onClick={handleCancel}>Xác nhận hủy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={returnDialog} onOpenChange={setReturnDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo Yêu cầu Đổi/Trả hàng</DialogTitle>
            <DialogDescription>
              Đơn hàng gốc <span className="font-bold text-primary">{returnOrderId}</span> sẽ không bị thay đổi dữ liệu. Một hồ sơ khiếu nại mới sẽ được tạo trong Module Đổi/Trả.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Chọn sản phẩm cần Đổi/Trả</label>
              <div className="mt-2 flex flex-col gap-2 p-3 bg-muted/30 rounded-md border">
                <div className="flex items-center gap-2">
                  <Checkbox id="item-1" />
                  <label htmlFor="item-1" className="text-sm">Áo thun Polo Nam - Đỏ (Size M)</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="item-2" />
                  <label htmlFor="item-2" className="text-sm">Quần Khaki Nữ - Đen (Size L)</label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Lý do khiếu nại</label>
              <Input placeholder="VD: Sản phẩm bị lỗi rách nách..." />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Số tiền hoàn lại (Dự kiến)</label>
              <Input type="number" placeholder="250,000" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReturnDialog(false)}>Hủy</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleReturn}>
              Tạo Yêu cầu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
