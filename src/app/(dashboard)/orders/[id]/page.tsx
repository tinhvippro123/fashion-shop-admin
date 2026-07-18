import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer, MapPin, User, Mail, Phone, Clock, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // Mock data cho giao diện
  const orderId = params.id;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Đơn hàng #{orderId}</h2>
              <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none ml-2">
                Đang xử lý
              </Badge>
            </div>
            <p className="text-zinc-500 text-sm mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Ngày đặt: 16/07/2026, 14:30
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
                {/* Item 1 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 aspect-2/3 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                      <Image src="/login-bg.jpg" alt="Product" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Váy đầm dạ hội nữ cao cấp</h4>
                      <p className="text-sm text-zinc-500">Phân loại: Đỏ / Size M</p>
                      <p className="text-sm font-medium mt-1">1 x 1,500,000đ</p>
                    </div>
                  </div>
                  <div className="font-bold">1,500,000đ</div>
                </div>
                <Separator />
                {/* Item 2 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 aspect-2/3 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                      <Image src="/login-bg.jpg" alt="Product" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Áo khoác blazer thanh lịch</h4>
                      <p className="text-sm text-zinc-500">Phân loại: Đen / Size L</p>
                      <p className="text-sm font-medium mt-1">1 x 950,000đ</p>
                    </div>
                  </div>
                  <div className="font-bold">950,000đ</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Tạm tính:</span>
                  <span className="font-medium">2,450,000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Phí vận chuyển:</span>
                  <span className="font-medium">50,000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Giảm giá:</span>
                  <span className="font-medium text-emerald-600">-0đ</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between">
                  <span className="font-bold text-base">Tổng cộng:</span>
                  <span className="font-bold text-lg">2,500,000đ</span>
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
                  <p className="font-medium">Nguyễn Văn A</p>
                  <p className="text-sm text-zinc-500">Khách hàng thành viên</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">nguyenvana@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>0987 654 321</span>
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
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-medium text-zinc-900 block mb-1">Nhà riêng</span>
                  Số 123, Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-600">
                <CreditCard className="h-4 w-4 shrink-0" />
                <span>Thanh toán khi nhận hàng (COD)</span>
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
