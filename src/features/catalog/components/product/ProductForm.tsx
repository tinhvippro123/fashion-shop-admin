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
  loading: () => <div className="min-h-[250px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">Đang tải bộ soạn thảo...</div> 
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
                  toast.success(status === "published" ? "Ðã luu s?n ph?m thành công!" : "Ðã luu nháp s?n ph?m!");
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
                  toast.success(status === "published" ? "Ðã c?p nh?t s?n ph?m thành công!" : "Ðã c?p nh?t b?n nháp!");
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
        toast.error("L?i k?t n?i d?n m�y ch?!");
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
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{mode === "edit" ? "Ch?nh s?a s?n ph?m" : "Thêm s?n ph?m m?i"}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{mode === "edit" ? "C?p nh?t thông tin c?a s?n ph?m." : "T?o m?i m?t s?n ph?m d? dang bán."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/products" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:inline-flex")}>
              H?y b?
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Luu nháp
            </Button>
            <Button 
              type="submit"
              className="gap-2 flex-1 sm:flex-none"
              disabled={isPending}
            >
              <Save className="h-4 w-4" /> Luu s?n ph?m
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6 bg-muted">
            <TabsTrigger value="basic" className="data-[state=active]:bg-card">Thông tin co b?n</TabsTrigger>
            <TabsTrigger value="variants" className="data-[state=active]:bg-card">Phân lo?i & Bi?n th?</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              {/* C?t trái: Form thông tin */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin co b?n</CardTitle>
                    <CardDescription>Nh?p tên và mô t? cho s?n ph?m</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên s?n ph?m <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="VD: Váy d?m d? h?i n?..." {...field} />
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
                          <FormLabel>Mô t? chi ti?t</FormLabel>
                          <FormControl>
                            <div className="rounded-md border flex flex-col bg-card">
                              <RichTextEditor 
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Mô t? ch?t li?u, ki?u dáng..." 
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
                          <FormLabel>Giá niêm y?t (VNÐ) <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="VD: 1500000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormDescription>Ð? thi?t l?p gi?m giá, vui lòng t?o chi?n d?ch trong m?c Khuy?n mãi.</FormDescription>
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
                          <FormLabel>S? lu?ng trong kho <span className="text-red-500">*</span></FormLabel>
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
                    <CardTitle>Hình ?nh</CardTitle>
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
                    <CardTitle>Phân lo?i</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh m?c chính <span className="text-red-500">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Ch?n danh m?c" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="vay-dam">Váy d?m</SelectItem>
                              <SelectItem value="ao-nu">Áo n?</SelectItem>
                              <SelectItem value="quan-nu">Qu?n n?</SelectItem>
                              <SelectItem value="phu-kien">Ph? ki?n</SelectItem>
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
                          <FormLabel>Nhãn hi?u</FormLabel>
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
                    <CardTitle>Thu?c tính s?n ph?m</CardTitle>
                    <CardDescription>Ch?n các màu s?c và kích thu?c có s?n cho s?n ph?m này.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Màu s?c (Colors)</Label>
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
                        <Label className="text-base font-semibold">Kích thu?c (Sizes)</Label>
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
                      <CardTitle>Danh sách Bi?n th? (Variants)</CardTitle>
                      <CardDescription>Qu?n lý giá và kho cho t?ng phân lo?i c? th?.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" type="button"><Plus className="h-4 w-4 mr-2" /> T?o t? d?ng</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md divide-y">
                      {MOCK_VARIANTS.map((v, i) => (
                        <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex flex-1 items-center gap-3">
                             <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center border text-xs font-medium text-muted-foreground">?nh</div>
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
                    <CardTitle>Hình ?nh theo Màu</CardTitle>
                    <CardDescription>T?i lên album ?nh riêng cho t?ng màu.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Ch?n màu</Label>
                      <Select defaultValue="red">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="red">Ð? d?m</SelectItem>
                          <SelectItem value="black">Ðen tuy?n</SelectItem>
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

