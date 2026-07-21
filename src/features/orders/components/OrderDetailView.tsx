import Link from "next/link";
import { BackButton } from "@/shared/ui/back-button";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { ArrowLeft, Printer, MapPin, User, Mail, Phone, Clock, CreditCard } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

import { useOrderDetail } from "@/features/orders/hooks/useOrderDetail";

export function OrderDetailView({ orderId }: { orderId: string }) {
  const { order, isLoading } = useOrderDetail(orderId);

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải chi tiết đơn hàng...</div>;
  }

  if (!order) {
    return <div className="flex justify-center p-8 text-zinc-500">Không tìm thấy đơn hàng</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Đơn hàng #{order.id}</h2>
              <Badge variant="default" className={cn(order.statusBg, order.statusText, order.statusHover, "border-none ml-2")}>
                {order.status}
              </Badge>
            </div>
            <p className="text-zinc-500 text-sm mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Ngày đặt: {order.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> In hóa đơn
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button className="bg-zinc-900 hover:bg-zinc-800" />}>
              Cập nhật trạng thái
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Chờ xác nhận</DropdownMenuItem>
              <DropdownMenuItem>Đang xử lý</DropdownMenuItem>
              <DropdownMenuItem>Đang giao hàng</DropdownMenuItem>
              <DropdownMenuItem>Đã giao thành công</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Hủy đơn hàng</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
                        <div className="relative w-14 aspect-2/3 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-zinc-500">{item.variantInfo}</p>
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
                  <span className="text-zinc-500">Tạm tính:</span>
                  <span className="font-medium">{order.subtotal?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Phí vận chuyển:</span>
                  <span className="font-medium">{order.shippingFee?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Giảm giá:</span>
                  <span className="font-medium text-zinc-900">-{order.discount?.toLocaleString('vi-VN')}đ</span>
                </div>
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
              <div className="flex items-center gap-3">
                <div className="bg-zinc-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-zinc-600" />
                </div>
                <div>
                  <p className="font-medium">{order.customer?.name}</p>
                  <p className="text-sm text-zinc-500">{order.customer?.type}</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{order.customer?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{order.customer?.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Địa chỉ giao hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-zinc-600">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{order.shipping?.address}</span>
              </div>
              <div className="flex gap-2">
                <CreditCard className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{order.payment}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-zinc-900">Đơn vị vận chuyển</span>
                <span>{order.shipping?.method}</span>
                <span className="text-zinc-500">Mã vận đơn: {order.shipping?.code}</span>
              </div>
              <Badge variant="outline" className="w-fit text-amber-700 bg-amber-50 border-amber-200">
                Chưa thanh toán
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
