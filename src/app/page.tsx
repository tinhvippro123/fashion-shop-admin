import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Nửa bên trái: Hình ảnh Branding */}
      <div className="hidden bg-zinc-900 lg:block relative">
        <Image
          src="/login-bg.jpg"
          alt="Luxe Fashion Cover"
          fill
          className="h-full w-full object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Phủ nhẹ màu tối để làm nổi bật text */}
        
        {/* Logo góc trên */}
        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="bg-white/90 p-3 rounded-lg shadow-lg">
            <Image src="/logo.png" alt="Luxe Fashion" width={140} height={40} className="object-contain" />
          </div>
        </div>

        {/* Thông điệp góc dưới */}
        <div className="absolute bottom-10 left-10 max-w-lg text-white">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">LUXE Fashion Admin</h1>
          <p className="text-zinc-200 text-lg leading-relaxed">
            Hệ thống quản trị và kiểm soát dữ liệu nội bộ. Vui lòng đăng nhập với tài khoản được cấp quyền để truy cập không gian làm việc.
          </p>
        </div>
      </div>

      {/* Nửa bên phải: Form Đăng Nhập */}
      <div className="flex items-center justify-center py-12 bg-background">
        <div className="mx-auto grid w-95 gap-8">
          
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Đăng nhập</h1>
            <p className="text-balance text-zinc-500 text-sm mt-1">
              Nhập thông tin tài khoản để truy cập hệ thống
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-semibold text-zinc-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@luxefashion.com"
                required
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold text-zinc-700">Mật khẩu</Label>
                <Link
                  href="#"
                  className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input id="password" type="password" required className="h-11" />
            </div>
            
            <Link 
              href="/dashboard" 
              className={cn(buttonVariants({ variant: "default" }), "w-full h-11 text-base font-semibold bg-zinc-900 hover:bg-zinc-800")}
            >
              Đăng nhập
            </Link>
          </div>
          
          <div className="mt-2 text-center text-sm text-zinc-500">
            Hệ thống quản trị chỉ dành cho nhân viên nội bộ.
          </div>
        </div>
      </div>
    </div>
  );
}
