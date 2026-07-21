import Link from "next/link";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/shared/ui/dropdown-menu";
import { Badge } from "@/shared/ui/badge";
import { Search, MoreHorizontal, Filter, Download } from "lucide-react";
import { cn } from "@/shared/utils/utils";

import { useOrders } from "@/features/orders/hooks/useOrders";

export function OrderTable() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải danh sách đơn hàng...</div>;
  }
  return (
    <>

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
    </>
  );
}
