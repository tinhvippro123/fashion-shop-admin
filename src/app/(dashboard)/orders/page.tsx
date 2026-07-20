import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@gmail.com",
    date: "16/07/2026",
    status: "Đang xử lý",
    statusBg: "bg-blue-100",
    statusText: "text-blue-700",
    statusHover: "hover:bg-blue-200",
    payment: "Đã thanh toán (VNPay)",
    paymentBg: "bg-green-100 text-green-700",
    total: "2,500,000đ"
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@gmail.com",
    date: "15/07/2026",
    status: "Chờ thanh toán",
    statusBg: "bg-amber-100",
    statusText: "text-amber-700",
    statusHover: "hover:bg-amber-200",
    payment: "Chờ thanh toán (COD)",
    paymentBg: "bg-amber-100 text-amber-700",
    total: "850,000đ"
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@gmail.com",
    date: "14/07/2026",
    status: "Đã giao hàng",
    statusBg: "bg-zinc-100",
    statusText: "text-zinc-900",
    statusHover: "hover:bg-emerald-200",
    payment: "Đã thanh toán (Momo)",
    paymentBg: "bg-green-100 text-green-700",
    total: "3,200,000đ"
  },
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@gmail.com",
    date: "12/07/2026",
    status: "Đã hủy",
    statusBg: "bg-red-100",
    statusText: "text-red-700",
    statusHover: "hover:bg-red-200",
    payment: "Đã hoàn tiền",
    paymentBg: "bg-zinc-100 text-zinc-700",
    total: "450,000đ"
  }
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đơn hàng</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý và theo dõi trạng thái đơn hàng của khách.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Xuất dữ liệu
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm mã đơn, khách hàng..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="ml-auto hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Lọc đơn hàng
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-xs text-zinc-500">{order.customerEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="default" className={cn(order.statusBg, order.statusText, order.statusHover, "border-none")}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(order.paymentBg, "border-none text-xs")}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href={`/orders/${order.id}`} className="w-full">Xem chi tiết</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>In hóa đơn</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-center justify-between pr-8">
                <span className="font-bold text-zinc-900">#{order.id}</span>
                <span className="text-xs text-zinc-500">{order.date}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="font-medium text-sm">{order.customerName}</span>
                <span className="text-xs text-zinc-500">{order.customerEmail}</span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <Badge variant="default" className={cn(order.statusBg, order.statusText, order.statusHover, "border-none text-[10px] px-2 py-0 h-5")}>
                  {order.status}
                </Badge>
                <span className="font-bold">{order.total}</span>
              </div>

              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href={`/orders/${order.id}`} className="w-full">Xem chi tiết</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>In hóa đơn</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
