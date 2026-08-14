"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import { EmptyState } from "@/shared/ui/empty-state";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Plus, Search, MoreHorizontal, FileQuestion } from "lucide-react";
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

import { useFaqs } from "@/features/content/hooks/useFaqs";
import { Faq as FAQ } from "@/features/content/types/faq.admin";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { getFAQActions } from "../utils/action-resolvers";

interface FAQTableActionsProps {
  faq: FAQ;
}

function FAQTableActions({ faq }: FAQTableActionsProps) {
  const actions = getFAQActions(faq);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.includes('EDIT') && (
          <Dialog>
            <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} />
            <DialogContent className="sm:max-w-106.25">
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
                  <RichTextEditor value={faq.answer} onChange={() => {}} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button className="">Lưu thay đổi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {actions.includes('DELETE') && (
          <Dialog>
            <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Xóa</DropdownMenuItem>} />
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không thể hoàn tác.</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button variant="destructive" onClick={() => toast.success("Đã xóa câu hỏi thành công!")}>Xóa</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FAQTable() {
  const { faqs, isLoading } = useFaqs();

  

  return (
    <>

      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm câu hỏi..." className="pl-8" />
          </div>
        </div>
        
        {(!isLoading && faqs.length === 0) ? (
          <EmptyState
            icon={FileQuestion}
            title="Chưa có câu hỏi nào"
            description="Hãy thêm câu hỏi thường gặp đầu tiên để hỗ trợ khách hàng tốt hơn."
            actionLabel="Thêm câu hỏi mới"
            onAction={() => {}}
          />
        ) : (
          <>
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
              {isLoading ? <TableSkeleton columns={4} /> : (
faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium align-top">{faq.question}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <p className="line-clamp-2">{faq.answer}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <FAQTableActions faq={faq} />
                  </TableCell>
                </TableRow>
              ))
)}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {faqs.map((faq) => (
            <div key={faq.id} className="flex flex-col gap-2 p-4 border-b last:border-0 relative">
              <div className="flex flex-col pr-8">
                <span className="font-bold text-foreground text-sm leading-tight mb-1">{faq.question}</span>
                <span className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</span>
              </div>

              <div className="absolute top-3 right-2">
                <FAQTableActions faq={faq} />
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </>
  );
}
