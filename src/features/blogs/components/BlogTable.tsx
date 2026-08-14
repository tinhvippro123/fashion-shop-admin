import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { PlusCircle, Search, Edit, Trash2, MoreHorizontal, RefreshCcw } from "lucide-react";
import Image from "next/image";

import { useBlogs } from "@/features/blogs/hooks/useBlogs";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { getBlogActions } from "../utils/action-resolvers";

import { Blog } from "@/features/blogs/types/blog.admin";

interface BlogTableActionsProps {
  blog: Blog;
  isTrashView: boolean;
  onDelete: (blog: Blog) => void;
  onRestore: (blog: Blog) => void;
}

function BlogTableActions({ blog, isTrashView, onDelete, onRestore }: BlogTableActionsProps) {
  const actions = getBlogActions(blog, { isTrashView });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
          <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.includes('EDIT') && (
          <DropdownMenuItem>
            <Link href={`/blogs/${blog.id}/edit`} className="w-full cursor-pointer flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
        )}
        {actions.includes('SOFT_DELETE') && (
          <DropdownMenuItem className="text-red-600" onClick={() => onDelete(blog)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa
          </DropdownMenuItem>
        )}
        {actions.includes('RESTORE') && (
          <DropdownMenuItem className="text-emerald-600 cursor-pointer flex items-center" onClick={() => onRestore(blog)}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Khôi phục
          </DropdownMenuItem>
        )}
        {actions.includes('PERMANENT_DELETE') && (
          <DropdownMenuItem className="text-red-600 cursor-pointer flex items-center" onClick={() => onDelete(blog)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa vĩnh viễn
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BlogTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const router = useRouter();
  const { blogs, isLoading, setBlogs } = useBlogs();
  
  const filteredBlogs = blogs.filter(b => isTrashView ? b.deletedAt : !b.deletedAt);
  
  const handleDelete = (blog: Blog) => {
    if (isTrashView) {
      if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn bài viết "${blog.title}"? Hành động này không thể hoàn tác.`)) {
        setBlogs(prev => prev.filter(b => b.id !== blog.id));
      }
    } else {
      if (confirm(`Bạn có muốn chuyển bài viết "${blog.title}" vào thùng rác?`)) {
        setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, deletedAt: new Date().toISOString() } : b));
      }
    }
  };
  
  const handleRestore = (blog: Blog) => {
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, deletedAt: undefined } : b));
  };

  return (
    <>
      <Card>
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm tiêu đề bài viết..."
              className="pl-8 bg-muted/50"
            />
          </div>
        </div>
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
                        <TableRow 
                          key={blog.id} 
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => router.push(`/blogs/${blog.id}/edit`)}
                        >
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
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <BlogTableActions 
                              blog={blog} 
                              isTrashView={isTrashView} 
                              onDelete={handleDelete} 
                              onRestore={handleRestore} 
                            />
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
                    <div key={i} className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm h-45 animate-pulse">
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
                    <div 
                      key={blog.id} 
                      className="flex flex-col p-4 border rounded-lg bg-card relative shadow-sm cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => router.push(`/blogs/${blog.id}/edit`)}
                    >
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

                      <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                        <BlogTableActions 
                          blog={blog} 
                          isTrashView={isTrashView} 
                          onDelete={handleDelete} 
                          onRestore={handleRestore} 
                        />
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
