"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { FAQTable } from "@/features/content";

export default function FaqsPage() {
  const [answerContent, setAnswerContent] = useState("");
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Câu hỏi thường gặp</h2>
          <p className="text-muted-foreground hidden sm:block">Quản lý danh sách câu hỏi và câu trả lời (FAQ).</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ">
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
              <Button className=" w-full sm:w-auto">Lưu FAQ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <FAQTable />
    </div>
  );
}
