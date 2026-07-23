"use client";

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
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function FlashSaleTable() {
  const { flashSales, isLoading } = useFlashSales();

  

  return (
    <>
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Đang diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-primary-foreground/80 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Kết thúc sau 03:45:12
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sắp diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Sẵn sàng kích hoạt</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng doanh thu Flash Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">850,000,000 đ</div>
            <p className="text-xs text-muted-foreground mt-1">Trong tháng này</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Lịch sử Flash Sale</CardTitle>
              <CardDescription>
                Danh sách tất cả các khung giờ Flash Sale.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="flex items-center gap-4 px-6 pb-4">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên hoặc mã..."
                className="pl-8 bg-muted/50"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
          </div>
        </div>
        <CardContent>
        {/* Desktop View: Table */}
        <div className="hidden md:block border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
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
              <TableBody className="bg-card">
                {isLoading ? <TableSkeleton columns={7} /> : (
                  flashSales.map((fs) => (
                  <TableRow key={fs.id}>
                    <TableCell className="font-medium">{fs.id}</TableCell>
                    <TableCell className="font-semibold">{fs.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-foreground font-medium">Từ: {fs.startTime}</span>
                        <span className="text-red-600 font-medium">Đến: {fs.endTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>{fs.productsCount} mặt hàng</TableCell>
                    <TableCell>
                      <Badge 
                        variant={fs.status === "Đang diễn ra" ? "default" : fs.status === "Sắp diễn ra" ? "secondary" : "outline"}
                        className={
                          fs.status === "Đang diễn ra" ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 animate-pulse" : 
                          fs.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-transparent" : ""
                        }
                      >
                        {fs.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{fs.revenue || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/flash-sales/${fs.id}/edit`} className="w-full cursor-pointer" />}>
                              Chỉnh sửa
                            </DropdownMenuItem>
                          <DropdownMenuItem>Dừng chương trình</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
)}
              </TableBody>
            </Table>
          </div>

        {/* Mobile View: List */}
        <div className="md:hidden flex flex-col gap-3 mt-4">
          {flashSales.map((fs) => (
            <div key={fs.id} className="flex flex-col p-4 border rounded-lg bg-card shadow-sm relative">
              <div className="flex justify-between items-start mb-3 pr-8">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-0.5">{fs.id}</div>
                  <div className="font-bold text-foreground text-base leading-tight">{fs.name}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 text-sm bg-muted/30 p-2.5 rounded-md mb-3 border border-border/50">
                <div className="flex items-center gap-2 text-foreground font-medium"><span className="text-muted-foreground text-xs uppercase w-8">Từ:</span> {fs.startTime}</div>
                <div className="flex items-center gap-2 text-red-600 font-medium"><span className="text-muted-foreground text-xs uppercase w-8">Đến:</span> {fs.endTime}</div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={fs.status === "Đang diễn ra" ? "default" : fs.status === "Sắp diễn ra" ? "secondary" : "outline"}
                    className={
                      fs.status === "Đang diễn ra" ? "bg-red-100 text-red-700 hover:bg-red-200 border-none animate-pulse text-[10px] px-2 py-0 h-5" : 
                      fs.status === "Sắp diễn ra" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 text-[10px] px-2 py-0 h-5 border-none" : "text-[10px] px-2 py-0 h-5"
                    }
                  >
                    {fs.status}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">{fs.productsCount} sp</span>
                </div>
                <div className="font-bold text-foreground text-sm">{fs.revenue || "-"}</div>
              </div>

              <div className="absolute top-4 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem render={<Link href={`/flash-sales/${fs.id}/edit`} className="w-full cursor-pointer" />}>
                        Chỉnh sửa
                      </DropdownMenuItem>
                    <DropdownMenuItem>Dừng chương trình</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        </CardContent>
      </Card>
    </>
  );
}
