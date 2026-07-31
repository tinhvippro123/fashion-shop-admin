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
import { MoreHorizontal, Search, Filter, Trash2, X, Star, EyeOff, Eye, PackagePlus, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/utils/utils";
import { Product } from "@/features/catalog/types/product.admin";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ProductTable({ products, isLoading, setProducts }: ProductTableProps) {
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

  const getStatusDisplay = (product: Product) => {
    if (!product.isActive) {
      return { text: "Đã ẩn", color: "bg-muted text-muted-foreground" };
    }
    if (product.stock === 0) {
      return { text: "Hết hàng", color: "bg-amber-500 hover:bg-amber-600" };
    }
    return { text: "Đang bán", color: "bg-emerald-500 hover:bg-emerald-600" };
  };

  const handleDelete = (product: Product) => {
    if (product.sold && product.sold > 0) {
      // Soft Delete
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isActive: false } : p));
      toast.error(`Sản phẩm "${product.name}" đã phát sinh giao dịch nên không thể xóa vĩnh viễn. Hệ thống đã tự động chuyển sản phẩm sang trạng thái Ẩn!`, {
        duration: 5000,
      });
    } else {
      // Hard Delete
      if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm "${product.name}" không? Hành động này không thể hoàn tác.`)) {
        setProducts(prev => prev.filter(p => p.id !== product.id));
        toast.success(`Đã xóa vĩnh viễn sản phẩm "${product.name}" thành công!`);
      }
    }
  };

  const handleBulkDelete = () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} sản phẩm đã chọn?`)) return;

    const selectedProducts = products.filter(p => selectedIds.includes(p.id));
    const toSoftDelete = selectedProducts.filter(p => p.sold && p.sold > 0);
    const toHardDelete = selectedProducts.filter(p => !p.sold || p.sold === 0);

    setProducts(prev => {
      let next = [...prev];
      // Hard delete
      if (toHardDelete.length > 0) {
        const hardDeleteIds = toHardDelete.map(p => p.id);
        next = next.filter(p => !hardDeleteIds.includes(p.id));
      }
      // Soft delete
      if (toSoftDelete.length > 0) {
        const softDeleteIds = toSoftDelete.map(p => p.id);
        next = next.map(p => softDeleteIds.includes(p.id) ? { ...p, isActive: false } : p);
      }
      return next;
    });

    setSelectedIds([]);

    if (toSoftDelete.length > 0) {
      toast.error(`${toSoftDelete.length} sản phẩm đã phát sinh giao dịch nên được chuyển sang trạng thái Ẩn. Đã xóa vĩnh viễn ${toHardDelete.length} sản phẩm.`, {
        duration: 5000,
      });
    } else {
      toast.success(`Đã xóa vĩnh viễn ${toHardDelete.length} sản phẩm thành công!`);
    }
  };

  const handleBulkHide = () => {
    if (!confirm(`Bạn có chắc chắn muốn ẩn ${selectedIds.length} sản phẩm đã chọn?`)) return;
    setProducts(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, isActive: false } : p));
    toast.success(`Đã ẩn ${selectedIds.length} sản phẩm thành công!`);
    setSelectedIds([]);
  };

  const handleToggleActive = (product: Product) => {
    const action = product.isActive ? "Ẩn" : "Hiện";
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isActive: !p.isActive } : p));
    toast.success(`Đã ${action.toLowerCase()} sản phẩm "${product.name}"!`);
  };

  const handleRestock = (product: Product) => {
    const newStock = parseInt(prompt("Nhập số lượng hàng mới về:", "50") || "0", 10);
    if (newStock > 0) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock + newStock } : p));
      toast.success(`Đã cập nhật tồn kho cho "${product.name}"!`);
    }
  };

  const renderActions = (product: Product) => (
    <>
      <DropdownMenuItem>
        <Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
      </DropdownMenuItem>
      
      {product.isActive ? (
        <DropdownMenuItem onClick={() => handleToggleActive(product)}>
          <EyeOff className="mr-2 h-4 w-4" /> Ẩn sản phẩm
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={() => handleToggleActive(product)} className="text-emerald-600">
          <Eye className="mr-2 h-4 w-4" /> Bán lại
        </DropdownMenuItem>
      )}

      {product.isActive && product.stock === 0 && (
        <DropdownMenuItem onClick={() => handleRestock(product)} className="text-blue-600">
          <PackagePlus className="mr-2 h-4 w-4" /> Nhập thêm kho
        </DropdownMenuItem>
      )}

      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={() => handleDelete(product)} className="text-red-600">
        <Trash2 className="mr-2 h-4 w-4" /> Xóa sản phẩm
      </DropdownMenuItem>
    </>
  );

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
              products.map((product) => {
                const status = getStatusDisplay(product);
                return (
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
                    <TableCell className="font-medium">
                      <span className={!product.isActive ? "text-muted-foreground" : ""}>{product.name}</span>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {product.stock > 0 && product.stock < 5 ? (
                        <div className="flex items-center gap-1.5 text-orange-500 font-medium" title="Sắp hết hàng">
                          <span>{product.stock}</span>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      ) : (
                        product.stock
                      )}
                    </TableCell>
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
                      <Badge className={status.color}>{status.text}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {renderActions(product)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col">
          {isLoading ? <div className="p-4 text-center text-muted-foreground">Đang tải...</div> : (
          products.map((product) => {
            const status = getStatusDisplay(product);
            return (
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
                  <h4 className={cn("font-semibold text-foreground line-clamp-2 leading-tight mb-1 pr-6", !product.isActive && "text-muted-foreground")}>
                    {product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  {product.stock > 0 && product.stock < 5 && (
                    <div className="flex items-center gap-1 text-orange-500 text-xs font-medium mb-1">
                      <AlertTriangle className="h-3 w-3" /> Sắp hết hàng ({product.stock})
                    </div>
                  )}
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
                    <Badge className={cn("text-[10px] px-1.5 py-0", status.color)}>{status.text}</Badge>
                  </div>
                </div>
                <div className="absolute top-3 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {renderActions(product)}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
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
              <Button variant="ghost" size="sm" onClick={handleBulkHide} className="text-muted-foreground hover:text-foreground hover:bg-background/10">
                <EyeOff className="h-4 w-4 mr-2" /> Ẩn hàng loạt
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                <Trash2 className="h-4 w-4 mr-2" /> Xóa
              </Button>
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
