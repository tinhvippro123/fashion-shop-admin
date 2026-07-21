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
import { SizeTable } from "@/features/catalog";

export default function SizesPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kích thước</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý danh sách kích thước (Size) của sản phẩm.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="mr-2 h-4 w-4" /> Thêm size
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm kích thước mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên kích thước (Size)</Label>
                <Input id="name" placeholder="VD: XL" />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu kích thước</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <SizeTable />
    </div>
  );
}
