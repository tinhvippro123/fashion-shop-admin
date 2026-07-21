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
import { Search, MoreHorizontal, Plus, Shield, UserCog, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

const staffs = [
  {
    id: "STF-001",
    name: "Lê Thanh Quản",
    email: "admin@fashionshop.com",
    phone: "0901 234 567",
    role: "Quản trị viên",
    status: "Hoạt động",
    avatar: "/avatars/admin.jpg",
    initial: "Q"
  },
  {
    id: "STF-002",
    name: "Phạm Thị Bán Hàng",
    email: "sale@fashionshop.com",
    phone: "0902 345 678",
    role: "Nhân viên Sale",
    status: "Hoạt động",
    avatar: "",
    initial: "S"
  },
  {
    id: "STF-003",
    name: "Nguyễn Văn Content",
    email: "content@fashionshop.com",
    phone: "0903 456 789",
    role: "Nhân viên Content",
    status: "Đã khóa",
    avatar: "",
    initial: "C"
  }
];

export default function StaffsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Nhân viên</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý danh sách nhân viên và quyền hạn trên hệ thống.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm nhân viên mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" placeholder="VD: Nguyễn Văn A" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email đăng nhập</Label>
                <Input id="email" type="email" placeholder="VD: email@domain.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="VD: 0912..." />
              </div>
              <div className="grid gap-2">
                <Label>Phân quyền</Label>
                <Select defaultValue="sale">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn phân quyền" />
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false}>
                    <SelectItem value="admin" label="Quản trị viên (Full quyền)">Quản trị viên (Full quyền)</SelectItem>
                    <SelectItem value="sale" label="Nhân viên Sale (Xử lý đơn hàng)">Nhân viên Sale (Xử lý đơn hàng)</SelectItem>
                    <SelectItem value="content" label="Nhân viên Content (Quản lý bài viết)">Nhân viên Content (Quản lý bài viết)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Hủy</Button>
              <Button className="bg-zinc-900 hover:bg-zinc-800">Tạo tài khoản</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input type="search" placeholder="Tìm kiếm nhân viên..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Phân quyền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback className={staff.role === "Quản trị viên" ? "bg-red-100 text-red-700" : ""}>{staff.initial}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900">{staff.name}</span>
                        <span className="text-xs text-zinc-500">{staff.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm text-zinc-600">
                      <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {staff.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {staff.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      staff.role === "Quản trị viên" ? "border-red-200 bg-red-50 text-red-700" :
                      staff.role === "Nhân viên Sale" ? "border-blue-200 bg-blue-50 text-blue-700" :
                      "border-orange-200 bg-orange-50 text-orange-700"
                    }>
                      {staff.role === "Quản trị viên" && <Shield className="h-3 w-3 mr-1" />}
                      {staff.role !== "Quản trị viên" && <UserCog className="h-3 w-3 mr-1" />}
                      {staff.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "Hoạt động" ? "default" : "secondary"} className={staff.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-none"}>
                      {staff.status}
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
                              <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-name-${staff.id}`}>Họ và tên</Label>
                                <Input id={`edit-name-${staff.id}`} defaultValue={staff.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-email-${staff.id}`}>Email đăng nhập</Label>
                                <Input id={`edit-email-${staff.id}`} defaultValue={staff.email} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-phone-${staff.id}`}>Số điện thoại</Label>
                                <Input id={`edit-phone-${staff.id}`} defaultValue={staff.phone} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Phân quyền</Label>
                                <Select defaultValue={staff.role}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn phân quyền" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="Quản trị viên" label="Quản trị viên (Full quyền)">Quản trị viên (Full quyền)</SelectItem>
                                    <SelectItem value="Nhân viên Sale" label="Nhân viên Sale (Xử lý đơn hàng)">Nhân viên Sale (Xử lý đơn hàng)</SelectItem>
                                    <SelectItem value="Nhân viên Content" label="Nhân viên Content (Quản lý bài viết)">Nhân viên Content (Quản lý bài viết)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>{staff.status === "Hoạt động" ? "Khóa tài khoản" : "Mở khóa"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa tài khoản</DropdownMenuItem>
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
          {staffs.map((staff) => (
            <div key={staff.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-start gap-3 pr-8">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={staff.avatar} alt={staff.name} />
                  <AvatarFallback className={staff.role === "Quản trị viên" ? "bg-red-100 text-red-700" : ""}>{staff.initial}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-zinc-900">{staff.name}</span>
                  <span className="text-xs text-zinc-500 mb-1.5">{staff.id}</span>
                  
                  <div className="flex gap-2 items-center flex-wrap">
                    <Badge variant="outline" className={
                      staff.role === "Quản trị viên" ? "border-red-200 bg-red-50 text-red-700 text-[10px] px-1.5 py-0" :
                      staff.role === "Nhân viên Sale" ? "border-blue-200 bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0" :
                      "border-orange-200 bg-orange-50 text-orange-700 text-[10px] px-1.5 py-0"
                    }>
                      {staff.role}
                    </Badge>
                    <Badge variant={staff.status === "Hoạt động" ? "default" : "secondary"} className={staff.status === "Hoạt động" ? "bg-green-100 text-green-700 border-none text-[10px] px-1.5 py-0 shadow-none" : "bg-zinc-200 text-zinc-700 border-none text-[10px] px-1.5 py-0 shadow-none"}>
                      {staff.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col gap-1 text-xs text-zinc-600 mt-2">
                    <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {staff.email}</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {staff.phone}</div>
                  </div>
                </div>
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
                              <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-name-${staff.id}`}>Họ và tên</Label>
                                <Input id={`m-edit-name-${staff.id}`} defaultValue={staff.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-email-${staff.id}`}>Email đăng nhập</Label>
                                <Input id={`m-edit-email-${staff.id}`} defaultValue={staff.email} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-phone-${staff.id}`}>Số điện thoại</Label>
                                <Input id={`m-edit-phone-${staff.id}`} defaultValue={staff.phone} />
                              </div>
                              <div className="grid gap-2">
                                <Label>Phân quyền</Label>
                                <Select defaultValue={staff.role}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn phân quyền" />
                                  </SelectTrigger>
                                  <SelectContent align="start" alignItemWithTrigger={false}>
                                    <SelectItem value="Quản trị viên" label="Quản trị viên (Full quyền)">Quản trị viên (Full quyền)</SelectItem>
                                    <SelectItem value="Nhân viên Sale" label="Nhân viên Sale (Xử lý đơn hàng)">Nhân viên Sale (Xử lý đơn hàng)</SelectItem>
                                    <SelectItem value="Nhân viên Content" label="Nhân viên Content (Quản lý bài viết)">Nhân viên Content (Quản lý bài viết)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>{staff.status === "Hoạt động" ? "Khóa tài khoản" : "Mở khóa"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa tài khoản</DropdownMenuItem>
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
