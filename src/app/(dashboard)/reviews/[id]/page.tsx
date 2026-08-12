"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Eye, EyeOff, Send, Star, CheckCircle2, Trash2 } from "lucide-react";
import { BackButton } from "@/shared/ui/back-button";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import { toast } from "sonner";

export default function ReviewDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [status, setStatus] = useState("visible");
  const [reply, setReply] = useState("");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <BackButton />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chi tiết đánh giá</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card">
              <SelectValue placeholder="Trạng thái">
                {status === "visible" ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Eye className="w-4 h-4" /> Hiển thị
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <EyeOff className="w-4 h-4" /> Ẩn đánh giá
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visible">
                <div className="flex items-center gap-2 text-green-600">
                  <Eye className="w-4 h-4" /> Hiển thị
                </div>
              </SelectItem>
              <SelectItem value="hidden">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <EyeOff className="w-4 h-4" /> Ẩn đánh giá
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 shadow-sm"
            onClick={() => {
              if (confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đánh giá này? Hành động này không thể hoàn tác.")) {
                toast.success("Đã xóa đánh giá thành công!");
                // router.push("/reviews");
              }
            }}
          >
            <Trash2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Xóa đánh giá</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Conversation Thread */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback className="bg-muted text-foreground font-bold">LĐ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-bold">Lê Văn Đạt</CardTitle>
                  <div className="flex text-yellow-400 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : 'text-zinc-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">10/05/2026, 14:30</span>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-6">
              
              {/* Original Message */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    Chất vải rất mát, form áo chuẩn như hình. Tuy nhiên phần chỉ thừa ở gấu áo còn khá nhiều, hy vọng shop sẽ khắc phục ở những lô hàng sau. Giao hàng nhanh, shipper thân thiện.
                  </p>
                  
                  {/* Attachments */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative group cursor-pointer border rounded-md overflow-hidden w-24 h-24 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">review-1.jpg</span>
                    </div>
                     <div className="relative group cursor-pointer border rounded-md overflow-hidden w-24 h-24 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">review-2.jpg</span>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Reply Box */}
          <Card className="shadow-sm border">
            <CardHeader className="py-4 border-b bg-muted/10">
              <CardTitle className="text-base font-bold">Phản hồi công khai</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-4">
              <RichTextEditor 
                value={reply}
                onChange={setReply}
                placeholder="Nhập nội dung phản hồi của shop (sẽ hiển thị công khai trên website)..."
                editorClassName="min-h-[150px]"
              />
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  Khách hàng sẽ nhận được thông báo.
                </div>
                <Button 
                  onClick={() => {
                    if (!reply.trim()) {
                      toast.error("Vui lòng nhập nội dung phản hồi");
                      return;
                    }
                    toast.success("Đã gửi phản hồi thành công!");
                    setReply("");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6"
                >
                  Gửi phản hồi
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Thông tin Sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-3">
                 <div className="w-16 h-16 rounded-md bg-muted border flex-shrink-0 flex items-center justify-center">
                   <span className="text-xs text-muted-foreground">Ảnh SP</span>
                 </div>
                 <div className="flex flex-col">
                   <Link href="/products/PROD-1/edit" className="text-sm font-bold text-blue-600 hover:underline line-clamp-2">Áo Thun Cổ Tròn Basic Cotton</Link>
                   <span className="text-xs text-muted-foreground mt-1">Phân loại: Đen / M</span>
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Lịch sử đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span>Khách hàng đã mua hàng (Verified)</span>
               </div>
               <div className="flex items-center justify-between pt-2 border-t">
                 <span className="text-muted-foreground">Tổng đánh giá đã viết</span>
                 <span className="font-bold">4</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
