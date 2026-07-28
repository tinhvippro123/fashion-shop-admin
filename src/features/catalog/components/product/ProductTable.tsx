"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
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
import { MoreHorizontal, Search, Filter, Trash2, ArchiveRestore, X, Star } from "lucide-react";
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
  isTrashView?: boolean;
}

export function ProductTable({ products, isLoading, isTrashView = false }: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
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
    if (isTrashView) {
      const unremovableProducts = products.filter(
        p => selectedIds.includes(p.id) && ((p.sold && p.sold > 0) || (p.reviewCount && p.reviewCount > 0))
      );
      
      if (unremovableProducts.length > 0) {
        if (unremovableProducts.length === selectedIds.length) {
          toast.error("Không thể xóa vĩnh viễn các sản phẩm đã chọn vì đều có dữ liệu bán hàng hoặc đánh giá!");
          return;
        } else {
          toast.warning(`Đã bỏ qua ${unremovableProducts.length} sản phẩm không thể xóa vĩnh viễn.`);
        }
      }
      
      const removableCount = selectedIds.length - unremovableProducts.length;
      if (removableCount > 0) {
        toast.success(`Đã xóa vĩnh viễn ${removableCount} sản phẩm thành công!`);
        setSelectedIds([]);
      }
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} sản phẩm vào thùng rác!`);
      setSelectedIds([]);
    }
  };

  const handlePermanentDelete = (product: Product) => {
    if (product.sold && product.sold > 0) {
      toast.error(`Không thể xóa vĩnh viễn "${product.name}" vì đã có dữ liệu bán hàng!`);
      return;
    }
    if (product.reviewCount && product.reviewCount > 0) {
      toast.error(`Không thể xóa vĩnh viễn "${product.name}" vì đã có đánh giá!`);
      return;
    }
    toast.success(`Đã xóa vĩnh viễn sản phẩm "${product.name}"!`);
  };

  const handleEmptyTrash = () => {
    const unremovableProducts = products.filter(
      p => (p.sold && p.sold > 0) || (p.reviewCount && p.reviewCount > 0)
    );
    
    if (unremovableProducts.length === products.length && products.length > 0) {
      toast.error("Không có sản phẩm nào có thể xóa vĩnh viễn (đều đã bán hoặc có đánh giá)!");
      return;
    }
    
    const removableCount = products.length - unremovableProducts.length;
    if (removableCount > 0) {
      toast.success(`Đã dọn sạch ${removableCount} sản phẩm khỏi thùng rác!`);
    }
    
    if (unremovableProducts.length > 0) {
      toast.warning(`Giữ lại ${unremovableProducts.length} sản phẩm có dữ liệu quan trọng.`);
    }
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} sản phẩm thành công!`);
    setSelectedIds([]);
  };

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm tên sản phẩm, mã SKU..."
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
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0">
              <Trash2 className="mr-2 h-4 w-4" /> <span>Dọn sạch thùng rác</span>
            </Button>
          )}
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={products.length > 0 && selectedIds.length === products.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Đã bán</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={10} /> : (
              products.map((product) => (
                <TableRow key={product.id} className={selectedIds.includes(product.id) ? "bg-muted/50" : ""}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedIds.includes(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="w-12 aspect-2/3 rounded-md bg-muted overflow-hidden relative">
                      <Image src="/login-bg.jpg" alt={product.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.sold ? product.sold.toLocaleString() : "-"}</TableCell>
                  <TableCell>
                    {product.rating ? (
                      <div className="flex items-center gap-1 text-amber-500 font-medium">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground text-xs font-normal">({product.reviewCount})</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={product.statusColor}>{product.status}</Badge>
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
                            <DropdownMenuItem onClick={() => handlePermanentDelete(product)} className="text-red-600 font-medium">Xóa vĩnh viễn</DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem>
                              <Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
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

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col">
          {isLoading ? <div className="p-4 text-center text-muted-foreground">Đang tải...</div> : (
          products.map((product) => (
            <div key={product.id} className={cn("flex gap-4 p-4 border-b last:border-0 relative transition-colors", selectedIds.includes(product.id) ? "bg-muted/50" : "")}>
              <div className="absolute top-4 left-4 z-10">
                <Checkbox 
                  checked={selectedIds.includes(product.id)}
                  onCheckedChange={() => toggleSelect(product.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
              <div className="w-20 aspect-2/3 rounded-md bg-muted overflow-hidden relative shrink-0 ml-6">
                <Image src="/login-bg.jpg" alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col flex-1 py-1">
                <h4 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1 pr-6">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                {product.rating && product.sold && (
                  <div className="flex items-center gap-3 text-xs mb-2">
                    <span className="text-muted-foreground">Đã bán {product.sold.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviewCount})</span>
                    </div>
                  </div>
                )}
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
                    {isTrashView ? (
                      <>
                        <DropdownMenuItem className="text-emerald-600 font-medium">Khôi phục</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePermanentDelete(product)} className="text-red-600 font-medium">Xóa vĩnh viễn</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>
                          <Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
          )}
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {mounted && selectedIds.length > 0 && createPortal(
        <div style={{ bottom: "24px" }} className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
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
        </div>,
        document.body
      )}
    </>
  );
}
