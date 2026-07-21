"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { UploadCloud } from "lucide-react";
import { BannerTable } from "@/features/marketing";

export default function BannersPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Banner</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý banner quảng cáo trên trang chủ.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="mr-2 h-4 w-4" /> Thêm banner
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm banner mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
                <UploadCloud className="h-6 w-6 text-zinc-400 mb-2" />
                <p className="text-sm font-medium">Tải ảnh lên</p>
                <p className="text-xs text-zinc-500 mt-1">Kích thước chuẩn: 1920x600px</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề (Tùy chọn)</Label>
                <Input id="title" placeholder="VD: Sale Mùa Hè" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Đường dẫn liên kết (Link)</Label>
                <Input id="link" placeholder="VD: /collections/summer-sale" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <Label htmlFor="active" className="cursor-pointer text-zinc-600">Hiển thị trên trang chủ</Label>
                <Switch id="active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu banner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <BannerTable />
    </div>
  );
}
