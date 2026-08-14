"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { StaffTable } from "@/features/staffs";

import { useState } from "react";

export default function StaffsPage() {
  const [role, setRole] = useState("sale");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Nhân viên</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý danh sách nhân viên và quyền hạn trên hệ thống.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="">
              <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên
            </Button>
          } />
          <DialogContent className="sm:max-w-106.25">
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
                <Select value={role} onValueChange={(val) => setRole(val || "sale")}>
                  <SelectTrigger className="w-full">
                    <span className="truncate">
                      {role === "admin" && "Quản trị viên (Full quyền)"}
                      {role === "sale" && "Nhân viên Sale (Xử lý đơn hàng)"}
                      {role === "content" && "Nhân viên Content (Quản lý bài viết)"}
                    </span>
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="admin">Quản trị viên (Full quyền)</SelectItem>
                    <SelectItem value="sale">Nhân viên Sale (Xử lý đơn hàng)</SelectItem>
                    <SelectItem value="content">Nhân viên Content (Quản lý bài viết)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Hủy</Button>
              <Button className="">Tạo tài khoản</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <StaffTable />
    </div>
  );
}
