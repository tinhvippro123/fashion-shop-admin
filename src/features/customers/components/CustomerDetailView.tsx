"use client";

import React from "react";
import Link from "next/link";
import { BackButton } from "@/shared/ui/back-button";
import { ArrowLeft, MapPin, Mail, Phone, Calendar, ShoppingBag, CreditCard, Star, Globe, MonitorSmartphone, ShieldAlert, KeyRound, AlertTriangle } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { cn } from "@/shared/utils/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";

import { useCustomerDetail } from "@/features/customers/hooks/useCustomerDetail";

export function CustomerDetailView({ customerId }: { customerId: string }) {
  const { customer, isLoading } = useCustomerDetail(customerId);

  if (isLoading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Đang tải chi tiết khách hàng...</div>;
  }

  if (!customer) {
    return <div className="flex justify-center p-8 text-muted-foreground">Không tìm thấy khách hàng</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Chi tiết Khách hàng</h2>
            <p className="text-muted-foreground">Xem hồ sơ và lịch sử mua hàng</p>
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
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{customer.name}</h3>
                <Badge className={
                  customer.accountStatus === 'ACTIVE' ? "bg-emerald-500 hover:bg-emerald-600" :
                  customer.accountStatus === 'BANNED' ? "bg-red-500 hover:bg-red-600" :
                  "bg-slate-500 hover:bg-slate-600"
                }>
                  {customer.accountStatus === 'ACTIVE' ? "Đang hoạt động" : 
                   customer.accountStatus === 'BANNED' ? "Bị khóa" : "Chưa xác thực"}
                </Badge>
              </div>

              <div className="py-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Tham gia: {customer.joinedDate || "N/A"}</span>
                </div>

                {/* Hiding IP/Device by default for ACTIVE users (moved to Security tab) */}
                {customer.deletedAt ? (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-left">
                    <p className="text-sm font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Bằng chứng yêu cầu xóa
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-sm text-orange-900">
                        <Calendar className="h-4 w-4 opacity-70" />
                        <span>Lúc: <span className="font-medium">{customer.deletedAt}</span></span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-orange-900">
                        <Globe className="h-4 w-4 opacity-70" />
                        <span>IP: <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">{customer.ipAddress}</code></span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-orange-900">
                        <MonitorSmartphone className="h-4 w-4 opacity-70" />
                        <span className="truncate">Device: {customer.deviceId}</span>
                      </div>
                    </div>
                  </div>
                ) : customer.accountStatus === 'BANNED' ? (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                    <p className="text-sm font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" /> Dữ liệu nhận diện (Fingerprint)
                    </p>
                    <div className="flex flex-col gap-2 text-red-900">
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="h-4 w-4 opacity-70" />
                        <span>IP: <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">{customer.ipAddress}</code></span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MonitorSmartphone className="h-4 w-4 opacity-70" />
                        <span className="truncate" title={customer.deviceId}>Device: {customer.deviceId}</span>
                      </div>
                    </div>
                  </div>
                ) : customer.accountStatus === 'UNVERIFIED' ? (
                  <div className="mt-4 flex flex-col gap-2 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>IP: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{customer.ipAddress}</code></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MonitorSmartphone className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">Device: {customer.deviceId}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Sổ địa chỉ */}
          {customer.accountStatus !== 'UNVERIFIED' && (
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
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{addr.address}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cột phải: Thống kê & Đơn hàng */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {customer.accountStatus === 'UNVERIFIED' ? (
            <Card className="h-full border-dashed border-2 bg-muted/30 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <ShieldAlert className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Tài khoản chưa xác thực</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Khách hàng này chưa hoàn tất bước xác thực mã OTP nên không có lịch sử mua hàng, địa chỉ, hay thống kê chi tiêu.
              </p>
              <p className="text-sm font-medium text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                Lưu ý: Bạn có thể kiểm tra địa chỉ IP và Device ID bên trái để phát hiện spam bot.
              </p>
            </Card>
          ) : (
            <>
              {/* Thống kê */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">Tổng số đơn</p>
                      <h3 className="text-xl sm:text-2xl font-bold">{customer.totalOrders}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">Tổng chi tiêu</p>
                      <h3 className="text-xl sm:text-2xl font-bold truncate" title={customer.totalSpent}>{customer.totalSpent}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="orders" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto gap-6 mb-6">
                  <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-0">
                    Lịch sử đặt hàng
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-0">
                    Lịch sử đánh giá
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-0">
                    Lịch sử bảo mật
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders" className="m-0 focus-visible:outline-none">
                  <Card>
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
                                <TableCell className="text-right">
                                  <Badge variant="outline" className="bg-muted border-border font-normal">
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
                          <div key={order.id} className="flex flex-col gap-3 p-4 border rounded-lg bg-muted/30">
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
                                <span className="text-muted-foreground text-xs">Ngày đặt</span>
                                <span className="font-medium">{order.date}</span>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-muted-foreground text-xs">Tổng tiền</span>
                                <span className="font-bold text-foreground">{order.total}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="m-0 focus-visible:outline-none flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lịch sử đánh giá</CardTitle>
                      <CardDescription>Tất cả các đánh giá sản phẩm của khách hàng này.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {/* Mock Review Item */}
                        <div className="flex flex-col gap-3 p-4 border rounded-lg bg-muted/30">
                          <div className="flex justify-between items-start">
                            <Link href="/products/PROD-1/edit" className="font-bold text-blue-600 hover:underline">
                              Áo Thun Cổ Tròn Basic Cotton (Đen / M)
                            </Link>
                            <span className="text-xs text-muted-foreground">10/05/2026</span>
                          </div>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : 'text-zinc-300'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-foreground">
                            Chất vải rất mát, form áo chuẩn như hình. Tuy nhiên phần chỉ thừa ở gấu áo còn khá nhiều, hy vọng shop sẽ khắc phục ở những lô hàng sau. Giao hàng nhanh, shipper thân thiện.
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-none font-normal">Đã hiển thị</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="m-0 focus-visible:outline-none flex flex-col gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <KeyRound className="h-5 w-5" /> Lịch sử đăng nhập & Bảo mật
                        </CardTitle>
                        <CardDescription>Danh sách các thiết bị và địa chỉ IP đã truy cập vào tài khoản này gần đây.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Thời gian</TableHead>
                                <TableHead>Hành động</TableHead>
                                <TableHead>Địa chỉ IP</TableHead>
                                <TableHead>Thiết bị</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Hôm nay, 14:30</TableCell>
                                <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Đăng nhập thành công</Badge></TableCell>
                                <TableCell><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{customer.ipAddress || '118.69.252.12'}</code></TableCell>
                                <TableCell>{customer.deviceId || 'iPhone 14 Pro Max - iOS 16.5'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Hôm qua, 09:15</TableCell>
                                <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Đăng nhập thành công</Badge></TableCell>
                                <TableCell><code className="bg-muted px-1.5 py-0.5 rounded text-xs">14.161.45.10</code></TableCell>
                                <TableCell>MacBook Air M1 - macOS Sonoma</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>10/05/2026, 21:00</TableCell>
                                <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Đổi mật khẩu</Badge></TableCell>
                                <TableCell><code className="bg-muted px-1.5 py-0.5 rounded text-xs">118.69.252.12</code></TableCell>
                                <TableCell>iPhone 14 Pro Max - iOS 16.5</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
