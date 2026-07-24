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
import { SizeSchema, TSizePayload } from "../schemas/size.schema";
import { createSizeAction, updateSizeAction } from "../actions/size.action";

export interface SizeFormModalProps {
  initialData?: any;
  mode?: "create" | "edit";
  trigger?: React.ReactElement;
}

export function SizeFormModal({ initialData, mode = "create", trigger }: SizeFormModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TSizePayload>({
    resolver: zodResolver(SizeSchema),
    defaultValues: initialData || {
      name: "",
    }
  });

  function onSubmit(values: TSizePayload) {
    startTransition(async () => {
      if (mode === "create") {
        const res = await createSizeAction(values);
        if (res.success) {
          toast.success("Thêm kích thước thành công!");
          setOpen(false);
          form.reset();
        } else {
          toast.error(res.error as string);
        }
      } else {
        const res = await updateSizeAction(initialData?.id || 1, values);
        if (res.success) {
          toast.success("Cập nhật kích thước thành công!");
          setOpen(false);
        } else {
          toast.error(res.error as string);
        }
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Thêm Size
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Thêm kích thước mới" : "Chỉnh sửa kích thước"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kích thước</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: XXL" {...field} />
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
