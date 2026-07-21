import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Search, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { useContacts } from "../hooks/useContacts";

export function ContactTable() {
  const { contacts, isLoading } = useContacts();

  if (isLoading) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  return (
    <>

      <div className="rounded-md border bg-white overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input type="search" placeholder="Tìm kiếm liên hệ..." className="pl-8" />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Chủ đề</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className={contact.status === "Chưa đọc" ? "bg-zinc-50 font-medium" : ""}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{contact.name}</span>
                      <span className="text-sm text-zinc-500 font-normal">{contact.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell className="text-zinc-500">{contact.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      contact.status === "Chưa đọc" ? "bg-blue-100 text-blue-800" : "bg-zinc-100 text-zinc-800"
                    }`}>
                      {contact.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Xóa</DropdownMenuItem>
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
          {contacts.map((contact) => (
            <div key={contact.id} className={`flex flex-col gap-2 p-4 border-b last:border-0 relative ${contact.status === "Chưa đọc" ? "bg-zinc-50" : ""}`}>
              <div className="flex flex-col pr-8">
                <span className={`text-sm ${contact.status === "Chưa đọc" ? "font-bold text-zinc-900" : "font-medium text-zinc-700"}`}>
                  {contact.name}
                </span>
                <span className="text-xs text-zinc-500 mb-1">{contact.email}</span>
                <span className={`text-sm leading-tight ${contact.status === "Chưa đọc" ? "font-bold text-zinc-900" : "text-zinc-600"}`}>
                  {contact.subject}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-zinc-400">{contact.date}</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      contact.status === "Chưa đọc" ? "bg-blue-100 text-blue-800" : "bg-zinc-100 text-zinc-800"
                    }`}>
                      {contact.status}
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
