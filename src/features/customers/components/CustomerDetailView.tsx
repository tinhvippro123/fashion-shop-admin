"use client";

import React from "react";
import Link from "next/link";
import { BackButton } from "@/shared/ui/back-button";
import { ArrowLeft, MapPin, Mail, Phone, Calendar, ShoppingBag, CreditCard } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { cn } from "@/shared/utils/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

import { useCustomerDetail } from "../hooks/useCustomerDetail";

export function CustomerDetailView({ customerId }: { customerId: string }) {
  const { customer, isLoading } = useCustomerDetail(customerId);

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải chi tiết khách hàng...</div>;
  }

  if (!customer) {
    return <div className="flex justify-center p-8 text-zinc-500">Không tìm thấy khách hàng</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Chi tiết Khách hàng</h2>
            <p className="text-zinc-500">Xem hồ sơ và lịch sử mua hàng</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Profile & Address */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center pb-6 border-b">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-zinc-900 text-white text-2xl">
                    {customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{customer.name}</h3>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">{customer.status}</Badge>
              </div>

              <div className="py-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-zinc-500" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-zinc-500" />
                  <span>Tham gia: {customer.joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sổ địa chỉ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sổ địa chỉ</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {customer.addresses?.map((addr) => (
                <div key={addr.id} className="p-3 border rounded-md relative">
                  {addr.isDefault && (
                    <Badge variant="outline" className="absolute top-2 right-2 text-[10px]">Mặc định</Badge>
                  )}
                  <p className="text-sm font-semibold mb-1">{customer.name} - {addr.phone}</p>
                  <div className="flex items-start gap-2 text-sm text-zinc-500 mt-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{addr.address}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Thống kê & Đơn hàng */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Thống kê */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-900" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium">Tổng số đơn</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{customer.totalOrders}</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-900" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium">Tổng chi tiêu</p>
                  <h3 className="text-xl sm:text-2xl font-bold truncate" title={customer.totalSpent}>{customer.totalSpent}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Lịch sử đặt hàng</CardTitle>
              <CardDescription>Các đơn hàng gần đây của khách hàng này.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Ngày đặt</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead className="text-right">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.orderHistory?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-blue-600">
                        <Link href={`/orders/${order.id}`}>#{order.id}</Link>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-zinc-100 border-zinc-200 font-normal">
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List View */}
              <div className="md:hidden flex flex-col gap-4">
                {customer.orderHistory?.map((order) => (
                  <div key={order.id} className="flex flex-col gap-3 p-4 border rounded-lg bg-zinc-50/50">
                    <div className="flex items-center justify-between">
                      <Link href={`/orders/${order.id}`} className="font-semibold text-blue-600 hover:underline">
                        {order.id}
                      </Link>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-0 text-[10px] px-1.5 py-0">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-xs">Ngày đặt</span>
                        <span className="font-medium">{order.date}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-zinc-500 text-xs">Tổng tiền</span>
                        <span className="font-bold text-zinc-900">{order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
