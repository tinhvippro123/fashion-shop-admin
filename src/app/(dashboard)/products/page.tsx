import Image from "next/image";
import Link from "next/link";
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
import { Badge } from "@/shared/ui/badge";
import { Plus, MoreHorizontal, PlusCircle, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/utils/utils";

const products = [
  {
    id: "PROD-001",
    name: "Váy đầm dự tiệc cao cấp",
    category: "Váy đầm",
    price: "1,250,000 đ",
    stock: 45,
    status: "Đang bán",
    statusColor: "bg-green-600",
  },
  {
    id: "PROD-002",
    name: "Áo sơ mi lụa tơ tằm",
    category: "Áo nữ",
    price: "850,000 đ",
    stock: 120,
    status: "Đang bán",
    statusColor: "bg-green-600",
  },
  {
    id: "PROD-003",
    name: "Quần âu ống loe",
    category: "Quần nữ",
    price: "950,000 đ",
    stock: 0,
    status: "Hết hàng",
    statusColor: "bg-red-600",
  },
  {
    id: "PROD-004",
    name: "Túi xách da thật sang trọng",
    category: "Phụ kiện",
    price: "2,150,000 đ",
    stock: 12,
    status: "Sắp hết",
    statusColor: "bg-amber-500",
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sản phẩm</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý kho hàng và các mặt hàng thời trang.</p>
        </div>
        <Link 
          href="/products/create"
          className={cn(buttonVariants({ variant: "default" }), "bg-zinc-900 hover:bg-zinc-800")}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Link>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 aspect-[2/3] rounded-md bg-zinc-100 overflow-hidden relative">
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
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href="/products/1/edit" className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List/Card View */}
        <div className="md:hidden flex flex-col">
          {products.map((product) => (
            <div key={product.id} className="flex gap-4 p-4 border-b last:border-0 relative">
              <div className="w-20 aspect-[2/3] rounded-md bg-zinc-100 overflow-hidden relative shrink-0">
                <Image src="/login-bg.jpg" alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col flex-1 py-1">
                <h4 className="font-semibold text-zinc-900 line-clamp-2 leading-tight mb-1 pr-6">{product.name}</h4>
                <p className="text-sm text-zinc-500 mb-2">{product.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{product.price}</span>
                  <Badge className={cn("text-[10px] px-1.5 py-0", product.statusColor)}>{product.status}</Badge>
                </div>
              </div>
              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href="/products/1/edit" className="w-full h-full cursor-pointer">Chỉnh sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa sản phẩm</DropdownMenuItem>
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
