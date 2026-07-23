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
import { ColorTable } from "@/features/catalog";

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Màu sắc</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý danh sách màu sắc của sản phẩm.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="">
              <Plus className="mr-2 h-4 w-4" /> Thêm màu
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm màu sắc mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên màu</Label>
                <Input id="name" placeholder="VD: Đỏ rượu vang" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hex">Mã màu (Hex)</Label>
                <div className="flex gap-2">
                  <Input id="hex" placeholder="VD: #8B0000" className="flex-1" />
                  <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: "#8B0000" }}></div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className=" w-full sm:w-auto">Lưu màu sắc</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ColorTable />
    </div>
  );
}
