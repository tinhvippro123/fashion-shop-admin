"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
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
import { CampaignSchema, TCampaignPayload, TCampaignProduct } from "../schemas/campaign.schema";
import { createCampaignAction, updateCampaignAction } from "../actions/campaign.action";
import { CampaignProductSelector } from "./CampaignProductSelector";

interface CampaignFormProps {
  initialData?: TCampaignPayload & { id?: string | number };
  mode?: "create" | "edit";
}

// Giả lập danh mục
const MOCK_CATEGORIES = [
  { id: "c1", name: "Áo nam nữ" },
  { id: "c2", name: "Quần" },
  { id: "c3", name: "Giày dép" },
];

export function CampaignForm({ initialData, mode = "create" }: CampaignFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCampaignPayload>({
    resolver: zodResolver(CampaignSchema) as unknown as Resolver<TCampaignPayload>,
    defaultValues: initialData || {
      name: "",
      scope: "STORE_WIDE",
      globalDiscountType: "PERCENTAGE",
      globalDiscountValue: 0,
      categoryIds: [],
      products: [],
      startDate: "",
      endDate: "",
      status: "draft",
    }
  });

  const scope = form.watch("scope");
  const globalDiscountType = form.watch("globalDiscountType");
  const formStatus = form.watch("status");
  const initialStatus = initialData?.status || "draft";

  // Logic Khóa tay (Disabled Logic)
  const isEnded = initialStatus === "ended";
  const isActive = initialStatus === "active";
  
  // Các trường bị khóa nếu đang Active
  const disableNameAndStart = isEnded || isActive;
  const disableScope = isEnded || isActive;
  // Các trường bị khóa nếu đã Ended
  const disableAll = isEnded;

  function onSubmit(values: TCampaignPayload, submitStatus: "draft" | "active" = "active") {
    startTransition(async () => {
      try {
        const payload = { ...values, status: submitStatus };
        if (mode === "create") {
          const res = await createCampaignAction(payload);
          if (res.success) {
            toast.success(submitStatus === "active" ? "Đã lưu và kích hoạt Khuyến mãi!" : "Đã lưu nháp Khuyến mãi!");
          } else {
            toast.error(res.error as string);
          }
        } else {
          const res = await updateCampaignAction(initialData?.id || 1, payload);
          if (res.success) {
            toast.success("Đã cập nhật Khuyến mãi!");
          } else {
            toast.error(res.error as string);
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
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, "active"))} className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
          <div className="flex items-center gap-4">
            <Link href="/promotions" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9")}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {mode === "create" ? "Tạo Chương Trình Khuyến Mãi" : (isEnded ? "Chi tiết Khuyến Mãi (Chỉ Xem)" : "Cập Nhật Khuyến Mãi")}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/promotions" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
              {isEnded ? "Quay lại" : "Hủy bỏ"}
            </Link>
            {!isEnded && (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Bonus: Thống kê nếu đã kết thúc */}
        {isEnded && (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 flex gap-12 items-center">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Tổng sản phẩm đã bán</p>
                <h3 className="text-3xl font-bold text-primary">1,245</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Doanh thu đợt sale</p>
                <h3 className="text-3xl font-bold text-green-600">324.500.000đ</h3>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái: Thông tin cơ bản & Phạm vi */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Thiết lập tên và thời gian của chương trình khuyến mãi</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chương trình (Nội bộ) <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Siêu Sale Tháng 7" {...field} disabled={disableNameAndStart} />
                      </FormControl>
                      <FormDescription>Tên này chỉ dùng để quản lý, khách hàng sẽ không thấy.</FormDescription>
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
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input type="datetime-local" className="pl-9 h-10" {...field} disabled={disableNameAndStart} />
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
                            {/* Ngày kết thúc không bị khóa khi Active (Để có thể gia hạn) */}
                            <Input type="datetime-local" className="pl-9 h-10" {...field} disabled={disableAll} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phạm vi áp dụng</CardTitle>
                <CardDescription>Chọn cách thức áp dụng giảm giá cho các sản phẩm</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="scope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hình thức khuyến mãi</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""} disabled={disableScope}>
                        <FormControl>
                          <SelectTrigger className="w-full h-12">
                            <SelectValue placeholder="Chọn hình thức" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="STORE_WIDE">Toàn sàn (Áp dụng cho mọi sản phẩm)</SelectItem>
                          <SelectItem value="CATEGORY">Theo danh mục (Áp dụng cho ngành hàng nhất định)</SelectItem>
                          <SelectItem value="SPECIFIC_PRODUCTS">Sản phẩm tùy chọn (Chỉ định từng sản phẩm)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Option A & Option B: Nhập mức giảm chung */}
                {(scope === "STORE_WIDE" || scope === "CATEGORY") && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                    {scope === "CATEGORY" && (
                      <FormField
                        control={form.control}
                        name="categoryIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chọn Danh mục</FormLabel>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {MOCK_CATEGORIES.map(cat => (
                                <label key={cat.id} className="flex items-center space-x-2 p-2 border rounded bg-background cursor-pointer hover:bg-accent/50">
                                  <input 
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={field.value?.includes(cat.id)}
                                    disabled={disableScope}
                                    onChange={(e) => {
                                      const current = field.value || [];
                                      if (e.target.checked) {
                                        field.onChange([...current, cat.id]);
                                      } else {
                                        field.onChange(current.filter(id => id !== cat.id));
                                      }
                                    }}
                                  />
                                  <span className="text-sm font-medium">{cat.name}</span>
                                </label>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="globalDiscountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loại giảm giá</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""} disabled={disableScope}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="PERCENTAGE">Giảm theo %</SelectItem>
                                <SelectItem value="FIXED_AMOUNT">Giảm tiền (VND)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="globalDiscountValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mức giảm <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder={globalDiscountType === "PERCENTAGE" ? "VD: 10" : "VD: 50000"} 
                                {...field} 
                                disabled={disableScope}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {/* Option C: Bảng chọn sản phẩm */}
                {scope === "SPECIFIC_PRODUCTS" && (
                  <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sản phẩm tham gia Sale</FormLabel>
                        {/* 
                          Lưu ý: Nếu isActive thì disabled={true} trong CampaignProductSelector 
                          sẽ khóa checkbox và khóa sửa % những SP đang có (Vùng bị khóa).
                          Để đúng chuẩn nhất thì ta cần logic phức tạp hơn (chỉ khóa cái cũ, mở cái mới),
                          nhưng ở mức demo UI, ta truyền disableAll hoặc nếu muốn cho phép thêm mới, ta chỉ disable 1 phần.
                          Tạm thời ở đây ta dùng disableAll.
                        */}
                        <CampaignProductSelector 
                          products={field.value || []} 
                          onChange={field.onChange} 
                          disabled={disableAll}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col gap-6">
            {/* Thông tin hỗ trợ */}
            <Card>
              <CardHeader>
                <CardTitle>Lưu ý</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-4">
                <p>💡 <strong>Toàn sàn:</strong> Tất cả sản phẩm sẽ được gạch ngang giá tự động.</p>
                <p>💡 <strong>Gia hạn:</strong> Bạn chỉ có thể sửa Ngày kết thúc khi chương trình đang diễn ra.</p>
                <p className="text-red-500 font-medium mt-4">⚠️ Khi chương trình Đã kết thúc, dữ liệu sẽ bị đóng băng hoàn toàn để đảm bảo tính toàn vẹn của báo cáo kế toán.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
