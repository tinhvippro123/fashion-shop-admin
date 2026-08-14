"use client";

import Link from "next/link";
import { useState, useTransition, KeyboardEvent, useEffect } from "react";
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
import { UploadCloud, Plus, Trash2, Save, X } from "lucide-react";
import { BackButton } from "@/shared/ui/back-button";
import { cn } from "@/shared/utils/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Checkbox } from "@/shared/ui/checkbox";
import { Badge } from "@/shared/ui/badge";
import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ProductSchema, TProductPayload, TProductVariant } from "../../schemas/product.schema";
import { IOptionSuggestions } from "../../types/product.admin";
import { createProductAction, updateProductAction, getOptionSuggestionsAction } from "../../actions/product.action";

const RichTextEditor = dynamic(() => import("@/shared/ui/rich-text-editor").then((mod) => mod.RichTextEditor), { 
  ssr: false, 
  loading: () => <div className="h-[250px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">Đang tải bộ soạn thảo...</div> 
});

interface ProductFormProps {
  initialData?: Partial<TProductPayload> & { id?: string | number };
  mode?: "create" | "edit";
}

export function ProductForm({ initialData, mode = "create" }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<IOptionSuggestions>({ names: [], values: {} });

  useEffect(() => {
    getOptionSuggestionsAction().then(res => {
      if (res.success && res.data) {
        setSuggestions(res.data);
      }
    });
  }, []);

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
      status: "draft",
      options: [],
      variants: []
    }
  });

  const { fields: optionFields, append: appendOption, remove: removeOption, update: updateOption, replace: replaceOptions } = useFieldArray({
    control: form.control,
    name: "options"
  });

  const { fields: variantFields, replace: replaceVariants, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants"
  });

  function onSubmit(values: TProductPayload, status: "draft" | "published" = "published") {
    startTransition(async () => {
      try {
        const payload = { ...values, status };
        console.log("Submit Payload:", payload);
        
        if (mode === "create") {
          const res = await createProductAction(payload);
          if (res.success) {
            toast.success(status === "published" ? "Đã lưu sản phẩm thành công!" : "Đã lưu nháp sản phẩm!");
          } else {
            toast.error(res.error as string);
          }
        } else {
          const res = await updateProductAction(initialData?.id || 1, payload);
          if (res.success) {
            toast.success(status === "published" ? "Đã cập nhật sản phẩm thành công!" : "Đã cập nhật bản nháp!");
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

  const generateVariants = () => {
    const currentOptions = form.getValues("options") || [];
    const validOptions = currentOptions.filter(opt => opt.name && opt.values && opt.values.length > 0);
    
    if (validOptions.length === 0) {
      toast.error("Vui lòng thêm ít nhất 1 thuộc tính và giá trị trước khi sinh biến thể.");
      return;
    }

    let combinations: Record<string, string>[] = [{}];
    for (const opt of validOptions) {
      const nextCombinations: Record<string, string>[] = [];
      for (const combo of combinations) {
        for (const val of opt.values) {
          nextCombinations.push({ ...combo, [opt.name]: val });
        }
      }
      combinations = nextCombinations;
    }

    const basePrice = form.getValues("price") || 0;
    const baseStock = form.getValues("stock") || 0;
    const baseSku = form.getValues("sku") || "SKU";

    const newVariants: TProductVariant[] = combinations.map((combo, i) => ({
      sku: `${baseSku}-${i + 1}`,
      price: basePrice,
      stock: baseStock,
      options: combo
    }));

    replaceVariants(newVariants);
    toast.success(`Đã tự động tạo ${newVariants.length} biến thể!`);
  };

  const applyFashionPreset = () => {
    replaceOptions([
      { name: "Màu sắc", values: ["Đen", "Trắng"] },
      { name: "Kích thước", values: ["S", "M", "L"] }
    ]);
    toast.success("Đã áp dụng mẫu Thời trang!");
  };

  const handleQuickSetName = (index: number, name: string) => {
    const currentOpt = form.getValues(`options.${index}`);
    updateOption(index, { name, values: currentOpt?.values || [] });
  };

  const handleQuickAddValue = (index: number, val: string) => {
    const currentOpt = form.getValues(`options.${index}`);
    if (!currentOpt) return;
    const currentValues = currentOpt.values || [];
    
    if (!currentValues.includes(val)) {
      updateOption(index, { name: currentOpt.name || "", values: [...currentValues, val] });
    }
  };

  const handleAddOptionValue = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (!val) return;
      
      const currentOpt = form.getValues(`options.${index}`);
      if (!currentOpt) return;
      const currentValues = currentOpt.values || [];
      
      if (!currentValues.includes(val)) {
        updateOption(index, { name: currentOpt.name || "", values: [...currentValues, val] });
      }
      e.currentTarget.value = '';
    }
  };

  const handleRemoveOptionValue = (optIndex: number, valToRemove: string) => {
    const currentOpt = form.getValues(`options.${optIndex}`);
    if (!currentOpt) return;
    const currentValues = currentOpt.values || [];
    
    updateOption(optIndex, { 
      name: currentOpt.name || "", 
      values: currentValues.filter(v => v !== valToRemove) 
    });
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
            <Button type="submit" className="gap-2 flex-1 sm:flex-none" disabled={isPending}>
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

              {/* Cột phải: Ảnh và Phân loại */}
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Kéo thả ảnh vào đây</p>
                      <p className="text-xs text-muted-foreground mt-1">Hỗ trợ JPG, PNG, WEBP (Max 5MB)</p>
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
                
                {/* Variant Builder */}
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Thuộc tính sản phẩm</CardTitle>
                      <CardDescription>Thêm các thuộc tính như Màu sắc, Kích thước...</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" type="button" onClick={applyFashionPreset}>
                         Mẫu Thời Trang
                      </Button>
                      <Button variant="outline" size="sm" type="button" onClick={() => appendOption({ name: "", values: [] })}>
                        <Plus className="h-4 w-4 mr-2" /> Thêm
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {optionFields.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground bg-muted/50 rounded-lg border border-dashed">
                        Chưa có thuộc tính nào. Sản phẩm này chỉ có 1 phân loại mặc định.
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {optionFields.map((field, index) => (
                          <div key={field.id} className="p-4 border rounded-lg bg-card relative group">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeOption(index)}
                              type="button"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            
                            <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                              <FormField
                                control={form.control}
                                name={`options.${index}.name`}
                                render={({ field: nameField }) => (
                                  <FormItem>
                                    <FormLabel>Tên thuộc tính</FormLabel>
                                    <FormControl>
                                      <Input placeholder="VD: Màu sắc" {...nameField} />
                                    </FormControl>
                                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                      {suggestions.names.map((sugg) => (
                                        <Badge 
                                          key={sugg} 
                                          variant="outline" 
                                          className="cursor-pointer text-[10px] py-0 px-1.5 hover:bg-muted font-normal"
                                          onClick={() => handleQuickSetName(index, sugg)}
                                        >
                                          {sugg}
                                        </Badge>
                                      ))}
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="space-y-2">
                                <Label>Giá trị (Nhấn Enter để thêm)</Label>
                                <Input 
                                  placeholder="VD: Đỏ, Xanh... rổi ấn Enter" 
                                  onKeyDown={(e) => handleAddOptionValue(index, e)}
                                />
                                
                                {(() => {
                                  const currentName = form.watch(`options.${index}.name`);
                                  if (!currentName || !suggestions.values[currentName]) return null;
                                  return (
                                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                      {suggestions.values[currentName].map((sugg: string) => (
                                        <Badge 
                                          key={sugg} 
                                          variant="outline" 
                                          className="cursor-pointer text-[10px] py-0 px-1.5 hover:bg-muted font-normal text-muted-foreground"
                                          onClick={() => handleQuickAddValue(index, sugg)}
                                        >
                                          + {sugg}
                                        </Badge>
                                      ))}
                                    </div>
                                  );
                                })()}
                                
                                {(form.watch(`options.${index}.values`) || []).length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-3 p-2 bg-muted/50 rounded-md border min-h-[42px]">
                                    {(form.watch(`options.${index}.values`) || []).map((val, vIdx) => (
                                      <Badge key={vIdx} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 font-medium">
                                        {val}
                                        <div 
                                          className="h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center cursor-pointer ml-1"
                                          onClick={() => handleRemoveOptionValue(index, val)}
                                        >
                                          <X className="h-3 w-3" />
                                        </div>
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Variants List */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Danh sách Biến thể</CardTitle>
                      <CardDescription>Quản lý giá và kho cho từng phân loại.</CardDescription>
                    </div>
                    <Button variant="default" size="sm" type="button" onClick={generateVariants}>
                      <Plus className="h-4 w-4 mr-2" /> Tự động sinh Biến thể
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {variantFields.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground bg-muted/50 rounded-lg border border-dashed">
                        Hãy thêm thuộc tính và nhấn nút &quot;Tự động sinh Biến thể&quot;.
                      </div>
                    ) : (
                      <div className="border rounded-md divide-y overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-muted/50 p-4 hidden sm:flex items-center gap-4 text-sm font-semibold">
                          <div className="flex-1">Phân loại</div>
                          <div className="w-28">Giá bán</div>
                          <div className="w-20">Kho</div>
                          <div className="w-32">SKU</div>
                          <div className="w-9"></div>
                        </div>
                        
                        {/* Table Body */}
                        {variantFields.map((v, i) => (
                          <div key={v.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/30 transition-colors">
                            <div className="flex flex-1 items-center gap-3">
                               <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center border text-xs font-medium text-muted-foreground">Ảnh</div>
                               <div>
                                 <p className="font-semibold text-sm">
                                   {Object.values(form.watch(`variants.${i}.options`) || {}).join(" / ")}
                                 </p>
                               </div>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                              <FormField
                                control={form.control}
                                name={`variants.${i}.price`}
                                render={({ field }) => (
                                  <Input 
                                    type="number" 
                                    className="w-full sm:w-28 text-sm h-9" 
                                    {...field} 
                                    onChange={e => field.onChange(Number(e.target.value))} 
                                  />
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`variants.${i}.stock`}
                                render={({ field }) => (
                                  <Input 
                                    type="number" 
                                    className="w-full sm:w-20 text-sm h-9" 
                                    {...field} 
                                    onChange={e => field.onChange(Number(e.target.value))} 
                                  />
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`variants.${i}.sku`}
                                render={({ field }) => (
                                  <Input 
                                    className="w-full sm:w-32 text-sm h-9" 
                                    {...field} 
                                  />
                                )}
                              />
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-red-600 self-end sm:self-auto" type="button" onClick={() => removeVariant(i)}>
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Variants */}
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mẹo nhập liệu</CardTitle>
                    <CardDescription>Cách sử dụng Trình tạo Biến thể hiệu quả.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3 text-muted-foreground">
                    <p>1. Bấm <b>Mẫu Thời Trang</b> nếu muốn nhanh, hoặc <b>Thêm thuộc tính</b> để tự định nghĩa (VD: Dung lượng, RAM).</p>
                    <p>2. Ở mục Giá trị, bạn có thể bấm vào các <b>gợi ý màu/size</b> bên dưới để điền nhanh.</p>
                    <p>3. Bấm <b>Tự động sinh Biến thể</b> để đẻ ra lưới Giá/Kho siêu nhanh.</p>
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
