"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const colors = [
  { id: "COL-001", name: "Đỏ đậm", hex: "#8B0000" },
  { id: "COL-002", name: "Xanh navy", hex: "#000080" },
  { id: "COL-003", name: "Trắng", hex: "#FFFFFF" },
  { id: "COL-004", name: "Đen tuyền", hex: "#000000" },
];

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Màu sắc</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý danh sách màu sắc của sản phẩm.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="mr-2 h-4 w-4" /> Thêm màu
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm màu sắc mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên màu</Label>
                <Input id="name" placeholder="VD: Đỏ rượu vang" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hex">Mã màu (Hex)</Label>
                <div className="flex gap-2">
                  <Input id="hex" placeholder="VD: #8B0000" className="flex-1" />
                  <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: "#8B0000" }}></div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu màu sắc</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input type="search" placeholder="Tìm kiếm màu sắc..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã màu</TableHead>
                <TableHead>Tên màu</TableHead>
                <TableHead>Hiển thị (Hex)</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colors.map((color) => (
                <TableRow key={color.id}>
                  <TableCell className="font-medium">{color.id}</TableCell>
                  <TableCell>{color.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border shadow-sm" style={{ backgroundColor: color.hex }} />
                      <span className="text-sm text-zinc-500">{color.hex}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                                        <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa màu sắc</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-name-${color.id}`}>Tên màu</Label>
                                <Input id={`edit-name-${color.id}`} defaultValue={color.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-hex-${color.id}`}>Mã màu (Hex)</Label>
                                <Input id={`edit-hex-${color.id}`} defaultValue={color.hex} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {colors.map((color) => (
            <div key={color.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-center gap-3 pr-8">
                <div className="h-8 w-8 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: color.hex }} />
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-zinc-900">{color.name}</span>
                  <span className="text-xs text-zinc-500">{color.hex}</span>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa màu sắc</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-name-${color.id}`}>Tên màu</Label>
                                <Input id={`m-edit-name-${color.id}`} defaultValue={color.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-hex-${color.id}`}>Mã màu (Hex)</Label>
                                <Input id={`m-edit-hex-${color.id}`} defaultValue={color.hex} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
