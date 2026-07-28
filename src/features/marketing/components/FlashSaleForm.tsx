"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ArrowLeft, Zap, Clock, Plus, Search, Trash2, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

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
import { FlashSaleSchema, TFlashSalePayload } from "../schemas/flashsale.schema";
import { createFlashSaleAction, updateFlashSaleAction } from "../actions/flashsale.action";

const CATALOG_PRODUCTS = [
  { id: 101, name: "Áo sơ mi lụa tơ tằm", variant: "Trắng / Freesize", originalPrice: 450000, defaultPrice: 299000, defaultStock: 50 },
  { id: 102, name: "Quần jean ống rộng vintage", variant: "Xanh nhạt / Size L", originalPrice: 550000, defaultPrice: 349000, defaultStock: 30 },
  { id: 103, name: "Set bộ thể thao năng động", variant: "Xám / Size M", originalPrice: 320000, defaultPrice: 199000, defaultStock: 100 },
];

interface FlashSaleFormProps {
  initialData?: Partial<TFlashSalePayload> & { id?: string | number };
  mode?: "create" | "edit";
}

export function FlashSaleForm({ initialData, mode = "create" }: FlashSaleFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TFlashSalePayload>({
    resolver: zodResolver(FlashSaleSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      status: "draft",
      items: [
        { variantId: "1", name: "Áo thun form rộng basic", variant: "Đen / Size S", originalPrice: 250000, flashSalePrice: 99000, quantityLimit: 50, stock: 100 },
        { variantId: "2", name: "Váy hoa cúc mùa hè", variant: "Đỏ / Size M", originalPrice: 350000, flashSalePrice: 149000, quantityLimit: 20, stock: 50 },
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  const handleConfirmAddProducts = () => {
    const newProducts = selectedProductIds.map(id => {
      const p = CATALOG_PRODUCTS.find(cp => cp.id === id);
      return {
        variantId: String(p!.id),
        name: p!.name,
        variant: p!.variant,
        originalPrice: p!.originalPrice,
        flashSalePrice: p!.defaultPrice,
        quantityLimit: p!.defaultStock,
        stock: p!.defaultStock
      };
    });
    
    append(newProducts);
    setIsModalOpen(false);
    setSelectedProductIds([]);
  };

  function onSubmit(values: TFlashSalePayload, status: "draft" | "active" | "scheduled" | "ended" = "scheduled") {
    startTransition(async () => {
      try {
        const payload = { ...values, status };
        if (mode === "create") {
          const res = await createFlashSaleAction(payload);
          if (res.success) {
            toast.success(status === "draft" ? "Đã lưu nháp!" : "Đã kích hoạt Flash Sale!");
          } else {
            toast.error(res.error as string);
            if (res.details) {
              Object.keys(res.details!).forEach((key) => {
                form.setError(key as keyof TFlashSalePayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
              });
            }
          }
        } else {
          const res = await updateFlashSaleAction(initialData?.id || 1, payload);
          if (res.success) {
            toast.success(status === "draft" ? "Đã cập nhật bản nháp!" : "Đã cập nhật Flash Sale!");
          } else {
            toast.error(res.error as string);
            if (res.details) {
              Object.keys(res.details!).forEach((key) => {
                form.setError(key as keyof TFlashSalePayload, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
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
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, form.watch("status")))} className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
          <div className="flex items-center gap-4">
            <Link href="/flash-sales" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9")}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chiến dịch Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/flash-sales" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
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
              <Save className="h-4 w-4" /> Lưu & Lên lịch
            </Button>
          </div>
        </div>

        {form.formState.errors.items?.root && (
          <div className="text-red-500 font-medium">{form.formState.errors.items.root.message}</div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column: Basic Info */}
          <div className="md:col-span-1 flex flex-col gap-6 min-w-0">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chương trình <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Siêu Sale Nửa Đêm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-red-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Bắt đầu lúc
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kết thúc lúc</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>
                        Khuyên dùng: Khung giờ Flash Sale không nên kéo dài quá 4 tiếng để tạo cảm giác khan hiếm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt nâng cao</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label className="cursor-pointer text-foreground font-semibold">Hiển thị đếm ngược</Label>
                    <span className="text-xs text-muted-foreground">Hiển thị đồng hồ đếm ngược trên trang chủ.</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between mt-2 pt-4 border-t">
                      <div className="flex flex-col gap-1">
                        <FormLabel className="cursor-pointer text-foreground font-semibold">Kích hoạt chương trình</FormLabel>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value === "active" || field.value === "scheduled"} 
                          onCheckedChange={(c) => field.onChange(c ? "scheduled" : "draft")} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Products List */}
          <div className="md:col-span-2 min-w-0">
            <Card className="h-full">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Sản phẩm Flash Sale</CardTitle>
                  <CardDescription>Chọn các sản phẩm và thiết lập giá sốc + số lượng giới hạn.</CardDescription>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger 
                    render={<Button size="sm" className="gap-2 w-full sm:w-auto mt-2 sm:mt-0" type="button" />}
                  >
                    <Plus className="h-4 w-4" /> Thêm sản phẩm
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                      <DialogTitle>Chọn sản phẩm tham gia Flash Sale</DialogTitle>
                      <DialogDescription>
                        Tìm kiếm và chọn các sản phẩm bạn muốn thêm vào chương trình Flash Sale này.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="px-6 py-2">
                      <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Tìm theo tên hoặc mã SKU..." className="pl-9 bg-muted/50 border-border" />
                      </div>
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto overflow-x-auto px-2">
                      <Table>
                        <TableBody>
                          {CATALOG_PRODUCTS.filter(cp => !fields.find(p => p.variantId === String(cp.id))).map(cp => {
                            const isSelected = selectedProductIds.includes(cp.id);
                            return (
                              <TableRow key={cp.id} className={isSelected ? "bg-muted/50 border-transparent" : "border-transparent hover:bg-muted/50 cursor-pointer"} onClick={() => {
                                if (isSelected) {
                                  setSelectedProductIds(selectedProductIds.filter(id => id !== cp.id));
                                } else {
                                  setSelectedProductIds([...selectedProductIds, cp.id]);
                                }
                              }}>
                                <TableCell className="w-[40px] pl-4">
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-zinc-300 cursor-pointer pointer-events-none"
                                    checked={isSelected}
                                    readOnly
                                  />
                                </TableCell>
                                <TableCell className="py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm line-clamp-1">{cp.name}</span>
                                      <span className="text-xs text-muted-foreground">{cp.variant}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-sm text-muted-foreground pr-4">{cp.originalPrice.toLocaleString()}đ</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <DialogFooter className="px-6 py-4 border-t bg-muted/50 flex items-center justify-between sm:justify-between">
                      <span className="text-sm text-muted-foreground">Đã chọn <b>{selectedProductIds.length}</b> sản phẩm</span>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button type="button" onClick={handleConfirmAddProducts} className="bg-primary" disabled={selectedProductIds.length === 0}>
                          Xác nhận thêm
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {/* Desktop View */}
                <div className="hidden md:block border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-1/2">Sản phẩm</TableHead>
                        <TableHead>Giá gốc</TableHead>
                        <TableHead>Giá Flash Sale</TableHead>
                        <TableHead>SL Mở bán</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-card">
                      {fields.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Chưa có sản phẩm nào. Hãy thêm sản phẩm!
                          </TableCell>
                        </TableRow>
                      ) : (
                        fields.map((field, index) => (
                          <TableRow key={field.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
                                <div className="flex flex-col">
                                  <span className="font-medium line-clamp-1">{field.name}</span>
                                  <span className="text-xs text-muted-foreground">{field.variant}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground line-through text-xs">
                              {field.originalPrice.toLocaleString()}đ
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`items.${index}.flashSalePrice`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        className="h-8 w-28 text-red-600 font-bold" 
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value))}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`items.${index}.quantityLimit`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        className="h-8 w-20" 
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value))}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
  
                {/* Mobile View */}
                <div className="md:hidden flex flex-col gap-3">
                  {fields.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
                      Chưa có sản phẩm nào. Hãy thêm sản phẩm!
                    </div>
                  ) : (
                    fields.map((field, index) => (
                      <div key={field.id} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm">
                        <div className="flex items-start gap-3 pr-8 mb-4">
                          <div className="h-12 w-12 shrink-0 bg-muted rounded-md flex items-center justify-center text-[10px] text-muted-foreground border">Ảnh</div>
                          <div className="flex flex-col flex-1">
                            <span className="font-bold text-foreground text-sm leading-tight mb-1">{field.name}</span>
                            <span className="text-xs text-muted-foreground">{field.variant}</span>
                            <span className="text-xs text-muted-foreground line-through mt-1">{field.originalPrice.toLocaleString()}đ</span>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.flashSalePrice`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col gap-1.5">
                                <FormLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Giá Flash Sale</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="h-9 text-red-600 font-bold text-sm" 
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantityLimit`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col gap-1.5">
                                <FormLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">SL Mở bán</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="h-9 text-sm" 
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
  
                        <div className="absolute top-3 right-2">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
  
                <div className="mt-4 bg-orange-50 border border-orange-200 rounded-md p-4 flex flex-col gap-2">
                  <h4 className="font-semibold text-orange-800 text-sm">Lưu ý khi cấu hình Flash Sale:</h4>
                  <ul className="text-xs text-orange-700 list-disc list-inside space-y-1">
                    <li>Sản phẩm trong Flash Sale sẽ bị khóa chỉnh sửa giá trị khi thời gian bắt đầu đếm ngược.</li>
                    <li>Nếu số lượng (SL Mở bán) bán hết trước hạn, sản phẩm sẽ hiển thị trạng thái "Cháy hàng" thay vì biến mất.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
