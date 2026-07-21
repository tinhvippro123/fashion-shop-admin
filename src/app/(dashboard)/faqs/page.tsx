"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

const faqs = [
  {
    id: "FAQ-001",
    question: "Chính sách đổi trả như thế nào?",
    answer: "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện nguyên tem mác.",
  },
  {
    id: "FAQ-002",
    question: "Phí giao hàng bao nhiêu?",
    answer: "Miễn phí giao hàng cho đơn từ 500,000 VNĐ. Các đơn khác phí ship đồng giá 30,000 VNĐ toàn quốc.",
  },
];

export default function FaqsPage() {
  const [answerContent, setAnswerContent] = useState("");
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Câu hỏi thường gặp</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý danh sách câu hỏi và câu trả lời (FAQ).</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white">
            <Plus className="mr-2 h-4 w-4" /> Thêm câu hỏi
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm câu hỏi FAQ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Câu hỏi</Label>
                <Input id="question" placeholder="VD: Chính sách đổi trả như thế nào?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Câu trả lời (Rich Text)</Label>
                <RichTextEditor 
                  value={answerContent}
                  onChange={setAnswerContent}
                  placeholder="Nhập câu trả lời chi tiết..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto">Lưu FAQ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input type="search" placeholder="Tìm kiếm câu hỏi..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Câu hỏi</TableHead>
                <TableHead>Câu trả lời</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium align-top">{faq.question}</TableCell>
                  <TableCell className="text-zinc-600">
                    <p className="line-clamp-2">{faq.answer}</p>
                  </TableCell>
                  <TableCell className="text-right align-top">
                                        <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa câu hỏi thường gặp</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-question-${faq.id}`}>Câu hỏi</Label>
                                <Input id={`edit-question-${faq.id}`} defaultValue={faq.question} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`edit-answer-${faq.id}`}>Câu trả lời</Label>
                                <Input id={`edit-answer-${faq.id}`} defaultValue={faq.answer} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
          {faqs.map((faq) => (
            <div key={faq.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex flex-col pr-8">
                <span className="font-bold text-zinc-900 text-sm leading-tight mb-1">{faq.question}</span>
                <span className="text-sm text-zinc-600 line-clamp-2">{faq.answer}</span>
              </div>

              <div className="absolute top-3 right-2">
                                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa câu hỏi thường gặp</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-question-${faq.id}`}>Câu hỏi</Label>
                                <Input id={`m-edit-question-${faq.id}`} defaultValue={faq.question} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`m-edit-answer-${faq.id}`}>Câu trả lời</Label>
                                <Input id={`m-edit-answer-${faq.id}`} defaultValue={faq.answer} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
