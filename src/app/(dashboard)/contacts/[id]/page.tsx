"use client";

import { useParams } from "next/navigation";
import { BackButton } from "@/shared/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { 
  Paperclip, 
  Send, 
  Lock,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  History
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useState } from "react";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import { toast } from "sonner";

export default function ContactDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [status, setStatus] = useState("open");
  const [reply, setReply] = useState("");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
        <div className="flex items-start sm:items-center gap-2 sm:gap-4">
          <div className="mt-1 sm:mt-0"><BackButton /></div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Chi tiết liên hệ</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card">
              <SelectValue placeholder="Trạng thái">
                {status === "open" && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="w-4 h-4" /> Đang mở
                  </div>
                )}
                {status === "pending" && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <History className="w-4 h-4" /> Chờ phản hồi
                  </div>
                )}
                {status === "resolved" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" /> Đã giải quyết
                  </div>
                )}
                {status === "closed" && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4" /> Đã đóng
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">
                <div className="flex items-center gap-2 text-blue-600">
                  <AlertCircle className="w-4 h-4" /> Mở / Chưa giải quyết
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center gap-2 text-amber-600">
                  <Clock className="w-4 h-4" /> Đang chờ xử lý
                </div>
              </SelectItem>
              <SelectItem value="resolved">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" /> Đã giải quyết
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Conversation Thread */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-4 border-b">
              <div className="flex items-start gap-3 w-full sm:w-auto">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-muted text-foreground font-bold">KM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <CardTitle className="text-base font-bold leading-tight">Thắc mắc về Đơn hàng {id}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-snug break-all sm:break-normal">Khách hàng mẫu &lt;sample@gmail.com&gt;</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium pl-13 sm:pl-0 sm:ml-4 whitespace-nowrap">22/07/2026, 14:30</span>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-6">
              
              {/* Original Message */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    Xin chào shop, tôi muốn hỏi về quy trình đổi trả cho đơn hàng mã {id} của mình. Áo tôi nhận được bị rộng hơn so với size tôi thường mặc. Shop có thể hỗ trợ đổi sang size nhỏ hơn được không? Cảm ơn shop.
                  </p>
                  
                  {/* Attachments */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative group cursor-pointer border rounded-md overflow-hidden w-24 h-24 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">bill.jpg</span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Xem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Internal Note Mock */}
          <Card className="bg-amber-50/50 border-amber-200 shadow-none">
            <CardContent className="p-4 flex gap-4">
               <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-amber-200 text-amber-800 text-xs font-bold">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-amber-900">Admin Tâm</span>
                    <span className="text-xs text-amber-700/60 font-medium">22/07/2026, 15:00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold mb-2 uppercase tracking-wider">
                    <Lock className="w-3 h-3" /> Ghi chú nội bộ
                  </div>
                  <p className="text-amber-900/90 text-sm leading-relaxed">
                    Đã kiểm tra kho, hiện tại mẫu áo này size M đã hết màu đen. Vừa gọi điện báo khách để tư vấn đổi sang màu xám. Đang chờ khách phản hồi lại.
                  </p>
                </div>
            </CardContent>
          </Card>

          {/* Reply Box */}
          <Card className={isInternalNote ? "border-amber-300 shadow-sm transition-colors" : "transition-colors"}>
            <CardHeader className="py-3 bg-muted/30 rounded-t-xl">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsInternalNote(false)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-md transition-colors ${!isInternalNote ? "bg-card shadow-sm border text-foreground" : "text-muted-foreground hover:bg-muted"}`}
                >
                  Gửi phản hồi
                </button>
                <button 
                  onClick={() => setIsInternalNote(true)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${isInternalNote ? "bg-amber-100 shadow-sm border border-amber-200 text-amber-900" : "text-muted-foreground hover:bg-muted"}`}
                >
                  <Lock className="w-4 h-4" /> Ghi chú nội bộ
                </button>
              </div>
            </CardHeader>
            <CardContent className={`p-0 flex flex-col ${isInternalNote ? "bg-amber-50/30" : ""}`}>
              <div className="[&_.ql-container]:border-x-0 [&_.ql-container]:border-b-0 [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:border-b">
                <RichTextEditor 
                  value={reply}
                  onChange={setReply}
                  placeholder={isInternalNote ? "Nhập ghi chú nội bộ (chỉ nhân viên xem được)..." : "Nhập nội dung phản hồi cho khách hàng..."}
                  editorClassName="min-h-[150px]"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-t bg-muted/30 rounded-b-xl">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  className=""
                  onClick={() => {
                    if (!reply.trim()) {
                      toast.error("Vui lòng nhập nội dung");
                      return;
                    }
                    toast.success(isInternalNote ? "Đã lưu ghi chú nội bộ!" : "Đã gửi phản hồi cho khách hàng!");
                    setReply("");
                  }}
                >
                  {isInternalNote ? "Lưu ghi chú" : "Gửi phản hồi"}
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
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Tên khách hàng</span>
                <span className="text-sm font-medium text-foreground">Khách hàng mẫu</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Email</span>
                <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">sample@gmail.com</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Số điện thoại</span>
                <span className="text-sm font-medium text-foreground">0988 123 456</span>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full text-xs h-8">
                  Xem hồ sơ khách hàng
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Chi tiết Yêu cầu</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               <div>
                <span className="text-xs text-muted-foreground block mb-1">Mã liên hệ</span>
                <span className="text-sm font-mono text-foreground">#TKT-{id}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Thời gian tạo</span>
                <span className="text-sm font-medium text-foreground">22/07/2026, 14:30</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Phân loại</span>
                <Badge variant="outline" className="bg-muted font-normal">Đổi trả hàng</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
