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
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231,000 đ</div>
            <p className="text-xs text-zinc-500">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách Hàng Mới</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-zinc-500">+180.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-zinc-500">+19% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh Số Online</CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-zinc-500">+201 từ hôm qua</p>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mã ĐH</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#ORD-001</TableCell>
                <TableCell>Nguyễn Văn A</TableCell>
                <TableCell><Badge variant="secondary">Chờ xử lý</Badge></TableCell>
                <TableCell>16/07/2026</TableCell>
                <TableCell className="text-right">1,250,000 đ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#ORD-002</TableCell>
                <TableCell>Trần Thị B</TableCell>
                <TableCell><Badge className="bg-green-600">Đã giao</Badge></TableCell>
                <TableCell>15/07/2026</TableCell>
                <TableCell className="text-right">850,000 đ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#ORD-003</TableCell>
                <TableCell>Lê Văn C</TableCell>
                <TableCell><Badge variant="outline">Đang giao</Badge></TableCell>
                <TableCell>14/07/2026</TableCell>
                <TableCell className="text-right">2,100,000 đ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#ORD-004</TableCell>
                <TableCell>Phạm Thị D</TableCell>
                <TableCell><Badge variant="destructive">Đã hủy</Badge></TableCell>
                <TableCell>12/07/2026</TableCell>
                <TableCell className="text-right">500,000 đ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
