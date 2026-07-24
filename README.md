# LUXE Fashion - Admin Dashboard

Đây là hệ thống quản trị (Admin Dashboard) dành riêng cho cửa hàng thời trang **LUXE Fashion**.
Dự án được tách biệt hoàn toàn với trang dành cho khách hàng (Client) nhằm đảm bảo bảo mật và hiệu suất tối đa.

## 🏗 Kiến trúc dự án (MỚI)

Dự án đã được tái cấu trúc (Refactor) để đảm bảo tính mở rộng và bảo trì dễ dàng hơn. 
Chi tiết về Kiến trúc (Clean Architecture + Vertical Slicing) và quy chuẩn Forms (React Hook Form + Zod + Server Actions), vui lòng xem tại file: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 📦 Công nghệ sử dụng
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Base UI](https://base-ui.com/) (Headless Components)
- **Ngôn ngữ:** TypeScript

## ⚙️ Cài đặt & Chạy dự án (Development)

- **Icons:** [Lucide React](https://lucide.dev/)

1. Cài đặt các thư viện cần thiết:
```bash
npm install
```

2. Khởi chạy máy chủ phát triển (chạy ở cổng 3001 để tránh đụng độ với Client):
```bash
npm run dev
```

3. Mở trình duyệt và truy cập [http://localhost:3001](http://localhost:3001).

## 🛡️ Kiến trúc
Hệ thống Admin sử dụng chung Database và Backend API (Spring Boot) với trang Client. Chỉ những tài khoản có phân quyền (Role) là `ADMIN` hoặc `MANAGER` mới được phép đăng nhập vào hệ thống này.

👉 **Vui lòng xem chi tiết cấu trúc thư mục và quy ước code tại [ARCHITECTURE.md](./ARCHITECTURE.md)**.

## 📝 Tác giả
- [tinhvippro123](https://github.com/tinhvippro123)

