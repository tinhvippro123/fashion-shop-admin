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
import { Badge } from "@/shared/ui/badge";
import { Search, MoreHorizontal, Star, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Checkbox } from "@/shared/ui/checkbox";
import { ArchiveRestore, Trash2, X } from "lucide-react";
import { Review } from "@/features/reviews/types/review.admin";

import { useReviews } from "@/features/reviews/hooks/useReviews";
import { TableSkeleton } from "@/shared/ui/table-skeleton";

export function ReviewTable({ isTrashView = false }: { isTrashView?: boolean }) {
  const { reviews, isLoading } = useReviews();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredReviews = reviews.filter(r => isTrashView ? r.deletedAt : !r.deletedAt);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredReviews.length && filteredReviews.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredReviews.map((r) => r.id));
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
      toast.success(`Đã xóa vĩnh viễn ${selectedIds.length} đánh giá thành công!`);
    } else {
      toast.success(`Đã chuyển ${selectedIds.length} đánh giá vào thùng rác!`);
    }
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    toast.success(`Đã khôi phục ${selectedIds.length} đánh giá thành công!`);
    setSelectedIds([]);
  };

  const handlePermanentDelete = (r: Review) => {
    toast.success(`Đã xóa vĩnh viễn đánh giá từ khách hàng "${r.user.name}"!`);
  };

  const handleEmptyTrash = () => {
    if (filteredReviews.length === 0) return;
    toast.success(`Đã dọn sạch ${filteredReviews.length} đánh giá khỏi thùng rác!`);
    setSelectedIds([]);
  };

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm theo tên khách, email, nội dung..." className="pl-8" />
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
                    checked={filteredReviews.length > 0 && selectedIds.length === filteredReviews.length} 
                    onCheckedChange={toggleSelectAll} 
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={7} /> : (
                filteredReviews.map((review) => (
                  <TableRow key={review.id} className={selectedIds.includes(review.id) ? "bg-muted/50" : ""}>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={selectedIds.includes(review.id)}
                        onCheckedChange={() => toggleSelect(review.id)}
                        aria-label={`Select ${review.user.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.initial}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{review.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/products/${review.product.id}/edit`} className="text-blue-600 hover:underline font-medium">
                        {review.product.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-zinc-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground line-clamp-2" title={review.comment}>
                          {review.comment}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{review.date}</TableCell>
                    <TableCell>
                      <Badge variant={review.status === "Hiển thị" ? "default" : "secondary"} className={review.status === "Hiển thị" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-red-100 text-red-700 hover:bg-red-200 border-none"}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem render={<Link href={`/reviews/${review.id}`} className="w-full cursor-pointer whitespace-nowrap" />}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          
                          {isTrashView ? (
                            <>
                              <DropdownMenuItem onClick={() => { toast.success(`Khôi phục đánh giá của ${review.user.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePermanentDelete(review)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem className="whitespace-nowrap">{review.status === "Hiển thị" ? "Ẩn đánh giá" : "Hiện đánh giá"}</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển đánh giá vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
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
          {filteredReviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="absolute top-4 left-4 z-10">
                <Checkbox 
                  checked={selectedIds.includes(review.id)}
                  onCheckedChange={() => toggleSelect(review.id)}
                  className="bg-card shadow-sm border-muted-foreground/30 data-[state=checked]:border-primary"
                />
              </div>
              <div className="flex items-start gap-3 pl-8 pr-8">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.initial}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-foreground">{review.user.name}</span>
                  <div className="flex text-yellow-400 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-zinc-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground mb-2">{review.date}</span>
                  
                  <Link href={`/products/${review.product.id}/edit`} className="text-xs text-blue-600 hover:underline font-medium mb-1 truncate">
                    Sp: {review.product.name}
                  </Link>
                  
                  <p className="text-sm text-foreground bg-muted/50 p-2 rounded-md border text-left mt-1">
                    &quot;{review.comment}&quot;
                  </p>
                  
                  <div className="mt-3">
                    <Badge variant={review.status === "Hiển thị" ? "default" : "secondary"} className={review.status === "Hiển thị" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] px-2 py-0" : "bg-red-100 text-red-700 hover:bg-red-200 border-none text-[10px] px-2 py-0"}>
                      {review.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem render={<Link href={`/reviews/${review.id}`} className="w-full cursor-pointer whitespace-nowrap" />}>
                      Xem chi tiết
                    </DropdownMenuItem>
                    
                    {isTrashView ? (
                      <>
                        <DropdownMenuItem onClick={() => { toast.success(`Khôi phục đánh giá của ${review.user.name}`); }} className="text-emerald-600 font-medium whitespace-nowrap">Khôi phục</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePermanentDelete(review)} className="text-red-600 font-medium whitespace-nowrap">Xóa vĩnh viễn</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem className="whitespace-nowrap">{review.status === "Hiển thị" ? "Ẩn đánh giá" : "Hiện đánh giá"}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { toast.success(`Đã chuyển đánh giá vào thùng rác!`); }} className="text-red-600 whitespace-nowrap">Chuyển vào thùng rác</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
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
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa vĩnh viễn
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleBulkDelete} className="text-red-400 hover:text-red-300 hover:bg-background/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Chuyển vào thùng rác
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
