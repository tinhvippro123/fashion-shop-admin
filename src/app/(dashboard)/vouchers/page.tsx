"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { VoucherTable } from "@/features/promotions";

export default function VouchersPage() {
  const [discountType, setDiscountType] = useState("vnd");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mã giảm giá (Voucher)</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý các chương trình khuyến mãi bằng mã code.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="">
              <Plus className="mr-2 h-4 w-4" /> Tạo mã giảm giá
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tạo Mã giảm giá</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Mã Code (Từ viết hoa)</Label>
                <Input id="code" placeholder="VD: SUMMER2026" className="uppercase" />
              </div>
              <div className="grid gap-2">
                <Label>Loại giảm giá</Label>
                <Select value={discountType} onValueChange={(val) => setDiscountType(val as string)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại giảm giá">
                      {discountType === "vnd" ? "Giảm theo số tiền (VND)" : "Giảm theo phần trăm (%)"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="vnd">Giảm theo số tiền (VND)</SelectItem>
                    <SelectItem value="percent">Giảm theo phần trăm (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">{discountType === "vnd" ? "Mức giảm (VND)" : "Mức giảm (%)"}</Label>
                <Input id="discount" type="number" placeholder={discountType === "vnd" ? "VD: 50000" : "VD: 10"} />
              </div>
              {discountType === "percent" && (
                <div className="grid gap-2">
                  <Label htmlFor="max_discount">Giảm tối đa (VND)</Label>
                  <Input id="max_discount" type="number" placeholder="VD: 100000" />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="min_order">Giá trị đơn tối thiểu (VND)</Label>
                <Input id="min_order" type="number" placeholder="VD: 500000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Số lượng giới hạn</Label>
                <Input id="quantity" type="number" placeholder="VD: 100" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="public" className="cursor-pointer text-foreground">Hiển thị công khai</Label>
                  <span className="text-xs text-muted-foreground">Khách có thể thấy trên web. Nếu tắt, khách phải tự nhập mã ẩn.</span>
                </div>
                <Switch id="public" defaultChecked />
              </div>
              <div className="flex items-center justify-between mt-2">
                <Label htmlFor="active" className="cursor-pointer text-foreground">Trạng thái hoạt động</Label>
                <Switch id="active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button className=" w-full sm:w-auto">Lưu Voucher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <VoucherTable />
    </div>
  );
}
