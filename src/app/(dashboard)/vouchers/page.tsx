"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { VoucherTable, VoucherForm } from "@/features/promotions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function VouchersPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mã giảm giá (Voucher)</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý các chương trình khuyến mãi bằng mã code.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tạo mã giảm giá
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tạo Mã giảm giá</DialogTitle>
            </DialogHeader>
            <VoucherForm onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
          <TabsTrigger value="trash">Thùng rác</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <VoucherTable />
        </TabsContent>
        <TabsContent value="trash">
          <VoucherTable isTrashView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
