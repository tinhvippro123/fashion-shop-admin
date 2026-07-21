"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plus } from "lucide-react";

export function CategoryFormModal() {
  return (
    <Dialog>
      <DialogTrigger render={
        <Button className="bg-zinc-900 hover:bg-zinc-800">
          <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
        </Button>
      } />
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên danh mục</Label>
            <Input id="name" placeholder="VD: Áo khoác mùa đông" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Đường dẫn (Slug)</Label>
            <Input id="slug" placeholder="VD: ao-khoac-mua-dong" />
          </div>
          <div className="grid gap-2">
            <Label>Danh mục cha (Tùy chọn)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục cha..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vay-dam">Váy đầm</SelectItem>
                <SelectItem value="ao-nu">Áo nữ</SelectItem>
                <SelectItem value="quan-nu">Quần nữ</SelectItem>
                <SelectItem value="phu-kien">Phụ kiện</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Label htmlFor="active" className="cursor-pointer text-zinc-600">Trạng thái hoạt động</Label>
            <Switch id="active" defaultChecked />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu danh mục</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
