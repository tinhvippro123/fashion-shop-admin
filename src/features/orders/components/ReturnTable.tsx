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
    statusColor: "bg-muted text-muted-foreground hover:bg-muted",
    refundAmount: "0đ"
  }
];

export function ReturnTable() {
  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Yêu cầu đổi/trả</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý các yêu cầu đổi trả và hoàn tiền của khách hàng.</p>
        </div>
      </div>
      
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 p-4 border-b sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm mã yêu cầu, mã đơn..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-4 text-sm overflow-x-auto pb-1 sm:pb-0">
              <span className="font-medium text-foreground cursor-pointer shrink-0">Tất cả</span>
              <span className="text-amber-600 font-medium cursor-pointer shrink-0">Chờ xử lý</span>
              <span className="text-emerald-600 font-medium cursor-pointer shrink-0">Đã hoàn tiền</span>
            </div>
            <Button variant="outline" className="hidden sm:flex shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
            <Button variant="outline" size="icon" className="sm:flex md:hidden shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile View: List */}
        <div className="space-y-4 md:hidden">
          {returnRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground py-10 border rounded-lg">
              <PackageX className="h-10 w-10 mb-4 text-zinc-300" />
              <p>Chưa có yêu cầu đổi/trả nào</p>
            </div>
          ) : (
            returnRequests.map((req) => (
              <div key={req.id} className="p-4 border rounded-lg space-y-3 bg-card shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link href={`/orders/${req.orderId}`} className="font-bold text-primary hover:underline">
                      {req.id}
                    </Link>
                    <Badge className={`font-normal ${req.statusColor} border-none text-[10px] px-2 py-0 h-5`}>
                      {req.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/orders/${req.orderId}`} className="w-full cursor-pointer" />}>
                        Xem chi tiết đơn
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-emerald-600 cursor-pointer">Duyệt hoàn tiền</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive cursor-pointer">Từ chối</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div>
                  <div className="text-sm font-semibold">{req.customerName}</div>
                  <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                    <span>Đơn: {req.orderId}</span>
                    <span>&bull;</span>
                    <span>{req.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-border/50">
                  <div className="text-xs text-muted-foreground truncate flex-1 mr-4">
                    <span className="font-medium mr-1">Lý do:</span> 
                    {req.reason}
                  </div>
                  <div className="font-bold text-sm text-foreground shrink-0">{req.refundAmount}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-muted/50">
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
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <PackageX className="h-10 w-10 mb-4 text-zinc-300" />
                      <p>Chưa có yêu cầu đổi/trả nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                returnRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium text-primary hover:underline">
                      <Link href={`/orders/${req.orderId}`}>{req.id}</Link>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {req.orderId}
                    </TableCell>
                    <TableCell>{req.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{req.date}</TableCell>
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
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/orders/${req.orderId}`} className="w-full cursor-pointer" />}>
                            Xem chi tiết đơn
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-emerald-600 cursor-pointer">Duyệt hoàn tiền</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive cursor-pointer">Từ chối</DropdownMenuItem>
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
    </div>
  );
}
