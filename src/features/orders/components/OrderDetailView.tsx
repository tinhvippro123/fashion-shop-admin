import Link from "next/link";
import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { ArrowLeft, Printer, MapPin, User, Mail, Phone, Clock, CreditCard, AlertTriangle, CheckCircle2, Truck, Package, PackageCheck } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";
import { OrderStatus } from "@/features/orders/types/order.admin";

import { useOrderDetail } from "@/features/orders/hooks/useOrderDetail";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import { Banknote, CheckCircle, RefreshCcw, XCircle } from "lucide-react";

export function OrderDetailView({ orderId }: { orderId: string }) {
  const { order, isLoading } = useOrderDetail(orderId);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [returnDialog, setReturnDialog] = useState(false);

  const isOnlinePayment = (payment: string) => !payment.includes("COD") && !payment.includes("Thanh toán khi nhận hàng");

  if (isLoading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Đang tải chi tiết đơn hàng...</div>;
  }

  if (!order) {
    return <div className="flex justify-center p-8 text-muted-foreground">Không tìm thấy đơn hàng</div>;
  }

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

  const handleApprove = () => {
    toast.success(`Đã xác nhận đơn hàng #${order.id}! Đã chuyển sang Đang chuẩn bị.`);
  };

  const handleHandover = () => {
    toast.success(`Đã bàn giao đơn hàng #${order.id} cho Shipper! Đã chuyển sang Đang giao.`);
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) {
      toast.error("Vui lòng chọn hoặc nhập lý do hủy đơn!");
      return;
    }
    toast.success(`Đã hủy đơn hàng #${order.id}. Lý do: ${cancelReason}`);
    setCancelDialog(false);
    setCancelReason("");
  };

  const handleReturn = () => {
    toast.success(`Đã tạo yêu cầu Đổi/Trả cho đơn hàng #${order.id} thành công! Dữ liệu đã chuyển sang Module Đổi trả.`);
    setReturnDialog(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Đơn hàng #{order.id}</h2>
              <Badge variant="default" className={cn(getStatusColor(order.status), "border-none ml-2")}>
                {getStatusText(order.status)}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Ngày đặt: {order.date}
            </p>
          </div>
        </div>
      </div>

      {order.status === 'CANCELLED' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex gap-3 items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-red-800 font-medium">Đơn hàng đã bị hủy bởi {order.cancelBy || 'Admin'}</h4>
            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-red-600 text-sm">Lý do: {order.cancelReason || 'Phát hiện Spam/Phá hoại'}</p>
              <p className="text-red-600 text-sm">Thời gian: Hôm nay 14:00</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Cột trái: Chi tiết sản phẩm và tổng tiền */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm đã đặt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {order.items?.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 aspect-2/3 rounded-md overflow-hidden bg-muted shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.variantInfo}</p>
                          <p className="text-sm font-medium mt-1">{item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                      </div>
                      <div className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="font-medium">{order.subtotal?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển:</span>
                  <span className="font-medium">{order.shippingFee?.toLocaleString('vi-VN')}đ</span>
                </div>
                {order.appliedPromotions && order.appliedPromotions.length > 0 ? (
                  order.appliedPromotions.map(promo => (
                    <div key={promo.id} className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground flex items-center gap-1">
                        Giảm giá <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">{promo.code}</Badge>
                      </span>
                      <span className="font-medium text-emerald-600">-{promo.discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giảm giá:</span>
                    <span className="font-medium text-foreground">-{order.discount?.toLocaleString('vi-VN') || 0}đ</span>
                  </div>
                )}
                <Separator className="my-1" />
                <div className="flex justify-between">
                  <span className="font-bold text-base">Tổng cộng:</span>
                  <span className="font-bold text-lg">{order.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Thông tin khách hàng & Giao hàng */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{order.customer?.name || order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customer?.type || 'Thành viên'}</p>
                  </div>
                </div>
                <Link href="/customers/CUS-001">
                  <Button variant="outline" size="sm">Xem Profile</Button>
                </Link>
              </div>
              <Separator />
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{order.customer?.email || order.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{order.customer?.phone || '0987654321'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Địa chỉ giao hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>{order.shipping?.address || '123 Đường Số 1, Quận 1, TP.HCM'}</span>
              </div>
              <div className="flex gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>{order.payment}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">Đơn vị vận chuyển</span>
                <span>{order.shipping?.method || 'Giao Hàng Tiết Kiệm'}</span>
                <span className="text-muted-foreground">Mã vận đơn: {order.shipping?.code || 'GHTK123456789'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử hành trình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 mt-2 relative">
                {/* Vertical Line */}
                <div className="absolute top-2 bottom-2 left-2.75 w-0.5 bg-muted z-0"></div>
                
                {/* Luôn có sự kiện Đặt hàng */}
                <div className="flex gap-4 relative z-10">
                  <div className="bg-background py-0.5">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="font-medium text-sm">Đơn hàng đã được tạo</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.date} 08:00</p>
                  </div>
                </div>

                {order.status !== 'PENDING' && order.status !== 'CANCELLED' && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm">Đang chuẩn bị hàng</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date} 09:30 - Kho đã nhận thông tin</p>
                    </div>
                  </div>
                )}

                {(order.status === 'SHIPPING' || order.status === 'COMPLETED') && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <Truck className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm">Đã giao cho Đơn vị vận chuyển</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Hôm qua 14:00 - Bưu cục Củ Chi</p>
                    </div>
                  </div>
                )}

                {order.status === 'COMPLETED' && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <PackageCheck className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm">Giao hàng thành công</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Hôm nay 10:15 - Khách đã nhận hàng</p>
                    </div>
                  </div>
                )}

                {order.status === 'CANCELLED' && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm text-red-600">Đơn hàng đã bị hủy</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Hôm nay - Lý do: {order.cancelReason || 'Không xác định'}</p>
                    </div>
                  </div>
                )}
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Action Footer - Dual Placement Concept */}
      <div className="sticky bottom-4 mx-auto w-full border bg-card p-4 rounded-xl shadow-lg flex flex-wrap items-center justify-between gap-4 z-50">
        <div>
          <span className="text-sm font-medium text-muted-foreground mr-2">Thao tác xử lý:</span>
          <Badge variant="outline" className={cn(getStatusColor(order.status), "border-none shadow-sm")}>
            {getStatusText(order.status)}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {order.status === 'PENDING' && (
            <>
              <Button 
                variant="destructive" 
                onClick={() => { setCancelReason(""); setCancelDialog(true); }}
                className="shadow-sm"
              >
                <XCircle className="mr-2 h-4 w-4" /> Hủy đơn
              </Button>
              <Button 
                onClick={handleApprove} 
                disabled={isOnlinePayment(order.payment)}
                className="shadow-sm"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Duyệt đơn
                {isOnlinePayment(order.payment) && <span className="ml-2 text-xs opacity-80">(Chờ Webhook)</span>}
              </Button>
            </>
          )}

          {order.status === 'PROCESSING' && (
            <>
              <Button 
                variant="destructive" 
                onClick={() => { setCancelReason(""); setCancelDialog(true); }}
                className="shadow-sm"
              >
                <XCircle className="mr-2 h-4 w-4" /> Hủy đơn
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                  toast.info(`Đang tạo phiếu in cho đơn hàng ${order.id}...`);
                  setTimeout(() => window.print(), 500);
                }}
                className="shadow-sm text-blue-700 bg-blue-50 hover:bg-blue-100"
              >
                <Printer className="mr-2 h-4 w-4" /> In phiếu giao hàng
              </Button>
              <Button 
                onClick={handleHandover}
                className="shadow-sm"
              >
                <Truck className="mr-2 h-4 w-4" /> Bàn giao Shipper
              </Button>
            </>
          )}

          {order.status === 'SHIPPING' && (
            <>
              <Button 
                variant="outline" 
                className="text-amber-600 border-amber-200 hover:bg-amber-50 shadow-sm"
                onClick={() => toast.error(`Đơn ${order.id} giao thất bại. Tiến hành hoàn kho!`)}
              >
                <AlertTriangle className="mr-2 h-4 w-4" /> Giao thất bại
              </Button>
              <Button 
                className="bg-emerald-600! hover:bg-emerald-700! text-white shadow-sm"
                onClick={() => toast.success(`Đã cập nhật trạng thái Hoàn Thành cho đơn ${order.id}`)}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Xác nhận Đã giao
              </Button>
            </>
          )}

          {order.status === 'COMPLETED' && (
            <>
              <Button 
                variant="outline"
                className="text-purple-600 border-purple-200 hover:bg-purple-50 shadow-sm"
                onClick={() => setReturnDialog(true)}
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Tạo Yêu cầu Đổi/Trả
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                  toast.info(`Đang tạo hóa đơn cho đơn hàng ${order.id}...`);
                  setTimeout(() => window.print(), 500);
                }}
                className="shadow-sm text-blue-700 bg-blue-50 hover:bg-blue-100"
              >
                <Printer className="mr-2 h-4 w-4" /> In hóa đơn
              </Button>
            </>
          )}

          {order.status === 'CANCELLED' && !order.payment.includes('COD') && (
            <Button 
              className="bg-blue-600! hover:bg-blue-700! text-white shadow-sm"
              onClick={() => toast.success(`Đã xác nhận hoàn tiền cho đơn ${order.id}`)}
            >
              <Banknote className="mr-2 h-4 w-4" /> Xác nhận Hoàn tiền
            </Button>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy đơn hàng #{order.id}</DialogTitle>
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
              Đơn hàng gốc <span className="font-bold text-primary">#{order.id}</span> sẽ không bị thay đổi dữ liệu. Một hồ sơ khiếu nại mới sẽ được tạo trong Module Đổi/Trả.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Chọn sản phẩm cần Đổi/Trả</label>
              <div className="mt-2 flex flex-col gap-2 p-3 bg-muted/30 rounded-md border max-h-50 overflow-y-auto">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-2 bg-card rounded-md border">
                    <Checkbox id={`ret-item-${item.id}`} className="mt-1" />
                    <label htmlFor={`ret-item-${item.id}`} className="text-sm leading-tight cursor-pointer flex-1">
                      <span className="font-medium block">{item.name}</span>
                      <span className="text-muted-foreground text-xs mt-0.5">{item.variantInfo} (SL: {item.quantity})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Lý do khiếu nại</label>
              <Input placeholder="VD: Sản phẩm bị lỗi rách nách..." />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Số tiền hoàn lại (Dự kiến)</label>
              <Input type="number" placeholder={order.total.replace(/\D/g, '')} />
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
    </div>
  );
}
