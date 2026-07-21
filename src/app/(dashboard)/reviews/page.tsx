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
import { Search, MoreHorizontal, Star, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Link from "next/link";

const reviews = [
  {
    id: "REV-001",
    user: { name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", initial: "N" },
    product: { id: "PROD-001", name: "Áo Thun Nam Cổ Tròn" },
    rating: 5,
    comment: "Chất vải mát, mặc rất thích. Sẽ ủng hộ shop thêm!",
    date: "15/07/2026",
    status: "Hiển thị",
  },
  {
    id: "REV-002",
    user: { name: "Trần Thị B", avatar: "/avatars/2.jpg", initial: "T" },
    product: { id: "PROD-005", name: "Quần Jean Nữ Ống Rộng" },
    rating: 4,
    comment: "Form quần đẹp nhưng màu hơi nhạt hơn so với hình một xíu.",
    date: "12/07/2026",
    status: "Hiển thị",
  },
  {
    id: "REV-003",
    user: { name: "Lê Hoàng C", avatar: "", initial: "L" },
    product: { id: "PROD-012", name: "Áo Khoác Bomber Nam" },
    rating: 1,
    comment: "Giao hàng quá chậm, shop hỗ trợ kém.",
    date: "10/07/2026",
    status: "Bị ẩn",
  }
];

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đánh giá sản phẩm</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý phản hồi và đánh giá từ khách hàng.</p>
        </div>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input type="search" placeholder="Tìm kiếm đánh giá..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
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
                      <span className="text-sm text-zinc-600 line-clamp-2" title={review.comment}>
                        {review.comment}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">{review.date}</TableCell>
                  <TableCell>
                    <Badge variant={review.status === "Hiển thị" ? "default" : "secondary"} className={review.status === "Hiển thị" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-red-100 text-red-700 hover:bg-red-200 border-none"}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>{review.status === "Hiển thị" ? "Ẩn đánh giá" : "Hiện đánh giá"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 p-4 border-b last:border-0 relative">
              <div className="flex items-start gap-3 pr-8">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.initial}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-zinc-900">{review.user.name}</span>
                  <div className="flex text-yellow-400 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-zinc-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 mb-2">{review.date}</span>
                  
                  <Link href={`/products/${review.product.id}/edit`} className="text-xs text-blue-600 hover:underline font-medium mb-1 truncate">
                    Sp: {review.product.name}
                  </Link>
                  
                  <p className="text-sm text-zinc-700 bg-zinc-50 p-2 rounded-md border text-left mt-1">
                    "{review.comment}"
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
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{review.status === "Hiển thị" ? "Ẩn đánh giá" : "Hiện đánh giá"}</DropdownMenuItem>
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
