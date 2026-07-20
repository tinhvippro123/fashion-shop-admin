"use client";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Zap, Clock, Plus, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function CreateFlashSalePage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tạo Flash Sale Mới</h2>
            <p className="text-zinc-500">Thiết lập khung giờ và chọn sản phẩm chạy giá sốc.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Hủy</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Zap className="h-4 w-4" /> Kích hoạt chiến dịch
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Basic Info */}
        <div className="md:col-span-1 flex flex-col gap-6">
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
                <Label className="font-semibold text-zinc-600">Kết thúc lúc</Label>
                <Input type="datetime-local" />
                <p className="text-xs text-zinc-500">Khuyên dùng: Khung giờ Flash Sale không nên kéo dài quá 4 tiếng để tạo cảm giác khan hiếm.</p>
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
                  <p className="text-xs text-zinc-500">Hiển thị đồng hồ đếm ngược trên trang chủ.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-semibold cursor-pointer">Giới hạn mua mỗi user</Label>
                  <p className="text-xs text-zinc-500">Tránh bị gom hàng bán lại.</p>
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
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sản phẩm Flash Sale</CardTitle>
                <CardDescription>Chọn các sản phẩm và thiết lập giá sốc + số lượng giới hạn.</CardDescription>
              </div>
              <Button size="sm" className="gap-2 bg-zinc-900">
                <Plus className="h-4 w-4" /> Thêm sản phẩm
              </Button>
            </CardHeader>
            <CardContent>
              {/* Selected Products Table */}
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-zinc-50">
                    <TableRow>
                      <TableHead className="w-1/2">Sản phẩm</TableHead>
                      <TableHead>Giá gốc</TableHead>
                      <TableHead>Giá Flash Sale</TableHead>
                      <TableHead>SL Mở bán</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white">
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                          <div className="flex flex-col">
                            <span className="font-medium line-clamp-1">Áo thun form rộng basic</span>
                            <span className="text-xs text-zinc-500">Đen / Size S</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-500 line-through text-xs">250,000đ</TableCell>
                      <TableCell>
                        <Input type="text" defaultValue="99,000" className="h-8 w-24 text-red-600 font-bold" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="50" className="h-8 w-16" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-100 rounded-md flex items-center justify-center text-xs text-zinc-400">Ảnh</div>
                          <div className="flex flex-col">
                            <span className="font-medium line-clamp-1">Váy hoa cúc mùa hè</span>
                            <span className="text-xs text-zinc-500">Đỏ / Size M</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-500 line-through text-xs">350,000đ</TableCell>
                      <TableCell>
                        <Input type="text" defaultValue="149,000" className="h-8 w-24 text-red-600 font-bold" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="20" className="h-8 w-16" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
    </div>
  );
}
