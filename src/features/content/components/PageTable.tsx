import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Plus, Search, MoreHorizontal, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Badge } from "@/shared/ui/badge";

import Link from "next/link";

import { usePages } from "@/features/content/hooks/usePages";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function PageTable() {
  const { pages, isLoading } = usePages();

  

  return (
    <>

      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm trang..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Đường dẫn (Slug)</TableHead>
                <TableHead>Cập nhật lần cuối</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={6} /> : (
pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {page.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                  <TableCell className="text-muted-foreground">{page.updatedAt}</TableCell>
                  <TableCell>
                    <Badge variant={page.status === "Đã xuất bản" ? "default" : "secondary"} className={page.status === "Đã xuất bản" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem render={<Link href={`/pages/${page.id}/edit`} className="w-full cursor-pointer" />}>
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
)}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {pages.map((page) => (
            <div key={page.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-start gap-3 pr-8">
                <div className="mt-1 h-8 w-8 bg-muted rounded-md flex justify-center items-center shrink-0">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-foreground leading-tight">{page.title}</span>
                  <span className="text-xs text-muted-foreground mt-1">Slug: /{page.slug}</span>
                  <span className="text-xs text-muted-foreground mt-1">Cập nhật: {page.updatedAt}</span>
                  <div className="mt-2">
                    <Badge variant={page.status === "Đã xuất bản" ? "default" : "secondary"} className={page.status === "Đã xuất bản" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "text-[10px] px-2 py-0"}>
                      {page.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem render={<Link href={`/pages/${page.id}/edit`} className="w-full cursor-pointer" />}>
                      Chỉnh sửa
                    </DropdownMenuItem>
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
