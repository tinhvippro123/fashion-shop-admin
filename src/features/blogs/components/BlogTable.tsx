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

import { useBlogs } from "@/features/blogs/hooks/useBlogs";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function BlogTable() {
  const { blogs, isLoading } = useBlogs();

  if (isLoading) {
    // We handle skeleton inside the table
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Danh sách Bài viết</CardTitle>
              <CardDescription>
                Hiển thị tất cả bài viết hiện có trên hệ thống.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tiêu đề bài viết..."
                className="pl-9 bg-muted/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
              {/* Desktop View: Table */}
              <div className="hidden md:block border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
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
                  <TableBody className="bg-card">
                    {isLoading ? <TableSkeleton columns={7} /> : (
                      blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell>
                            <div className="h-12 w-16 bg-muted rounded-md overflow-hidden relative flex items-center justify-center text-xs text-muted-foreground">
                              {/* Placeholder image since we don't have real images yet */}
                              Ảnh
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-foreground line-clamp-2 leading-tight">
                              {blog.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Tác giả: {blog.author}</div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{blog.category}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-foreground">{blog.views.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={blog.status === "Đã xuất bản" ? "default" : "secondary"} className={blog.status === "Đã xuất bản" ? "bg-muted text-foreground hover:bg-emerald-200" : ""}>
                              {blog.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{blog.date}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
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
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View: List */}
              <div className="md:hidden flex flex-col gap-3 mt-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm h-[180px] animate-pulse">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-16 w-20 shrink-0 bg-muted rounded-md" />
                        <div className="flex flex-col flex-1 gap-2">
                          <div className="h-4 bg-muted rounded-md w-full" />
                          <div className="h-4 bg-muted rounded-md w-2/3" />
                        </div>
                      </div>
                      <div className="h-16 bg-muted/50 rounded-md w-full mt-auto" />
                    </div>
                  ))
                ) : (
                  blogs.map((blog) => (
                    <div key={blog.id} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm">
                      <div className="flex items-start gap-4 pr-8 mb-4">
                        <div className="h-16 w-20 shrink-0 bg-muted rounded-md overflow-hidden flex items-center justify-center text-[10px] text-muted-foreground border">
                          Ảnh
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="font-bold text-foreground text-sm leading-snug line-clamp-2 mb-1">{blog.title}</span>
                          <span className="text-xs text-muted-foreground">Tác giả: {blog.author}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-2.5 rounded-md mb-3 border border-border/50">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Chuyên mục</span>
                          <span className="font-medium text-foreground">{blog.category}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Lượt xem</span>
                          <span className="font-medium text-foreground">{blog.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={blog.status === "Đã xuất bản" ? "default" : "secondary"} className={blog.status === "Đã xuất bản" ? "bg-muted text-foreground hover:bg-emerald-200 text-[10px] px-2 py-0 h-5" : "text-[10px] px-2 py-0 h-5"}>
                            {blog.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">{blog.date}</div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
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
                      </div>
                    </div>
                  ))
                )}
              </div>
        </CardContent>
      </Card>
    </>
  );
}
