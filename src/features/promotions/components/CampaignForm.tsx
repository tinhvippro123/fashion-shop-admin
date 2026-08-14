"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Calendar, Save } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { CampaignSchema, TCampaignPayload } from "../schemas/campaign.schema";
import { createCampaignAction, updateCampaignAction } from "../actions/campaign.action";

interface CampaignFormProps {
  initialData?: TCampaignPayload & { id?: string | number };
  mode?: "create" | "edit";
}

export function CampaignForm({ initialData, mode = "create" }: CampaignFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCampaignPayload>({
    resolver: zodResolver(CampaignSchema) as unknown as Resolver<TCampaignPayload>,
    defaultValues: initialData || {
      name: "",
      code: "",
      scope: "PLATFORM",
      rewardType: "DISCOUNT_MONEY",
      discountType: "FIXED_AMOUNT",
      discountValue: 0,
      maxDiscountAmount: undefined,
      minOrderValue: 0,
      isCollectible: true,
      startDate: "",
      endDate: "",
      status: "draft",
      usageLimit: undefined,
    }
  });

  const discountType = form.watch("discountType");
  const rewardType = form.watch("rewardType");

  function onSubmit(values: TCampaignPayload, status: "draft" | "active" = "active") {
    startTransition(async () => {
      try {
        const payload = { ...values, status };
        if (mode === "create") {
          const res = await createCampaignAction(payload);
          if (res.success) {
            toast.success(status === "active" ? "Đã lưu và kích hoạt Khuyến mãi!" : "Đã lưu nháp Khuyến mãi!");
          } else {
            toast.error(res.error as string);
            if (res.details) {
              Object.keys(res.details!).forEach((key) => {
                form.setError(key as keyof TCampaignPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
              });
            }
          }
        } else {
          const res = await updateCampaignAction(initialData?.id || 1, payload);
          if (res.success) {
            toast.success(status === "active" ? "Đã cập nhật Khuyến mãi!" : "Đã cập nhật bản nháp!");
          } else {
            toast.error(res.error as string);
            if (res.details) {
              Object.keys(res.details!).forEach((key) => {
                form.setError(key as keyof TCampaignPayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
              });
            }
          }
        }
      } catch (error) {
        toast.error("Lỗi kết nối đến máy chủ!");
      }
    });
  }

  const onDraft = () => {
    form.handleSubmit((values) => onSubmit(values, "draft"))();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, "active"))} className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
          <div className="flex items-center gap-4">
            <Link href="/promotions" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9")}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {mode === "create" ? "Tạo Chương Trình Khuyến Mãi" : "Cập Nhật Khuyến Mãi"}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/promotions" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
              Hủy bỏ
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Lưu nháp
            </Button>
            <Button 
              type="submit"
              className="flex-1 sm:flex-none gap-2"
              disabled={isPending}
            >
              <Save className="h-4 w-4" /> {mode === "create" ? "Lưu & Kích hoạt" : "Lưu Thay Đổi"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái: Nội dung chính */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Thiết lập tên và mã khuyến mãi hiển thị cho khách hàng</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chương trình (Nội bộ) <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Siêu Sale Tháng 7" {...field} />
                      </FormControl>
                      <FormDescription>Tên này chỉ dùng để quản lý, khách hàng sẽ không thấy.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã Khuyến Mãi (Code) <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: SUMMER2026" className="uppercase" {...field} />
                      </FormControl>
                      <FormDescription>Khách hàng sẽ nhập mã này lúc thanh toán.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phạm vi áp dụng</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn phạm vi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PLATFORM">Toàn Sàn (Platform)</SelectItem>
                            <SelectItem value="SHOP">Toàn Shop (Shop)</SelectItem>
                            <SelectItem value="FREESHIP">Phí Vận Chuyển</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rewardType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loại thưởng</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn loại thưởng" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DISCOUNT_MONEY">Giảm Tiền</SelectItem>
                            <SelectItem value="FREE_SHIPPING">Miễn phí Vận chuyển</SelectItem>
                            <SelectItem value="FREE_GIFT">Tặng Quà</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thiết lập Giảm giá</CardTitle>
                <CardDescription>Cấu hình mức giảm và điều kiện áp dụng</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {rewardType === "DISCOUNT_MONEY" && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại giảm giá</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn loại" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent align="start">
                              <SelectItem value="PERCENTAGE">Giảm theo phần trăm (%)</SelectItem>
                              <SelectItem value="FIXED_AMOUNT">Giảm số tiền cố định (VND)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mức giảm <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder={discountType === "PERCENTAGE" ? "VD: 30" : "VD: 50000"} 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {discountType === "PERCENTAGE" && rewardType === "DISCOUNT_MONEY" && (
                    <FormField
                      control={form.control}
                      name="maxDiscountAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giảm tối đa (VND) <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="VD: 100000" 
                              {...field} 
                              value={field.value || ""}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="minOrderValue"
                    render={({ field }) => (
                      <FormItem className={cn(discountType !== "PERCENTAGE" ? "col-span-2" : "")}>
                        <FormLabel>Giá trị đơn hàng tối thiểu (VND) <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="VD: 200000" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột phải: Cài đặt nâng cao */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thời gian áp dụng</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày bắt đầu <span className="text-red-500">*</span></FormLabel>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="datetime-local" className="pl-9 h-10" {...field} />
                        </FormControl>
                      </div>
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
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="datetime-local" className="pl-9 h-10" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giới hạn sử dụng</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tổng số lượt dùng tối đa</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Không giới hạn" 
                          {...field} 
                          value={field.value || ""}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Để trống nếu không muốn giới hạn.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isCollectible"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between mt-2 pt-4 border-t">
                      <div className="flex flex-col gap-1">
                        <FormLabel className="cursor-pointer text-foreground font-semibold">Cho phép lưu Ví</FormLabel>
                        <FormDescription className="text-xs">
                          Khách hàng có thể &quot;Lưu&quot; mã này vào Ví Voucher của họ.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <FormLabel className="cursor-pointer text-foreground font-semibold">Kích hoạt</FormLabel>
                        <FormDescription>
                          Voucher sẽ tự hoạt động khi đến ngày bắt đầu.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value !== "draft"} 
                          onCheckedChange={(c) => field.onChange(c ? "active" : "draft")} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
