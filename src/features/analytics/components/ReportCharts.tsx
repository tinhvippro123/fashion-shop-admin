"use client";

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
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Download, Filter, TrendingUp } from "lucide-react";
import { OverviewChart } from "./OverviewChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { timeOptions, mockBestSellers, mockConversionFunnel } from "../mocks/report.mock";
import { mockChartData } from "../mocks/dashboard.mock";

export function ReportCharts() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState("this_month");

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 mb-4">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Select value={timeFilter} onValueChange={(val) => setTimeFilter(val as string)}>
            <SelectTrigger className="flex-1 sm:w-[180px]">
              <SelectValue placeholder="Chọn thời gian">
                {timeOptions.find((opt) => opt.key === timeFilter)?.label || "Chọn thời gian"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {timeOptions.map((opt) => (
                <SelectItem key={opt.key} value={opt.key} label={opt.label}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Lọc thêm
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Biểu đồ doanh thu chi tiết */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
            <CardDescription>
              Thống kê doanh thu chi tiết theo thời gian đã chọn.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={mockChartData} />
          </CardContent>
        </Card>

        {/* Thống kê tỷ lệ chuyển đổi (Conversion Rate) */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Phân tích hiệu quả</CardTitle>
            <CardDescription>Các chỉ số chuyển đổi phễu bán hàng.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {mockConversionFunnel.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{item.step}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.value.toLocaleString('vi-VN')} {item.percentage ? `(${item.percentage}%)` : ''}
                  </p>
                </div>
                <div className={item.trend > 0 ? "font-medium text-foreground" : "font-medium text-red-500"}>
                  {item.trend > 0 ? "+" : ""}{item.trend}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bảng xếp hạng Best Sellers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Top Sản phẩm Bán chạy nhất (Best Sellers)
          </CardTitle>
          <CardDescription>
            Danh sách 5 sản phẩm mang lại doanh thu cao nhất trong kỳ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile View: List */}
          <div className="space-y-6 md:hidden">
            {mockBestSellers.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors -mx-2"
                onClick={() => router.push(`/catalog/products/${item.id}`)}
              >
                <Avatar className="h-10 w-10 rounded-md border">
                  <AvatarFallback className={index < 3 ? "bg-orange-100 text-orange-600 font-bold" : "bg-muted text-muted-foreground font-semibold"}>
                    #{index + 1}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-semibold leading-none">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.id}</span>
                    <span className="text-xs text-muted-foreground">&bull;</span>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <span className="text-sm font-bold leading-none text-foreground">{item.revenue}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.sold.toLocaleString()} đã bán</span>
                    <span className={`text-xs font-medium ${item.trend.startsWith('+') ? "text-emerald-500" : "text-red-500"}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SP</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead className="text-right">Đã bán</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Tăng trưởng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBestSellers.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/catalog/products/${item.id}`)}
                  >
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                          TOP {index + 1}
                        </div>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.sold.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-foreground">{item.revenue}</TableCell>
                    <TableCell className="text-right">
                      <span className={item.trend.startsWith('+') ? "text-foreground" : "text-red-500"}>
                        {item.trend}
                      </span>
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
