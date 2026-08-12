"use client";

import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { VoucherSchema, TVoucherPayload } from "@/features/promotions/schemas/voucher.schema";
import { toast } from "sonner";

interface VoucherFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<TVoucherPayload>;
}

export function VoucherForm({ onSuccess, defaultValues }: VoucherFormProps) {
  const form = useForm<TVoucherPayload>({
    resolver: zodResolver(VoucherSchema) as any,
    defaultValues: {
      code: "",
      discountType: "vnd",
      discount: undefined as any,
      minOrder: 0,
      quantity: undefined as any,
      isPublic: true,
      isActive: true,
      ...defaultValues,
    }
  });

  const discountType = form.watch("discountType");

  const onSubmit = (values: TVoucherPayload) => {
    // Gọi API lưu dữ liệu ở đây
    toast.success("Đã lưu mã giảm giá thành công!");
    form.reset();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã Code (Từ viết hoa) <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="VD: SUMMER2026" className="uppercase" {...field} onChange={e => field.onChange(e.target.value.toUpperCase())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại giảm giá</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại giảm giá" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vnd">Giảm theo số tiền (VND)</SelectItem>
                  <SelectItem value="percent">Giảm theo phần trăm (%)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{discountType === "vnd" ? "Mức giảm (VND)" : "Mức giảm (%)"} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" placeholder={discountType === "vnd" ? "VD: 50000" : "VD: 10"} {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {discountType === "percent" && (
          <FormField
            control={form.control}
            name="maxDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm tối đa (VND) <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="number" placeholder="VD: 100000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="minOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá trị đơn tối thiểu (VND)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="VD: 500000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng giới hạn <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" placeholder="VD: 100" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between mt-2 space-y-0">
              <div className="flex flex-col gap-1">
                <FormLabel className="cursor-pointer text-foreground">Hiển thị công khai</FormLabel>
                <span className="text-xs text-muted-foreground">Khách có thể thấy trên web. Nếu tắt, khách phải tự nhập mã ẩn.</span>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between mt-2 space-y-0">
              <FormLabel className="cursor-pointer text-foreground">Trạng thái hoạt động</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto mt-4">Lưu thay đổi</Button>
      </form>
    </Form>
  );
}
