"use client";

import { useState } from "react";

import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Zap, Clock, Plus, Search, Trash2 } from "lucide-react";
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

const CATALOG_PRODUCTS = [
  { id: 101, name: "Áo sơ mi lụa tơ tằm", variant: "Trắng / Freesize", originalPrice: "450,000đ", defaultPrice: "299,000", defaultStock: 50 },
  { id: 102, name: "Quần jean ống rộng vintage", variant: "Xanh nhạt / Size L", originalPrice: "550,000đ", defaultPrice: "349,000", defaultStock: 30 },
  { id: 103, name: "Set bộ thể thao năng động", variant: "Xám / Size M", originalPrice: "320,000đ", defaultPrice: "199,000", defaultStock: 100 },
  { id: 104, name: "Áo khoác blazer thanh lịch", variant: "Đen / Size M", originalPrice: "850,000đ", defaultPrice: "599,000", defaultStock: 15 },
  { id: 105, name: "Chân váy tennis xòe", variant: "Trắng / Size S", originalPrice: "250,000đ", defaultPrice: "149,000", defaultStock: 80 },
];

export function FlashSaleForm({ isEdit = false }: { isEdit?: boolean }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Áo thun form rộng basic", variant: "Đen / Size S", originalPrice: "250,000đ", flashSalePrice: "99,000", stock: 50 },
    { id: 2, name: "Váy hoa cúc mùa hè", variant: "Đỏ / Size M", originalPrice: "350,000đ", flashSalePrice: "149,000", stock: 20 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

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

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column: Basic Info */}
        <div className="md:col-span-1 flex flex-col gap-6 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold">Tên chiến dịch <span className="text-red-500">*</span></Label>
                <Input id="name" placeholder="VD: Siêu Sale Nửa Đêm" />
              </div>

              <div className="grid gap-2 mt-4">
                <Label className="font-semibold text-red-600 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Bắt đầu lúc
                </Label>
                <Input type="datetime-local" />
              </div>

              <div className="grid gap-2">
                <Label className="font-semibold text-muted-foreground">Kết thúc lúc</Label>
                <Input type="datetime-local" />
                <p className="text-xs text-muted-foreground">Khuyên dùng: Khung giờ Flash Sale không nên kéo dài quá 4 tiếng để tạo cảm giác khan hiếm.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt nâng cao</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-semibold cursor-pointer">Hiển thị đếm ngược</Label>
                  <p className="text-xs text-muted-foreground">Hiển thị đồng hồ đếm ngược trên trang chủ.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-semibold cursor-pointer">Giới hạn mua mỗi user</Label>
                  <p className="text-xs text-muted-foreground">Tránh bị gom hàng bán lại.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2">
                <Input type="number" placeholder="Số lượng tối đa / user" defaultValue="2" />
              </div>
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
                <DialogTrigger render={<Button size="sm" className="gap-2 w-full sm:w-auto mt-2 sm:mt-0" />}>
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
                                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
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
                    <span className="text-sm text-muted-foreground">Đã chọn <b>{selectedProductIds.length}</b> sản phẩm</span>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                      <Button onClick={handleConfirmAddProducts} className="bg-primary" disabled={selectedProductIds.length === 0}>
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
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Chưa có sản phẩm nào. Hãy thêm sản phẩm!
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product: any) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
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
                    Chưa có sản phẩm nào. Hãy thêm sản phẩm!
                  </div>
                ) : (
                  products.map((product: any) => (
                    <div key={product.id} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm">
                      <div className="flex items-start gap-3 pr-8 mb-4">
                        <div className="h-12 w-12 shrink-0 bg-muted rounded-md flex items-center justify-center text-[10px] text-muted-foreground border">Ảnh</div>
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
                          <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">SL Mở bán</Label>
                          <Input type="number" defaultValue={product.stock} className="h-9 text-sm" />
                        </div>
                      </div>

                      <div className="absolute top-3 right-2">
                        <Button 
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
                <h4 className="font-semibold text-orange-800 text-sm">Lưu ý khi cấu hình Flash Sale:</h4>
                <ul className="text-xs text-orange-700 list-disc list-inside space-y-1">
                  <li>Sản phẩm trong Flash Sale sẽ bị khóa chỉnh sửa giá trị khi thời gian bắt đầu đếm ngược.</li>
                  <li>Nếu số lượng (SL Mở bán) bán hết trước hạn, sản phẩm sẽ hiển thị trạng thái "Cháy hàng" thay vì biến mất.</li>
                  <li>Giá Flash Sale bắt buộc phải thấp hơn Giá gốc tối thiểu 10%.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
