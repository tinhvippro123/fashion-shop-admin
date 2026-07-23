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
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { DollarSign, ShoppingBag, Users, CreditCard } from "lucide-react";
import { OverviewChart } from "./OverviewChart";

export function DashboardOverview() {
  return (
    <>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231,000 đ</div>
            <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách Hàng Mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh Số Online</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 từ hôm qua</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Biểu đồ doanh thu */}
        <Card className="col-span-4 hidden md:block">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
            <CardDescription>
              Thống kê doanh thu trong 7 tháng gần nhất.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Recent Orders Table */}
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Bạn có 23 đơn hàng chưa xử lý trong hôm nay.
            </CardDescription>
          </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">N</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Nguyễn Văn A</p>
                <p className="text-sm text-muted-foreground">#ORD-001 &bull; 16/07/2026</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <span className="text-sm font-bold leading-none">1,250,000 đ</span>
                <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5">Chờ xử lý</Badge>
              </div>
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">T</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Trần Thị B</p>
                <p className="text-sm text-muted-foreground">#ORD-002 &bull; 15/07/2026</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <span className="text-sm font-bold leading-none">850,000 đ</span>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] px-2 py-0 h-5 text-white">Đã giao</Badge>
              </div>
            </div>

            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">L</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Lê Văn C</p>
                <p className="text-sm text-muted-foreground">#ORD-003 &bull; 14/07/2026</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <span className="text-sm font-bold leading-none">2,100,000 đ</span>
                <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 border-primary text-primary">Đang giao</Badge>
              </div>
            </div>

            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">P</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Phạm Thị D</p>
                <p className="text-sm text-muted-foreground">#ORD-004 &bull; 12/07/2026</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <span className="text-sm font-bold leading-none">500,000 đ</span>
                <Badge variant="destructive" className="text-[10px] px-2 py-0 h-5">Đã hủy</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
