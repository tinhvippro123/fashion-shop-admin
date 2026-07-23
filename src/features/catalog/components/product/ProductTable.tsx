"use client";

import Image from "next/image";
import Link from "next/link";
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
import { MoreHorizontal, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/utils/utils";
import { Product } from "@/features/catalog/types/product.admin";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductTable({ products, isLoading }: ProductTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm tên sản phẩm, mã SKU..."
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
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 aspect-2/3 rounded-md bg-muted overflow-hidden relative">
                      <Image src="/login-bg.jpg" alt={product.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge className={product.statusColor}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col">
          {isLoading ? <div className="p-4 text-center text-muted-foreground">Đang tải...</div> : (
          products.map((product) => (
            <div key={product.id} className="flex gap-4 p-4 border-b last:border-0 relative">
              <div className="w-20 aspect-2/3 rounded-md bg-muted overflow-hidden relative shrink-0">
                <Image src="/login-bg.jpg" alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col flex-1 py-1">
                <h4 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1 pr-6">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-foreground">{product.price}</span>
                  <Badge className={cn("text-[10px] px-1.5 py-0", product.statusColor)}>{product.status}</Badge>
                </div>
              </div>
              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
  );
}
