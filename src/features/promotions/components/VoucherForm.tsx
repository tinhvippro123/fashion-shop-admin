"use client";

import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { VoucherSchema, TVoucherPayload } from "@/features/promotions/schemas/voucher.schema";
import { toast } from "sonner";

interface VoucherFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<TVoucherPayload>;
  readOnly?: boolean;
  status?: "Sắp diễn ra" | "Đang diễn ra" | "Đã kết thúc";
}

export function VoucherForm({ onSuccess, defaultValues, readOnly = false, status }: VoucherFormProps) {
  const form = useForm<TVoucherPayload>({
    resolver: zodResolver(VoucherSchema) as unknown as Resolver<TVoucherPayload>,
    defaultValues: {
      code: "",
      discountType: "vnd",
      discount: 0,
      minOrder: 0,
      quantity: 0,
      isPublic: true,
      isActive: true,
      startDate: "",
      endDate: "",
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
                <Input placeholder="VD: SUMMER2026" className="uppercase" disabled={readOnly || status === "Đang diễn ra"} {...field} onChange={e => field.onChange(e.target.value.toUpperCase())} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={readOnly || status === "Đang diễn ra"}>
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
                <Input type="number" placeholder={discountType === "vnd" ? "VD: 50000" : "VD: 10"} disabled={readOnly || status === "Đang diễn ra"} {...field} value={field.value as string | number} onChange={e => field.onChange(Number(e.target.value))} />
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
                  <Input type="number" placeholder="VD: 100000" disabled={readOnly || status === "Đang diễn ra"} {...field} value={field.value as string | number} onChange={e => field.onChange(Number(e.target.value))} />
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
                <Input type="number" placeholder="VD: 500000" disabled={readOnly} {...field} value={field.value as string | number} onChange={e => field.onChange(Number(e.target.value))} />
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
                <Input type="number" placeholder="VD: 100" disabled={readOnly} {...field} value={field.value as string | number} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="datetime-local" disabled={readOnly || status === "Đang diễn ra"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="datetime-local" disabled={readOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                <Switch checked={field.value} onCheckedChange={field.onChange} disabled={readOnly} />
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
                <Switch checked={field.value} onCheckedChange={field.onChange} disabled={readOnly} />
              </FormControl>
            </FormItem>
          )}
        />

        {!readOnly && (
          <Button type="submit" className="w-full sm:w-auto mt-4">Lưu thay đổi</Button>
        )}
      </form>
    </Form>
  );
}
