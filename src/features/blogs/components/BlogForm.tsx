"use client";

import { BackButton } from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Upload, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const categoryOptions = [
  { key: "trends", label: "Xu hướng thời trang" },
  { key: "tips", label: "Mẹo phối đồ" },
  { key: "news", label: "Tin tức cửa hàng" },
  { key: "care", label: "Hướng dẫn bảo quản" },
];

export function BlogForm({ initialData }: { initialData?: any }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tips");

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Viết bài mới</h2>
            <p className="text-zinc-500">Soạn thảo và xuất bản bài viết lên trang Blog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Lưu nháp</Button>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
            <Save className="h-4 w-4" /> Xuất bản
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content Area */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nội dung chính</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-semibold">Tiêu đề bài viết <span className="text-red-500">*</span></Label>
                <Input id="title" placeholder="VD: 10 Cách Phối Đồ Đi Đà Lạt Mùa Lạnh Cực Xinh Cho Nữ" className="text-lg" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="slug" className="font-semibold">Đường dẫn tĩnh (Slug)</Label>
                <Input id="slug" placeholder="vd: 10-cach-phoi-do-di-da-lat" className="bg-zinc-50 text-zinc-500" />
                <p className="text-xs text-zinc-500">Tự động tạo từ tiêu đề nếu để trống. Dùng cho đường dẫn SEO.</p>
              </div>

              <div className="grid gap-2">
                <Label className="font-semibold">Trình soạn thảo nội dung <span className="text-red-500">*</span></Label>
                <div className="rounded-md border flex flex-col bg-white quill-wrapper">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    className="h-[400px] border-none"
                    placeholder="Bắt đầu viết nội dung tại đây..."
                    bounds=".quill-wrapper"
                    modules={{
                      toolbar: [
                        [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['clean']
                      ],
                    }}
                  />
                  {/* Space for the absolute positioned toolbar inside the quill container */}
                  <div className="h-10"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tối ưu SEO (Tùy chọn)</CardTitle>
              <CardDescription>Thiết lập các thẻ để bài viết dễ dàng lên top Google.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="seoTitle">Thẻ Tiêu đề SEO (Meta Title)</Label>
                <Input id="seoTitle" placeholder="Nhập tiêu đề hiển thị trên Google..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="seoDesc">Thẻ Mô tả (Meta Description)</Label>
                <Textarea id="seoDesc" placeholder="Mô tả ngắn gọn nội dung bài viết..." rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar settings */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân loại</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label className="font-semibold">Chuyên mục <span className="text-red-500">*</span></Label>
                <Select value={category} onValueChange={(val) => setCategory(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chuyên mục">
                      {categoryOptions.find((opt) => opt.key === category)?.label || "Chọn chuyên mục"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.key} value={opt.key}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Thẻ (Tags)</Label>
                <Input id="tags" placeholder="VD: mùa đông, đà lạt, áo len..." />
                <p className="text-xs text-zinc-500">Phân cách các thẻ bằng dấu phẩy (,)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ảnh bìa (Thumbnail)</CardTitle>
              <CardDescription>Kích thước khuyên dùng: 1200 x 630px.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 transition-colors">
                <Upload className="h-8 w-8 text-zinc-400 mb-2" />
                <p className="text-sm font-medium text-zinc-700">Nhấn để tải ảnh lên</p>
                <p className="text-xs text-zinc-500 mt-1">Hỗ trợ JPG, PNG (Tối đa 2MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt khác</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="comment" className="font-semibold cursor-pointer">Cho phép bình luận</Label>
                  <p className="text-xs text-zinc-500">Hiển thị khung bình luận ở cuối bài.</p>
                </div>
                <Switch id="comment" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pin" className="font-semibold cursor-pointer">Ghim bài viết</Label>
                  <p className="text-xs text-zinc-500">Ghim lên đầu trang Blog.</p>
                </div>
                <Switch id="pin" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
