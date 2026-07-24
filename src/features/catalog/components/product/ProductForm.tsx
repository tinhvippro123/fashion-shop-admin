"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { UploadCloud, Plus, Trash2, Save } from "lucide-react";
import { BackButton } from "@/shared/ui/back-button";
import { cn } from "@/shared/utils/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Checkbox } from "@/shared/ui/checkbox";
import { MOCK_COLORS, MOCK_SIZES, MOCK_VARIANTS } from "@/features/catalog/mocks/product.mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import dynamic from "next/dynamic";

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
import { ProductSchema, TProductPayload } from "../../schemas/product.schema";
import { createProductAction, updateProductAction } from "../../actions/product.action";

const RichTextEditor = dynamic(() => import("@/shared/ui/rich-text-editor").then((mod) => mod.RichTextEditor), { 
  ssr: false, 
  loading: () => <div className="h-[250px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">Đang tải bộ soạn thảo...</div> 
});

interface ProductFormProps {
  initialData?: Partial<TProductPayload> & { id?: string | number };
  mode?: "create" | "edit";
}

export function ProductForm({ initialData, mode = "create" }: ProductFormProps) {
  const [discountType, setDiscountType] = useState("percent");
  const [promoTarget, setPromoTarget] = useState("all");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TProductPayload>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      sku: "",
      stock: 0,
      category: "vay-dam",
      brand: "",
      status: "draft"
    }
  });

  function onSubmit(values: TProductPayload, status: "draft" | "published" = "published") {
    startTransition(async () => {
      try {
        const payload = { ...values, status };
              if (mode === "create") {
                const res = await createProductAction(payload);
                if (res.success) {
                  toast.success(status === "published" ? "Đã lưu sản phẩm thành công!" : "Đã lưu nháp sản phẩm!");
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as any, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              } else {
                const res = await updateProductAction(initialData?.id || 1, payload);
                if (res.success) {
                  toast.success(status === "published" ? "Đã cập nhật sản phẩm thành công!" : "Đã cập nhật bản nháp!");
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
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, "published"))} className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <BackButton />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{mode === "edit" ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{mode === "edit" ? "Cập nhật thông tin của sản phẩm." : "Tạo mới một sản phẩm để đăng bán."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/products" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:inline-flex")}>
              Hủy bỏ
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Lưu nháp
            </Button>
            <Button 
              type="submit"
              className="gap-2 flex-1 sm:flex-none"
              disabled={isPending}
            >
              <Save className="h-4 w-4" /> Lưu sản phẩm
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6 bg-muted">
            <TabsTrigger value="basic" className="data-[state=active]:bg-card">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="variants" className="data-[state=active]:bg-card">Phân loại & Biến thể</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Cột trái: Form thông tin */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cơ bản</CardTitle>
                    <CardDescription>Nhập tên và mô tả cho sản phẩm</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên sản phẩm <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="VD: Váy đầm dạ hội nữ..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô tả chi tiết</FormLabel>
                          <FormControl>
                            <div className="rounded-md border flex flex-col bg-card">
                              <RichTextEditor 
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Mô tả chất liệu, kiểu dáng..." 
                                editorClassName="min-h-[250px] border-none" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Giá và Kho</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Giá niêm yết (VNĐ) <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="VD: 1500000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormDescription>Để thiết lập giảm giá, vui lòng tạo chiến dịch trong mục Khuyến mãi.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã SKU</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: VDH-001" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số lượng trong kho <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="100" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* C?t ph?i: ?nh và Phân lo?i */}
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Kéo th? ?nh vào dây</p>
                      <p className="text-xs text-muted-foreground mt-1">H? tr? JPG, PNG, WEBP (Max 5MB)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Phân loại</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục chính <span className="text-red-500">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục" />
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
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhãn hiệu</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxe Fashion" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variants" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thuộc tính sản phẩm</CardTitle>
                    <CardDescription>Chọn các màu sắc và kích thước có sẵn cho sản phẩm này.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Màu sắc (Colors)</Label>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {MOCK_COLORS.map((color, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Checkbox id={`color-${i}`} defaultChecked={i === 0 || i === 2} />
                            <Label htmlFor={`color-${i}`} className="flex items-center gap-1.5 font-normal cursor-pointer">
                              <div className="w-3.5 h-3.5 rounded-full border border-border shadow-sm" style={{ backgroundColor: color.hex }}></div>
                              {color.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Kích thước (Sizes)</Label>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {MOCK_SIZES.map((size, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Checkbox id={`size-${i}`} defaultChecked={i < 3} />
                            <Label htmlFor={`size-${i}`} className="font-normal cursor-pointer">{size}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Danh sách Biến thể (Variants)</CardTitle>
                      <CardDescription>Quản lý giá và kho cho từng phân loại cụ thể.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" type="button"><Plus className="h-4 w-4 mr-2" /> Tạo tự động</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md divide-y">
                      {MOCK_VARIANTS.map((v, i) => (
                        <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex flex-1 items-center gap-3">
                             <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center border text-xs font-medium text-muted-foreground">Ảnh</div>
                             <div>
                               <p className="font-semibold text-sm">{v.color} / {v.size}</p>
                               <p className="text-xs text-muted-foreground">SKU: PROD-001-{i+1}</p>
                             </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Input defaultValue={v.price} className="w-28 text-sm h-9" />
                            <Input defaultValue={v.stock} className="w-20 text-sm h-9" />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-red-600" type="button">
                               <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh theo Màu</CardTitle>
                    <CardDescription>Tải lên album ảnh riêng cho từng màu.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Chọn màu</Label>
                      <Select defaultValue="red">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="red">Đỏ đậm</SelectItem>
                          <SelectItem value="black">Đen tuyền</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer mt-2">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Kéo th? ?nh vào dây</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

