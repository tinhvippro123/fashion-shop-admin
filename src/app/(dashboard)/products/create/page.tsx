import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, UploadCloud, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4">
        <Link 
          href="/products" 
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thêm sản phẩm mới</h2>
          <p className="text-zinc-500">Tạo mới một sản phẩm để đăng bán.</p>
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
                    <Label className="text-base font-semibold">Màu sắc (Colors)</Label>
                    <div className="flex flex-wrap gap-4">
                      {["Đỏ đậm", "Xanh navy", "Đen tuyền", "Trắng"].map((color, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox id={`color-${i}`} defaultChecked={i === 0 || i === 2} />
                          <Label htmlFor={`color-${i}`} className="font-normal cursor-pointer">{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <Label className="text-base font-semibold">Kích thước (Sizes)</Label>
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

              <div className="flex gap-4 mt-auto">
                <Link href="/products" className={cn(buttonVariants({ variant: "outline" }), "flex-1")}>
                  Hủy bỏ
                </Link>
                <Button className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white">
                  Lưu sản phẩm
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
