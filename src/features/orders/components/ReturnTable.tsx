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
import { Search, MoreHorizontal, Filter, PackageX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

const returnRequests = [
  {
    id: "RET-001",
    orderId: "ORD-045",
    customerName: "Nguyễn Văn A",
    date: "18/07/2026",
    reason: "Sản phẩm không vừa size",
    status: "Chờ xử lý",
    statusColor: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    refundAmount: "450,000đ"
  },
  {
    id: "RET-002",
    orderId: "ORD-021",
    customerName: "Trần Thị B",
    date: "17/07/2026",
    reason: "Hàng bị lỗi đường chỉ",
    status: "Đã hoàn tiền",
    statusColor: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    refundAmount: "1,200,000đ"
  },
  {
    id: "RET-003",
    orderId: "ORD-089",
    customerName: "Lê Văn C",
    date: "15/07/2026",
    reason: "Giao sai màu",
    status: "Đã từ chối",
    statusColor: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
    refundAmount: "0đ"
  }
];

export function ReturnTable() {
  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input placeholder="Tìm kiếm mã yêu cầu, mã đơn..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2 hidden sm:flex shrink-0">
              <Filter className="h-4 w-4" /> Lọc
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <Button variant="secondary" className="whitespace-nowrap">Tất cả</Button>
            <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 whitespace-nowrap">Chờ xử lý</Button>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap">Đã hoàn tiền</Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow>
              <TableHead>Mã Y/C</TableHead>
              <TableHead>Mã Đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày yêu cầu</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Số tiền hoàn</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returnRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-zinc-500">
                    <PackageX className="h-10 w-10 mb-4 text-zinc-300" />
                    <p>Chưa có yêu cầu đổi/trả nào</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              returnRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                    {req.id}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900">
                    {req.orderId}
                  </TableCell>
                  <TableCell>{req.customerName}</TableCell>
                  <TableCell className="text-zinc-500">{req.date}</TableCell>
                  <TableCell>
                    <span className="truncate max-w-[200px] block">{req.reason}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`font-normal ${req.statusColor} border-none`}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {req.refundAmount}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Xem chi tiết đơn</DropdownMenuItem>
                        <DropdownMenuItem className="text-emerald-600">Duyệt hoàn tiền</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Từ chối</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
