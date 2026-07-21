import Link from "next/link";
import { Button } from "@/shared/ui/button";
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
import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Search, PlusCircle, Filter, MoreHorizontal, Clock } from "lucide-react";

import { useFlashSales } from "@/features/marketing/hooks/useFlashSales";

export function FlashSaleTable() {
  const { flashSales, isLoading } = useFlashSales();

  if (isLoading) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  return (
    <>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">Đang diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Kết thúc sau 03:45:12
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Sắp diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-zinc-500 mt-1">Sẵn sàng kích hoạt</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Tổng doanh thu Flash Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">850,000,000 đ</div>
            <p className="text-xs text-zinc-500 mt-1">Trong tháng này</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Lịch sử Flash Sale</CardTitle>
              <CardDescription>
                Danh sách tất cả các khung giờ Flash Sale.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Tìm tên hoặc mã..."
                className="pl-9 bg-zinc-50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead className="w-[100px]">Mã FS</TableHead>
                  <TableHead>Tên khung giờ</TableHead>
                  <TableHead>Khung thời gian</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {flashSales.map((fs) => (
                  <TableRow key={fs.id}>
                    <TableCell className="font-medium">{fs.id}</TableCell>
                    <TableCell className="font-semibold">{fs.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-zinc-900 font-medium">Từ: {fs.startTime}</span>
                        <span className="text-red-600 font-medium">Đến: {fs.endTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>{fs.productsCount} mặt hàng</TableCell>
                    <TableCell>
                      <Badge 
                        variant={fs.status === "Đang diễn ra" ? "default" : fs.status === "Sắp diễn ra" ? "secondary" : "outline"}
                        className={
                          fs.status === "Đang diễn ra" ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 animate-pulse" : 
                          fs.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""
                        }
                      >
                        {fs.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{fs.revenue}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>

                            <Link href={`/flash-sales/${fs.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Dừng chương trình</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
