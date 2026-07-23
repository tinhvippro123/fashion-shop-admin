"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/shared/ui/switch";
import { useState } from "react";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";

export function PageForm({ isEdit = false }: { isEdit?: boolean }) {
  const [content, setContent] = useState("");

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Cột trái: Form thông tin & Editor */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nội dung trang</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề trang</Label>
                <Input id="title" placeholder="VD: Về chúng tôi..." />
              </div>
              
              <div className="grid gap-2">
                <Label>Nội dung (Rich Text)</Label>
                <RichTextEditor 
                  value={content}
                  onChange={setContent}
                  placeholder="Bắt đầu soạn thảo nội dung trang..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Cài đặt SEO & Trạng thái */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hiển thị</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="slug">Đường dẫn (Slug)</Label>
                <Input id="slug" placeholder="ve-chung-toi" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <Label htmlFor="active" className="cursor-pointer">Xuất bản trang</Label>
                  <p className="text-xs text-muted-foreground mt-1">Trang sẽ hiển thị công khai ngay lập tức.</p>
                </div>
                <Switch id="active" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO (Tìm kiếm)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="seo-title">Thẻ tiêu đề (Meta Title)</Label>
                <Input id="seo-title" placeholder="Tiêu đề hiển thị trên Google..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="seo-desc">Mô tả (Meta Description)</Label>
                <Textarea id="seo-desc" placeholder="Đoạn mô tả ngắn hiển thị trên Google..." className="min-h-25" />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 sm:gap-4 mt-auto">
            <Link 
              href="/pages" 
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 hidden sm:flex")}
            >
              Hủy
            </Link>
            <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => toast.success("Đã lưu nháp trang!")}>Lưu nháp</Button>
            <Button className="flex-1 sm:flex-none gap-2" onClick={() => toast.success("Đã lưu trang thành công!")}>
              <Save className="h-4 w-4" /> Lưu trang
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
