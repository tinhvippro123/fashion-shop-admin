"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
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
import { CategorySchema, TCategoryPayload } from "../../schemas/category.schema";
import { createCategoryAction, updateCategoryAction } from "../../actions/category.action";

export interface CategoryFormModalProps {
  initialData?: Partial<TCategoryPayload> & { id?: string | number };
  mode?: "create" | "edit";
  trigger?: React.ReactElement;
}

export function CategoryFormModal({ initialData, mode = "create", trigger }: CategoryFormModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCategoryPayload>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      parentId: "",
      active: true,
    }
  });

  function onSubmit(values: TCategoryPayload) {
    startTransition(async () => {
      try {
        if (mode === "create") {
                const res = await createCategoryAction(values);
                if (res.success) {
                  toast.success("Thêm danh mục thành công!");
                  setOpen(false);
                  form.reset();
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as keyof TCategoryPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              } else {
                const res = await updateCategoryAction(initialData?.id || 1, values);
                if (res.success) {
                  toast.success("Cập nhật danh mục thành công!");
                  setOpen(false);
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as keyof TCategoryPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
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
            <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="VD: Áo khoác mùa đông" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn (Slug) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="VD: ao-khoac-mua-dong" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục cha (Tùy chọn)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục cha..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vay-dam">Váy đầm</SelectItem>
                      <SelectItem value="ao-nu">Áo nữ</SelectItem>
                      <SelectItem value="quan-nu">Quần nữ</SelectItem>
                      <SelectItem value="phu-kien">Phụ kiện</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between mt-2 rounded-lg border p-3 shadow-sm">
                  <FormLabel className="cursor-pointer text-muted-foreground">Trạng thái hoạt động</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? "Đang lưu..." : (mode === "create" ? "Lưu danh mục" : "Lưu thay đổi")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

