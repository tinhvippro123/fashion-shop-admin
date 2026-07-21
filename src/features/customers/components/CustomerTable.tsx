"use client";

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
import { Search, MoreHorizontal, Filter, Download, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { useCustomers } from "../hooks/useCustomers";

export function CustomerTable() {
  const { customers, isLoading } = useCustomers();

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải danh sách khách hàng...</div>;
  }
  return (
    <>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm tên, email, sđt..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="ml-auto hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Lọc
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
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Phân hạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((cus) => (
                <TableRow key={cus.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={cus.name} />
                        <AvatarFallback className="bg-zinc-100 text-zinc-600">
                          {cus.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{cus.name}</span>
                        <span className="text-xs text-zinc-500">{cus.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{cus.phone}</TableCell>
                  <TableCell>{cus.orders}</TableCell>
                  <TableCell className="font-medium">{cus.totalSpent}</TableCell>
                  <TableCell>
                    <Badge variant={cus.status === "VIP" ? "default" : "secondary"} className={cus.status === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none" : ""}>
                      {cus.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem render={<Link href={`/customers/${cus.id}`} className="w-full cursor-pointer" />}>
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>Lịch sử mua hàng</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Khóa tài khoản</DropdownMenuItem>
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
          {customers.map((cus) => (
            <div key={cus.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-center gap-3 pr-8">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src="" alt={cus.name} />
                  <AvatarFallback className="bg-zinc-100 text-zinc-600 font-semibold">
                    {cus.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-zinc-900 text-base leading-tight">{cus.name}</span>
                  <span className="text-sm text-zinc-500 truncate max-w-45">{cus.email}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-zinc-600 mt-2">
                <div>
                  <span className="block text-xs text-zinc-400 mb-0.5">SĐT</span>
                  <span className="font-medium">{cus.phone}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 mb-0.5">Tổng chi tiêu</span>
                  <span className="font-bold text-zinc-900">{cus.totalSpent}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={cus.status === "VIP" ? "default" : "secondary"} className={cus.status === "VIP" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none text-[10px] px-2 py-0" : "text-[10px] px-2 py-0"}>
                  {cus.status}
                </Badge>
                <span className="text-xs text-zinc-500">{cus.orders} đơn hàng</span>
              </div>

              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem render={<Link href={`/customers/${cus.id}`} className="w-full cursor-pointer" />}>
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem>Lịch sử mua hàng</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Khóa tài khoản</DropdownMenuItem>
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
