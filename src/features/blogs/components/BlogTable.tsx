import Link from "next/link";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { PlusCircle, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { useBlogs } from "../hooks/useBlogs";

export function BlogTable() {
  const { blogs, isLoading } = useBlogs();

  if (isLoading) {
    return <div className="flex justify-center p-8 text-zinc-500">Đang tải danh sách bài viết...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Danh sách Bài viết</CardTitle>
              <CardDescription>
                Hiển thị tất cả bài viết hiện có trên hệ thống.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Tìm tiêu đề bài viết..."
                className="pl-9 bg-zinc-50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead className="w-[80px]">Hình ảnh</TableHead>
                  <TableHead className="w-1/3">Tiêu đề</TableHead>
                  <TableHead>Chuyên mục</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày đăng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="h-12 w-16 bg-zinc-200 rounded-md overflow-hidden relative flex items-center justify-center text-xs text-zinc-400">
                        {/* Placeholder image since we don't have real images yet */}
                        Ảnh
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-zinc-900 line-clamp-2 leading-tight">
                        {blog.title}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">Tác giả: {blog.author}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600">{blog.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-zinc-700">{blog.views.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={blog.status === "Đã xuất bản" ? "default" : "secondary"} className={blog.status === "Đã xuất bản" ? "bg-zinc-100 text-zinc-900 hover:bg-emerald-200" : ""}>
                        {blog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600">{blog.date}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/blogs/${blog.id}/edit`} className="w-full cursor-pointer flex items-center">
                              <Edit className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
