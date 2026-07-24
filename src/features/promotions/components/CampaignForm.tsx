"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { Switch } from "@/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Calendar, Save, Plus, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  initialData?: any;
  mode?: "create" | "edit";
}

export function CampaignForm({ initialData, mode = "create" }: CampaignFormProps) {
  const [audienceType, setAudienceType] = useState("all");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCampaignPayload>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      type: "discount",
      discountValue: 0,
      discountType: "percent",
      startDate: "",
      endDate: "",
      status: "draft",
      usageLimit: 0,
    }
  });

  const discountType = form.watch("discountType"); // eslint-disable-line

  function onSubmit(values: TCampaignPayload, status: "draft" | "active" = "active") {
    startTransition(async () => {
      try {
        const payload = { ...values, status };
              if (mode === "create") {
                const res = await createCampaignAction(payload);
                if (res.success) {
                  toast.success(status === "active" ? "Đã lưu và kích hoạt chiến dịch!" : "Đã lưu nháp chiến dịch!");
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as any, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              } else {
                const res = await updateCampaignAction(initialData?.id || 1, payload);
                if (res.success) {
                  toast.success(status === "active" ? "Đã cập nhật chiến dịch!" : "Đã cập nhật bản nháp!");
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as any, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
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
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chiến dịch khuyến mãi</h2>
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
              <Save className="h-4 w-4" /> Lưu & Kích hoạt
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái: Nội dung chính & Sản phẩm */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chiến dịch <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Siêu Sale Hè 2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loại giảm giá</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn loại" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent align="start" alignItemWithTrigger={false}>
                            <SelectItem value="percent">Giảm theo phần trăm (%)</SelectItem>
                            <SelectItem value="amount">Giảm theo số tiền (VND)</SelectItem>
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
                            placeholder={discountType === "percent" ? "VD: 30" : "VD: 50000"} 
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

            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Danh sách Sản phẩm tham gia</CardTitle>
                  <CardDescription>Chọn các sản phẩm cụ thể sẽ được áp dụng mức giảm giá này.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger className={cn(buttonVariants({ size: "sm", variant: "default" }), "w-full sm:w-auto")} type="button">
                    <Plus className="mr-2 h-4 w-4" /> Chọn Sản Phẩm
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Thêm sản phẩm vào chiến dịch</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      {/* Lọc & Chọn sản phẩm mock UI */}
                      <p className="text-sm text-muted-foreground italic">Phần chọn sản phẩm đang được thiết kế dạng UI Mockup.</p>
                      <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md border border-border">
                        <span className="text-sm text-emerald-800 font-medium">Đã chọn: 3 phân loại</span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button">Xác nhận</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
                  <div className="relative flex-1 w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Tìm trong danh sách đã chọn..." className="pl-9" />
                  </div>
                  <Button variant="destructive" className="w-full sm:w-auto opacity-50 cursor-not-allowed" type="button">
                    <Trash2 className="mr-2 h-4 w-4" /> Xóa hàng loạt (0)
                  </Button>
                </div>

                {/* Main table of selected items mock UI */}
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Sản phẩm / Phân loại</th>
                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Kho</th>
                        <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
                            <div className="flex flex-col">
                              <span className="font-medium">Áo thun form rộng basic</span>
                              <span className="text-xs text-foreground font-bold">Đen / Size S</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">25</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500" type="button">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-muted/50 p-3 border-t text-sm text-muted-foreground font-medium">
                    Tổng cộng: 1 phân loại
                  </div>
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
                <CardTitle>Đối tượng khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Select value={audienceType} onValueChange={(val) => setAudienceType(val as string)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đối tượng">
                      {audienceType === "all" ? "Tất cả khách hàng" : "Chỉ áp dụng theo Hạng thành viên"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false}>
                    <SelectItem value="all">Tất cả khách hàng</SelectItem>
                    <SelectItem value="tier">Hạng thành viên (Membership Tier)</SelectItem>
                  </SelectContent>
                </Select>
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
                        <FormLabel className="cursor-pointer text-foreground font-semibold">Kích hoạt chiến dịch</FormLabel>
                        <FormDescription>
                          Chiến dịch sẽ tự động chạy khi đến ngày giờ bắt đầu
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


