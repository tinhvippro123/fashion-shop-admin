"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Search, Filter, MoreHorizontal, Trash2, ArchiveRestore, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Category } from "@/features/catalog/types/category";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { CategoryFormModal } from "./CategoryFormModal";

interface CategoryTableProps {
  categories: Category[];
  isLoading?: boolean;
  isTrashView?: boolean;
}

export function CategoryTable({ categories, isLoading, isTrashView = false }: CategoryTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length && categories.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    toast.success(`Đã xóa ${selectedIds.length} danh mục thành công!`);
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} danh mục thành công!`);
    setSelectedIds([]);
  };

  return (
    <>
      <div className={cn("rounded-md border bg-card overflow-hidden transition-all duration-300", selectedIds.length > 0 ? "mb-24" : "")}>
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm danh mục..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="hidden sm:flex shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          {isTrashView && (
            <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={categories.length > 0 && selectedIds.length === categories.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Mã</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Đường dẫn (Slug)</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
              categories.map((cat) => (
                <TableRow key={cat.id} className={selectedIds.includes(cat.id) ? "bg-muted/50" : ""}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedIds.includes(cat.id)}
                      onCheckedChange={() => toggleSelect(cat.id)}
                      aria-label={`Select ${cat.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{cat.id}</TableCell>
                  <TableCell className="font-bold">{cat.name}</TableCell>
                  <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                  <TableCell>{cat.productCount}</TableCell>
                  <TableCell>
                    <Badge variant={cat.status === "Hoạt động" ? "default" : "secondary"} className={cat.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""}>
                      {cat.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isTrashView ? (
                          <>
                            <DropdownMenuItem className="text-emerald-600 font-medium">Khôi phục</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 font-medium">Xóa vĩnh viễn</DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <CategoryFormModal 
                              mode="edit" 
                              initialData={{ ...cat, active: cat.status === "Hoạt động" }} 
                              trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>}
                            />
                            <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                          </>
                        )}
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
          {isLoading ? <div className="p-4 text-center text-muted-foreground">Đang tải...</div> : (
          categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex items-center justify-between pr-8">
                <span className="font-bold text-foreground text-lg">{cat.name}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span>Slug: {cat.slug}</span>
                <span>Số sản phẩm: <strong className="text-foreground">{cat.productCount}</strong></span>
              </div>
              <div className="mt-2">
                <Badge variant={cat.status === "Hoạt động" ? "default" : "secondary"} className={cat.status === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "text-[10px] px-2 py-0"}>
                  {cat.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <CategoryFormModal 
                          mode="edit" 
                          initialData={{ ...cat, active: cat.status === "Hoạt động" }} 
                          trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>}
                        />
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </div>
          ))
          )}
        </div>
        <div className="md:hidden flex flex-col">
          {/* Mobile view logic can be added here similar to products, omitting for brevity or wait, I should add mobile bulk select too if needed. Since categories don't have a mobile view built out with cards yet, we'll just keep it simple or empty. Ah, wait, there is no mobile card view for Categories in this file! It just ends after Desktop Table. Oh wait, I see `</div>` */}
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div style={{ bottom: "24px" }} className="fixed left-1/2 -translate-x-1/2 lg:ml-32 z-50 transition-all duration-300">
          <div className="flex items-center gap-4 bg-foreground text-background px-4 py-3 rounded-full shadow-lg border border-border">
            <span className="text-sm font-medium px-2 border-r border-background/20">
              Đã chọn <strong className="text-blue-400">{selectedIds.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              {isTrashView ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleBulkRestore} className="text-emerald-400 hover:text-emerald-300 hover:bg-background/10">
                    <ArchiveRestore className="h-4 w-4 mr-2" /> Khôi phục
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Xóa
                </Button>
              )}
            </div>
            <div className="pl-2 border-l border-background/20">
              <Button variant="ghost" size="icon" onClick={() => setSelectedIds([])} className="h-8 w-8 rounded-full hover:bg-background/10 text-background">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
