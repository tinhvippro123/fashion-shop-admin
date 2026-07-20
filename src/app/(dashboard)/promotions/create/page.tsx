"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calendar, X, Save, Plus, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreatePromotionPage() {
  const [discountType, setDiscountType] = useState("percent");
  const [audienceType, setAudienceType] = useState("all");
  const [targetType, setTargetType] = useState("all");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/promotions">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tạo chiến dịch mới</h2>
            <p className="text-zinc-500 text-sm">Thiết lập chương trình khuyến mãi hàng loạt.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/promotions">
            <Button variant="outline">Hủy bỏ</Button>
          </Link>
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
            <Save className="mr-2 h-4 w-4" /> Lưu & Kích hoạt
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
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chiến dịch</Label>
                <Input id="name" placeholder="VD: Siêu Sale Hè 2026" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Loại giảm giá</Label>
                  <Select value={discountType} onValueChange={(val) => setDiscountType(val as string)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại">
                        {discountType === "percent" ? "Giảm theo phần trăm (%)" : "Giảm theo số tiền (VND)"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start" alignItemWithTrigger={false}>
                      <SelectItem value="percent" label="Giảm theo phần trăm (%)">Giảm theo phần trăm (%)</SelectItem>
                      <SelectItem value="vnd" label="Giảm theo số tiền (VND)">Giảm theo số tiền (VND)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount_val">Mức giảm</Label>
                  <Input id="discount_val" type="number" placeholder={discountType === "percent" ? "VD: 30" : "VD: 50000"} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Danh sách Sản phẩm tham gia</CardTitle>
                <CardDescription>Chọn các sản phẩm cụ thể sẽ được áp dụng mức giảm giá này.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger className={cn(buttonVariants({ size: "sm" }), "bg-zinc-900 hover:bg-zinc-800")}>
                  <Plus className="mr-2 h-4 w-4" /> Chọn Sản Phẩm
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm sản phẩm vào chiến dịch</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "w-[180px] justify-between font-normal text-zinc-600")}>
                          Danh mục (Đã chọn 3) <span className="ml-2">▼</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px]">
                          <div className="px-2 py-1.5 text-sm font-semibold text-zinc-900">Lọc theo Danh mục</div>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked={false}>
                            Tất cả danh mục
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked={true}>Áo thun</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={true}>Áo sơ mi</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={true}>Quần Tây</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={false}>Váy đầm</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={false}>Phụ kiện</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input placeholder="Tìm tên sản phẩm hoặc mã SKU..." className="pl-9" />
                      </div>
                      <Button variant="secondary">Tìm</Button>
                    </div>

                    <div className="border rounded-md">
                      <div className="bg-zinc-50 p-2.5 flex items-center gap-3 border-b">
                        <Checkbox id="select-all" />
                        <Label htmlFor="select-all" className="text-sm font-semibold cursor-pointer">Chọn tất cả (50)</Label>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                        {/* Mock items */}
                        <div className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-md border border-transparent hover:border-zinc-200">
                          <div className="flex items-center gap-3">
                            <Checkbox id="dlg-var-1" defaultChecked />
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                              <div className="flex flex-col">
                                <Label htmlFor="dlg-var-1" className="text-sm font-medium cursor-pointer">Áo thun form rộng basic <span className="text-zinc-900 font-bold ml-1">(Đen / S)</span></Label>
                                <span className="text-xs text-zinc-500">SKU: ATB-001-BLK-S</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-zinc-500">Tồn: 25</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-md border border-transparent hover:border-zinc-200">
                          <div className="flex items-center gap-3">
                            <Checkbox id="dlg-var-2" defaultChecked />
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                              <div className="flex flex-col">
                                <Label htmlFor="dlg-var-2" className="text-sm font-medium cursor-pointer">Áo thun form rộng basic <span className="text-zinc-900 font-bold ml-1">(Đen / M)</span></Label>
                                <span className="text-xs text-zinc-500">SKU: ATB-001-BLK-M</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-zinc-500">Tồn: 12</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-md border border-transparent hover:border-zinc-200">
                          <div className="flex items-center gap-3">
                            <Checkbox id="dlg-var-3" defaultChecked />
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                              <div className="flex flex-col">
                                <Label htmlFor="dlg-var-3" className="text-sm font-medium cursor-pointer">Váy hoa cúc mùa hè <span className="text-zinc-900 font-bold ml-1">(Đỏ / S)</span></Label>
                                <span className="text-xs text-zinc-500">SKU: VDH-001-RED-S</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-zinc-500">Tồn: 5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-md border border-zinc-100">
                      <span className="text-sm text-emerald-800 font-medium">Đã chọn: 3 phân loại</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800">Xác nhận</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {/* Thanh công cụ bảng chính */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "w-[180px] justify-between font-normal text-zinc-600")}>
                    Lọc Danh mục <span className="ml-2">▼</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[180px]">
                    <div className="px-2 py-1.5 text-sm font-semibold text-zinc-900">Lọc theo Danh mục</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={false}>Tất cả danh mục</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={false}>Áo thun</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={false}>Váy đầm</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input placeholder="Tìm trong danh sách đã chọn..." className="pl-9" />
                </div>
                <Button variant="destructive" className="w-full sm:w-auto opacity-50 cursor-not-allowed">
                  <Trash2 className="mr-2 h-4 w-4" /> Xóa hàng loạt (0)
                </Button>
              </div>

              {/* Main table of selected items */}
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 border-b">
                    <tr>
                      <th className="px-4 py-3 w-12"><Checkbox id="selectAllMain" /></th>
                      <th className="px-4 py-3 text-left font-semibold text-zinc-600 w-1/2">Sản phẩm / Phân loại</th>
                      <th className="px-4 py-3 text-left font-semibold text-zinc-600">Kho</th>
                      <th className="px-4 py-3 text-right font-semibold text-zinc-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 bg-white">
                    <tr className="hover:bg-zinc-50 transition-colors">
                      <td className="px-4 py-3"><Checkbox id="chkMain1" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                          <div className="flex flex-col">
                            <span className="font-medium">Áo thun form rộng basic</span>
                            <span className="text-xs text-zinc-900 font-bold">Đen / Size S</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">25</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-zinc-50 transition-colors">
                      <td className="px-4 py-3"><Checkbox id="chkMain2" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                          <div className="flex flex-col">
                            <span className="font-medium">Áo thun form rộng basic</span>
                            <span className="text-xs text-zinc-900 font-bold">Đen / Size M</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">12</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-zinc-50 transition-colors">
                      <td className="px-4 py-3"><Checkbox id="chkMain3" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                          <div className="flex flex-col">
                            <span className="font-medium">Váy hoa cúc mùa hè</span>
                            <span className="text-xs text-zinc-900 font-bold">Đỏ / Size S</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">5</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-zinc-50 p-3 border-t text-sm text-zinc-600 font-medium">
                  Tổng cộng: 3 phân loại
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
              <div className="grid gap-2">
                <Label htmlFor="start_date">Ngày bắt đầu</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input id="start_date" type="datetime-local" className="pl-9 h-10" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end_date">Ngày kết thúc</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input id="end_date" type="datetime-local" className="pl-9 h-10" />
                </div>
              </div>
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
                    {audienceType === "all" ? "Tất cả khách hàng" : "Chỉ áp dụng theo Hạng thành viên (Membership Tier)"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start" alignItemWithTrigger={false}>
                  <SelectItem value="all" label="Tất cả khách hàng">Tất cả khách hàng</SelectItem>
                  <SelectItem value="tier" label="Hạng thành viên (Membership Tier)">Hạng thành viên (Membership Tier)</SelectItem>
                </SelectContent>
              </Select>

              {audienceType === "tier" && (
                <div className="p-3 bg-zinc-50 border rounded-md">
                  <Label className="text-xs text-zinc-500 mb-2 block">Chọn Hạng thẻ (Tiers)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {["Thành viên Bạc", "Thành viên Vàng", "Thành viên Kim Cương"].map((tier, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`tier-${i}`} />
                        <Label htmlFor={`tier-${i}`} className="text-sm font-normal cursor-pointer">{tier}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="active" className="cursor-pointer text-zinc-800 font-semibold">Kích hoạt chiến dịch</Label>
                  <span className="text-xs text-zinc-500">Chiến dịch sẽ tự động chạy khi đến ngày giờ bắt đầu</span>
                </div>
                <Switch id="active" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
