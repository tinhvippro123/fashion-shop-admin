"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Plus, Search, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

import { useBanners } from "../hooks/useBanners";

export function BannerTable() {
  const { banners, isLoading } = useBanners();

  if (isLoading) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  return (
    <>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm banner..."
              className="pl-8"
            />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Đường dẫn liên kết</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="relative h-12 w-24 rounded-md bg-zinc-100 flex items-center justify-center overflow-hidden">
                      <ImageIcon className="h-4 w-4 text-zinc-400" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell className="text-zinc-500">{banner.link}</TableCell>
                  <TableCell>
                    <Badge variant={banner.status === "Hiển thị" ? "default" : "secondary"} className={banner.status === "Hiển thị" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""}>
                      {banner.status}
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
                              <DialogTitle>Chỉnh sửa Banner</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-title-${banner.id}`}>Tiêu đề</Label>
                                <Input id={`edit-title-${banner.id}`} defaultValue={banner.title} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-link-${banner.id}`}>Đường dẫn (Link)</Label>
                                <Input id={`edit-link-${banner.id}`} defaultValue={banner.link} />
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
          {banners.map((banner) => (
            <div key={banner.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex gap-3 pr-8">
                <div className="relative h-16 w-24 shrink-0 rounded-md bg-zinc-100 flex items-center justify-center overflow-hidden">
                   <ImageIcon className="h-5 w-5 text-zinc-400" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-zinc-900 text-sm leading-tight">{banner.title}</span>
                  <span className="text-xs text-zinc-500 truncate mt-1">Link: {banner.link}</span>
                  <div className="mt-2">
                    <Badge variant={banner.status === "Hiển thị" ? "default" : "secondary"} className={banner.status === "Hiển thị" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "text-[10px] px-2 py-0"}>
                      {banner.status}
                    </Badge>
                  </div>
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
                              <DialogTitle>Chỉnh sửa Banner</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-title-${banner.id}`}>Tiêu đề</Label>
                                <Input id={`m-edit-title-${banner.id}`} defaultValue={banner.title} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-link-${banner.id}`}>Đường dẫn (Link)</Label>
                                <Input id={`m-edit-link-${banner.id}`} defaultValue={banner.link} />
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
    </>
  );
}
