import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "10 Cách Phối Đồ Đi Đà Lạt Mùa Lạnh Cực Xinh Cho Nữ",
    category: "Mẹo phối đồ",
    author: "Admin",
    views: 1240,
    status: "Đã xuất bản",
    date: "10/11/2026",
    thumbnail: "/blog-1.jpg"
  },
  {
    id: 2,
    title: "Xu Hướng Thời Trang Thu Đông 2026: Lên Ngôi Của Màu Nâu Đất",
    category: "Xu hướng",
    author: "Content Writer",
    views: 856,
    status: "Đã xuất bản",
    date: "05/11/2026",
    thumbnail: "/blog-2.jpg"
  },
  {
    id: 3,
    title: "Cách Giặt Áo Len Không Bị Chảy Xệ Hay Co Rút",
    category: "Hướng dẫn bảo quản",
    author: "Admin",
    views: 432,
    status: "Nháp",
    date: "Chưa đăng",
    thumbnail: "/blog-3.jpg"
  }
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Bài viết</h2>
          <p className="text-zinc-500">Quản lý các bài viết trên Blog và tin tức của cửa hàng.</p>
        </div>
        <Link href="/blogs/create">
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <PlusCircle className="h-4 w-4" /> Thêm Bài Viết Mới
          </Button>
        </Link>
      </div>

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
    </div>
  );
}
