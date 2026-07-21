"use client";

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
import { Plus, Search, MoreHorizontal, Filter, Gift } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";

import { useVouchers } from "@/features/promotions/hooks/useVouchers";

export function VoucherTable() {
  const { vouchers, isLoading } = useVouchers();

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải danh sách voucher...</div>;
  }

  return (
    <>
      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm mã code..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="ml-auto hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Lọc
          </Button>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Code</TableHead>
                <TableHead>Mức giảm</TableHead>
                <TableHead>Đơn tối thiểu</TableHead>
                <TableHead>Đã dùng / Tổng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell>
                    <div className="flex items-center font-bold text-zinc-900 bg-zinc-100 w-fit px-3 py-1 rounded-md border border-dashed border-zinc-300">
                      <Gift className="h-4 w-4 mr-2 text-zinc-500" />
                      {voucher.code}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-red-600">-{voucher.discountAmount}</TableCell>
                  <TableCell className="text-zinc-500">{voucher.minOrderValue}</TableCell>
                  <TableCell>{voucher.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={voucher.status === "Hoạt động" ? "default" : "secondary"} className={voucher.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-none"}>
                      {voucher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                                        <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-code-${voucher.id}`}>Mã Code</Label>
                                <Input id={`edit-code-${voucher.id}`} defaultValue={voucher.code} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Loại giảm giá</Label>
                                <Select defaultValue="vnd">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn loại giảm giá" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="vnd" label="Giảm theo số tiền (VND)">Giảm theo số tiền (VND)</SelectItem>
                                    <SelectItem value="percent" label="Giảm theo phần trăm (%)">Giảm theo phần trăm (%)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-discount-${voucher.id}`}>Mức giảm</Label>
                                <Input id={`edit-discount-${voucher.id}`} defaultValue={voucher.discountAmount} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-max-${voucher.id}`}>Giảm tối đa (VND) - Nếu có</Label>
                                <Input id={`edit-max-${voucher.id}`} placeholder="Không giới hạn" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-expiry-${voucher.id}`}>Ngày hết hạn</Label>
                                <Input id={`edit-expiry-${voucher.id}`} defaultValue={voucher.expiry} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-center justify-between pr-8">
                <span className="font-bold text-zinc-900 text-lg flex items-center bg-zinc-100 px-3 py-1 rounded-md border border-dashed border-zinc-300 w-fit">
                  <Gift className="h-4 w-4 mr-2 text-zinc-500" />
                  {voucher.code}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-zinc-500 mt-2">
                <span>Mức giảm: <strong className="text-red-600">-{voucher.discountAmount}</strong></span>
                <span>Đơn tối thiểu: <strong>{voucher.minOrderValue}</strong></span>
                <span>Đã dùng: <strong>{voucher.quantity}</strong></span>
              </div>
              <div className="mt-2">
                <Badge variant={voucher.status === "Hoạt động" ? "default" : "secondary"} className={voucher.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-none text-[10px] px-2 py-0"}>
                  {voucher.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-2">
                                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-code-${voucher.id}`}>Mã Code</Label>
                                <Input id={`m-edit-code-${voucher.id}`} defaultValue={voucher.code} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Loại giảm giá</Label>
                                <Select defaultValue="vnd">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn loại giảm giá" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="vnd" label="Giảm theo số tiền (VND)">Giảm theo số tiền (VND)</SelectItem>
                                    <SelectItem value="percent" label="Giảm theo phần trăm (%)">Giảm theo phần trăm (%)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-discount-${voucher.id}`}>Mức giảm</Label>
                                <Input id={`m-edit-discount-${voucher.id}`} defaultValue={voucher.discountAmount} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-max-${voucher.id}`}>Giảm tối đa (VND) - Nếu có</Label>
                                <Input id={`m-edit-max-${voucher.id}`} placeholder="Không giới hạn" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-expiry-${voucher.id}`}>Ngày hết hạn</Label>
                                <Input id={`m-edit-expiry-${voucher.id}`} defaultValue={voucher.expiry} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
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
