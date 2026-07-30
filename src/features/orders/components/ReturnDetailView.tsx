import Link from "next/link";
import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Package, User, Clock, AlertTriangle, CheckCircle, PackageCheck, Banknote, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";
import { ReturnStatus } from "./ReturnTable";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";

// Fake data fetching hook for UI demonstration
function useReturnDetail(returnId: string) {
  // In a real app, this would fetch from an API.
  return {
    returnReq: {
      id: returnId,
      orderId: "ORD-045",
      date: "18/07/2026 14:30",
      status: "PENDING" as ReturnStatus,
      reason: "Sản phẩm không vừa size",
      description: "Tôi mua size M nhưng mặc bị chật nách, muốn đổi sang size L hoặc hoàn tiền nếu hết hàng.",
      refundAmount: "450,000đ",
      customer: {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0987654321",
        type: "Khách hàng VIP"
      },
      items: [
        {
          id: "ITEM-1",
          name: "Áo thun Polo Nam - Đỏ",
          variantInfo: "Size M",
          price: 450000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&q=80"
        }
      ],
      evidence: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" // Mock image
      ]
    },
    isLoading: false
  };
}

export function ReturnDetailView({ returnId }: { returnId: string }) {
  const { returnReq, isLoading } = useReturnDetail(returnId);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [currentStatus, setCurrentStatus] = useState<ReturnStatus>(returnReq?.status || "PENDING");

  if (isLoading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Đang tải chi tiết yêu cầu...</div>;
  }

  if (!returnReq) {
    return <div className="flex justify-center p-8 text-muted-foreground">Không tìm thấy yêu cầu đổi/trả</div>;
  }

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

  const handleApprove = () => {
    toast.success(`Đã duyệt yêu cầu hoàn trả ${returnReq.id}! Đang điều phối Shipper đến thu hồi hàng.`);
    setCurrentStatus("RETURNING");
  };

  const handleReceive = () => {
    toast.success(`Kho đã xác nhận nhận lại hàng nguyên vẹn. Đã báo kế toán hoàn tiền.`);
    setCurrentStatus("COMPLETED");
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối để lưu hồ sơ!");
      return;
    }
    toast.error(`Đã từ chối yêu cầu ${returnReq.id}. Lý do: ${rejectReason}`);
    setRejectDialog(false);
    setCurrentStatus("REJECTED");
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Yêu cầu {returnReq.id}</h2>
              <Badge variant="default" className={cn(getStatusColor(currentStatus), "border-none ml-2")}>
                {getStatusText(currentStatus)}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Ngày yêu cầu: {returnReq.date}
            </p>
          </div>
        </div>
        <Link href={`/orders/${returnReq.orderId}`}>
          <Button variant="outline">Xem Đơn Hàng Gốc</Button>
        </Link>
      </div>

      {currentStatus === 'REJECTED' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex gap-3 items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-red-800 font-medium">Yêu cầu đã bị từ chối</h4>
            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-red-600 text-sm">Lý do: {rejectReason || 'Không hợp lệ / Sai quy định đổi trả'}</p>
            </div>
          </div>
        </div>
      )}

      {currentStatus === 'COMPLETED' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 flex gap-3 items-start">
          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-emerald-800 font-medium">Đổi/Trả thành công</h4>
            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-emerald-600 text-sm">Kế toán đã hoàn tất việc chuyển khoản {returnReq.refundAmount} lại cho khách hàng.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Return Info */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm hoàn trả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {returnReq.items?.map((item) => (
                  <div key={item.id} className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 aspect-square rounded-md overflow-hidden bg-muted shrink-0 border">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.variantInfo}</p>
                        <p className="text-sm font-medium mt-1">SL: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-sm text-foreground">Lý do khiếu nại</h4>
                <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border">{returnReq.description}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <h4 className="font-semibold text-sm text-foreground">Bằng chứng (Hình ảnh/Video)</h4>
                <div className="flex gap-2 mt-1">
                  {returnReq.evidence.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-md border overflow-hidden cursor-pointer hover:opacity-90">
                      <Image src={img} alt="Evidence" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Customer Info & Status Timeline */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{returnReq.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{returnReq.customer.type}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Số tiền yêu cầu hoàn:</span>
                <span className="font-bold text-lg text-emerald-600">{returnReq.refundAmount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tiến độ xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 mt-2 relative">
                {/* Vertical Line */}
                <div className="absolute top-2 bottom-2 left-2.75 w-0.5 bg-muted z-0"></div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="bg-background py-0.5">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="font-medium text-sm">Yêu cầu được tạo</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{returnReq.date}</p>
                  </div>
                </div>

                {(currentStatus === 'RETURNING' || currentStatus === 'COMPLETED') && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm">Admin đã duyệt đổi/trả</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Shipper đang thu hồi hàng</p>
                    </div>
                  </div>
                )}

                {currentStatus === 'COMPLETED' && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <PackageCheck className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm">Kho đã nhận lại hàng</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Kế toán xác nhận hoàn tiền</p>
                    </div>
                  </div>
                )}
                
                {currentStatus === 'REJECTED' && (
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-background py-0.5">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="pt-1 flex-1">
                      <h4 className="font-medium text-sm text-red-600">Admin từ chối</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Lý do: {rejectReason || 'Không hợp lệ'}</p>
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
          <Badge variant="outline" className={cn(getStatusColor(currentStatus), "border-none shadow-sm")}>
            {getStatusText(currentStatus)}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {currentStatus === 'PENDING' && (
            <>
              <Button 
                variant="destructive" 
                onClick={() => { setRejectReason(""); setRejectDialog(true); }}
                className="shadow-sm"
              >
                <XCircle className="mr-2 h-4 w-4" /> Từ chối
              </Button>
              <Button 
                onClick={handleApprove} 
                className="bg-emerald-600 hover:bg-emerald-700 shadow-sm"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Đồng ý hoàn trả
              </Button>
            </>
          )}

          {currentStatus === 'RETURNING' && (
            <>
              <Button 
                onClick={handleReceive}
                className="bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                <PackageCheck className="mr-2 h-4 w-4" /> Đã nhận lại hàng
              </Button>
            </>
          )}

          {currentStatus === 'COMPLETED' && (
            <div className="text-sm text-muted-foreground italic flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" /> Dữ liệu đã đóng băng vĩnh viễn
            </div>
          )}

          {currentStatus === 'REJECTED' && (
            <div className="text-sm text-muted-foreground italic flex items-center">
              <XCircle className="h-4 w-4 mr-2 text-red-500" /> Dữ liệu đã đóng băng vĩnh viễn
            </div>
          )}
        </div>
      </div>

      {/* Dialog for Reject */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối yêu cầu {returnReq.id}</DialogTitle>
            <DialogDescription>Ghi rõ lý do từ chối để thông báo cho khách hàng và lưu lại làm bằng chứng.</DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-3">
            <label className="text-sm font-medium">Lý do từ chối *</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge 
                variant={rejectReason === "Quá thời hạn đổi trả 7 ngày" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setRejectReason("Quá thời hạn đổi trả 7 ngày")}
              >Quá thời hạn đổi trả</Badge>
              <Badge 
                variant={rejectReason === "Hàng không bị lỗi kỹ thuật" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setRejectReason("Hàng không bị lỗi kỹ thuật")}
              >Không bị lỗi kỹ thuật</Badge>
              <Badge 
                variant={rejectReason === "Có dấu hiệu cố ý làm hỏng" ? "default" : "destructive"}
                className="cursor-pointer"
                onClick={() => setRejectReason("Có dấu hiệu cố ý làm hỏng")}
              >Cố ý làm hỏng hàng</Badge>
            </div>
            <Input 
              placeholder="Hoặc nhập chi tiết lý do khác..." 
              value={rejectReason} 
              onChange={(e) => setRejectReason(e.target.value)} 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>Đóng</Button>
            <Button variant="destructive" onClick={handleReject}>Xác nhận từ chối</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
