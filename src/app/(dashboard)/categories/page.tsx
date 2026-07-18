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
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, Filter } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    id: "CAT-001",
    name: "Váy đầm",
    slug: "vay-dam",
    productCount: 145,
    status: "Hoạt động",
  },
  {
    id: "CAT-002",
    name: "Áo nữ",
    slug: "ao-nu",
    productCount: 89,
    status: "Hoạt động",
  },
  {
    id: "CAT-003",
    name: "Quần nữ",
    slug: "quan-nu",
    productCount: 64,
    status: "Hoạt động",
  },
  {
    id: "CAT-004",
    name: "Phụ kiện",
    slug: "phu-kien",
    productCount: 12,
    status: "Đang ẩn",
  },
];

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh mục</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý các danh mục sản phẩm thời trang.</p>
        </div>
        <Dialog>
          <DialogTrigger render={
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm danh mục mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input id="name" placeholder="VD: Áo khoác mùa đông" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Đường dẫn (Slug)</Label>
                <Input id="slug" placeholder="VD: ao-khoac-mua-dong" />
              </div>
              <div className="grid gap-2">
                <Label>Danh mục cha (Tùy chọn)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục cha..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vay-dam">Váy đầm</SelectItem>
                    <SelectItem value="ao-nu">Áo nữ</SelectItem>
                    <SelectItem value="quan-nu">Quần nữ</SelectItem>
                    <SelectItem value="phu-kien">Phụ kiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Label htmlFor="active" className="cursor-pointer text-zinc-600">Trạng thái hoạt động</Label>
                <Switch id="active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu danh mục</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm danh mục..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="ml-auto hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Lọc
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Đường dẫn (Slug)</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.id}</TableCell>
                  <TableCell className="font-bold">{cat.name}</TableCell>
                  <TableCell className="text-zinc-500">{cat.slug}</TableCell>
                  <TableCell>{cat.productCount}</TableCell>
                  <TableCell>
                    <Badge variant={cat.status === "Hoạt động" ? "default" : "secondary"} className={cat.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""}>
                      {cat.status}
                    </Badge>
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
                              <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-name-${cat.id}`}>Tên danh mục</Label>
                                <Input id={`edit-name-${cat.id}`} defaultValue={cat.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-slug-${cat.id}`}>Đường dẫn (Slug)</Label>
                                <Input id={`edit-slug-${cat.id}`} defaultValue={cat.slug} />
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
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-center justify-between pr-8">
                <span className="font-bold text-zinc-900 text-lg">{cat.name}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-zinc-500">
                <span>Slug: {cat.slug}</span>
                <span>Số sản phẩm: <strong className="text-zinc-900">{cat.productCount}</strong></span>
              </div>
              <div className="mt-2">
                <Badge variant={cat.status === "Hoạt động" ? "default" : "secondary"} className={cat.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "text-[10px] px-2 py-0"}>
                  {cat.status}
                </Badge>
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
                              <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-name-${cat.id}`}>Tên danh mục</Label>
                                <Input id={`m-edit-name-${cat.id}`} defaultValue={cat.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-slug-${cat.id}`}>Đường dẫn (Slug)</Label>
                                <Input id={`m-edit-slug-${cat.id}`} defaultValue={cat.slug} />
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
