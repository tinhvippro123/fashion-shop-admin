"use client";

import Link from "next/link";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";

export default function CreateProductPage() {
  const [discountType, setDiscountType] = useState("percent");
  const [promoTarget, setPromoTarget] = useState("all");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Chỉnh sửa sản phẩm</h2>
            <p className="text-zinc-500 mt-1">Cập nhật thông tin chi tiết của sản phẩm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Hủy bỏ</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Save className="h-4 w-4" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6 bg-zinc-100">
          <TabsTrigger value="basic" className="data-[state=active]:bg-white">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="variants" className="data-[state=active]:bg-white">Phân loại & Biến thể</TabsTrigger>
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
              <div className="grid gap-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input id="name" placeholder="VD: Váy đầm dạ hội nữ..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea 
                  id="description" 
                  placeholder="Mô tả chất liệu, kiểu dáng..." 
                  className="min-h-[150px]" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giá và Kho</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Giá bán (VNĐ)</Label>
                <Input id="price" type="number" placeholder="1,000,000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="original-price">Giá gốc (VNĐ)</Label>
                <Input id="original-price" type="number" placeholder="1,500,000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">Mã SKU</Label>
                <Input id="sku" placeholder="VD: VDH-001" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Số lượng trong kho</Label>
                <Input id="stock" type="number" placeholder="100" />
              </div>
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
              <div className="border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
                <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                <p className="text-sm font-medium">Kéo thả ảnh vào đây</p>
                <p className="text-xs text-zinc-500 mt-1">Hỗ trợ JPG, PNG, WEBP (Max 5MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân loại</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label>Danh mục chính</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vay-dam">Váy đầm</SelectItem>
                    <SelectItem value="ao-nu">Áo nữ</SelectItem>
                    <SelectItem value="quan-nu">Quần nữ</SelectItem>
                    <SelectItem value="phu-kien">Phụ kiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Nhãn hiệu</Label>
                <Input placeholder="Luxe Fashion" />
              </div>
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
                      <Dialog>
                        <DialogTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100")}>
                          <Plus className="h-4 w-4 mr-1" /> Thêm màu mới
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Thêm màu sắc mới</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="color-name">Tên màu</Label>
                              <Input id="color-name" placeholder="VD: Hồng cánh sen" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="color-hex">Mã màu (Hex Code)</Label>
                              <div className="flex gap-2">
                                <Input id="color-hex" type="color" className="w-12 p-1 h-9 cursor-pointer" defaultValue="#ff00ff" />
                                <Input placeholder="#FF00FF" className="flex-1" defaultValue="#ff00ff" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Thêm màu</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { name: "Đỏ đậm", hex: "#8B0000" },
                        { name: "Xanh navy", hex: "#000080" },
                        { name: "Đen tuyền", hex: "#000000" },
                        { name: "Trắng", hex: "#FFFFFF" }
                      ].map((color, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox id={`color-${i}`} defaultChecked={i === 0 || i === 2} />
                          <Label htmlFor={`color-${i}`} className="flex items-center gap-1.5 font-normal cursor-pointer">
                            <div className="w-3.5 h-3.5 rounded-full border border-zinc-200 shadow-sm" style={{ backgroundColor: color.hex }}></div>
                            {color.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Kích thước (Sizes)</Label>
                      <Dialog>
                        <DialogTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100")}>
                          <Plus className="h-4 w-4 mr-1" /> Thêm size mới
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Thêm kích thước mới</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="size-name">Tên Size</Label>
                              <Input id="size-name" placeholder="VD: XXL" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="size-desc">Mô tả chi tiết</Label>
                              <Input id="size-desc" placeholder="VD: Dành cho người trên 80kg" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Thêm kích thước</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["S", "M", "L", "XL", "Freesize"].map((size, i) => (
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
                  <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Tạo tự động</Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    {[
                      { color: "Đỏ đậm", size: "S", stock: 10, price: "1,000,000" },
                      { color: "Đỏ đậm", size: "M", stock: 15, price: "1,000,000" },
                      { color: "Đen tuyền", size: "S", stock: 5, price: "1,000,000" },
                    ].map((v, i) => (
                      <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex flex-1 items-center gap-3">
                           <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center border text-xs font-medium text-zinc-500">Ảnh</div>
                           <div>
                             <p className="font-semibold text-sm">{v.color} / {v.size}</p>
                             <p className="text-xs text-zinc-500">SKU: PROD-001-{i+1}</p>
                           </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Input defaultValue={v.price} className="w-28 text-sm h-9" />
                          <Input defaultValue={v.stock} className="w-20 text-sm h-9" />
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-red-600">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Khuyến mãi & Giảm giá</CardTitle>
                    <CardDescription>Các chương trình đang áp dụng cho sản phẩm này.</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-zinc-900 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900")}>
                      <Plus className="h-4 w-4 mr-2" /> Tạo khuyến mãi nhanh
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Tạo Khuyến mãi nhanh</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Tên chương trình (Tự động)</Label>
                          <Input disabled defaultValue="Flash Sale: Váy hoa cúc mùa hè" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Áp dụng cho</Label>
                          <Select value={promoTarget} onValueChange={(val) => setPromoTarget(val as string)}>
                            <SelectTrigger>
                              <SelectValue>
                                {promoTarget === "all" ? "Toàn bộ biến thể của sản phẩm này" : "Chỉ một số biến thể cụ thể (Màu/Size)"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent align="start" alignItemWithTrigger={false}>
                              <SelectItem value="all" label="Toàn bộ biến thể của sản phẩm này">Toàn bộ biến thể của sản phẩm này</SelectItem>
                              <SelectItem value="specific" label="Chỉ một số biến thể cụ thể (Màu/Size)">Chỉ một số biến thể cụ thể (Màu/Size)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {promoTarget === "specific" && (
                          <div className="grid gap-2 bg-zinc-50 p-3 rounded-md border">
                            <Label className="text-xs text-zinc-500 mb-1">Chọn các biến thể muốn giảm giá:</Label>
                            <div className="max-h-[120px] overflow-y-auto space-y-2 pr-2">
                              <div className="flex items-center justify-between bg-white p-2 border rounded-md">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="var-1" />
                                  <Label htmlFor="var-1" className="text-sm font-medium">Đỏ đậm / Size S</Label>
                                </div>
                                <span className="text-xs text-zinc-500">Tồn: 10</span>
                              </div>
                              <div className="flex items-center justify-between bg-white p-2 border rounded-md">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="var-2" />
                                  <Label htmlFor="var-2" className="text-sm font-medium">Đỏ đậm / Size M</Label>
                                </div>
                                <span className="text-xs text-zinc-500">Tồn: 15</span>
                              </div>
                              <div className="flex items-center justify-between bg-white p-2 border rounded-md">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="var-3" />
                                  <Label htmlFor="var-3" className="text-sm font-medium">Đen tuyền / Size S</Label>
                                </div>
                                <span className="text-xs text-zinc-500">Tồn: 5</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Loại giảm</Label>
                            <Select value={discountType} onValueChange={(val) => setDiscountType(val as string)}>
                              <SelectTrigger>
                                <SelectValue>
                                  {discountType === "percent" ? "Phần trăm (%)" : "Số tiền (VND)"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent align="start" alignItemWithTrigger={false}>
                                <SelectItem value="percent" label="Phần trăm (%)">Phần trăm (%)</SelectItem>
                                <SelectItem value="vnd" label="Số tiền (VND)">Số tiền (VND)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label>Mức giảm</Label>
                            <Input type="number" placeholder="VD: 20" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Bắt đầu</Label>
                            <Input type="datetime-local" />
                          </div>
                          <div className="grid gap-2">
                            <Label>Kết thúc</Label>
                            <Input type="datetime-local" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-white">Lưu & Kích hoạt ngay</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="bg-zinc-50/50 border border-zinc-100 rounded-md p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-emerald-800 text-sm">Sale Cuối Tuần - Giảm 20% toàn bộ</h4>
                        <p className="text-xs text-zinc-900 mt-1">Đang áp dụng (Kết thúc: 25/07/2026)</p>
                      </div>
                      <span className="bg-zinc-100 text-zinc-900 px-2 py-0.5 rounded text-xs font-medium">Đang chạy</span>
                    </div>
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
                  <div className="border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer mt-2">
                    <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                    <p className="text-sm font-medium">Kéo thả ảnh vào đây</p>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
