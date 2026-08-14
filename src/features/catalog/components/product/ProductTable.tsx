"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { MoreHorizontal, Search, Filter, Trash2, X, Star, EyeOff, Eye, PackagePlus, AlertTriangle, Megaphone, ArchiveRestore } from "lucide-react";
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
import { getProductActions } from "../../utils/action-resolvers";

interface ProductTableActionsProps {
  product: Product;
  isTrashView: boolean;
  onRestore: (product: Product) => void;
  onToggleActive: (product: Product) => void;
  onRestock: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductTableActions({ product, isTrashView, onRestore, onToggleActive, onRestock, onDelete }: ProductTableActionsProps) {
  const actions = getProductActions(product, isTrashView);
  return (
    <>
      {actions.includes('EDIT') && (
        <DropdownMenuItem render={<Link href={`/products/${product.id}/edit`} className="w-full h-full cursor-pointer" />}>
          Chỉnh sửa
        </DropdownMenuItem>
      )}
      
      {actions.includes('RESTORE') && (
        <DropdownMenuItem onClick={() => onRestore(product)} className="text-emerald-600">
          <ArchiveRestore className="mr-2 h-4 w-4" /> Khôi phục
        </DropdownMenuItem>
      )}

      {actions.includes('TOGGLE_ACTIVE') && (
        product.isActive ? (
          <DropdownMenuItem onClick={() => onToggleActive(product)}>
            <EyeOff className="mr-2 h-4 w-4" /> Ẩn sản phẩm
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onToggleActive(product)} className="text-emerald-600">
            <Eye className="mr-2 h-4 w-4" /> Bán lại
          </DropdownMenuItem>
        )
      )}

      {actions.includes('RESTOCK') && (
        <DropdownMenuItem onClick={() => onRestock(product)} className="text-blue-600">
          <PackagePlus className="mr-2 h-4 w-4" /> Nhập thêm kho
        </DropdownMenuItem>
      )}

      <DropdownMenuSeparator />
      
      {(actions.includes('DELETE') || actions.includes('PERMANENT_DELETE')) && (
        <DropdownMenuItem onClick={() => onDelete(product)} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" /> {isTrashView ? "Xóa vĩnh viễn" : "Xóa sản phẩm"}
        </DropdownMenuItem>
      )}
    </>
  );
}

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isTrashView?: boolean;
}

export function ProductTable({ products, isLoading, setProducts, isTrashView = false }: ProductTableProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const filteredProducts = products.filter(p => isTrashView ? p.deletedAt : !p.deletedAt);


  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
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
    if (isTrashView) {
      // Hard Delete from Trash
      if (product.sold && product.sold > 0) {
        toast.error(`Sản phẩm "${product.name}" đã có lượt bán nên không thể xóa vĩnh viễn!`);
        return;
      }
      if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm "${product.name}" không? Hành động này không thể hoàn tác.`)) {
        setProducts(prev => prev.filter(p => p.id !== product.id));
        toast.success(`Đã xóa vĩnh viễn sản phẩm "${product.name}" thành công!`);
      }
    } else {
      // Soft Delete to Trash
      if (confirm(`Bạn muốn đưa sản phẩm "${product.name}" vào thùng rác?`)) {
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, deletedAt: new Date().toISOString() } : p));
        toast.success(`Đã chuyển sản phẩm "${product.name}" vào thùng rác!`);
      }
    }
  };
  
  const handleRestore = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, deletedAt: undefined } : p));
    toast.success(`Đã khôi phục sản phẩm "${product.name}"!`);
  };

  const handleBulkDelete = () => {
    if (isTrashView) {
      const selectedProducts = products.filter(p => selectedIds.includes(p.id));
      const undeletableCount = selectedProducts.filter(p => p.sold && p.sold > 0).length;
      const deletableProducts = selectedProducts.filter(p => !p.sold || p.sold === 0);
      
      if (undeletableCount > 0 && undeletableCount === selectedIds.length) {
         toast.error(`Không thể xóa vĩnh viễn ${undeletableCount} sản phẩm vì đã có lượt bán!`);
         return;
      }
      
      if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${deletableProducts.length} sản phẩm?${undeletableCount > 0 ? `\n\n(Bỏ qua ${undeletableCount} sản phẩm không thể xóa)` : ''}`)) return;
      
      const hardDeleteIds = deletableProducts.map(p => p.id);
      setProducts(prev => prev.filter(p => !hardDeleteIds.includes(p.id)));
      setSelectedIds([]);
      toast.success(`Đã xóa vĩnh viễn ${deletableProducts.length} sản phẩm thành công!`);
    } else {
      if (!confirm(`Bạn có chắc chắn muốn đưa ${selectedIds.length} sản phẩm vào thùng rác?`)) return;
      setProducts(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, deletedAt: new Date().toISOString() } : p));
      setSelectedIds([]);
      toast.success(`Đã chuyển ${selectedIds.length} sản phẩm vào thùng rác thành công!`);
    }
  };

  const handleBulkRestore = () => {
    setProducts(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, deletedAt: undefined } : p));
    setSelectedIds([]);
    toast.success(`Đã khôi phục ${selectedIds.length} sản phẩm thành công!`);
  };

  const handleBulkHide = () => {
    if (!confirm(`Bạn có chắc chắn muốn ẩn ${selectedIds.length} sản phẩm đã chọn?`)) return;
    setProducts(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, isActive: false } : p));
    toast.success(`Đã ẩn ${selectedIds.length} sản phẩm thành công!`);
    setSelectedIds([]);
  };

  const handleBulkActivate = () => {
    if (!confirm(`Bạn có chắc chắn muốn mở bán lại ${selectedIds.length} sản phẩm đã chọn?`)) return;
    
    let hasOutOfStock = false;
    
    setProducts(prev => prev.map(p => {
      if (selectedIds.includes(p.id)) {
        if (p.stock === 0) hasOutOfStock = true;
        return { ...p, isActive: true };
      }
      return p;
    }));
    
    if (hasOutOfStock) {
      toast.warning(`Đã mở bán ${selectedIds.length} sản phẩm. Một số sản phẩm đang hết hàng, vui lòng kiểm tra lại!`, {
        duration: 5000,
      });
    } else {
      toast.success(`Đã mở bán ${selectedIds.length} sản phẩm thành công!`);
    }
    setSelectedIds([]);
  };

  const handleToggleActive = (product: Product) => {
    const isActivating = !product.isActive;
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isActive: isActivating } : p));
    
    if (isActivating && product.stock === 0) {
      toast.warning(`Sản phẩm "${product.name}" đã được mở bán lại nhưng đang hết hàng. Vui lòng nhập thêm kho!`, {
        duration: 5000,
      });
    } else {
      toast.success(`Đã ${isActivating ? "mở bán lại" : "ẩn"} sản phẩm "${product.name}"!`);
    }
  };

  const handleRestock = (product: Product) => {
    const newStock = parseInt(prompt("Nhập số lượng hàng mới về:", "50") || "0", 10);
    if (newStock > 0) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock + newStock } : p));
      toast.success(`Đã cập nhật tồn kho cho "${product.name}"!`);
    }
  };


  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const hasActive = selectedProducts.some(p => p.isActive);
  const hasInactive = selectedProducts.some(p => !p.isActive);

  return (
    <>
      <div className={cn("rounded-md border bg-card overflow-hidden transition-all duration-300", selectedIds.length > 0 ? "mb-24" : "")}>
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
                <TableHead className="w-[50px]">
                    <div className="flex items-center justify-center">
                      <Checkbox 
                    checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                    </div>
                  </TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Kho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton columns={9} />
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <AlertTriangle className="h-10 w-10 mb-2 text-muted-foreground/50" />
                      {isTrashView ? "Thùng rác trống" : "Không tìm thấy sản phẩm nào"}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const status = getStatusDisplay(product);
                  return (
                  <TableRow 
                    key={product.id}
                    className={cn(selectedIds.includes(product.id) ? "bg-muted/50" : "", "cursor-pointer hover:bg-muted/50 transition-colors")}
                    onClick={() => toggleSelect(product.id)}
                  >
                    <TableCell 
                      className="text-center" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(product.id);
                      }}
                    >
                      <div className="flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedIds.includes(product.id)}
                          onCheckedChange={() => toggleSelect(product.id)}
                          aria-label={`Select ${product.name}`}
                        />
                      </div>
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
                      ) : product.stock === 0 ? (
                        <div className="flex items-center gap-1.5 text-red-500 font-bold" title="Hết hàng">
                          <span>0</span>
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
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <ProductTableActions 
                            product={product} 
                            isTrashView={isTrashView} 
                            onRestore={handleRestore} 
                            onToggleActive={handleToggleActive} 
                            onRestock={handleRestock} 
                            onDelete={handleDelete} 
                          />
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
                  {product.stock === 0 && (
                    <div className="flex items-center gap-1 text-red-500 text-xs font-bold mb-1">
                      <AlertTriangle className="h-3 w-3" /> Hết hàng (0)
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
                        <ProductTableActions 
                          product={product} 
                          isTrashView={isTrashView} 
                          onRestore={handleRestore} 
                          onToggleActive={handleToggleActive} 
                          onRestock={handleRestock} 
                          onDelete={handleDelete} 
                        />
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
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa vĩnh viễn
                  </Button>
                </>
              ) : (
                <>
                  {hasInactive && (
                    <Button variant="ghost" size="sm" onClick={handleBulkActivate} className="text-emerald-400 hover:text-emerald-300 hover:bg-background/10">
                      <Eye className="h-4 w-4 mr-2" /> Bán lại
                    </Button>
                  )}
                  {hasActive && (
                    <Button variant="ghost" size="sm" onClick={handleBulkHide} className="text-amber-400 hover:text-amber-300 hover:bg-background/10">
                      <EyeOff className="h-4 w-4 mr-2" /> Ẩn SP
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                    <Trash2 className="h-4 w-4 mr-2" /> Đưa vào thùng rác
                  </Button>
                </>
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
