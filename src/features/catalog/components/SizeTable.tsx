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
import { Plus, Search, MoreHorizontal } from "lucide-react";
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

import { useSizes } from "@/features/catalog/hooks/useSizes";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { SizeFormModal } from "./SizeFormModal";

export function SizeTable() {
  const { sizes, isLoading } = useSizes();

  

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kích thước</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý kích thước sản phẩm.</p>
        </div>
        <SizeFormModal mode="create" />
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm kích thước..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên Size</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={4} /> : (
sizes.map((size) => (
                <TableRow key={size.id}>
                  <TableCell className="font-medium text-muted-foreground">{size.id}</TableCell>
                  <TableCell className="font-bold">{size.name}</TableCell>
                  <TableCell className="text-right">
                                        <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <SizeFormModal 
                          mode="edit" 
                          initialData={size} 
                          trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} 
                        />
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
          {sizes.map((size) => (
            <div key={size.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-center gap-3 pr-8">
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-foreground text-lg">{size.name}</span>
                  <span className="text-xs text-muted-foreground">{size.id}</span>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <SizeFormModal 
                          mode="edit" 
                          initialData={size} 
                          trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} 
                        />
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
