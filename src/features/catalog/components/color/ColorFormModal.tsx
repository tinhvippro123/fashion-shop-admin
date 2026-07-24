"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ColorSchema, TColorPayload } from "../../schemas/color.schema";
import { createColorAction, updateColorAction } from "../../actions/color.action";

export interface ColorFormModalProps {
  initialData?: Partial<TColorPayload> & { id?: string | number };
  mode?: "create" | "edit";
  trigger?: React.ReactElement;
}

export function ColorFormModal({ initialData, mode = "create", trigger }: ColorFormModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TColorPayload>({
    resolver: zodResolver(ColorSchema),
    defaultValues: initialData || {
      name: "",
      hex: "#000000",
    }
  });

  function onSubmit(values: TColorPayload) {
    startTransition(async () => {
      try {
        if (mode === "create") {
                const res = await createColorAction(values);
                if (res.success) {
                  toast.success("Thêm màu sắc thành công!");
                  setOpen(false);
                  form.reset();
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as keyof TColorPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              } else {
                const res = await updateColorAction(initialData?.id || 1, values);
                if (res.success) {
                  toast.success("Cập nhật màu sắc thành công!");
                  setOpen(false);
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as keyof TColorPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              }
      } catch (error) {
        toast.error("L?i k?t n?i d?n m�y ch?!");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Thêm màu
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Thêm màu mới" : "Chỉnh sửa màu sắc"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên màu</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: Đen tuyền" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã màu (Hex)</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input type="color" className="w-12 h-10 p-1 cursor-pointer" {...field} />
                      <Input placeholder="VD: #000000" className="flex-1" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="submit" disabled={isPending} className="">
                {isPending ? "Đang lưu..." : (mode === "create" ? "Thêm mới" : "Lưu thay đổi")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

