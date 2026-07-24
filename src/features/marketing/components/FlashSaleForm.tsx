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
import { Badge } from "@/shared/ui/badge";
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
import { FlashSaleSchema, TFlashSalePayload } from "../schemas/flashsale.schema";
import { createFlashSaleAction, updateFlashSaleAction } from "../actions/flashsale.action";

const CATALOG_PRODUCTS = [
  { id: 101, name: "Áo so mi l?a to t?m", variant: "Tr?ng / Freesize", originalPrice: "450,000d", defaultPrice: "299,000", defaultStock: 50 },
  { id: 102, name: "Qu?n jean ?ng r?ng vintage", variant: "Xanh nh?t / Size L", originalPrice: "550,000d", defaultPrice: "349,000", defaultStock: 30 },
  { id: 103, name: "Set b? th? thao nang d?ng", variant: "Xám / Size M", originalPrice: "320,000d", defaultPrice: "199,000", defaultStock: 100 },
];

interface FlashSaleFormProps {
  initialData?: any;
  mode?: "create" | "edit";
}

export function FlashSaleForm({ initialData, mode = "create" }: FlashSaleFormProps) {
  const [products, setProducts] = useState([
    { id: 1, name: "Áo thun form r?ng basic", variant: "Ðen / Size S", originalPrice: "250,000d", flashSalePrice: "99,000", stock: 50 },
    { id: 2, name: "Váy hoa cúc mùa hè", variant: "Ð? / Size M", originalPrice: "350,000d", flashSalePrice: "149,000", stock: 20 },
  ]);

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
    }
  });

  const handleConfirmAddProducts = () => {
    const newProducts = selectedProductIds.map(id => {
      const p = CATALOG_PRODUCTS.find(cp => cp.id === id);
      return {
        id: p!.id,
        name: p!.name,
        variant: p!.variant,
        originalPrice: p!.originalPrice,
        flashSalePrice: p!.defaultPrice,
        stock: p!.defaultStock
      };
    });
    setProducts([...products, ...newProducts]);
    setIsModalOpen(false);
    setSelectedProductIds([]); // reset selection
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  function onSubmit(values: TFlashSalePayload, status: "draft" | "active" | "scheduled" | "ended" = "scheduled") {
    startTransition(async () => {
      const payload = { ...values, status };
      if (mode === "create") {
        const res = await createFlashSaleAction(payload);
        if (res.success) {
          toast.success(status === "draft" ? "Ðã luu nháp!" : "Ðã kích ho?t Flash Sale!");
        } else {
          toast.error(res.error as string);
        }
      } else {
        const res = await updateFlashSaleAction(initialData?.id || 1, payload);
        if (res.success) {
          toast.success(status === "draft" ? "Ðã c?p nh?t b?n nháp!" : "Ðã c?p nh?t Flash Sale!");
        } else {
          toast.error(res.error as string);
        }
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
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chi?n d?ch Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/flash-sales" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
              H?y b?
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Luu nháp
            </Button>
            <Button 
              type="submit"
              className="flex-1 sm:flex-none gap-2"
              disabled={isPending}
            >
              <Save className="h-4 w-4" /> Luu & Lên l?ch
            </Button>
          </div>
        </div>

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
                      <FormLabel>Tên chuong trình <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Siêu Sale N?a Ðêm" {...field} />
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
                        <Clock className="h-4 w-4" /> B?t d?u lúc
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
                      <FormLabel>K?t thúc lúc</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>
                        Khuyên dùng: Khung gi? Flash Sale không nên kéo dài quá 4 ti?ng d? t?o c?m giác khan hi?m.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài d?t nâng cao</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label className="cursor-pointer text-foreground font-semibold">Hi?n th? d?m ngu?c</Label>
                    <span className="text-xs text-muted-foreground">Hi?n th? d?ng h? d?m ngu?c trên trang ch?.</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label className="cursor-pointer text-foreground font-semibold">Gi?i h?n mua m?i user</Label>
                    <span className="text-xs text-muted-foreground">Tránh b? gom hàng bán l?i.</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Input type="number" placeholder="S? lu?ng t?i da / user" defaultValue="2" />
                </div>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between mt-2 pt-4 border-t">
                      <div className="flex flex-col gap-1">
                        <FormLabel className="cursor-pointer text-foreground font-semibold">Kích ho?t chuong trình</FormLabel>
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
                  <CardTitle>S?n ph?m Flash Sale</CardTitle>
                  <CardDescription>Ch?n các s?n ph?m và thi?t l?p giá s?c + s? lu?ng gi?i h?n.</CardDescription>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger render={
                    <Button size="sm" className="gap-2 w-full sm:w-auto mt-2 sm:mt-0" type="button">
                      <Plus className="h-4 w-4" /> Thêm sản phẩm
                    </Button>
                  } />
                  <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                      <DialogTitle>Ch?n s?n ph?m tham gia Flash Sale</DialogTitle>
                      <DialogDescription>
                        Tìm ki?m và ch?n các s?n ph?m b?n mu?n thêm vào chuong trình Flash Sale này.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="px-6 py-2">
                      <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Tìm theo tên ho?c mã SKU..." className="pl-9 bg-muted/50 border-border" />
                      </div>
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto overflow-x-auto px-2">
                      <Table>
                        <TableBody>
                          {CATALOG_PRODUCTS.filter(cp => !products.find(p => p.id === cp.id)).map(cp => {
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
                                    <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">?nh</div>
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm line-clamp-1">{cp.name}</span>
                                      <span className="text-xs text-muted-foreground">{cp.variant}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-sm text-muted-foreground pr-4">{cp.originalPrice}</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <DialogFooter className="px-6 py-4 border-t bg-muted/50 flex items-center justify-between sm:justify-between">
                      <span className="text-sm text-muted-foreground">Ðã ch?n <b>{selectedProductIds.length}</b> s?n ph?m</span>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>H?y</Button>
                        <Button type="button" onClick={handleConfirmAddProducts} className="bg-primary" disabled={selectedProductIds.length === 0}>
                          Xác nh?n thêm
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
                        <TableHead className="w-1/2">S?n ph?m</TableHead>
                        <TableHead>Giá g?c</TableHead>
                        <TableHead>Giá Flash Sale</TableHead>
                        <TableHead>SL M? bán</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-card">
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Chua có s?n ph?m nào. Hãy thêm s?n ph?m!
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product: any) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">?nh</div>
                                <div className="flex flex-col">
                                  <span className="font-medium line-clamp-1">{product.name}</span>
                                  <span className="text-xs text-muted-foreground">{product.variant}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground line-through text-xs">{product.originalPrice}</TableCell>
                            <TableCell>
                              <Input type="text" defaultValue={product.flashSalePrice} className="h-8 w-24 text-red-600 font-bold" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" defaultValue={product.stock} className="h-8 w-16" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                onClick={() => handleDeleteProduct(product.id)}
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
                  {products.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
                      Chua có s?n ph?m nào. Hãy thêm s?n ph?m!
                    </div>
                  ) : (
                    products.map((product: any) => (
                      <div key={product.id} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm">
                        <div className="flex items-start gap-3 pr-8 mb-4">
                          <div className="h-12 w-12 shrink-0 bg-muted rounded-md flex items-center justify-center text-[10px] text-muted-foreground border">?nh</div>
                          <div className="flex flex-col flex-1">
                            <span className="font-bold text-foreground text-sm leading-tight mb-1">{product.name}</span>
                            <span className="text-xs text-muted-foreground">{product.variant}</span>
                            <span className="text-xs text-muted-foreground line-through mt-1">{product.originalPrice}</span>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Giá Flash Sale</Label>
                            <Input type="text" defaultValue={product.flashSalePrice} className="h-9 text-red-600 font-bold text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">SL M? bán</Label>
                            <Input type="number" defaultValue={product.stock} className="h-9 text-sm" />
                          </div>
                        </div>
  
                        <div className="absolute top-3 right-2">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
  
                <div className="mt-4 bg-orange-50 border border-orange-200 rounded-md p-4 flex flex-col gap-2">
                  <h4 className="font-semibold text-orange-800 text-sm">Luu ý khi c?u hình Flash Sale:</h4>
                  <ul className="text-xs text-orange-700 list-disc list-inside space-y-1">
                    <li>S?n ph?m trong Flash Sale s? b? khóa ch?nh s?a giá tr? khi th?i gian b?t d?u d?m ngu?c.</li>
                    <li>N?u s? lu?ng (SL M? bán) bán h?t tru?c h?n, s?n ph?m s? hi?n th? tr?ng thái "Cháy hàng" thay vì bi?n m?t.</li>
                    <li>Giá Flash Sale b?t bu?c ph?i th?p hon Giá g?c t?i thi?u 10%.</li>
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
